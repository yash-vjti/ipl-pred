"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Trophy, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { usePolls } from "@/contexts/poll-context"
import { useAuth } from "@/contexts/auth-context"
import { Skeleton } from "@/components/ui/skeleton"
import { StatsCard } from "@/components/stats-card"
import { MatchCard } from "@/components/match-card"
import { TeamLogo } from "@/components/team-logo"

export default function Dashboard() {
  const { user } = useAuth()
  const { fetchPolls, isLoading } = usePolls()
  const [activePolls, setActivePolls] = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [recentPredictions, setRecentPredictions] = useState([])
  const [stats, setStats] = useState({
    totalPredictions: 24,
    correctPredictions: 16,
    points: 350,
    rank: 42,
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const polls = await fetchPolls()
        setActivePolls(polls.filter((poll) => poll.status === "active").slice(0, 3))
        setUpcomingMatches(polls.filter((poll) => poll.status === "upcoming").slice(0, 3))

        // Mock recent predictions data
        setRecentPredictions([
          {
            id: "1",
            team1: "Mumbai Indians",
            team2: "Chennai Super Kings",
            date: "Mar 19, 2025",
            prediction: "Mumbai Indians",
            result: "Mumbai Indians won by 24 runs",
            isCorrect: true,
          },
          {
            id: "2",
            team1: "Kolkata Knight Riders",
            team2: "Punjab Kings",
            date: "Mar 18, 2025",
            prediction: "Kolkata Knight Riders",
            result: "Punjab Kings won by 5 wickets",
            isCorrect: false,
          },
          {
            id: "3",
            team1: "Delhi Capitals",
            team2: "Rajasthan Royals",
            date: "Mar 17, 2025",
            prediction: "Delhi Capitals",
            result: "Delhi Capitals won by 8 runs",
            isCorrect: true,
          },
        ])
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      }
    }

    loadData()
  }, [fetchPolls])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="h1-responsive">Welcome, {user?.name || "User"}</h1>
          <p className="text-muted-foreground">Track your predictions and upcoming matches</p>
        </div>
        <Link href="/polls">
          <Button>View All Polls</Button>
        </Link>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Predictions"
          value={stats.totalPredictions.toString()}
          description="Predictions made so far"
          icon={<CalendarDays />}
          isLoading={isLoading}
          className="animate-slide-up"
          trend="neutral"
        />
        <StatsCard
          title="Correct Predictions"
          value={`${stats.correctPredictions} (${Math.round((stats.correctPredictions / stats.totalPredictions) * 100)}%)`}
          description="Accuracy rate"
          icon={<TrendingUp />}
          isLoading={isLoading}
          className="animate-slide-up [animation-delay:100ms]"
          trend="up"
        />
        <StatsCard
          title="Total Points"
          value={stats.points.toString()}
          description="Current points"
          icon={<Trophy />}
          isLoading={isLoading}
          className="animate-slide-up [animation-delay:200ms]"
          trend="up"
        />
        <StatsCard
          title="Leaderboard Rank"
          value={`#${stats.rank}`}
          description="Your current position"
          icon={<Users />}
          isLoading={isLoading}
          className="animate-slide-up [animation-delay:300ms]"
          trend="down"
        />
      </div>

      <Tabs defaultValue="active" className="animate-fade-in [animation-delay:400ms]">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Polls</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
          <TabsTrigger value="recent">Recent Predictions</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {isLoading ? (
            <div className="responsive-grid">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : activePolls.length > 0 ? (
            <div className="responsive-grid">
              {activePolls.map((poll) => (
                <MatchCard
                  key={poll.id}
                  id={poll.id}
                  team1={poll.team1}
                  team2={poll.team2}
                  date={new Date(poll.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  time={new Date(poll.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                  venue={poll.venue}
                  status="upcoming"
                  pollStatus="active"
                  votes={poll.totalVotes}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No active polls at the moment.</div>
          )}

          {activePolls.length > 0 && (
            <div className="flex justify-center mt-4">
              <Link href="/polls">
                <Button variant="outline">View All Active Polls</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {isLoading ? (
            <div className="responsive-grid">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingMatches.length > 0 ? (
            <div className="responsive-grid">
              {upcomingMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  id={match.id}
                  team1={match.team1}
                  team2={match.team2}
                  date={new Date(match.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  time={new Date(match.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                  venue={match.venue}
                  status="upcoming"
                  pollStatus="not-created"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No upcoming matches found.</div>
          )}

          {upcomingMatches.length > 0 && (
            <div className="flex justify-center mt-4">
              <Link href="/schedule">
                <Button variant="outline">View Full Schedule</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {isLoading ? (
            <div className="responsive-grid">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : recentPredictions.length > 0 ? (
            <div className="responsive-grid">
              {recentPredictions.map((prediction) => (
                <Card
                  key={prediction.id}
                  className={prediction.isCorrect ? "border-green-500/50" : "border-red-500/50"}
                >
                  <div className={`h-1 w-full ${prediction.isCorrect ? "bg-green-500" : "bg-red-500"}`}></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      <div className="flex items-center gap-3">
                        <TeamLogo team={prediction.team1} size="sm" />
                        <span className="text-sm sm:text-base">vs</span>
                        <TeamLogo team={prediction.team2} size="sm" />
                      </div>
                    </CardTitle>
                    <CardDescription>{prediction.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      Your prediction: <span className="font-medium">{prediction.prediction}</span>
                    </div>
                    <div className="text-sm font-medium bg-muted/50 p-2 rounded-md">{prediction.result}</div>
                    <div className={`text-sm font-medium ${prediction.isCorrect ? "text-green-600" : "text-red-600"}`}>
                      {prediction.isCorrect ? "Correct prediction! +30 points" : "Incorrect prediction"}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No prediction history found.</div>
          )}

          {recentPredictions.length > 0 && (
            <div className="flex justify-center mt-4">
              <Link href="/history">
                <Button variant="outline">View All Predictions</Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

