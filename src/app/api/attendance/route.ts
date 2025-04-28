import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Get all attendance records
export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        user: true,
        classSubject: true,
      },
    });
    return NextResponse.json(attendance);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch attendance records" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post (create) a new attendance record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newAttendance = await prisma.attendance.create({
      data: {
        user_id: body.user_id,
        class_subject_id: body.class_subject_id,
        attendancedate: body.attendancedate
          ? new Date(body.attendancedate)
          : undefined,
        status: body.status,
      },
      include: {
        user: true,
        classSubject: true,
      },
    });
    return NextResponse.json(newAttendance);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create attendance record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
