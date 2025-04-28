import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

interface Params {
  params: {
    id: string;
  };
}

// Get a single attendance record by ID
export async function GET(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const attendance = await prisma.attendance.findUnique({
      where: { attendance_id: id },
      include: {
        user: true,
        classSubject: true,
      },
    });
    if (!attendance) {
      return NextResponse.json(
        { error: "Attendance record not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(attendance);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch attendance record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Put (update) an attendance record by ID
export async function PUT(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const body = await request.json();
    const updatedAttendance = await prisma.attendance.update({
      where: { attendance_id: id },
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
    return NextResponse.json(updatedAttendance);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update attendance record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete an attendance record by ID
export async function DELETE(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const deletedAttendance = await prisma.attendance.delete({
      where: { attendance_id: id },
    });
    return NextResponse.json(deletedAttendance);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete attendance record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
