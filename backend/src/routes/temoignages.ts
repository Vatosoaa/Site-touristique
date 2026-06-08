import { Router } from "express"
import prisma from "../db"
import { authMiddleware } from "../middleware/auth"

const router = Router()

// GET all testimonials (Public)
router.get("/", async (req, res) => {
  try {
    const testimonials = await (prisma as any).temoignage.findMany({
      orderBy: { id: "asc" }
    })
    res.json(testimonials)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch testimonials" })
  }
})

// GET testimonial by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const testimonial = await (prisma as any).temoignage.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!testimonial) return res.status(404).json({ error: "Testimonial not found" })
    res.json(testimonial)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch testimonial" })
  }
})

// POST create testimonial (Admin)
router.post("/", authMiddleware, async (req, res) => {
  const { author, content, rating, avatar, trip } = req.body

  if (!author || !content) {
    return res.status(400).json({ error: "Author and content are required" })
  }

  try {
    const testimonial = await (prisma as any).temoignage.create({
      data: {
        author,
        content,
        rating: rating !== undefined ? Number(rating) : 5,
        avatar: avatar || "",
        trip: trip || ""
      }
    })
    res.status(201).json(testimonial)
  } catch (error) {
    res.status(500).json({ error: "Failed to create testimonial" })
  }
})

// PUT update testimonial (Admin)
router.put("/:id", authMiddleware, async (req, res) => {
  const { author, content, rating, avatar, trip } = req.body

  if (!author || !content) {
    return res.status(400).json({ error: "Author and content are required" })
  }

  try {
    const testimonial = await (prisma as any).temoignage.update({
      where: { id: Number(req.params.id) },
      data: {
        author,
        content,
        rating: rating !== undefined ? Number(rating) : 5,
        avatar: avatar || "",
        trip: trip || ""
      }
    })
    res.json(testimonial)
  } catch (error) {
    res.status(500).json({ error: "Failed to update testimonial" })
  }
})

// DELETE testimonial (Admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await (prisma as any).temoignage.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ message: "Testimonial deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete testimonial" })
  }
})

export default router
