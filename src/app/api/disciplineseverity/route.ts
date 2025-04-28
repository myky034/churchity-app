import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Get all discipline severity records
export async function GET() {
  try {
    const disciplineSeverity = await prisma.disciplineSeverity.findMany({
      include: {
        disciplines: true,
      },
    });
    return NextResponse.json(disciplineSeverity);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch discipline severity records" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post (create) a new discipline severity record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newDisciplineSeverity = await prisma.disciplineSeverity.create({
      data: {
        name: body.name,
        point_deduction: body.point_deduction,
        description: body.description,
      },
      include: {
        disciplines: true,
      },
    });
    return NextResponse.json(newDisciplineSeverity);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create discipline severity record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
