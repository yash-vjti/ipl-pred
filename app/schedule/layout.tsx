import type React from "react"
import ProtectedRoute from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}

