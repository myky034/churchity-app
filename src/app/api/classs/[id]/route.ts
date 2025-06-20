import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

interface Params {
  params: {
    id: string;
  };
}

// Get a single class by ID
export async function GET(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const classData = await prisma.class.findUnique({
      where: { class_id: id },
      //   include: {
      //     users: true,
      //     class_type: true,
      //   },
    });
    if (!classData) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }
    return NextResponse.json(classData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch class" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Put (update) a class by ID
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const prisma = new PrismaClient();
  const id = context.params.id; // <-- Correct usage
  try {
    const body = await request.json();
    const updatedClass = await prisma.class.update({
      where: { class_id: id },
      data: {
        classname: body.classname,
        grade_id: body.grade_id,
        updated_by: body.updated_by ?? null,
        isactive: body.isActive,
      },
      include: {
        grade: true,
      },
    });
    return NextResponse.json(updatedClass);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update class" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a class by ID
export async function DELETE(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const deletedClass = await prisma.class.delete({
      where: { class_id: id },
    });
    return NextResponse.json(deletedClass);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete class" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
