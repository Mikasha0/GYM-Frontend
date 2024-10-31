import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function createProduct(data: {
  name: string;
  price: number;
  quantity: number;
  description: string;
  status?:string;
  image: string;
}) {
  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c4a3350006489300fb", 
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating product");
    throw new Error("Failed to create product");
  }
}

async function fetchProduct() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c4a3350006489300fb", // Replace with your correct collection ID
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching products");
    throw new Error("Failed to fetch products");
  }
}

// API route to handle POST requests for creating a product
export async function POST(req: Request) {
  try {
    const { name, price, quantity, description, status, image } = await req.json();

    // Validate and create task
    const data = { name, price, quantity, description, status, image};
    const response = await createProduct(data);

    return NextResponse.json({ message: "Product created", product: response });
  } catch (error) {
    console.error("Error during Product creation", error);
    return NextResponse.json(
      { error: "Failed to create Product" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await fetchProduct();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  } 
}
