import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DESTINATION_EMAIL = 'Omnwomandiabetescaffe@gmail.com';

interface ContactEmailSubmission {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// In-memory record of recent submissions for duplicate check and auditing
const emailSubmissions: ContactEmailSubmission[] = [];
const recentSubmissionFingerprints = new Map<string, number>();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Endpoint for Google Apps Script Web App email delivery
  app.post('/api/contact-email', async (req, res) => {
    try {
      // Name, email, subject, message, and hidden anti-spam honeypot
      const { fullName, name, email, subject, message, _gotcha } = req.body;

      // 1. Anti-spam check (honeypot)
      if (_gotcha && String(_gotcha).trim() !== '') {
        return res.status(400).json({
          success: false,
          error: 'تم اكتشاف محاولة إرسال غير مصرح بها (Spam).',
        });
      }

      // 2. Validate all required fields (Name, Email, Subject, Message)
      const effectiveName = (fullName || name || '').toString().trim();
      if (!effectiveName || effectiveName.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'يرجى كتابة الاسم بالكامل.',
        });
      }

      const emailTrimmed = (email || '').toString().trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
        return res.status(400).json({
          success: false,
          error: 'يرجى إدخال عنوان بريد إلكتروني صحيح.',
        });
      }

      const subjectTrimmed = (subject || 'الانضمام إلى المجتمع').toString().trim();

      const messageTrimmed = (message || '').toString().trim();
      if (!messageTrimmed || messageTrimmed.length < 5) {
        return res.status(400).json({
          success: false,
          error: 'يرجى كتابة رسالتكِ أو استفساركِ (5 أحرف على الأقل).',
        });
      }

      // 3. Prevent duplicate submissions within 45 seconds
      const fingerprint = `${emailTrimmed}:${messageTrimmed.slice(0, 40)}`;
      const now = Date.now();
      const lastSentTime = recentSubmissionFingerprints.get(fingerprint);
      if (lastSentTime && now - lastSentTime < 45000) {
        return res.status(429).json({
          success: false,
          error: 'تم استلام هذا الطلب مؤخرًا. يرجى الانتظار دقيقة واحدة لتجنب تكرار الإرسال.',
        });
      }

      // 4. Secure server-side Google Apps Script Web App URL exclusively from process.env
      const targetScriptUrl = (process.env.GOOGLE_APPS_SCRIPT_URL || '').trim();

      const submissionDate = new Intl.DateTimeFormat('ar-OM', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Asia/Muscat',
      }).format(new Date());

      const submissionId = `REQ-${Date.now().toString(36).toUpperCase()}`;

      const payload = {
        fullName: effectiveName,
        email: emailTrimmed,
        subject: subjectTrimmed,
        message: messageTrimmed,
        submissionDate,
        submissionId,
        destinationEmail: DESTINATION_EMAIL,
        _gotcha: '',
      };

      // 5. If Google Apps Script URL is configured on the server, deliver through it
      if (targetScriptUrl && targetScriptUrl.startsWith('http')) {
        try {
          const response = await fetch(targetScriptUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const gasResult = await response.json();

          if (gasResult && (gasResult.status === 'success' || gasResult.success)) {
            recentSubmissionFingerprints.set(fingerprint, now);
            emailSubmissions.unshift({
              id: submissionId,
              fullName: effectiveName,
              email: emailTrimmed,
              subject: subjectTrimmed,
              message: messageTrimmed,
              createdAt: new Date().toISOString(),
            });

            return res.status(200).json({
              success: true,
              message: `تم إرسال طلبكِ بنجاح إلى الفريق المختص عبر البريد الإلكتروني (${DESTINATION_EMAIL}).`,
              submissionId,
              timestamp: submissionDate,
            });
          } else {
            return res.status(502).json({
              success: false,
              error:
                gasResult?.message ||
                'استجاب خادم Google Apps Script بخطأ أثناء إرسال البريد. يرجى التحقق من أذونات السكريبت.',
            });
          }
        } catch (fetchErr: any) {
          return res.status(502).json({
            success: false,
            error: `تعذر الاتصال بـ Google Apps Script Web App (${fetchErr.message}). يرجى التحقق من صحة رابط النشر في إعدادات الخادم.`,
          });
        }
      }

      // If Google Apps Script Web App is not yet configured, return honest error instructions
      // CRITICAL: Never simulate successful email delivery.
      return res.status(503).json({
        success: false,
        needsConfig: true,
        error:
          `يتطلب الإرسال الفعلي ضبط متغير البيئة GOOGLE_APPS_SCRIPT_URL على الخادم (Render Dashboard > Environment). يرجى نشر سكريبت google-apps-script.js وتعيين رابطه في الخادم لإتمام الإرسال الحقيقي إلى ${DESTINATION_EMAIL}.`,
      });
    } catch (err: any) {
      console.error('Error handling contact-email request:', err);
      return res.status(500).json({
        success: false,
        error: 'حدث خطأ غير متوقع في الخادم أثناء معالجة الطلب.',
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    return res.json({
      status: 'ok',
      service: 'صحة المرأة والسكري API',
      destinationEmail: DESTINATION_EMAIL,
    });
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
