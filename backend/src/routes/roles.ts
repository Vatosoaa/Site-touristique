import { Router } from "express"
import prisma from "../db"
import { authMiddleware } from "../middleware/auth"

const router = Router()

// GET all roles (Admin)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      orderBy: { id: "asc" }
    })
    res.json(roles)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roles" })
  }
})

// GET role by ID (Admin)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const role = await prisma.role.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!role) return res.status(404).json({ error: "Role not found" })
    res.json(role)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch role" })
  }
})

// POST create role (Admin)
router.post("/", authMiddleware, async (req, res) => {
  const { name, description, permissions } = req.body

  if (!name) {
    return res.status(400).json({ error: "Role name is required" })
  }

  try {
    const role = await prisma.role.create({
      data: {
        name,
        description,
        permissions: permissions || []
      }
    })
    res.status(201).json(role)
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "A role with this name already exists" })
    }
    res.status(500).json({ error: "Failed to create role" })
  }
})

// PUT update role (Admin)
router.put("/:id", authMiddleware, async (req, res) => {
  const { name, description, permissions } = req.body

  try {
    const role = await prisma.role.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        description,
        permissions
      }
    })
    res.json(role)
  } catch (error) {
    res.status(500).json({ error: "Failed to update role" })
  }
})

// DELETE role (Admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Check if role is used by any employees
    const count = await prisma.employee.count({
      where: { roleId: Number(req.params.id) }
    })
    if (count > 0) {
      return res.status(400).json({ error: "Cannot delete role because it is assigned to employees" })
    }

    await prisma.role.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ message: "Role deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete role" })
  }
})

export default router
