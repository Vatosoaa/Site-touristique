import { Router } from "express"
import prisma from "../db"
import { authMiddleware } from "../middleware/auth"

const router = Router()

// GET all packages (Public)
router.get("/", async (req, res) => {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { id: "asc" }
    })
    res.json(packages)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch packages" })
  }
})

// GET package by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const pkg = await prisma.package.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!pkg) return res.status(404).json({ error: "Package not found" })
    res.json(pkg)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch package" })
  }
})

// POST create package (Admin)
router.post("/", authMiddleware, async (req, res) => {
  const { title, region, price, description, image } = req.body

  if (!title || !region || !price || !description || !image) {
    return res.status(400).json({ error: "All fields are required" })
  }

  try {
    const pkg = await prisma.package.create({
      data: { title, region, price, description, image }
    })
    res.status(201).json(pkg)
  } catch (error) {
    res.status(500).json({ error: "Failed to create package" })
  }
})

// PUT update package (Admin)
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, region, price, description, image } = req.body

  try {
    const pkg = await prisma.package.update({
      where: { id: Number(req.params.id) },
      data: { title, region, price, description, image }
    })
    res.json(pkg)
  } catch (error) {
    res.status(500).json({ error: "Failed to update package" })
  }
})

// DELETE package (Admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.package.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ message: "Package deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete package" })
  }
})

export default router
