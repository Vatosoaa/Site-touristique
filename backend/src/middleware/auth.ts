import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import * as fs from "fs"
import * as path from "path"

export interface AuthenticatedRequest extends Request {
  adminId?: string
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." })
  }

  const token = authHeader.split(" ")[1]
  const JWT_SECRET = process.env.JWT_SECRET || "tourism_super_secret_jwt_key_2026"

  let decoded: any
  try {
    decoded = jwt.verify(token, JWT_SECRET) as { id: string }
  } catch (error: any) {
    const logPath = path.resolve(__dirname, "../../auth_error.log")
    const logMessage = `[${new Date().toISOString()}] JWT Error: ${error?.message || error}\nToken: ${token}\nSecret: ${JWT_SECRET}\nStack: ${error?.stack}\n\n`
    fs.appendFileSync(logPath, logMessage)
    console.error("JWT Verification Error:", error)
    return res.status(400).json({ error: "Invalid token." })
  }

  req.adminId = decoded.id
  next()
}
