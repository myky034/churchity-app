import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.error("No file provided");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log(
      "Uploading file:",
      file.name,
      "Size:",
      file.size,
      "Type:",
      file.type
    );

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      year.toString(),
      month,
      day
    );

    console.log("Upload directory:", uploadDir);

    // Create directory if it doesn't exist
    fs.mkdirSync(uploadDir, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(uploadDir, file.name);

    console.log("Saving file to:", filePath);

    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/${year}/${month}/${day}/${file.name}`;
    console.log("File URL:", fileUrl);

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
