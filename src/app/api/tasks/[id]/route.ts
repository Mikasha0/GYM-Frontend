import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function fetchTask(id: string) {
  try {
    const task = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c1a12a0020fd7a9a49",
      id // Replace with your correct collection ID
    );
    return task;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
}

//Delete a specific interpretation
async function deleteTask(id: string) {
  try {
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c1a12a0020fd7a9a49",
      id
    );
    return response;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
}

async function updateTask(
  id: string,
  data: {
    taskName: string;
    taskDescription: string;
    priority: string;
    status?: string;
  }
) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c1a12a0020fd7a9a49",
      id,
      data
    );
    return response;
  } catch (error) {
    console.error("Error update task:", error);
    throw new Error("Failed to update task");
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const task = await fetchTask(id);
    return NextResponse.json({ task });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch tasks",
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
     await deleteTask(id);
      return NextResponse.json({ message:"Task Deleted" });
    } catch (error) {
      return NextResponse.json(
        {
          error: "Failed to delete task",
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
      const task = await req.json();
      await updateTask(id, task);
      return NextResponse.json({ message:"Task Updated" });
    } catch (error) {
      return NextResponse.json(
        {
          error: "Failed to update task",
        },
        { status: 500 }
      );
    }
  }