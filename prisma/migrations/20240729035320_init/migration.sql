/*
  Warnings:

  - You are about to drop the column `ip` on the `Ad` table. All the data in the column will be lost.
  - Added the required column `videoSource` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "ip",
ADD COLUMN     "videoSource" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Upload" (
    "id" TEXT,
    "ip" TEXT NOT NULL,
    "tries" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Upload_ip_key" ON "Upload"("ip");
