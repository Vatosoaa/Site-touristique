import prisma from "../db"
import { sendTaskReminderEmail } from "./emailService"

let intervalId: NodeJS.Timeout | null = null

/**
 * Checks for tasks due in 5 days (between now and now + 5 days)
 * that have not had reminder emails sent yet, and dispatches them.
 */
export async function checkAndSendReminders() {
  console.log("⏰ Checking for task reminders to send...")
  try {
    const now = new Date()
    const fiveDaysFromNow = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)

    // Find tasks:
    // - due date is between now and 5 days from now
    // - emailSent is false
    // - include assigned employees
    const pendingTasks = await prisma.task.findMany({
      where: {
        emailSent: false,
        date: {
          gte: now,
          lte: fiveDaysFromNow,
        },
      },
      include: {
        employees: true,
      },
    })

    if (pendingTasks.length === 0) {
      console.log("⏰ No task reminders to send at this time.")
      return
    }

    console.log(`⏰ Found ${pendingTasks.length} tasks requiring reminders.`)

    for (const task of pendingTasks) {
      if (!task.employees || task.employees.length === 0) {
        console.log(`⚠️ Task "${task.title}" (ID: ${task.id}) has no employees assigned. Skipping.`)
        // Mark as sent to prevent checking again, or keep as false?
        // Let's mark as true since no one is there to receive it.
        await prisma.task.update({
          where: { id: task.id },
          data: { emailSent: true },
        })
        continue
      }

      let allSent = true
      for (const employee of task.employees) {
        console.log(`✉️ Dispatching task alert to ${employee.name} (${employee.email}) for task "${task.title}"`)
        const success = await sendTaskReminderEmail(
          employee.email,
          employee.name,
          task.title,
          task.date,
          task.description || undefined
        )
        if (!success) {
          allSent = false
        }
      }

      // If we successfully notified the employees (or logged it), mark the task's emailSent as true
      if (allSent) {
        await prisma.task.update({
          where: { id: task.id },
          data: { emailSent: true },
        })
        console.log(`✅ Marked task "${task.title}" (ID: ${task.id}) as emailSent: true`)
      }
    }
  } catch (error) {
    console.error("❌ Error running scheduler checkAndSendReminders:", error)
  }
}

/**
 * Starts the scheduler service.
 * Runs check immediately and then every hour.
 */
export function start() {
  if (intervalId) return

  // Run immediately on server start
  checkAndSendReminders()

  // Run every 1 hour (3600000 ms)
  intervalId = setInterval(checkAndSendReminders, 60 * 60 * 1000)
  console.log("⏰ Scheduler service started. Task check interval set to 1 hour.")
}

/**
 * Stops the scheduler service.
 */
export function stop() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
    console.log("⏰ Scheduler service stopped.")
  }
}
