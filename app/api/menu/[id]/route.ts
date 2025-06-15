import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import MenuItem from "@/lib/models/MenuItem";

export async function GET(request: NextRequest) {
  //  await seedMenuItems();

  try {
    await connectDB();

    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const id = pathParts[pathParts.length - 1];

    if (!id) {
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }

    const item = await MenuItem.findById(id);

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function seedMenuItems() {
  const sampleItems = [
    {
      name: "Patisserie Valerie",
      description: "Fresh romaine lettuce with parmesan cheese and croutons",
      price: 129.99,
      category: "appetizers",
      image: "https://m.media-amazon.com/images/I/61ASAhkO32L._AC_SX679_.jpg",
    },
  ];

  await MenuItem.insertMany(sampleItems);
}
