import { Router, Response } from "express"
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import prisma from "../db"
import { authMiddleware, AuthenticatedRequest } from "../middleware/auth"

const router = Router()

// Admin Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" })
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { username }
    })

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const JWT_SECRET = process.env.JWT_SECRET || "tourism_super_secret_jwt_key_2026"
    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: "7d" })
    return res.json({ token, admin: { id: admin.id, username: admin.username } })
  } catch (error) {
    console.error("Login error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Get Current Admin info
router.get("/me", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.adminId }
    })

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" })
    }

    return res.json({ id: admin.id, username: admin.username })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
})

export default router
