/*
  Warnings:

  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `Score` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - The required column `roleid` was added to the `Role` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `score_id` was added to the `Score` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `score_type_id` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester_id` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_id` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeOfScore" AS ENUM ('oral', 'fifteenmintest', 'minitest', 'final');

-- CreateEnum
CREATE TYPE "Conduct" AS ENUM ('Excellent', 'Good', 'Average', 'Poor', 'Bad');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('present', 'absent', 'late', 'leave');

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_usersId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_id_fkey";

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
DROP COLUMN "description",
DROP COLUMN "id",
ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "roledescription" TEXT,
ADD COLUMN     "roleid" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "rolename" DROP NOT NULL,
ALTER COLUMN "isactive" DROP NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("roleid");

-- AlterTable
ALTER TABLE "Score" DROP CONSTRAINT "Score_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "subject",
DROP COLUMN "usersId",
ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "note" TEXT,
ADD COLUMN     "score_id" TEXT NOT NULL,
ADD COLUMN     "score_type_id" TEXT NOT NULL,
ADD COLUMN     "semester_id" TEXT NOT NULL,
ADD COLUMN     "subject_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "score" DROP NOT NULL,
ADD CONSTRAINT "Score_pkey" PRIMARY KEY ("score_id");

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "name" TEXT,
    "email" TEXT,
    "phone" INTEGER,
    "birthday" TIMESTAMP(3),
    "address" TEXT,
    "class" TEXT,
    "city" TEXT,
    "holyname" TEXT,
    "fathername" TEXT,
    "mothername" TEXT,
    "baptismplace" TEXT,
    "baptismdate" TEXT,
    "role" TEXT,
    "role_id" TEXT,
    "isActive" BOOLEAN,
    "lastlogin" TIMESTAMP(3),
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreType" (
    "score_type_id" TEXT NOT NULL,
    "type" "TypeOfScore" NOT NULL,
    "weight" DOUBLE PRECISION,

    CONSTRAINT "ScoreType_pkey" PRIMARY KEY ("score_type_id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "subject_id" TEXT NOT NULL,
    "subjectname" TEXT,
    "code" TEXT,
    "description" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "Class" (
    "class_id" TEXT NOT NULL,
    "classname" TEXT,
    "grade_id" TEXT NOT NULL,
    "school_year" TEXT,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("class_id")
);

-- CreateTable
CREATE TABLE "ClassSubject" (
    "class_subject_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,

    CONSTRAINT "ClassSubject_pkey" PRIMARY KEY ("class_subject_id")
);

-- CreateTable
CREATE TABLE "Classuser" (
    "class_user_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Classuser_pkey" PRIMARY KEY ("class_user_id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendance_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "class_subject_id" TEXT NOT NULL,
    "attendancedate" TIMESTAMP(3),
    "status" "AttendanceStatus" NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "semesterid" TEXT NOT NULL,
    "semestername" TEXT,
    "year" INTEGER,
    "yearid" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("semesterid")
);

-- CreateTable
CREATE TABLE "SchoolYear" (
    "schoolyearid" TEXT NOT NULL,
    "yearname" TEXT,
    "startdate" TIMESTAMP(3),
    "enddate" TIMESTAMP(3),

    CONSTRAINT "SchoolYear_pkey" PRIMARY KEY ("schoolyearid")
);

-- CreateTable
CREATE TABLE "Transcript" (
    "transcript_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "semester_id" TEXT NOT NULL,
    "gpa" DOUBLE PRECISION,
    "conduct" "Conduct" NOT NULL,
    "attendance_score" DOUBLE PRECISION,
    "discipline_score" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("transcript_id")
);

-- CreateTable
CREATE TABLE "Discipline" (
    "discipline_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "severity_id" TEXT NOT NULL,
    "class_subject_id" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "note" TEXT,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("discipline_id")
);

-- CreateTable
CREATE TABLE "DisciplineSeverity" (
    "severity_id" TEXT NOT NULL,
    "name" TEXT,
    "point_deduction" DOUBLE PRECISION,
    "description" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DisciplineSeverity_pkey" PRIMARY KEY ("severity_id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "userroleid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "roleid" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userroleid")
);

-- CreateTable
CREATE TABLE "Grade" (
    "grade_id" TEXT NOT NULL,
    "gradename" TEXT,
    "gradedescription" TEXT,
    "isactive" BOOLEAN,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("grade_id")
);

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester"("semesterid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_score_type_id_fkey" FOREIGN KEY ("score_type_id") REFERENCES "ScoreType"("score_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "Grade"("grade_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSubject" ADD CONSTRAINT "ClassSubject_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSubject" ADD CONSTRAINT "ClassSubject_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classuser" ADD CONSTRAINT "Classuser_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classuser" ADD CONSTRAINT "Classuser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_class_subject_id_fkey" FOREIGN KEY ("class_subject_id") REFERENCES "ClassSubject"("class_subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semester" ADD CONSTRAINT "Semester_yearid_fkey" FOREIGN KEY ("yearid") REFERENCES "SchoolYear"("schoolyearid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester"("semesterid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_severity_id_fkey" FOREIGN KEY ("severity_id") REFERENCES "DisciplineSeverity"("severity_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_class_subject_id_fkey" FOREIGN KEY ("class_subject_id") REFERENCES "ClassSubject"("class_subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "Role"("roleid") ON DELETE RESTRICT ON UPDATE CASCADE;
