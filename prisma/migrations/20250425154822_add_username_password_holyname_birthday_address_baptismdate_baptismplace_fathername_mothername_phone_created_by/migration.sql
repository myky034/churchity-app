/*
  Warnings:

  - Added the required column `address` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baptismdate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baptismplace` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fathername` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `holyname` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mothername` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "baptismdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "baptismplace" TEXT NOT NULL,
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "fathername" TEXT NOT NULL,
ADD COLUMN     "holyname" TEXT NOT NULL,
ADD COLUMN     "mothername" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
