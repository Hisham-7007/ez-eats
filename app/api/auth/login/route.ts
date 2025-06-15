import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import MenuItem from "@/lib/models/MenuItem";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email });

    if (!user && email === "admin@ezeats.com") {
      const hashedPassword = await bcrypt.hash("password123", 10);
      user = await User.create({
        email: "admin@ezeats.com",
        password: hashedPassword,
        name: "Admin User",
      });
    }

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const existingMenu = await MenuItem.find();
    if (existingMenu.length === 0) {
      console.log("Seeding menu items...");
      await seedMenuItems();
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function seedMenuItems() {
  const sampleItems = [
    {
      name: "Patisserie Valerie",
      description: "Fresh romaine lettuce with parmesan cheese and croutons",
      price: 129.99,
      category: "appetizers",
      image:
        "https://m.media-amazon.com/images/I/81tL1qwbxlL._AC_SX679_PIbundle-12,TopRight,0,0_SH20_.jpg",
    },
    {
      name: "Grilled Chicken Skewers",
      description: "Tender grilled chicken served with tzatziki sauce",
      price: 99.99,
      category: "appetizers",
      image: "https://m.media-amazon.com/images/I/81paL132tYL._AC_SX679_.jpg",
    },
    {
      name: "Classic Cheeseburger",
      description: "Juicy beef patty with cheese, lettuce, tomato, and onions",
      price: 149.99,
      category: "mains",
      image:
        "https://m.media-amazon.com/images/I/81y21p9V+xL._AC_SX679_PIbundle-6,TopRight,0,0_SH20_.jpg",
    },
    {
      name: "Spaghetti Carbonara",
      description: "Creamy pasta with pancetta, egg yolk, and parmesan",
      price: 139.99,
      category: "mains",
      image: "https://m.media-amazon.com/images/I/8155lN3xTfL._AC_SY741_.jpg",
    },
    {
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with a molten center",
      price: 79.99,
      category: "desserts",
      image: "https://m.media-amazon.com/images/I/710DTLQR6fL._AC_SX679_.jpg",
    },
    {
      name: "Strawberry Cheesecake",
      description: "Creamy cheesecake with a strawberry glaze",
      price: 89.99,
      category: "desserts",
      image: "https://m.media-amazon.com/images/I/81I7RNBPW5L._AC_SX679_.jpg",
    },
    {
      name: "Lemonade",
      description: "Refreshing homemade lemonade",
      price: 29.99,
      category: "beverages",
      image: "https://m.media-amazon.com/images/I/71IOI0cbBvL._AC_SX679_.jpg",
    },
    {
      name: "Iced Coffee",
      description: "Cold brewed coffee with milk and ice",
      price: 34.99,
      category: "beverages",
      image:
        "https://m.media-amazon.com/images/I/81K3bqjA5WL._AC_SX679_PIbundle-10,TopRight,0,0_SH20_.jpg",
    },
    {
      name: "Falafel Platter",
      description: "Crispy falafel with hummus, tahini, and salad",
      price: 119.99,
      category: "mains",
      image: "https://m.media-amazon.com/images/I/810yaqFl6lL._AC_SX679_.jpg",
    },
    {
      name: "Bruschetta",
      description: "Grilled bread with tomato, basil, and olive oil",
      price: 59.99,
      category: "appetizers",
      image: "https://m.media-amazon.com/images/I/71oNvpmAMYL._AC_SX679_.jpg",
    },
  ];

  await MenuItem.insertMany(sampleItems);
}
