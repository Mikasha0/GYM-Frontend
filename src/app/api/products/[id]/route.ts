import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function fetchProducts(id: string) {
  try {
    const product = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c4a3350006489300fb",
      id
    );
    return product;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

async function deleteProduct(id: string) {
  try {
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c4a3350006489300fb",
      id
    );
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}

async function updateProduct(
  id: string,
  data: {
    name: string;
    price: number;
    quantity: number;
    description: string;
    status?: string;
    image?: string;
  }
) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c4a3350006489300fb",
      id,
      data
    );
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
}

async function patchProduct(
  id: string,
  data: Partial<{
    name: string;
    price: number;
    quantity: number;
    description: string;
    status?: string;
    image?: string;
  }>
) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66c4a3350006489300fb",
      id,
      data
    );
    return response;
  } catch (error) {
    console.error("Error patching product:", error);
    throw new Error("Failed to patch product");
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const product = await fetchProducts(id);
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch products",
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
    await deleteProduct(id);
    return NextResponse.json({ message: "Product Deleted" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete product",
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
    const product = await req.json();
    await updateProduct(id, product);
    return NextResponse.json({ message: "Product Updated" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update Product",
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
    await patchProduct(id, partialData);
    return NextResponse.json({ message: "Product partially updated" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to partially update product",
      },
      { status: 500 }
    );
  }
}
