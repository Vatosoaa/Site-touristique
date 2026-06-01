import { Router } from "express"
import prisma from "../db"
import { authMiddleware } from "../middleware/auth"

const router = Router()

// GET all blog posts (Public)
router.get("/", async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { id: "desc" }
    })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog posts" })
  }
})

// GET blog post by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!post) return res.status(404).json({ error: "Blog post not found" })
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog post" })
  }
})

// POST create blog post (Admin)
router.post("/", authMiddleware, async (req, res) => {
  const { title, excerpt, date, categories, contentParagraphs, contentImages, tags, authorQuote, image } = req.body

  if (!title || !excerpt || !date || !categories || !contentParagraphs || !image) {
    return res.status(400).json({ error: "Title, excerpt, date, categories, content paragraphs, and main image are required" })
  }

  try {
    const post = await prisma.blogPost.create({
      data: {
        title,
        excerpt,
        date,
        categories: Array.isArray(categories) ? categories : [categories],
        contentParagraphs: Array.isArray(contentParagraphs) ? contentParagraphs : [contentParagraphs],
        contentImages: Array.isArray(contentImages) ? contentImages : [],
        tags: Array.isArray(tags) ? tags : [],
        authorQuote,
        image
      }
    })
    res.status(201).json(post)
  } catch (error) {
    console.error("Failed to create post:", error)
    res.status(500).json({ error: "Failed to create blog post" })
  }
})

// PUT update blog post (Admin)
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, excerpt, date, categories, contentParagraphs, contentImages, tags, authorQuote, image } = req.body

  try {
    const post = await prisma.blogPost.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        excerpt,
        date,
        categories: Array.isArray(categories) ? categories : undefined,
        contentParagraphs: Array.isArray(contentParagraphs) ? contentParagraphs : undefined,
        contentImages: Array.isArray(contentImages) ? contentImages : undefined,
        tags: Array.isArray(tags) ? tags : undefined,
        authorQuote,
        image
      }
    })
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog post" })
  }
})

// DELETE blog post (Admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.blogPost.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog post" })
  }
})

export default router
