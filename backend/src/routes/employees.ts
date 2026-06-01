import { Router } from "express"
import prisma from "../db"
import { authMiddleware } from "../middleware/auth"

const router = Router()

// GET all employees with their roles (Admin)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        role: true
      },
      orderBy: { id: "asc" }
    })
    res.json(employees)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees" })
  }
})

// GET employee by ID (Admin)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        role: true
      }
    })
    if (!employee) return res.status(404).json({ error: "Employee not found" })
    res.json(employee)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee" })
  }
})

// POST create employee (Admin)
router.post("/", authMiddleware, async (req, res) => {
  const { name, email, phone, bio, status, color, roleId } = req.body

  if (!name || !email || !roleId) {
    return res.status(400).json({ error: "Name, email, and role are required" })
  }

  try {
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        phone,
        bio,
        status: status || "Actif",
        color: color || "bg-indigo-500",
        roleId: Number(roleId)
      },
      include: {
        role: true
      }
    })
    res.status(201).json(employee)
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "An employee with this email already exists" })
    }
    res.status(500).json({ error: "Failed to create employee" })
  }
})

// PUT update employee (Admin)
router.put("/:id", authMiddleware, async (req, res) => {
  const { name, email, phone, bio, status, color, roleId } = req.body

  try {
    const employee = await prisma.employee.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        email,
        phone,
        bio,
        status,
        color,
        roleId: roleId ? Number(roleId) : undefined
      },
      include: {
        role: true
      }
    })
    res.json(employee)
  } catch (error) {
    res.status(500).json({ error: "Failed to update employee" })
  }
})

// DELETE employee (Admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.employee.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ message: "Employee deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete employee" })
  }
})

export default router
