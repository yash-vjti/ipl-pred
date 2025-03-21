import { NextResponse } from "next/server"

// Mock user database (same as in login route)
const users = [
  {
    id: "1",
    name: "User Account",
    email: "user@example.com",
    password: "password", // In a real app, this would be hashed
    role: "user",
  },
  {
    id: "2",
    name: "Admin Account",
    email: "admin@example.com",
    password: "password", // In a real app, this would be hashed
    role: "admin",
  },
]

export async function GET(request: Request) {
  try {
    // In a real app, you would:
    // 1. Get the user ID from the session or JWT token
    // 2. Fetch the user from the database
    // 3. Return the user data without sensitive information

    // For demo purposes, we'll just return a mock user
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const user = users.find((u) => u.id === userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Remove sensitive information
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

