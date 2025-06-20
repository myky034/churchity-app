/*
  Warnings:

  - Made the column `classname` on table `Class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gradename` on table `Grade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `class` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role_id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "isActive" BOOLEAN DEFAULT true,
ADD COLUMN     "updated" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "classname" SET NOT NULL;

-- AlterTable
ALTER TABLE "Grade" ALTER COLUMN "gradename" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "class" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role_id" SET NOT NULL;
