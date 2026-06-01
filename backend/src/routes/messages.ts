import { Router } from "express"
import prisma from "../db"
import { authMiddleware } from "../middleware/auth"

const router = Router()

// GET all messages (Admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" }
    })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" })
  }
})

// POST create a message (Public)
router.post("/", async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" })
  }

  try {
    const newMessage = await prisma.message.create({
      data: { name, email, message }
    })
    res.status(201).json(newMessage)
  } catch (error) {
    res.status(500).json({ error: "Failed to submit message" })
  }
})

// DELETE a message (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.message.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ message: "Message deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" })
  }
})

export default router
