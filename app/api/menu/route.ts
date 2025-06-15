import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import MenuItem from "@/lib/models/MenuItem";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const menuItems = await MenuItem.find({}).sort({ category: 1, name: 1 });
  return NextResponse.json(menuItems);
}
