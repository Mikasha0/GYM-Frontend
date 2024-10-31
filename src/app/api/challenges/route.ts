import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

const allowedGender = ["Inclusive", "Male", "Female", "Other"];

async function createChallenges(data: {
    name: string;
    description: string;
    gender:string
  }) {
    // Validate the priority against allowed values
    if (!allowedGender.includes(data.gender)) {
      throw new Error(
        `Invalid gender value. Allowed values are: ${allowedGender.join(
          ", "
        )}`
      );
    }
 
    try {
      const response = await database.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        "66c9aae9002832a35b14", 
        ID.unique(),
        data
      );
      return response;
    } catch (error) {
      console.error("Error creating challenges");
      throw new Error("Failed to create challenges");
    }
  }

async function fetchChallenge() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c9aae9002832a35b14",
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching challenge");
    throw new Error("Failed to fetch chaullenge");
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, gender} =
      await req.json();

    const data = { name, description, gender };
    const response = await createChallenges(data);

    return NextResponse.json({ message: "Challenge created", challenge: response });
  } catch (error) {
    console.error("Error during challenge creation", error);
    return NextResponse.json(
      { error: "Failed to create Challenge" },
      { status: 500 }
    );
  }
}

// API route to handle GET requests for fetching tasks
export async function GET() {
  try {
    const challenges = await fetchChallenge();
    return NextResponse.json(challenges);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Challenges" },
      { status: 500 }
    );
  }
}
