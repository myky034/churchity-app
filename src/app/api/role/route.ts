import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Get all roles
export async function GET() {
  try {
    const roles = await prisma.role.findMany();
    return NextResponse.json(roles);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch roles" },
      { status: 500 }
    );
  }
}

// Create a new role
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newRole = await prisma.role.create({
      data: {
        rolename: body.name,
        roledescription: body.description,
        isactive: body.isactive,
      },
    });
    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create role" },
      { status: 500 }
    );
  }
}
