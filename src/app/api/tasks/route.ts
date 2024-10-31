import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// Enum values as defined in Appwrite
const allowedPriorities = ["High", "Medium", "Low"];

async function createTask(data: {
  taskName: string;
  taskDescription: string;
  priority: string;
  status?: string;
}) {
  // Validate the priority against allowed values
  if (!allowedPriorities.includes(data.priority)) {
    throw new Error(
      `Invalid priority value. Allowed values are: ${allowedPriorities.join(
        ", "
      )}`
    );
  }
  const taskData = {
    ...data,
    status: data.status || "incomplete",
  };
  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c1a12a0020fd7a9a49", 
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating tasks");
    throw new Error("Failed to create tasks");
  }
}

async function fetchTasks() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c1a12a0020fd7a9a49",
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching tasks");
    throw new Error("Failed to fetch tasks");
  }
}

export async function POST(req: Request) {
  try {
    const { taskName, taskDescription, priority, status } = await req.json();

    // Validate and create task
    const data = { taskName, taskDescription, priority, status };
    const response = await createTask(data);

    return NextResponse.json({ message: "Task created", task: response });
  } catch (error) {
    console.error("Error during task creation");
    return NextResponse.json(
      { error: "Failed to create Task" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const tasks = await fetchTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
