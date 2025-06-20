/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "createdBy",
DROP COLUMN "updatedBy",
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "updated_by" TEXT;
