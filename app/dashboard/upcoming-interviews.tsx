"use client"

import { CalendarDays } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format, differenceInDays } from "date-fns"
import { useInterviews } from "../interviews/hooks/useInterviews"

export function UpcomingInterviews() {
  const { isLoading, error, getUpcomingInterviews } = useInterviews()
  const upcomingInterviews = getUpcomingInterviews()

  if (isLoading) {
    return <div className="p-4 text-muted-foreground">Loading interviews...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Failed to load interviews</div>
  }

  if (upcomingInterviews.length === 0) {
    return (
      <div className="p-4 text-muted-foreground text-center">
        No upcoming interviews scheduled.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {upcomingInterviews.map((interview) => {
        const interviewDate = new Date(interview.date)
        const daysAway = differenceInDays(interviewDate, new Date())
        
        return (
          <div key={interview.id} className="flex items-start space-x-4">
            <div className="p-2 rounded-md bg-muted">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium leading-none">{interview.company}</p>
                <Badge variant="outline">
                  {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{interview.role}</p>
              <p className="text-xs text-muted-foreground">
                {format(interviewDate, "MMMM d, yyyy 'at' h:mm a")} ({daysAway} days away)
              </p>
              <p className="text-xs text-muted-foreground">
                {interview.round.charAt(0).toUpperCase() + interview.round.slice(1)} Round
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

