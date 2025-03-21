import { NextResponse } from "next/server"

// Mock votes data
const votes = [
  {
    id: "1",
    userId: "1",
    pollId: "1",
    optionId: "2",
    createdAt: "2025-03-20T14:30:00",
  },
  {
    id: "2",
    userId: "1",
    pollId: "2",
    optionId: "3",
    createdAt: "2025-03-20T14:35:00",
  },
  {
    id: "3",
    userId: "2",
    pollId: "1",
    optionId: "1",
    createdAt: "2025-03-21T10:15:00",
  },
]

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const pollId = searchParams.get("pollId")

  // Filter votes based on query parameters
  let filteredVotes = [...votes]

  if (userId) {
    filteredVotes = filteredVotes.filter((vote) => vote.userId === userId)
  }

  if (pollId) {
    filteredVotes = filteredVotes.filter((vote) => vote.pollId === pollId)
  }

  return NextResponse.json(filteredVotes)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, pollId, optionId } = body

    // Validate required fields
    if (!userId || !pollId || !optionId) {
      return NextResponse.json({ error: "userId, pollId, and optionId are required" }, { status: 400 })
    }

    // Check if user has already voted on this poll
    const existingVote = votes.find((v) => v.userId === userId && v.pollId === pollId)

    if (existingVote) {
      return NextResponse.json({ error: "User has already voted on this poll" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Validate that the poll and option exist
    // 2. Check if the poll is still active
    // 3. Update the vote count for the option
    // 4. Store the vote in your database

    const newVote = {
      id: `${votes.length + 1}`,
      userId,
      pollId,
      optionId,
      createdAt: new Date().toISOString(),
    }

    // Add to votes (in a real app, this would be a database operation)
    votes.push(newVote)

    return NextResponse.json(newVote)
  } catch (error) {
    console.error("Create vote error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

