/**
 * =========================================================================
 * صحة المرأة والسكري - المركز الوطني لعلاج أمراض السكري والغدد الصماء
 * خادم استقبال نموذج التواصل وإرسال البريد الإلكتروني عبر Google Apps Script
 * =========================================================================
 *
 * البريد الإلكتروني المستلم: Omnwomandiabetescaffe@gmail.com
 *
 * -------------------------------------------------------------------------
 * خطوات النشر كـ Web App على Google Apps Script (خلال دقيقة واحدة):
 * -------------------------------------------------------------------------
 * 1. افتح الموقع: https://script.google.com وسجّل الدخول بحساب Google.
 * 2. انقر على زر "مشروع جديد" (New project).
 * 3. امسح أي كود موجود في المحرر والصق هذا الملف بالكامل كما هو.
 * 4. احفظ المشروع بالنقر على أيقونة الحفظ 💾 (أو Ctrl+S).
 * 5. انقر على زر "نشر" (Deploy) بالأعلى، ثم اختر "نشر جديد" (New deployment).
 * 6. انقر على الترس ⚙️ بجانب "Select type" واختر "تطبيق الويب" (Web app).
 * 7. املأ البيانات كالتالي:
 *    - Description: خدمة بريد صحة المرأة والسكري
 *    - Execute as: Me (حسابك الشخصي)
 *    - Who has access: Anyone (أي شخص) [مهم جداً حتى يتمكن خادم الموقع من الإرسال]
 * 8. انقر على "Deploy" وامنح الأذونات المطلوبة (Authorize access).
 * 9. انسخ "Web app URL" (ينتهي بـ /exec) وضعه كمتغير بيئة في Render:
 *    GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/XXXXX/exec"
 * -------------------------------------------------------------------------
 */

const DESTINATION_EMAIL = "Omnwomandiabetescaffe@gmail.com";
const APP_TITLE = "صحة المرأة والسكري";
const APP_SUBTITLE = "المركز الوطني لعلاج أمراض السكري والغدد الصماء";

/**
 * معالجة طلبات POST الواردة من الموقع
 */
