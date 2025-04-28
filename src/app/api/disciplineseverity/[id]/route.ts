import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

interface Params {
  params: {
    id: string;
  };
}

// Get a single disciplineseverity by ID
export async function GET(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const disciplineseverity = await prisma.disciplineSeverity.findUnique({
      where: { severity_id: id },
      include: {
        disciplines: true,
      },
    });
    if (!disciplineseverity) {
      return NextResponse.json(
        { error: "Discipline severity not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(disciplineseverity);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch discipline severity" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Put (update) a disciplineseverity by ID
export async function PUT(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    const body = await request.json();
    const updatedDisciplineSeverity = await prisma.disciplineSeverity.update({
      where: { severity_id: id },
      data: {
        name: body.name,
        description: body.description,
        point_deduction: body.point_deduction,
        disciplines: {
          connect: body.disciplines.map((disciplineId: string) => ({
            discipline_id: disciplineId,
          })),
        },
      },
      include: {
        disciplines: true,
      },
    });
    return NextResponse.json(updatedDisciplineSeverity);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update discipline severity" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a disciplineseverity by ID
export async function DELETE(request: Request, { params }: Params) {
  const prisma = new PrismaClient();
  const { id } = params;
  try {
    await prisma.disciplineSeverity.delete({
      where: { severity_id: id },
    });
    return NextResponse.json({
      message: "Discipline severity deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete discipline severity" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
