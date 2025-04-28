import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Get all grade records
export async function GET() {
  try {
    const grades = await prisma.grade.findMany({
      include: {
        class: true,
      },
    });
    return NextResponse.json(grades);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch grade records" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post (create) a new grade record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newGrade = await prisma.grade.create({
      data: {
        gradename: body.gradename,
        gradedescription: body.gradedescription,
        isactive: body.isactive,
        class: {
          connect: body.class.map((classId: string) => ({ class_id: classId })),
        },
      },
      include: {
        class: true,
      },
    });
    return NextResponse.json(newGrade);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create grade record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