function doPost(e) {
  try {
    let data;

    // استخراج البيانات سواء تم إرسالها كـ JSON أو Form URL-encoded
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    // 1. فحص الحقل الخفي للحماية من الروبوتات والرسائل المزعجة (Honeypot Anti-Spam)
    if (data._gotcha && data._gotcha.trim() !== "") {
      return createJsonResponse({
        status: "error",
        message: "تم رفض الطلب كرسالة غير مرغوب فيها (Spam)."
      }, 400);
    }

    // 2. التحقق من الحقول الإجبارية (الاسم، البريد، الموضوع، الرسالة فقط - بدون رقم هاتف)
    const fullName = (data.fullName || data.name || "").toString().trim();
    const email = (data.email || "").toString().trim();
    const subject = (data.subject || "طلب تواصل عام").toString().trim();
    const message = (data.message || "").toString().trim();

    if (!fullName || fullName.length < 2) {
      return createJsonResponse({
        status: "error",
        message: "يرجى كتابة الاسم بالكامل."
      }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return createJsonResponse({
        status: "error",
        message: "يرجى كتابة عنوان بريد إلكتروني صالح."
      }, 400);
    }

    if (!message || message.length < 5) {
      return createJsonResponse({
        status: "error",
        message: "يرجى كتابة نص الرسالة بشكل واضح."
      }, 400);
    }

    // 3. توثيق تاريخ ووقت الإرسال (توقيت سلطنة عُمان GMT+4)
    const now = new Date();
    const formattedDate = Utilities.formatDate(now, "Asia/Muscat", "yyyy/MM/dd");
    const formattedTime = Utilities.formatDate(now, "Asia/Muscat", "hh:mm a");
    const submissionId = "REQ-" + Utilities.getUuid().substring(0, 8).toUpperCase();

    // 4. بناء القالب المرئي لرسالة البريد الإلكتروني (HTML Email)
    const emailSubject = `[${APP_TITLE}] طلب تواصل جديد: ${subject} - ${fullName}`;

    const htmlBody = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #FAF9FC; color: #2A2338; margin: 0; padding: 24px; direction: rtl; text-align: right; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid rgba(109, 90, 156, 0.2); box-shadow: 0 10px 30px rgba(42, 35, 56, 0.06); }
          .header { background: linear-gradient(135deg, #6D5A9C 0%, #7C5FA8 100%); color: #ffffff; padding: 30px 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
          .header p { margin: 8px 0 0; font-size: 13px; opacity: 0.9; color: #EDE9F5; }
          .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 14px; border-radius: 99px; font-size: 11px; margin-top: 12px; }
          .content { padding: 30px 24px; }
          .field-row { margin-bottom: 18px; border-bottom: 1px solid #F1EEF8; padding-bottom: 14px; }
          .field-label { font-size: 12px; font-weight: bold; color: #7C5FA8; margin-bottom: 5px; text-transform: uppercase; }
          .field-value { font-size: 15px; color: #2A2338; line-height: 1.6; }
          .message-box { background: #FAF9FC; border: 1px solid #EDE9F5; border-radius: 14px; padding: 18px; margin-top: 20px; }
          .message-box .field-label { color: #4E3D73; }
          .message-box .field-value { white-space: pre-wrap; font-size: 14px; color: #2A2338; }
          .footer { background: #F1EEF8; padding: 18px 24px; text-align: center; font-size: 12px; color: #5C5170; }
          .btn-reply { display: inline-block; background: #6D5A9C; color: #ffffff !important; text-decoration: none; padding: 10px 24px; border-radius: 99px; font-size: 13px; font-weight: bold; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${APP_TITLE}</h1>
            <p>${APP_SUBTITLE}</p>
            <span class="badge">رقم الطلب المرجعي: ${submissionId}</span>
          </div>
          
          <div class="content">
            <div class="field-row">
              <div class="field-label">الاسم بالكامل</div>
              <div class="field-value"><strong>${escapeHtml(fullName)}</strong></div>
            </div>

            <div class="field-row">
              <div class="field-label">البريد الإلكتروني للرد</div>
              <div class="field-value"><a href="mailto:${escapeHtml(email)}" style="color: #6D5A9C; text-decoration: none;">${escapeHtml(email)}</a></div>
            </div>

            <div class="field-row">
              <div class="field-label">الموضوع / مجال الاستفسار</div>
              <div class="field-value">${escapeHtml(subject)}</div>
            </div>

            <div class="field-row">
              <div class="field-label">تاريخ وتوقيت الإرسال</div>
              <div class="field-value">${formattedDate} - الساعة ${formattedTime} (توقيت سلطنة عُمان)</div>
            </div>

            <div class="message-box">
              <div class="field-label">نص الرسالة أو الاستفسار:</div>
              <div class="field-value">${escapeHtml(message)}</div>
            </div>

            <div style="text-align: center;">
              <a href="mailto:${escapeHtml(email)}?subject=رد: ${encodeURIComponent(subject)}" class="btn-reply">
                الرد المباشر على المرسلة
              </a>
            </div>
          </div>

          <div class="footer">
            تم استلام هذه الرسالة عبر نموذج التواصل الرسمي لموقع <strong>صحة المرأة والسكري</strong>.<br>
            المستلم المعتمد: ${DESTINATION_EMAIL}
          </div>
        </div>
      </body>
      </html>
    `;

    const textBody = 
      `طلب تواصل جديد من موقع صحة المرأة والسكري\n` +
      `المركز الوطني لعلاج أمراض السكري والغدد الصماء\n` +
      `-----------------------------------------\n` +
      `الاسم بالكامل: ${fullName}\n` +
      `البريد الإلكتروني: ${email}\n` +
      `الموضوع: ${subject}\n` +
      `التاريخ والتوقيت: ${formattedDate} - ${formattedTime}\n` +
      `رقم الطلب: ${submissionId}\n` +
      `-----------------------------------------\n` +
      `نص الرسالة:\n${message}\n`;

    // 5. إرسال البريد الإلكتروني الفعلي إلى العنوان المحدد
    MailApp.sendEmail({
      to: DESTINATION_EMAIL,
      subject: emailSubject,
      htmlBody: htmlBody,
      body: textBody,
      replyTo: email,
      name: APP_TITLE
    });

    // 6. الرد بنتيجة النجاح
    return createJsonResponse({
      status: "success",
      message: "تم إرسال طلبكِ بنجاح إلى الفريق المختص في المركز الوطني لعلاج أمراض السكري والغدد الصماء.",
      destinationEmail: DESTINATION_EMAIL,
      submissionId: submissionId,
      timestamp: `${formattedDate} ${formattedTime}`
    }, 200);

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: "حدث خطأ أثناء معالجة وإرسال البريد: " + error.toString()
    }, 500);
  }
}

/**
 * معالجة طلبات GET للفحص والتحقق من عمل الخدمة
 */
function doGet(e) {
  return createJsonResponse({
    status: "ok",
    service: APP_TITLE,
    centre: APP_SUBTITLE,
    destinationEmail: DESTINATION_EMAIL,
    instructions: "يرجى إرسال بيانات النموذج عبر POST request لتسليم البريد الفعلي."
  }, 200);
}

/**
 * دالة مساعدة لإنشاء استجابة JSON مع رؤوس CORS
 */
function createJsonResponse(dataObj, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(dataObj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * دالة تعقيم HTML ضد حقن الأكواد الضارة
 */
function escapeHtml(text) {
  if (!text) return "";
  return text
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
