"use client";

import {
  CheckCircle,
  Clock,
  Code,
  Filter,
  Plus,
  Search,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddPracticeDialog } from "./add-practice-dialog";
import { usePracticeSessions } from "./hooks/usePracticeSessions";

export default function PracticePage() {
  const { sessions, isLoading, error } = usePracticeSessions();

  if (isLoading) {
    return <div className="p-8">Loading practice sessions...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Practice</h1>
          <p className="text-muted-foreground">
            Track your coding practice and progress
          </p>
        </div>
        <AddPracticeDialog />
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search practice sessions..."
            className="w-full pl-8"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="arrays">Arrays</SelectItem>
            <SelectItem value="strings">Strings</SelectItem>
            <SelectItem value="trees">Trees</SelectItem>
            <SelectItem value="graphs">Graphs</SelectItem>
            <SelectItem value="dp">Dynamic Programming</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="solved">Solved</SelectItem>
            <SelectItem value="unsolved">Unsolved</SelectItem>
            <SelectItem value="review">Needs Review</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>
      <Tabs key={sessions.length} defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="solved">Solved</TabsTrigger>
          <TabsTrigger value="unsolved">Unsolved</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{session.title}</CardTitle>
                    <CardDescription>{session.description}</CardDescription>
                  </div>
                  {session.status === "solved" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : session.status === "unsolved" ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center space-x-2">
                    <Badge>{session.category}</Badge>
                    <Badge variant="outline">{session.difficulty}</Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{session.duration} minutes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Code className="h-4 w-4" />
                    <span>{session.language}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    {session.notes}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <AddPracticeDialog
                  mode="edit"
                  session={session}
                  trigger={<Button variant="outline">View Details</Button>}
                />
                <Button>Add Notes</Button>
              </CardFooter>
            </Card>
          ))}
          {sessions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No practice sessions yet. Click "Add Practice Session" to get
              started!
            </div>
          )}
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          {sessions
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 5)
            .map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{session.title}</CardTitle>
                      <CardDescription>{session.description}</CardDescription>
                    </div>
                    {session.status === "solved" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : session.status === "unsolved" ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center space-x-2">
                      <Badge>{session.category}</Badge>
                      <Badge variant="outline">{session.difficulty}</Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{session.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Code className="h-4 w-4" />
                      <span>{session.language}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      {session.notes}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <AddPracticeDialog
                    mode="edit"
                    session={session}
                    trigger={<Button variant="outline">View Details</Button>}
                  />
                  <Button>Add Notes</Button>
                </CardFooter>
              </Card>
            ))}
          {sessions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No practice sessions yet. Click "Add Practice Session" to get
              started!
            </div>
          )}
        </TabsContent>
        <TabsContent value="solved" className="space-y-4">
          {sessions
            .filter((session) => session.status === "solved")
            .map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{session.title}</CardTitle>
                      <CardDescription>{session.description}</CardDescription>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center space-x-2">
                      <Badge>{session.category}</Badge>
                      <Badge variant="outline">{session.difficulty}</Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{session.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Code className="h-4 w-4" />
                      <span>{session.language}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      {session.notes}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <AddPracticeDialog
                    mode="edit"
                    session={session}
                    trigger={<Button variant="outline">View Details</Button>}
                  />
                  <Button>Add Notes</Button>
                </CardFooter>
              </Card>
            ))}
          {sessions.filter((session) => session.status === "solved").length ===
            0 && (
            <div className="text-center py-8 text-muted-foreground">
              No solved practice sessions yet.
            </div>
          )}
        </TabsContent>
        <TabsContent value="unsolved" className="space-y-4">
          {sessions
            .filter((session) => session.status === "unsolved")
            .map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{session.title}</CardTitle>
                      <CardDescription>{session.description}</CardDescription>
                    </div>
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center space-x-2">
                      <Badge>{session.category}</Badge>
                      <Badge variant="outline">{session.difficulty}</Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{session.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Code className="h-4 w-4" />
                      <span>{session.language}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      {session.notes}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <AddPracticeDialog
                    mode="edit"
                    session={session}
                    trigger={<Button variant="outline">View Details</Button>}
                  />
                  <Button>Add Notes</Button>
                </CardFooter>
              </Card>
            ))}
          {sessions.filter((session) => session.status === "unsolved")
            .length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No unsolved practice sessions yet.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
