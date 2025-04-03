import {
  CheckCircle,
  Clock,
  Code,
  Filter,
  Search,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PracticeSession } from "./types";
import { AddPracticeDialog } from "./add-practice-dialog";

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
import { PracticeTypeSelector } from "./practice-type-selector";

export default function PracticePage({
  initialSessions,
}: {
  initialSessions?: PracticeSession[];
}) {
  const renderSessionDetails = (session: PracticeSession) => {
    switch (session.type) {
      case "leetcode":
        return (
          <>
            <p className="text-sm text-muted-foreground">
              {session.description}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Badge
                variant={session.status === "solved" ? "default" : "secondary"}
              >
                {session.status}
              </Badge>
              <Badge variant="outline">{session.category}</Badge>
              <Badge
                variant="outline"
                className={
                  session.difficulty === "easy"
                    ? "text-green-500"
                    : session.difficulty === "medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }
              >
                {session.difficulty}
              </Badge>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {session.duration} min
              </div>
              <div className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                {session.language}
              </div>
            </div>
            {session.notes && <p className="mt-4 text-sm">{session.notes}</p>}
          </>
        );
      case "mini-challenge":
        return (
          <>
            <p className="text-sm text-muted-foreground">
              <a
                href={session.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Challenge
              </a>
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Badge
                variant={
                  session.status === "completed" ? "default" : "secondary"
                }
              >
                {session.status}
              </Badge>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Est: {session.estimatedDuration} min
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Actual: {session.actualDuration} min
              </div>
            </div>
            {session.learnings && (
              <p className="mt-4 text-sm">{session.learnings}</p>
            )}
          </>
        );
      case "study":
        return (
          <>
            <p className="text-sm text-muted-foreground">{session.resources}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline">{session.comprehensionLevel}</Badge>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {session.duration} min
              </div>
            </div>
            {session.keyTakeaways && (
              <div className="mt-4">
                <p className="text-sm font-medium">Key Takeaways:</p>
                <p className="text-sm text-muted-foreground">
                  {session.keyTakeaways}
                </p>
              </div>
            )}
            {session.nextSteps && (
              <div className="mt-2">
                <p className="text-sm font-medium">Next Steps:</p>
                <p className="text-sm text-muted-foreground">
                  {session.nextSteps}
                </p>
              </div>
            )}
          </>
        );
      case "typing":
        return (
          <>
            <div className="mt-2 flex items-center gap-4">
              <Badge variant="outline">{session.wpm} WPM</Badge>
              <Badge variant="outline">{session.accuracy}% Accuracy</Badge>
            </div>
            {session.notes && (
              <p className="mt-4 text-sm text-muted-foreground">
                {session.notes}
              </p>
            )}
          </>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Practice</h1>
          <p className="text-muted-foreground">
            Track your coding practice and progress
          </p>
        </div>
        <PracticeTypeSelector />
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
      <Tabs
        key={initialSessions?.length}
        defaultValue="all"
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="solved">Solved</TabsTrigger>
          <TabsTrigger value="unsolved">Unsolved</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {initialSessions?.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <CardTitle>
                  {session.type === "leetcode"
                    ? session.title
                    : session.type === "mini-challenge"
                    ? session.title
                    : session.type === "study"
                    ? session.topic
                    : session.type === "typing"
                    ? `Typing Practice - ${new Date(
                        session.createdAt
                      ).toLocaleDateString()}`
                    : "Unknown Session Type"}
                </CardTitle>
                {renderSessionDetails(session)}
              </CardHeader>
            </Card>
          ))}
          {initialSessions?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No practice sessions yet. Click "Add Practice Session" to get
              started!
            </div>
          )}
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          {initialSessions
            ?.sort(
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
                      <CardTitle>
                        {session.type === "leetcode"
                          ? session.title
                          : session.type === "mini-challenge"
                          ? session.title
                          : session.type === "study"
                          ? session.topic
                          : session.type === "typing"
                          ? `Typing Practice - ${new Date(
                              session.createdAt
                            ).toLocaleDateString()}`
                          : "Unknown Session Type"}
                      </CardTitle>
                      <CardDescription>
                        {session.type === "leetcode"
                          ? session.description
                          : session.type === "mini-challenge"
                          ? session.link
                          : session.type === "study"
                          ? session.resources
                          : session.type === "typing"
                          ? `WPM: ${session.wpm}, Accuracy: ${session.accuracy}%`
                          : ""}
                      </CardDescription>
                    </div>
                    {session.type === "leetcode" &&
                      (session.status === "solved" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : session.status === "unsolved" ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      ))}
                  </div>
                </CardHeader>
                <CardContent>{renderSessionDetails(session)}</CardContent>
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
          {initialSessions?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No practice sessions yet. Click "Add Practice Session" to get
              started!
            </div>
          )}
        </TabsContent>
        <TabsContent value="solved" className="space-y-4">
          {initialSessions
            ?.filter(
              (
                session
              ): session is Extract<PracticeSession, { type: "leetcode" }> =>
                session.type === "leetcode" && session.status === "solved"
            )
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
                <CardContent>{renderSessionDetails(session)}</CardContent>
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
          {initialSessions?.filter((session) => session.status === "solved")
            .length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No solved practice sessions yet.
            </div>
          )}
        </TabsContent>
        <TabsContent value="unsolved" className="space-y-4">
          {initialSessions
            ?.filter(
              (
                session
              ): session is Extract<PracticeSession, { type: "leetcode" }> =>
                session.type === "leetcode" && session.status === "unsolved"
            )
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
                <CardContent>{renderSessionDetails(session)}</CardContent>
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
          {initialSessions?.filter((session) => session.status === "unsolved")
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
