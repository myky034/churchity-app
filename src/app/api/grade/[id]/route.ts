import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

interface Params {
  params: {
    id: string;
  };
}

// Get a single grade by ID
export async function GET(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const gradeData = await prisma.grade.findUnique({
      where: { grade_id: id },
      include: {
        class: true,
      },
    });
    if (!gradeData) {
      return NextResponse.json({ error: "Grade not found" }, { status: 404 });
    }
    return NextResponse.json(gradeData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch grade" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Put (update) a grade by ID
export async function PUT(request: Request, context: { params: { id: string } }) {
  const prisma = new PrismaClient();
  const { id } = context.params;
  try {
    const body = await request.json();
    const updatedGrade = await prisma.grade.update({
      where: { grade_id: id },
      data: {
        gradename: body.gradename,
        gradedescription: body.gradedescription,
        isactive: body.isactive,
        class: {
          connect: Array.isArray(body.class)
            ? body.class.map((classId: string) => ({ class_id: classId }))
            : [],
        },
      },
    });
    return NextResponse.json(updatedGrade);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update grade" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a grade by ID
export async function DELETE(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const deletedGrade = await prisma.grade.delete({
      where: { grade_id: id },
    });
    return NextResponse.json(deletedGrade);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete grade" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
