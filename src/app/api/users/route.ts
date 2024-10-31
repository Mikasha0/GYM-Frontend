import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

const allowedGender = ["Male", "Female", "Other"];

async function createUsers(data: {
  firstname: string;
  middlename: string;
  lastname: string;
  address: string;
  designation: string;
  category: string;
  allergies: string;
  medicalCondition: string;
  email: string;
  phone: number;
  emergencyContactNumber: number;
  dateOfBirth: Date;
  joindate: Date;
  enddate: Date;
  lastattendance: string;
  height: number;
  weight: number;
  hips: number;
  chest: number;
  waist: number;
  thigh: number;
  paymentStatus: string;
  paymentMethod: string;
  gender: string;
  addOns: string;
  streak: number;
  profile: string;
}) {
  if (!allowedGender.includes(data.gender)) {
    throw new Error(
      `Invalid gender value. Allowed values are: ${allowedGender.join(", ")}`
    );
  }

  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66f3d57b0008cd6db213",
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating challenges");
    throw new Error("Failed to create challenges");
  }
}

async function fetchUsers() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66f3d57b0008cd6db213",
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
    const {
      firstname,
      middlename,
      lastname,
      address,
      designation,
      category,
      allergies,
      medicalCondition,
      email,
      phone,
      emergencyContactNumber,
      dateOfBirth,
      joindate,
      enddate,
      lastattendance,
      height,
      weight,
      hips,
      chest,
      waist,
      thigh,
      paymentStatus,
      paymentMethod,
      gender,
      addOns,
      streak,
      profile,
    } = await req.json();

    const data = {
      firstname,
      middlename,
      lastname,
      address,
      designation,
      category,
      allergies,
      medicalCondition,
      email,
      phone,
      emergencyContactNumber,
      dateOfBirth,
      joindate,
      enddate,
      lastattendance,
      height,
      weight,
      hips,
      chest,
      waist,
      thigh,
      paymentStatus,
      paymentMethod,
      gender,
      addOns,
      streak,
      profile,
    };
    const response = await createUsers(data);

    return NextResponse.json({
      message: "Challenge created",
      challenge: response,
    });
  } catch (error) {
    console.error("Error during challenge creation", error);
    return NextResponse.json(
      { error: "Failed to create Challenge" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await fetchUsers();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Challenges" },
      { status: 500 }
    );
  }
}
