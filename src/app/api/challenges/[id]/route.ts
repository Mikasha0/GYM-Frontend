import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function fetchChallenges(id: string) {
  try {
    const challenges = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c9aae9002832a35b14",
      id
    );
    return challenges;
  } catch (error) {
    console.error("Error fetching challenges:", error);
    throw new Error("Failed to fetch challenges");
  }
}

async function deleteChallenge(id: string) {
  try {
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c9aae9002832a35b14",
      id
    );
    return response;
  } catch (error) {
    console.error("Error deleting challenge:", error);
    throw new Error("Failed to delete challenge");
  }
}

async function updateChallenge(
  id: string,
  data: {
    name: string;
    description: string;
    gender:string
  }
) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c9aae9002832a35b14",
      id,
      data
    );
    return response;
  } catch (error) {
    console.error("Error updating challenge:", error);
    throw new Error("Failed to update challenge");
  }
}

async function patchChallenge(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    gender:string
  }>
) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c9aae9002832a35b14",
      id,
      data
    );
    return response;
  } catch (error) {
    console.error("Error patching challenge:", error);
    throw new Error("Failed to patch challenge");
  }
}


export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const product = await fetchChallenges(id);
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch challenges",
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
    await deleteChallenge(id);
    return NextResponse.json({ message: "Challenge Deleted" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete challenge",
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
    console.log(id)
    const challenge = await req.json();
    await updateChallenge(id, challenge);
    return NextResponse.json({ message: "Challenge Updated" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update challenge",
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
    await patchChallenge(id, partialData);
    return NextResponse.json({ message: "Challenge partially updated" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to partially update challenge",
      },
      { status: 500 }
    );
  }
}
