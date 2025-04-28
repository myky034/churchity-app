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
        username: body.username,
        password: body.password,
        name: body.name,
        email: body.email,
        phone: body.phone,
        birthday: body.birthday ? new Date(body.birthday) : undefined,
        address: body.address,
        city: body.city,
        holyname: body.holyname,
        fathername: body.fathername,
        mothername: body.mothername,
        baptismplace: body.baptismplace,
        baptismdate: body.baptismdate,
        role: body.role,
        role_id: body.role_id,
        isActive: body.isActive,
        lastlogin: body.lastlogin ? new Date(body.lastlogin) : undefined,
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
