import { Router } from "express"
import prisma from "../db"
import { authMiddleware } from "../middleware/auth"

const router = Router()

// GET all tours (Public)
router.get("/", async (req, res) => {
  try {
    const tours = await prisma.tour.findMany({
      orderBy: { id: "asc" }
    })
    res.json(tours)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tours" })
  }
})

// GET tour by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const tour = await prisma.tour.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!tour) return res.status(404).json({ error: "Tour not found" })
    res.json(tour)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tour" })
  }
})

// POST create tour (Admin)
router.post("/", authMiddleware, async (req, res) => {
  const { title, price, amenities, description, image } = req.body

  if (!title || !price || !amenities || !description || !image) {
    return res.status(400).json({ error: "All fields are required" })
  }

  try {
    const tour = await prisma.tour.create({
      data: { title, price, amenities, description, image }
    })
    res.status(201).json(tour)
  } catch (error) {
    res.status(500).json({ error: "Failed to create tour" })
  }
})

// PUT update tour (Admin)
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, price, amenities, description, image } = req.body

  try {
    const tour = await prisma.tour.update({
      where: { id: Number(req.params.id) },
      data: { title, price, amenities, description, image }
    })
    res.json(tour)
  } catch (error) {
    res.status(500).json({ error: "Failed to update tour" })
  }
})

// DELETE tour (Admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.tour.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ message: "Tour deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tour" })
  }
})

export default router
