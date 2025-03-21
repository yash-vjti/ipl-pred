"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { Skeleton } from "@/components/ui/skeleton"

type Notification = {
  id: string
  type: string
  message: string
  isRead: boolean
  createdAt: string
}

export function NotificationsPopover() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return

      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/notifications?userId=${user.id}`)

        // Simulate API response with mock data
        await new Promise((resolve) => setTimeout(resolve, 500))

        const mockNotifications: Notification[] = [
          {
            id: "1",
            type: "poll_created",
            message: "New poll created: Mumbai Indians vs Chennai Super Kings",
            isRead: false,
            createdAt: "2025-03-20T10:30:00",
          },
          {
            id: "2",
            type: "poll_ending",
            message: "Poll ending soon: Royal Challengers Bangalore vs Delhi Capitals",
            isRead: true,
            createdAt: "2025-03-19T15:45:00",
          },
          {
            id: "3",
            type: "prediction_result",
            message: "Your prediction was correct! You earned 30 points.",
            isRead: false,
            createdAt: "2025-03-18T22:10:00",
          },
        ]

        setNotifications(mockNotifications)
        setUnreadCount(mockNotifications.filter((n) => !n.isRead).length)
      } catch (error) {
        console.error("Error fetching notifications:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [user])

  const markAsRead = async (id: string) => {
    // In a real app, this would be an API call
    // await fetch(`/api/notifications/${id}/read`, { method: 'POST' })

    // Update local state
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )

    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = async () => {
    // In a real app, this would be an API call
    // await fetch(`/api/notifications/read-all?userId=${user.id}`, { method: 'POST' })

    // Update local state
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))

    setUnreadCount(0)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  if (!user) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted transition-colors ${!notification.isRead ? "bg-muted/50" : ""}`}
                  onClick={() => !notification.isRead && markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-sm">{notification.message}</p>
                    {!notification.isRead && <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(notification.createdAt)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

