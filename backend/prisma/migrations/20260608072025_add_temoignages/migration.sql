-- CreateTable
CREATE TABLE "Temoignage" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "avatar" TEXT DEFAULT '',
    "rating" INTEGER NOT NULL DEFAULT 5,
    "content" TEXT NOT NULL,
    "trip" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Temoignage_pkey" PRIMARY KEY ("id")
);
