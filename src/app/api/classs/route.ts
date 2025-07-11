import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Get all classes
export async function GET() {
  try {
    const classes = await prisma.class
      .findMany
      //     {
      //   include: {
      //     users: true,
      //     class_type: true,
      //   },
      // }
      ();
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
        classname: body.class_name,
        school_year: body.school_year,
        grade_id: body.grade_id,
        // class_type_id: body.class_type_id,
        // users: {
        //   connect: body.users.map((userId: string) => ({ id: userId })),
        // },
      },
      //   include: {
      //     users: true,
      //     class_type: true,
      //   },
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
