import type { Metadata } from "next"
import Link from "next/link"
import { CalendarDays, CheckCircle, Clock, Code, FileText, Layers, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DailyGoalsChart } from "./daily-goals-chart"
import { RecentActivity } from "./recent-activity"
import { UpcomingInterviews } from "./upcoming-interviews"

export const metadata: Metadata = {
  title: "Dashboard | Interview Prep Tracker",
  description: "Track your interview preparation progress",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Practice Problems</CardTitle>
            <Code className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">+4% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">+2.5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Google (2 days)</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Your study progress over the past week</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <DailyGoalsChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Your scheduled interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingInterviews />
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/interviews">View All Interviews</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Focus Areas</CardTitle>
                <CardDescription>Your current study priorities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Layers className="w-4 h-4" />
                        <span className="text-sm font-medium">System Design</span>
                      </div>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Code className="w-4 h-4" />
                        <span className="text-sm font-medium">Algorithms</span>
                      </div>
                      <span className="text-sm text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">Behavioral</span>
                      </div>
                      <span className="text-sm text-muted-foreground">90%</span>
                    </div>
                    <Progress value={90} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/learning-path">Adjust Focus Areas</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest study activities</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/practice">View All Practice</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Problem Categories</CardTitle>
              <CardDescription>Distribution of problems by category</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Detailed analytics charts will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Goals</CardTitle>
              <CardDescription>Set and track your daily study goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span className="font-medium">Solve 3 algorithm problems</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Complete
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span className="font-medium">Review system design notes</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Complete
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span className="font-medium">Practice behavioral questions</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Complete
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add New Goal</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

