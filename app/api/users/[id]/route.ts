import { NextResponse } from "next/server"

// Mock users data (same as in the users route)
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find user by ID
  const user = users.find((u) => u.id === id)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Remove sensitive information
  const { ...sanitizedUser } = user

  return NextResponse.json(sanitizedUser)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Find user index
    const userIndex = users.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if email or username is being changed and already exists
    if (body.email && body.email !== users[userIndex].email) {
      const emailExists = users.some((user) => user.email === body.email && user.id !== id)
      if (emailExists) {
        return NextResponse.json({ error: "Email already in use" }, { status: 400 })
      }
    }

    if (body.username && body.username !== users[userIndex].username) {
      const usernameExists = users.some((user) => user.username === body.username && user.id !== id)
      if (usernameExists) {
        return NextResponse.json({ error: "Username already taken" }, { status: 400 })
      }
    }

    // Update user (in a real app, this would be a database operation)
    const updatedUser = {
      ...users[userIndex],
      ...body,
    }

    users[userIndex] = updatedUser

    // Remove sensitive information
    const { ...sanitizedUser } = updatedUser

    return NextResponse.json(sanitizedUser)
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find user index
  const userIndex = users.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Delete user (in a real app, this would be a database operation)
  const deletedUser = users.splice(userIndex, 1)[0]

  return NextResponse.json({
    message: "User deleted successfully",
    user: {
      id: deletedUser.id,
      name: deletedUser.name,
      email: deletedUser.email,
    },
  })
}

