import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Check if the email is already registered
    // 2. Hash the password
    // 3. Store the user in your database
    // 4. Generate a JWT token or session

    // Mock successful registration
    return NextResponse.json({
      message: "Registration successful",
      user: {
        id: "new-user-id",
        name,
        email,
        role: "user",
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

