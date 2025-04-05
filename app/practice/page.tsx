import { Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PracticeSession } from "./types";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PracticeTypeSelector } from "./practice-type-selector";
import { getPracticeSessions } from "../api/practice/route";
import { SessionCard } from "../companies/components/session-card";

export default async function PracticePage() {
  const { data: sessions } = await getPracticeSessions();
  console.log("sessions", sessions);

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
      <Tabs key={sessions?.length} defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="solved">Solved</TabsTrigger>
          <TabsTrigger value="unsolved">Unsolved</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {sessions?.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
          {sessions?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No practice sessions yet. Click "Add Practice Session" to get
              started!
            </div>
          )}
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          {sessions
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 5)
            .map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          {sessions?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No practice sessions yet. Click "Add Practice Session" to get
              started!
            </div>
          )}
        </TabsContent>
        <TabsContent value="solved" className="space-y-4">
          {sessions
            ?.filter(
              (
                session
              ): session is Extract<PracticeSession, { type: "leetcode" }> =>
                session.type === "leetcode" && session.status === "solved"
            )
            .map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          {sessions?.filter(
            (session) =>
              session.type === "leetcode" && session.status === "solved"
          ).length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No solved practice sessions yet.
            </div>
          )}
        </TabsContent>
        <TabsContent value="unsolved" className="space-y-4">
          {sessions
            ?.filter(
              (
                session
              ): session is Extract<PracticeSession, { type: "leetcode" }> =>
                session.type === "leetcode" && session.status === "unsolved"
            )
            .map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          {sessions?.filter(
            (session) =>
              session.type === "leetcode" && session.status === "unsolved"
          ).length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No unsolved practice sessions yet.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
