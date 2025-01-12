import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
const allowedGender = ["Male", "Female", "Other"];

/**
 * Create a new user in the database
 */
async function createUser(data: {
  firstname: string;
  middlename: string;
  lastname: string;
  address: string;
  designation: string;
  emergencyContactName: string;
  email: string;
  phone: string;
  emergencyContactNumber: string;
  dateOfBirth: Date;
  gender: string;
  id:string;
  profile:string;
}) {
  if (!allowedGender.includes(data.gender)) {
    throw new Error(
      `Invalid gender value. Allowed values are: ${allowedGender.join(", ")}`
    );
  }

  console.log("Data being sent to Appwrite:", data);

  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "67509e72001dd538c0ae",
      ID.unique(),
      data
    );
    console.log("Appwrite response:", response);
    return response;
  } catch (error: any) {
    console.error("Error creating challenges:", {
      message: error.message,
      stack: error.stack,
      details: error,
    });
    throw new Error(`Failed to create challenges: ${error.message}`);
  }
}

/**
 * Fetch users from the database
 */
async function fetchUsers() {
  try {
    console.log("Fetching users from Appwrite...");
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "67509e72001dd538c0ae",
      [Query.orderDesc("$createdAt")]
    );
    console.log("Fetched users:", response.documents);
    return response.documents;
  } catch (error: any) {
    console.error("Error fetching challenges:", {
      message: error.message,
      stack: error.stack,
      details: error,
    });
    throw new Error(`Failed to fetch challenges: ${error.message}`);
  }
}

/**
 * POST handler for creating a user
 */
export async function POST(req: Request) {
  try {
    const {
      firstname,
      middlename,
      lastname,
      address,
      designation,
      emergencyContactName,
      email,
      phone,
      emergencyContactNumber,
      dateOfBirth,
      gender,
      id,
      profile
    } = await req.json();

    const data = {
      firstname,
      middlename,
      lastname,
      address,
      designation,
      emergencyContactName,
      email,
      phone,
      emergencyContactNumber,
      dateOfBirth,
      gender,
      id,
      profile
    };

    console.log("Request received to create user:", data);

    const response = await createUser(data);

    return NextResponse.json({
      message: "User created successfully",
      user: response,
    });
  } catch (error: any) {
    console.error("Error during User creation:", {
      message: error.message,
      stack: error.stack,
      details: error,
    });
    return NextResponse.json(
      { error: `Failed to create user: ${error.message}` },
      { status: 500 }
    );
  }
}

/**
 * GET handler for fetching users
 */
export async function GET() {
  try {
    console.log("Request received to fetch users");

    const users = await fetchUsers();

    return NextResponse.json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error: any) {
    console.error("Error during fetching users:", {
      message: error.message,
      stack: error.stack,
      details: error,
    });
    return NextResponse.json(
      { error: `Failed to fetch users: ${error.message}` },
      { status: 500 }
    );
  }
}
