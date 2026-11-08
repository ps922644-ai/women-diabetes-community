import React, { useState, useEffect } from 'react';

interface ContactSectionProps {
  initialSubject?: string;
  initialMessage?: string;
  onClearInitial?: () => void;
}

const DESTINATION_EMAIL = 'Omnwomandiabetescaffe@gmail.com';

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialSubject,
  initialMessage,
  onClearInitial,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('الانضمام إلى المجتمع');
  const [message, setMessage] = useState('');
  const [gotcha, setGotcha] = useState(''); // Anti-spam honeypot

  const [showConfigModal, setShowConfigModal] = useState(false);

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    message: string;
    submissionId?: string;
    timestamp?: string;
  } | null>(null);

  // Field validation flags (Name, Email, Message)
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: boolean;
    email?: boolean;
    message?: boolean;
  }>({});

  useEffect(() => {
    if (initialSubject) {
      setSubject(initialSubject);
    }
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialSubject, initialMessage]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessInfo(null);

    // 1. Anti-spam honeypot check
    if (gotcha.trim() !== '') {
      setErrorMessage('تم رفض الطلب كرسالة غير مرغوب فيها.');
      return;
    }

    // 2. Validate all required fields
    const errors: {
      fullName?: boolean;
      email?: boolean;
      message?: boolean;
    } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errors.email = true;
    }

    if (!message.trim() || message.trim().length < 5) {
      errors.message = true;
    }

    setFieldErrors(errors);

    if (errors.fullName) {
      setErrorMessage('يرجى كتابة الاسم بالكامل (حرفان على الأقل).');
      return;
    }
    if (errors.email) {
      setErrorMessage('يرجى إدخال عنوان بريد إلكتروني صالح (مثال: name@example.com).');
      return;
    }
    if (errors.message) {
      setErrorMessage('يرجى كتابة نص الرسالة أو الاستفسار (5 أحرف على الأقل).');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to server backend with relative URL (name, email, subject, message only)
      const response = await fetch('/api/contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          _gotcha: gotcha,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Confirmed real successful delivery from backend
        setSuccessInfo({
          message: result.message || `تم إرسال طلبكِ بنجاح إلى البريد الرسمي (${DESTINATION_EMAIL}).`,
          submissionId: result.submissionId,
          timestamp: result.timestamp,
        });

        // Reset form
        setFullName('');
        setEmail('');
        setMessage('');
        setFieldErrors({});
        if (onClearInitial) onClearInitial();
      } else {
        // Clear honest error message from server
        setErrorMessage(
          result.error ||
            'تعذر إرسال البريد الإلكتروني. يرجى التأكد من اتصالكِ أو التحقق من إعدادات الخادم.'
        );
      }
    } catch (err: any) {
      setErrorMessage(
        'حدث خطأ في الاتصال بالخادم أثناء إرسال البريد. يرجى المحاولة مرة أخرى لاحقًا.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-pad contact-section px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Centered Main Heading and Subtitle */}
        <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
          <p className="section-kicker justify-center">تواصلي معنا</p>
          <h2
            className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-[#2A2338]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            انضمي إلينا
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base leading-8 text-[var(--text-muted)]">
            ابدئي رحلتكِ مع مجتمع يفهمكِ ويشارككِ التجربة نفسها تحت مظلة المركز الوطني لعلاج أمراض السكري والغدد الصماء.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[rgba(109,90,156,0.1)] px-4 py-1.5 text-xs font-semibold text-[var(--primary-color)]">
            <i className="fa-solid fa-envelope text-sm"></i>
            <span>البريد المعتمد للمراسلات: </span>
            <strong className="font-mono text-[#2A2338]">{DESTINATION_EMAIL}</strong>
          </div>
        </div>

        {/* Two-Column Layout on Desktop:
            In Arabic RTL:
            - Column 1 (Right): Three Information Cards
            - Column 2 (Left): Contact Form
            On Mobile: Stacked vertically
        */}
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* RIGHT COLUMN: Information Cards */}
          <div className="space-y-4">
            {/* Card 1: استشارة ودعم */}
            <div className="glass-panel flex items-start gap-4 rounded-[1.6rem] p-5 shadow-sm hover:shadow-md transition-shadow">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--sage-soft)] text-[var(--accent-color)]">
                <i className="fa-solid fa-user-doctor text-xl"></i>
              </span>
              <div>
                <h3 className="font-bold text-[var(--text-color)] text-base">
                  استشارة ودعم
                </h3>
                <p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">
                  اطلبي الانضمام إلى جلسات الدعم الأسبوعية أو استشيري المختصات في صحة المرأة والسكري.
                </p>
              </div>
            </div>

            {/* Card 2: البريد الرسمي */}
            <div className="glass-panel flex items-start gap-4 rounded-[1.6rem] p-5 shadow-sm hover:shadow-md transition-shadow">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--sage-soft)] text-[var(--accent-color)]">
                <i className="fa-solid fa-envelope-open-text text-xl"></i>
              </span>
              <div>
                <h3 className="font-bold text-[var(--text-color)] text-base">
                  البريد الرسمي المعتمد
                </h3>
                <p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">
                  تُرسل كل استمارة مباشرة إلى صندوق البريد الرسمي:
                </p>
                <a
                  href={`mailto:${DESTINATION_EMAIL}`}
                  className="mt-1 inline-block font-mono text-xs font-bold text-[var(--primary-color)] hover:underline"
                >
                  {DESTINATION_EMAIL}
                </a>
              </div>
            </div>

            {/* Card 3: خصوصية تامة وأوقات الرد */}
            <div className="glass-panel flex items-start gap-4 rounded-[1.6rem] p-5 shadow-sm hover:shadow-md transition-shadow">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--sage-soft)] text-[var(--accent-color)]">
                <i className="fa-solid fa-shield-halved text-xl"></i>
              </span>
              <div>
                <h3 className="font-bold text-[var(--text-color)] text-base">
                  خصوصية تامة وسرية
                </h3>
                <p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">
                  بياناتكِ مشفرة ومحفوظة بسرية تامة، وسيتم الرد عليكِ خلال 24 ساعة عمل.
                </p>
              </div>
            </div>

            {/* Card 4: بطاقة المركز الوطني */}
            <div className="rounded-[1.6rem] border border-[var(--glass-border)] bg-[rgba(237,233,245,0.7)] p-5">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/800_6aef1d42cdb94_ceb47c6d.jpg"
                  alt="شعار المركز الوطني"
                  className="h-10 w-10 shrink-0 object-contain rounded-full bg-white p-0.5 border border-[var(--glass-border)]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[var(--sage-dark)]">
                    المركز الوطني لعلاج أمراض السكري والغدد الصماء
                  </h4>
                  <p className="text-[0.68rem] text-[var(--text-muted)] mt-0.5">
                    National Diabetes and Endocrine Centre
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-6 text-[var(--text-muted)] border-t border-[rgba(109,90,156,0.15)] pt-2.5">
                مبادرة توعوية مجتمعية تعنى بتعزيز جودة حياة المرأة المصابة بالسكري في مختلف المراحل الحيوية.
              </p>
            </div>

            {/* Google Apps Script Deployment Helper button */}
            <div className="pt-1 text-center sm:text-start">
              <button
                type="button"
                onClick={() => setShowConfigModal(!showConfigModal)}
                className="text-[0.72rem] text-[var(--text-muted)] hover:text-[var(--primary-color)] underline cursor-pointer inline-flex items-center gap-1.5"
              >
                <i className="fa-solid fa-code text-[0.65rem]"></i>
                <span>إعداد وتفقد رابط Google Apps Script Web App</span>
              </button>
            </div>
          </div>

          {/* LEFT COLUMN: Email Contact Form */}
          <form
            onSubmit={handleEmailSubmit}
            noValidate
            className="glass-panel rounded-[2.4rem] p-6 sm:p-9 shadow-lg"
          >
            {/* Honeypot field for anti-spam (hidden from real users) */}
            <input
              type="text"
              name="_gotcha"
              value={gotcha}
              onChange={(e) => setGotcha(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none' }}
              aria-hidden="true"
            />

            {/* Success Notification - shown ONLY after confirmed successful delivery */}
            {successInfo && (
              <div
                className="mb-6 p-5 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-900 text-sm leading-7 animate-fadeIn shadow-sm"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center gap-2 font-bold mb-2 text-base text-emerald-800">
                  <i className="fa-solid fa-circle-check text-emerald-600 text-lg"></i>
                  <span>تم إرسال رسالتكِ بنجاح!</span>
                </div>
                <p>{successInfo.message}</p>
                <div className="mt-3 pt-3 border-t border-emerald-200 text-xs text-emerald-700 flex flex-wrap items-center justify-between gap-2">
                  <span>
                    البريد المستلم: <strong>{DESTINATION_EMAIL}</strong>
                  </span>
                  {successInfo.submissionId && (
                    <span className="font-mono bg-emerald-100 px-2 py-0.5 rounded">
                      الرقم المرجعي: {successInfo.submissionId}
                    </span>
                  )}
                  {successInfo.timestamp && <span>{successInfo.timestamp}</span>}
                </div>
              </div>
            )}

            {/* Error Notification */}
            {errorMessage && (
              <div
                className="mb-6 p-5 rounded-2xl border border-rose-300 bg-rose-50 text-rose-900 text-sm leading-7 animate-fadeIn shadow-sm"
                role="alert"
                aria-live="assertive"
              >
                <div className="flex items-center gap-2 font-bold mb-1 text-rose-800">
                  <i className="fa-solid fa-triangle-exclamation text-rose-600 text-lg"></i>
                  <span>تنبيه:</span>
                </div>
                <p>{errorMessage}</p>
                {errorMessage.includes('Google Apps Script') && (
                  <div className="mt-3 pt-3 border-t border-rose-200">
                    <button
                      type="button"
                      onClick={() => setShowConfigModal(true)}
                      className="text-xs font-bold text-rose-900 underline hover:text-rose-700 cursor-pointer"
                    >
                      انقري هنا لمراجعة تعليمات نشر Google Apps Script وإدخال الرابط
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              {/* 1. Full Name (الاسم بالكامل) */}
              <div className="sm:col-span-1">
                <label
                  htmlFor="cFullName"
                  className="form-label text-sm font-bold text-[#2A2338] mb-2 block"
                >
                  الاسم بالكامل <span className="text-rose-500">*</span>
                </label>
                <input
                  id="cFullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={fullName}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: false });
                  }}
                  placeholder="اسمكِ الكريم بالكامل"
                  className={`w-full rounded-full border bg-[var(--field-bg)] px-5 py-3 text-sm text-[var(--text-color)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all disabled:opacity-60 ${
                    fieldErrors.fullName
                      ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-[var(--glass-border)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)]'
                  }`}
                />
              </div>

              {/* 2. Email Address (البريد الإلكتروني) */}
              <div className="sm:col-span-1">
                <label
                  htmlFor="cEmail"
                  className="form-label text-sm font-bold text-[#2A2338] mb-2 block"
                >
                  البريد الإلكتروني <span className="text-rose-500">*</span>
                </label>
                <input
                  id="cEmail"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: false });
                  }}
                  placeholder="name@example.com"
                  className={`w-full rounded-full border bg-[var(--field-bg)] px-5 py-3 text-sm text-[var(--text-color)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all disabled:opacity-60 ${
                    fieldErrors.email
                      ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-[var(--glass-border)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)]'
                  }`}
                />
              </div>

              {/* 3. Subject (الموضوع) */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="cSubject"
                  className="form-label text-sm font-bold text-[#2A2338] mb-2 block"
                >
                  الموضوع <span className="text-rose-500">*</span>
                </label>
                <select
                  id="cSubject"
                  name="subject"
                  value={subject}
                  disabled={isSubmitting}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-full border border-[var(--glass-border)] bg-[var(--field-bg)] px-5 py-3 text-sm text-[var(--text-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] focus:outline-none transition-all cursor-pointer disabled:opacity-60"
                >
                  <option value="الانضمام إلى المجتمع">الانضمام إلى المجتمع</option>
                  <option value="استشارة تغذية للسكري">استشارة تغذية للسكري</option>
                  <option value="جلسات الدعم النفسي والصحي">جلسات الدعم النفسي والصحي</option>
                  <option value="سكري الحمل والمتابعة">سكري الحمل والمتابعة</option>
                  <option value="تكيس المبايض ومقاومة الإنسولين">تكيس المبايض ومقاومة الإنسولين</option>
                  <option value="سؤال عام لفريق المركز">سؤال عام لفريق المركز</option>
                </select>
              </div>

              {/* 4. Message (الرسالة) */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="cMessage"
                  className="form-label text-sm font-bold text-[#2A2338] mb-2 block"
                >
                  الرسالة <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="cMessage"
                  name="message"
                  required
                  rows={4}
                  value={message}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: false });
                  }}
                  placeholder="كيف يمكننا مساعدتكِ؟ اكتبي استفساركِ أو تفاصيل حالتكِ بكل أمان وخصوصية..."
                  className={`w-full rounded-3xl border bg-[var(--field-bg)] p-5 text-sm text-[var(--text-color)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all min-h-[130px] disabled:opacity-60 ${
                    fieldErrors.message
                      ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-[var(--glass-border)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)]'
                  }`}
                ></textarea>
              </div>
            </div>

            {/* Primary Submit Button: Deliver Email via Server Backend */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 min-h-12 w-full rounded-full border-0 bg-[var(--button-color)] font-bold text-[var(--text-color)] shadow-[var(--shadow-button)] transition-all duration-300 hover:bg-[var(--primary-hover)] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 text-base"
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin text-lg"></i>
                  <span>جاري إرسال الطلب عبر خادم البريد...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane text-base"></i>
                  <span>إرسال الرسالة إلى البريد الرسمي</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Google Apps Script Deployment & Server Configuration Modal */}
      {showConfigModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 text-[#2A2338] shadow-2xl border border-[var(--glass-border)] animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--sage-soft)] text-[var(--primary-color)]">
                  <i className="fa-brands fa-google text-lg"></i>
                </span>
                <div>
                  <h3
                    className="font-bold text-lg text-[#2A2338]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    إعداد خادم Google Apps Script للبريد
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    البريد المستلم: {DESTINATION_EMAIL}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                aria-label="إغلاق"
              >
                <i className="fa-solid fa-xmark text-base"></i>
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[var(--text-muted)] leading-7">
              <div className="p-4 rounded-2xl bg-[var(--surface-color)] border border-[var(--glass-border)]">
                <p className="font-bold text-[#2A2338] mb-1">
                  1. تم إنشاء كود Google Apps Script الآمن بالكامل في الملف:
                </p>
                <code className="block bg-white p-2 rounded-xl border border-slate-200 font-mono text-xs text-[var(--primary-color)]">
                  /google-apps-script.js
                </code>
              </div>

              <div>
                <p className="font-bold text-[#2A2338] mb-1">
                  2. خطوات النشر السريع (خلال 60 ثانية):
                </p>
                <ol className="list-decimal list-inside space-y-1.5 pr-2">
                  <li>افتح <a href="https://script.google.com" target="_blank" rel="noopener noreferrer" className="text-[var(--primary-color)] underline font-bold">script.google.com</a> وسجّل الدخول بحساب Google.</li>
                  <li>انقر على <strong>مشروع جديد (New project)</strong> وانسخ محتوى ملف <code>google-apps-script.js</code> في المحرر.</li>
                  <li>انقر على <strong>Deploy &gt; New deployment</strong>.</li>
                  <li>اختر نوع <strong>Web app</strong>، واجعل <strong>Who has access = Anyone</strong> ثم انقر <strong>Deploy</strong>.</li>
                  <li>انسخ رابط الـ Web App الناتج (ينتهي بـ <code>/exec</code>).</li>
                </ol>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
                <p className="font-bold mb-1 flex items-center gap-1.5 text-[#2A2338]">
                  <i className="fa-solid fa-shield-halved text-[var(--primary-color)]"></i>
                  <span>3. ضبط متغير البيئة على الخادم (للحماية التامة):</span>
                </p>
                <p className="text-xs leading-6">
                  وفقاً لمعايير الأمان المتبعة، لا يُسمح بتخزين الرابط في متصفح الزائر أو تمريره عبر الواجهة الأمامية. يتم وضعه حصرياً في إعدادات خادم الاستضافة (مثل لوحة تحكم Render &gt; Environment):
                </p>
                <code className="block bg-white/80 p-2.5 rounded-xl border border-amber-300 font-mono text-xs text-purple-900 mt-2 select-all">
                  GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
                </code>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="rounded-full bg-[var(--primary-color)] text-white px-6 py-2 text-xs font-bold hover:bg-[var(--primary-hover)] cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
