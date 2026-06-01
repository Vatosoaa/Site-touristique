import { Router } from "express"
import prisma from "../db"
import { authMiddleware } from "../middleware/auth"
import { checkAndSendReminders } from "../services/schedulerService"

const router = Router()

// GET all tasks (with assigned employees)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        employees: {
          select: {
            id: true,
            name: true,
            email: true,
            color: true,
          },
        },
      },
      orderBy: { date: "asc" },
    })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
})

// GET task by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        employees: {
          select: {
            id: true,
            name: true,
            email: true,
            color: true,
          },
        },
      },
    })
    if (!task) return res.status(404).json({ error: "Task not found" })
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" })
  }
})

// POST create task
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, date, status, priority, color, employeeIds } = req.body

  if (!title || !date) {
    return res.status(400).json({ error: "Title and date are required" })
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        date: new Date(date),
        status: status || "À faire",
        priority: priority || "Moyenne",
        color: color || "bg-violet-500",
        employees: employeeIds && Array.isArray(employeeIds)
          ? {
              connect: employeeIds.map((id: number) => ({ id: Number(id) })),
            }
          : undefined,
      },
      include: {
        employees: {
          select: {
            id: true,
            name: true,
            email: true,
            color: true,
          },
        },
      },
    })

    // Trigger an immediate check in case the new task is due in under 5 days
    checkAndSendReminders()

    res.status(201).json(task)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to create task" })
  }
})

// PUT update task
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, description, date, status, priority, color, employeeIds } = req.body
  const taskId = Number(req.params.id)

  try {
    // Check if task exists and get current date to see if date changed
    const currentTask = await prisma.task.findUnique({
      where: { id: taskId },
    })

    if (!currentTask) {
      return res.status(404).json({ error: "Task not found" })
    }

    // Determine if date changed. If so, reset emailSent to re-trigger reminder email if applicable
    let shouldResetEmailSent = false
    if (date) {
      const newDate = new Date(date)
      if (newDate.getTime() !== new Date(currentTask.date).getTime()) {
        shouldResetEmailSent = true
      }
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        date: date ? new Date(date) : undefined,
        status,
        priority,
        color,
        emailSent: shouldResetEmailSent ? false : undefined,
        employees: employeeIds && Array.isArray(employeeIds)
          ? {
              set: employeeIds.map((id: number) => ({ id: Number(id) })),
            }
          : undefined,
      },
      include: {
        employees: {
          select: {
            id: true,
            name: true,
            email: true,
            color: true,
          },
        },
      },
    })

    // If date changed and we reset emailSent, run checks
    if (shouldResetEmailSent) {
      checkAndSendReminders()
    }

    res.json(task)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to update task" })
  }
})

// DELETE task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: Number(req.params.id) },
    })
    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" })
  }
})

export default router
