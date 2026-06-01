import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "tourism_super_secret_jwt_key_2026"

export interface AuthenticatedRequest extends Request {
  adminId?: string
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
    req.adminId = decoded.id
    next()
  } catch (error) {
    res.status(400).json({ error: "Invalid token." })
  }
}
