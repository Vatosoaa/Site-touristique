import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

// Load env vars
dotenv.config({ path: path.resolve(__dirname, "../.env") })

import authRoutes from "./routes/auth"
import tourRoutes from "./routes/tours"
import packageRoutes from "./routes/packages"
import blogRoutes from "./routes/blog"
import messageRoutes from "./routes/messages"
import employeeRoutes from "./routes/employees"
import roleRoutes from "./routes/roles"
import taskRoutes from "./routes/tasks"
import serviceRoutes from "./routes/services"
import uploadRoutes from "./routes/uploads"
import temoignageRoutes from "./routes/temoignages"
import * as schedulerService from "./services/schedulerService"

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors({
  origin: "*", // Adjust in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json({ limit: "15mb" }))
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")))

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date() })
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/tours", tourRoutes)
app.use("/api/packages", packageRoutes)
app.use("/api/blog", blogRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/employees", employeeRoutes)
app.use("/api/roles", roleRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/uploads", uploadRoutes)
app.use("/api/temoignages", temoignageRoutes)


// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  // Start email alert checking scheduler
  schedulerService.start()
})
