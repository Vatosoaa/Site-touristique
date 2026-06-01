import { Router } from "express"
import prisma from "../db"
import { authMiddleware } from "../middleware/auth"

const router = Router()

// GET all services (Public)
router.get("/", async (req, res) => {
  try {
    const services = await (prisma as any).service.findMany({
      orderBy: { id: "asc" }
    })
    res.json(services)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" })
  }
})

// GET service by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const service = await (prisma as any).service.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!service) return res.status(404).json({ error: "Service not found" })
    res.json(service)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch service" })
  }
})

// POST create service (Admin)
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, location, distance, price, rating, image } = req.body

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" })
  }

  try {
    const service = await (prisma as any).service.create({
      data: {
        title,
        description,
        location: location || "",
        distance: distance || "",
        price: price || "",
        rating: Number(rating) || 5,
        image: image || ""
      }
    })
    res.status(201).json(service)
  } catch (error) {
    res.status(500).json({ error: "Failed to create service" })
  }
})

// PUT update service (Admin)
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, description, location, distance, price, rating, image } = req.body

  try {
    const service = await (prisma as any).service.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        description,
        location: location || "",
        distance: distance || "",
        price: price || "",
        rating: Number(rating) || 5,
        image: image || ""
      }
    })
    res.json(service)
  } catch (error) {
    res.status(500).json({ error: "Failed to update service" })
  }
})

// DELETE service (Admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await (prisma as any).service.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ message: "Service deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete service" })
  }
})

export default router
