import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

interface Params {
  params: {
    id: string;
  };
}

// Get a single school year by ID
export async function GET(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const schoolYear = await prisma.schoolYear.findUnique({
      where: { schoolyearid: id },
      include: {
        semesters: true,
      },
    });
    if (!schoolYear) {
      return NextResponse.json(
        { error: "School year not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(schoolYear);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch school year" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Put (update) a school year by ID
export async function PUT(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const body = await request.json();
    const updatedSchoolYear = await prisma.schoolYear.update({
      where: { schoolyearid: id },
      data: {
        yearname: body.yearname,
        startdate: body.startdate,
        enddate: body.enddate,
        semesters: {
          connect: body.semesters.map((semesterId: string) => ({
            semester_id: semesterId,
          })),
        },
      },
      include: {
        semesters: true,
      },
    });
    return NextResponse.json(updatedSchoolYear);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update school year" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a school year by ID
export async function DELETE(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    await prisma.schoolYear.delete({
      where: { schoolyearid: id },
    });
    return NextResponse.json({ message: "School year deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete school year" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
