import { NextResponse } from "next/server"

// Mock user settings data
const userSettings = new Map([
  [
    "1",
    {
      notifications: {
        emailNotifications: true,
        pollReminders: true,
        resultNotifications: false,
        leaderboardUpdates: true,
        newPollNotifications: true,
        predictionResults: true,
        systemAnnouncements: true,
      },
      privacy: {
        showProfilePublicly: true,
        showPredictionsPublicly: true,
        showPointsPublicly: true,
        allowTagging: true,
      },
      theme: {
        darkMode: false,
        highContrast: false,
        reducedMotion: false,
      },
    },
  ],
  [
    "2",
    {
      notifications: {
        emailNotifications: true,
        pollReminders: true,
        resultNotifications: true,
        leaderboardUpdates: true,
        newPollNotifications: true,
        predictionResults: true,
        systemAnnouncements: true,
      },
      privacy: {
        showProfilePublicly: true,
        showPredictionsPublicly: false,
        showPointsPublicly: true,
        allowTagging: false,
      },
      theme: {
        darkMode: true,
        highContrast: false,
        reducedMotion: false,
      },
    },
  ],
])

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  const settings = userSettings.get(userId)

  if (!settings) {
    return NextResponse.json({ error: "Settings not found" }, { status: 404 })
  }

  return NextResponse.json(settings)
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const body = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Validate settings object
    if (!body.notifications || !body.privacy || !body.theme) {
      return NextResponse.json({ error: "Invalid settings object" }, { status: 400 })
    }

    // Update settings
    userSettings.set(userId, {
      notifications: body.notifications,
      privacy: body.privacy,
      theme: body.theme,
    })

    return NextResponse.json({ message: "Settings updated successfully" })
  } catch (error) {
    console.error("Update settings error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

