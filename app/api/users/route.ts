import { NextResponse } from "next/server"

// Mock users data
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    username: "johndoe",
    role: "user",
    status: "active",
    predictions: 24,
    points: 350,
    avatar: "",
    createdAt: "2025-01-15T10:30:00",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    username: "janesmith",
    role: "user",
    status: "active",
    predictions: 32,
    points: 480,
    avatar: "",
    createdAt: "2025-01-20T14:45:00",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    username: "adminuser",
    role: "admin",
    status: "active",
    predictions: 28,
    points: 420,
    avatar: "",
    createdAt: "2025-01-10T09:15:00",
  },
]

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role")
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  // Filter users based on query parameters
  let filteredUsers = [...users]

  if (role) {
    filteredUsers = filteredUsers.filter((user) => user.role === role)
  }

  if (status) {
    filteredUsers = filteredUsers.filter((user) => user.status === status)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower),
    )
  }

  // Remove sensitive information
  const sanitizedUsers = filteredUsers.map(({ ...user }) => {
    return user
  })

  return NextResponse.json(sanitizedUsers)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, username, role = "user", status = "active" } = body

    // Validate required fields
    if (!name || !email || !username) {
      return NextResponse.json({ error: "Name, email, and username are required" }, { status: 400 })
    }

    // Check if email or username already exists
    const emailExists = users.some((user) => user.email === email)
    const usernameExists = users.some((user) => user.username === username)

    if (emailExists) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    if (usernameExists) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: `${users.length + 1}`,
      name,
      email,
      username,
      role,
      status,
      predictions: 0,
      points: 0,
      avatar: "",
      createdAt: new Date().toISOString(),
    }

    // Add to users (in a real app, this would be a database operation)
    users.push(newUser)

    return NextResponse.json(newUser)
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

