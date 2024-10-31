import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function fetchadmins(id: string) {
  try {
    const admin = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66cb1261002d33f22021",
      id
    );
    return admin;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw new Error("Failed to fetch admins");
  }
}

async function deleteadmin(id: string) {
  try {
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66cb1261002d33f22021",
      id
    );
    return response;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw new Error("Failed to delete admin");
  }
}

async function updateadmin(
    id: string,
    data: {
      name: string;
      email: string;
      phone: string;
      role: string;
      profile?: string; // Optional field
    }
  ) {
    try {
      // Remove the `id` field from the data if it's present
      const { id: _, ...cleanedData } = data;
  
      const response = await database.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        "66cb1261002d33f22021",
        id,
        cleanedData // Use the cleaned data
      );
      return response;
    } catch (error) {
      console.error("Error updating admin:", error);
      throw new Error("Failed to update admin");
    }
  }
  
  async function patchadmin(
    id: string,
    data: Partial<{
      name: string;
      email: string;
      phone: string;
      role: string;
      profile?: string; 
    }>
  ) {
    try {
      // Remove the `id` field from the data if it's present
      const { id: _, ...cleanedData } = data;
  
      const response = await database.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        "66cb1261002d33f22021",
        id,
        cleanedData // Use the cleaned data
      );
      return response;
    } catch (error) {
      console.error("Error patching admin:", error);
      throw new Error("Failed to patch admin");
    }
  }
  

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const admin = await fetchadmins(id);
    return NextResponse.json({ admin });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch admins",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await deleteadmin(id);
    return NextResponse.json({ message: "admin Deleted" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete admin",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const admin = await req.json();
    await updateadmin(id, admin);
    return NextResponse.json({ message: "admin Updated" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update admin",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const partialData = await req.json();
    await patchadmin(id, partialData);
    return NextResponse.json({ message: "admin partially updated" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to partially update admin",
      },
      { status: 500 }
    );
  }
}
