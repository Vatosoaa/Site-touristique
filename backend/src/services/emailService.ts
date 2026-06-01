import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"

// Create transporter from env if available
const hasGmailConfig = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD
const hasSmtpConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS

const transporter = hasGmailConfig
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  : hasSmtpConfig
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null

if (transporter) {
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ SMTP Transporter configuration error:", error)
    } else {
      console.log("✅ SMTP Server is ready to deliver messages")
    }
  })
} else {
  console.log("ℹ️ No SMTP/Gmail configuration detected. Email reminders will be written to emails.log")
}

/**
 * Sends a task reminder email to an employee.
 * Falls back to logging to emails.log if SMTP is not configured.
 */
export async function sendTaskReminderEmail(
  employeeEmail: string,
  employeeName: string,
  taskTitle: string,
  taskDate: Date,
  taskDescription?: string
): Promise<boolean> {
  const formattedDate = new Date(taskDate).toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const subject = `Rappel : Tâche "${taskTitle}" dans 5 jours`
  const textContent = `Bonjour ${employeeName},\n\nCeci est un rappel automatique pour la tâche qui vous a été assignée :\n\n- Titre : ${taskTitle}\n- Date/Heure : ${formattedDate}\n- Description : ${taskDescription || "Aucune description"}\n\nBon courage,\nL'équipe de gestion Vatosoaa`

  const htmlContent = `
    <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #4f46e5; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">Rappel de Tâche</h2>
      <p>Bonjour <strong>${employeeName}</strong>,</p>
      <p>Ceci est un rappel automatique pour la tâche qui vous a été assignée dans <strong>5 jours</strong> :</p>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #4f46e5; margin: 20px 0;">
        <p style="margin: 0 0 10px 0;"><strong>Titre :</strong> ${taskTitle}</p>
        <p style="margin: 0 0 10px 0;"><strong>Échéance :</strong> ${formattedDate}</p>
        <p style="margin: 0;"><strong>Description :</strong> ${taskDescription || "<i>Aucune description</i>"}</p>
      </div>
      <p style="font-size: 13px; color: #666; margin-top: 30px;">Bon courage,<br>L'équipe de gestion Vatosoaa</p>
    </div>
  `

  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || (process.env.GMAIL_USER ? `"Vatosoaa Agenda" <${process.env.GMAIL_USER}>` : '"Vatosoaa Agenda" <noreply@vatosoaa-tourisme.com>'),
        to: employeeEmail,
        subject: subject,
        text: textContent,
        html: htmlContent,
      })
      console.log(`✉️ Email successfully sent to ${employeeEmail} for task "${taskTitle}"`)
      return true
    } catch (error) {
      console.error(`❌ Failed to send email to ${employeeEmail}:`, error)
      // Log to file as backup
      logEmailToFile(employeeEmail, subject, textContent)
      return false
    }
  } else {
    // Local development fallback
    logEmailToFile(employeeEmail, subject, textContent)
    return true
  }
}

function logEmailToFile(email: string, subject: string, content: string) {
  const logDir = path.join(__dirname, "../../../")
  const logPath = path.join(logDir, "emails.log")
  const timestamp = new Date().toISOString()
  const logMessage = `========================================\n[${timestamp}] TO: ${email}\nSUBJECT: ${subject}\n----------------------------------------\n${content}\n========================================\n\n`

  try {
    fs.appendFileSync(logPath, logMessage, "utf-8")
    console.log(`✉️ SMTP not configured. Logged task reminder email for ${email} to emails.log`)
  } catch (err) {
    console.error("❌ Failed to write email log:", err)
  }
}
