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
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  designation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  height: number;
  weight: number;
  hips: number;
  chest: number;
  waist: number;
  thigh: number;
  bloodGroup: string;
  allergies: string;
  medicalCondition: string;
  joindate: Date;
  enddate: Date;
  id: string;
  profile: string;
  category: string;
  lastattendance: string | null;
  paymentStatus: string;
  paymentMethod: string;
  addOns: string;
  streak: number;
}) {
  if (!allowedGender.includes(data.gender)) {
    throw new Error(
      `Invalid gender value. Allowed values are: ${allowedGender.join(", ")}`
    );
  }

  console.log("Creating user with data:", data);

  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66f3d57b0008cd6db213",
      ID.unique(),
      data
    );
    console.log("User created successfully:", response);
    return response;
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

/**
 * Fetch all users from the database
 */
async function fetchUsers() {
  try {
    console.log("Fetching all users...");
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66f3d57b0008cd6db213",
      [Query.orderDesc("$createdAt")]
    );
    console.log("Users fetched successfully:", response.documents);
    return response.documents;
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

/**
 * Fetch a user by custom ID
 */
async function fetchUserByCustomId(customId: string) {
  try {
    console.log(`Fetching user with custom ID: ${customId}`);
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66f3d57b0008cd6db213",
      [Query.equal("id", customId)]
    );

    if (response.documents.length === 0) {
      throw new Error("User not found");
    }

    const user = response.documents[0]; // Since `id` should be unique, take the first document
    console.log("User fetched successfully:", user);
    return user;
  } catch (error: any) {
    console.error("Error fetching user by custom ID:", error.message);
    throw new Error(`Failed to fetch user by custom ID: ${error.message}`);
  }
}

/**
 * POST handler for creating a user
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received POST request to create user:", data);

    const response = await createUser(data);

    return NextResponse.json({
      user: response,
    });
  } catch (error: any) {
    console.error("Error during user creation:", error.message);
    return NextResponse.json(
      { error: `Failed to create user: ${error.message}` },
      { status: 500 }
    );
  }
}

/**
 * GET handler for fetching users or a user by custom ID
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const customId = url.searchParams.get("id"); // This is your custom ID field

    if (customId) {
      console.log(`Received GET request to fetch user by custom ID: ${customId}`);
      const user = await fetchUserByCustomId(customId);
      return NextResponse.json({ user });
    }

    console.log("Received GET request to fetch all users");
    const users = await fetchUsers();
    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("Error during fetching users:", error.message);
    return NextResponse.json(
      { error: `Failed to fetch users: ${error.message}` },
      { status: 500 }
    );
  }
}
