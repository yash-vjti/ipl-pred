import { NextResponse } from "next/server"

// Mock user database
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = users.find((u) => u.email === email)

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // In a real app, you would:
    // 1. Generate a JWT token
    // 2. Set cookies or return the token
    // 3. Include user data without sensitive information

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

