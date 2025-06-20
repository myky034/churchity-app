/*
  Warnings:

  - You are about to drop the column `created` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `Class` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "created",
DROP COLUMN "createdBy",
DROP COLUMN "isActive",
DROP COLUMN "updated",
DROP COLUMN "updatedBy",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "isactive" BOOLEAN DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" TEXT;
