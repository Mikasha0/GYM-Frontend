import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function fetchUserDetailsById(id: string) {
  try {
    const userDetails = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c1a12a0020fd7a9a49",
      id
    );
    console.log("User Details Fetched Successfully");
    return userDetails;
  } catch {
    
  }
}
