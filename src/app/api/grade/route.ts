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

    const data: {
      gradename: string;
      gradedescription: string;
      isactive: boolean;
      class?: {
        connect: { class_id: string }[];
      };
    } = {
      gradename: body.gradename,
      gradedescription: body.gradedescription,
      isactive: body.isactive,
    };

    if (Array.isArray(body.class) && body.class.length > 0) {
      data.class = {
        connect: body.class.map((classId: string) => ({ class_id: classId })),
      };
    }

    const newGrade = await prisma.grade.create({
      data,
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
