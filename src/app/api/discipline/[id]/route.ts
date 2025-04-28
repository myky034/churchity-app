import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

interface Params {
  params: {
    id: string;
  };
}

// Get a single discipline by ID
export async function GET(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const discipline = await prisma.discipline.findUnique({
      where: { discipline_id: id },
      include: {
        user: true,
        classSubject: true,
        severity: true,
      },
    });
    if (!discipline) {
      return NextResponse.json(
        { error: "Discipline not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(discipline);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch discipline" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Put (update) a discipline by ID
export async function PUT(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const body = await request.json();
    const updatedDiscipline = await prisma.discipline.update({
      where: { discipline_id: id },
      data: {
        user_id: body.user_id,
        class_subject_id: body.class_subject_id,
        severity_id: body.severity_id,
        date: body.date ? new Date(body.date) : undefined,
        note: body.note,
      },
      include: {
        user: true,
        classSubject: true,
        severity: true,
      },
    });
    return NextResponse.json(updatedDiscipline);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update discipline" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a discipline by ID
export async function DELETE(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const deletedDiscipline = await prisma.discipline.delete({
      where: { discipline_id: id },
    });
    return NextResponse.json(deletedDiscipline);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete discipline" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
