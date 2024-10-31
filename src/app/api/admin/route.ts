import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

const allowedRoles = ["Admin", "Receptionist", "Trainer"];

async function createAdmin(data: {
  name: string;
  email: string;
  phone: string;
  role: string;
  profile?:string;
}) {
  // Validate the priority against allowed values
  if (!allowedRoles.includes(data.role)) {
    throw new Error(
      `Invalid role value. Allowed values are: ${allowedRoles.join(
        ", "
      )}`
    );
  }

  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66cb1261002d33f22021", 
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating admin");
    throw new Error("Failed to create admin");
  }
}

async function fetchAdmin() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66cb1261002d33f22021", // Replace with your correct collection ID
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching admin");
    throw new Error("Failed to fetch admin");
  }
}

// API route to handle POST requests for creating a product
export async function POST(req: Request) {
  try {
    const { name, email, phone, role , profile} = await req.json();

    // Validate and create task
    const data = { name, email, phone, role, profile};
    const response = await createAdmin(data);

    return NextResponse.json({ message: "Admin created", admin: response });
  } catch (error) {
    console.error("Error during admin creation", error);
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const admin = await fetchAdmin();
    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch admin" },
      { status: 500 }
    );
  } 
}
