import { NextResponse } from "next/server"

// Mock polls data (same as in the polls route)
const polls = [
  {
    id: "1",
    matchId: "1",
    team1: "Mumbai Indians",
    team2: "Chennai Super Kings",
    date: "2025-03-22T19:30:00",
    venue: "Wankhede Stadium",
    pollEndTime: "2025-03-22T18:30:00",
    status: "active",
    pollType: "winner",
    question: "Who will win the match?",
    options: [
      { id: "1", text: "Mumbai Indians", votes: 245 },
      { id: "2", text: "Chennai Super Kings", votes: 312 },
    ],
    totalVotes: 557,
  },
  {
    id: "2",
    matchId: "1",
    team1: "Mumbai Indians",
    team2: "Chennai Super Kings",
    date: "2025-03-22T19:30:00",
    venue: "Wankhede Stadium",
    pollEndTime: "2025-03-22T18:30:00",
    status: "active",
    pollType: "motm",
    question: "Who will be the Man of the Match?",
    options: [
      { id: "1", text: "Rohit Sharma", votes: 156 },
      { id: "2", text: "Jasprit Bumrah", votes: 98 },
      { id: "3", text: "MS Dhoni", votes: 203 },
      { id: "4", text: "Ravindra Jadeja", votes: 87 },
    ],
    totalVotes: 544,
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find poll by ID
  const poll = polls.find((p) => p.id === id)

  if (!poll) {
    return NextResponse.json({ error: "Poll not found" }, { status: 404 })
  }

  return NextResponse.json(poll)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Find poll index
    const pollIndex = polls.findIndex((p) => p.id === id)

    if (pollIndex === -1) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 })
    }

    // Update poll (in a real app, this would be a database operation)
    const updatedPoll = {
      ...polls[pollIndex],
      ...body,
    }

    polls[pollIndex] = updatedPoll

    return NextResponse.json(updatedPoll)
  } catch (error) {
    console.error("Update poll error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find poll index
  const pollIndex = polls.findIndex((p) => p.id === id)

  if (pollIndex === -1) {
    return NextResponse.json({ error: "Poll not found" }, { status: 404 })
  }

  // Delete poll (in a real app, this would be a database operation)
  const deletedPoll = polls.splice(pollIndex, 1)[0]

  return NextResponse.json({
    message: "Poll deleted successfully",
    poll: deletedPoll,
  })
}

