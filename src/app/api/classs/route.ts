import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Get all classes
export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: { grade: true },
    });
    return NextResponse.json(classes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post (create) a new class
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newClass = await prisma.class.create({
      data: {
        classname: body.classname,
        grade_id: body.grade_id,
        created_by: body.created_by ?? null,
        updated_by: body.updated_by ?? null,
        isactive: body.isactive,
        // Add other fields as needed
      },
      include: {
        grade: true, // Include related grade data if needed
      },
    });
    return NextResponse.json(newClass);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create class" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
//
