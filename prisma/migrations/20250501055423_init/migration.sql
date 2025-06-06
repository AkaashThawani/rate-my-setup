-- CreateTable
CREATE TABLE "Setup" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "ratingSum" INTEGER NOT NULL,
    "ratingCount" INTEGER NOT NULL,

    CONSTRAINT "Setup_pkey" PRIMARY KEY ("id")
);
