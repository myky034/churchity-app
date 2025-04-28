import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Get all school year records
export async function GET() {
  try {
    const schoolYears = await prisma.schoolYear.findMany({
      include: {
        semesters: true,
      },
    });
    return NextResponse.json(schoolYears);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch school year records" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post (create) a new school year record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newSchoolYear = await prisma.schoolYear.create({
      data: {
        yearname: body.yearname,
        startdate: body.startdate,
        enddate: body.enddate,
        semesters: {
          connect: body.semesters.map((semesterId: string) => ({
            semester_id: semesterId,
          })),
        },
      },
      include: {
        semesters: true,
      },
    });
    return NextResponse.json(newSchoolYear);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create school year record" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
