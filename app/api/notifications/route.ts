import { NextResponse } from "next/server"

// Mock notifications data
const notifications = [
  {
    id: "1",
    userId: "1",
    type: "poll_created",
    message: "New poll created: Mumbai Indians vs Chennai Super Kings",
    isRead: false,
    createdAt: "2025-03-20T10:30:00",
  },
  {
    id: "2",
    userId: "1",
    type: "poll_ending",
    message: "Poll ending soon: Royal Challengers Bangalore vs Delhi Capitals",
    isRead: true,
    createdAt: "2025-03-19T15:45:00",
  },
  {
    id: "3",
    userId: "1",
    type: "prediction_result",
    message: "Your prediction was correct! You earned 30 points.",
    isRead: false,
    createdAt: "2025-03-18T22:10:00",
  },
  {
    id: "4",
    userId: "2",
    type: "poll_created",
    message: "New poll created: Mumbai Indians vs Chennai Super Kings",
    isRead: false,
    createdAt: "2025-03-20T10:30:00",
  },
]

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const unreadOnly = searchParams.get("unreadOnly") === "true"

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  // Filter notifications based on query parameters
  let filteredNotifications = notifications.filter((notification) => notification.userId === userId)

  if (unreadOnly) {
    filteredNotifications = filteredNotifications.filter((notification) => !notification.isRead)
  }

  // Sort by creation date (newest first)
  filteredNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json(filteredNotifications)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, type, message } = body

    // Validate required fields
    if (!userId || !type || !message) {
      return NextResponse.json({ error: "userId, type, and message are required" }, { status: 400 })
    }

    // Create new notification
    const newNotification = {
      id: `${notifications.length + 1}`,
      userId,
      type,
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
    }

    // Add to notifications (in a real app, this would be a database operation)
    notifications.push(newNotification)

    return NextResponse.json(newNotification)
  } catch (error) {
    console.error("Create notification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

