import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Get all semester records
export async function GET() {
  try {
    const semesters = await prisma.semester.findMany({
      include: {
        schoolYear: true,
        transcripts: true,
        score: true,
      },
    });
    return NextResponse.json(semesters);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch semester records" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post (create) a new semester record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newSemester = await prisma.semester.create({
      data: {
        semestername: body.semestername,
        year: body.year,
        note: body.note,
        yearid: body.yearid,
        schoolYear: {
          connect: { schoolyearid: body.school_year_id },
        },
      },
      include: {
        schoolYear: true,
        transcripts: true,
        score: true,
      },
    });
    return NextResponse.json(newSemester);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create semester record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
