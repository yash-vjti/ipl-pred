import { NextResponse } from "next/server"

// Mock statistics data
const statistics = {
  users: {
    total: 856,
    active: 742,
    inactive: 114,
    admins: 5,
    growth: {
      daily: 12,
      weekly: 68,
      monthly: 245,
    },
    retention: 87.5,
  },
  polls: {
    total: 48,
    active: 5,
    completed: 43,
    totalVotes: 12456,
    averageVotesPerPoll: 259.5,
    mostPopular: {
      id: "1",
      teams: "Mumbai Indians vs Chennai Super Kings",
      votes: 1245,
    },
  },
  predictions: {
    total: 8765,
    accuracy: {
      overall: 64.2,
      matchWinner: 68.4,
      manOfTheMatch: 42.7,
    },
    pointsAwarded: 245670,
    averagePointsPerUser: 286.8,
  },
  teams: {
    mostPredicted: "Mumbai Indians",
    mostAccurate: "Chennai Super Kings",
    leastAccurate: "Punjab Kings",
  },
}

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const period = searchParams.get("period") || "all"

  // In a real app, you would filter statistics based on the period
  // For this mock, we'll just return the full statistics

  return NextResponse.json({
    ...statistics,
    period,
  })
}

