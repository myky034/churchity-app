import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
//import { prisma } from '../../lib/prisma';

const prisma = new PrismaClient();

// Get all users
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// POST a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone:
          body.phone !== undefined && body.phone !== null
            ? String(body.phone)
            : undefined,
        birthday: body.birthday ? new Date(body.birthday) : null,
        address: body.address,
        class: body.class,
        grade: body.grade,
        holyname: body.holyname,
        fathername: body.fathername,
        fatherphone:
          body.fatherphone !== undefined && body.fatherphone !== null
            ? String(body.fatherphone)
            : undefined,
        mothername: body.mothername,
        motherphone:
          body.motherphone !== undefined && body.motherphone !== null
            ? String(body.motherphone)
            : undefined,
        baptismplace: body.baptismplace,
        baptismdate: body.baptismdate ? new Date(body.baptismdate) : null,
        role: body.role,
        role_id: body.role_id,
        title: body.title,
        isActive: body.isActive ?? true,
        lastlogin: body.lastlogin ? new Date(body.lastlogin) : null,
        created_by: body.created_by,
        updated_by: body.updated_by,
        firstCommunionDate: body.firstCommunionDate
          ? new Date(body.firstCommunionDate)
          : null,
        firstCommunionPlace: body.firstCommunionPlace,
        confirmationDate: body.confirmationDate
          ? new Date(body.confirmationDate)
          : null,
        confirmationPlace: body.confirmationPlace,
        professionOfFaithDate: body.professionOfFaithDate
          ? new Date(body.professionOfFaithDate)
          : null,
        professionOfFaithPlace: body.professionOfFaithPlace,
        catechistLevel: body.catechistLevel,
        avatar: body.avatar,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
