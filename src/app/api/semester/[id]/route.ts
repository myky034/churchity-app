import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

interface Params {
  params: {
    id: string;
  };
}

// Get a single semester by ID
export async function GET(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const semester = await prisma.semester.findUnique({
      where: { semesterid: id },
      include: {
        schoolYear: true,
        transcripts: true,
        score: true,
      },
    });
    if (!semester) {
      return NextResponse.json(
        { error: "Semester not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(semester);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch semester" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Put (update) a semester by ID
export async function PUT(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const body = await request.json();
    const updatedSemester = await prisma.semester.update({
      where: { semesterid: id },
      data: {
        semestername: body.semestername,
        year: body.year,
        note: body.note,
        yearid: body.yearid,
        schoolYear: {
          connect: { schoolyearid: body.school_year_id },
        },
      },
      include: {
        schoolYear: true,
        transcripts: true,
        score: true,
      },
    });
    return NextResponse.json(updatedSemester);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update semester" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a semester by ID
export async function DELETE(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    await prisma.semester.delete({
      where: { semesterid: id },
    });
    return NextResponse.json({ message: "Semester deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete semester" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
