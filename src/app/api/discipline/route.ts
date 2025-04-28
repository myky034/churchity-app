import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Get all disciplines
export async function GET() {
  try {
    const disciplines = await prisma.discipline.findMany({
      include: {
        classSubject: true,
        user: true,
        severity: true,
      },
    });
    return NextResponse.json(disciplines);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch disciplines" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post (create) a new discipline
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newDiscipline = await prisma.discipline.create({
      data: {
        date: body.date,
        user: {
          connect: { id: body.user_id },
        },
        classSubject: {
          connect: { class_subject_id: body.class_subject_id },
        },
        severity: {
          connect: { severity_id: body.discipline_severity_id },
        },
        // nếu bạn còn các field khác như description, notes... có thể thêm ở đây
      },
      include: {
        classSubject: true,
        user: true,
        severity: true,
      },
    });
    return NextResponse.json(newDiscipline);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create discipline" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
