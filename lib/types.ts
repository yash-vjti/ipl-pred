// User types
export interface User {
  id: string
  name: string
  email: string
  username?: string
  role: "admin" | "user"
  status?: "active" | "inactive"
  predictions?: number
  points?: number
  avatar?: string
}

// Poll types
export interface PollOption {
  id: string
  text: string
  votes: number
}

export interface Poll {
  id: string
  matchId: string
  team1: string
  team2: string
  date: string
  venue: string
  pollEndTime: string
  status: "active" | "completed" | "upcoming"
  pollType: "winner" | "motm"
  question: string
  options: PollOption[]
  totalVotes: number
}

// Vote types
export interface Vote {
  id: string
  userId: string
  pollId: string
  optionId: string
  createdAt: string
}

// Prediction types
export interface Prediction {
  id: string
  userId: string
  matchId: string
  pollId: string
  selectedOption: string
  isCorrect?: boolean
  points?: number
  createdAt: string
}

// Leaderboard types
export interface LeaderboardEntry {
  id: string
  name: string
  username: string
  points: number
  correctPredictions: number
  rank: number
  avatar: string | null
}

// Statistics types
export interface Statistics {
  users: {
    total: number
    active: number
    inactive: number
    admins: number
    growth: {
      daily: number
      weekly: number
      monthly: number
    }
    retention: number
  }
  polls: {
    total: number
    active: number
    completed: number
    totalVotes: number
    averageVotesPerPoll: number
    mostPopular: {
      id: string
      teams: string
      votes: number
    }
  }
  predictions: {
    total: number
    accuracy: {
      overall: number
      matchWinner: number
      manOfTheMatch: number
    }
    pointsAwarded: number
    averagePointsPerUser: number
  }
  teams: {
    mostPredicted: string
    mostAccurate: string
    leastAccurate: string
  }
}

