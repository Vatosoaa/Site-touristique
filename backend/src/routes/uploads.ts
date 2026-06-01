import { Router } from "express"
import path from "path"
import { mkdir, writeFile } from "fs/promises"
import { authMiddleware } from "../middleware/auth"

const router = Router()

const allowedMimeTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
}

router.post("/service-image", authMiddleware, async (req, res) => {
  const { fileName, dataUrl } = req.body

  if (!dataUrl || typeof dataUrl !== "string") {
    return res.status(400).json({ error: "Image file is required" })
  }

  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/)
  if (!match) {
    return res.status(400).json({ error: "Invalid image data" })
  }

  const [, mimeType, base64Data] = match
  const extension = allowedMimeTypes[mimeType]
  if (!extension) {
    return res.status(400).json({ error: "Unsupported image format" })
  }

  try {
    const uploadDir = path.resolve(__dirname, "../../uploads/services")
    await mkdir(uploadDir, { recursive: true })

    const safeName = String(fileName || "service")
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60) || "service"
    const storedFileName = `${Date.now()}-${safeName}.${extension}`

    await writeFile(path.join(uploadDir, storedFileName), Buffer.from(base64Data, "base64"))

    const imagePath = `/uploads/services/${storedFileName}`
    const imageUrl = `${req.protocol}://${req.get("host")}${imagePath}`

    res.status(201).json({ image: imageUrl })
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" })
  }
})

export default router
