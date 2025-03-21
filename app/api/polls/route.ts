import { NextResponse } from "next/server"

// Mock polls data
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
  {
    id: "3",
    matchId: "2",
    team1: "Royal Challengers Bangalore",
    team2: "Delhi Capitals",
    date: "2025-03-24T19:30:00",
    venue: "M. Chinnaswamy Stadium",
    pollEndTime: "2025-03-24T18:30:00",
    status: "active",
    pollType: "winner",
    question: "Who will win the match?",
    options: [
      { id: "1", text: "Royal Challengers Bangalore", votes: 189 },
      { id: "2", text: "Delhi Capitals", votes: 167 },
    ],
    totalVotes: 356,
  },
]

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const matchId = searchParams.get("matchId")

  // Filter polls based on query parameters
  let filteredPolls = [...polls]

  if (status) {
    filteredPolls = filteredPolls.filter((poll) => poll.status === status)
  }

  if (matchId) {
    filteredPolls = filteredPolls.filter((poll) => poll.matchId === matchId)
  }

  return NextResponse.json(filteredPolls)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["team1", "team2", "date", "venue", "pollEndTime", "options"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // In a real app, you would:
    // 1. Validate the data more thoroughly
    // 2. Store the poll in your database
    // 3. Return the created poll with an ID

    const newPoll = {
      id: `${polls.length + 1}`,
      ...body,
      status: "active",
      totalVotes: 0,
    }

    // Add to polls (in a real app, this would be a database operation)
    polls.push(newPoll)

    return NextResponse.json(newPoll)
  } catch (error) {
    console.error("Create poll error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

