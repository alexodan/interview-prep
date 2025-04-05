import type { Metadata } from "next";
import { CalendarDays, ChevronRight, Clock, Plus, Search } from "lucide-react";

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
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Interview } from "./types";

export const metadata: Metadata = {
  title: "Interviews | Interview Prep Tracker",
  description: "Manage your upcoming interviews",
};

async function getInterviews<T>() {
  try {
    const { promises: fs } = require("fs");
    const path = require("path");
    const filePath = path.join(
      process.cwd(),
      "app/interviews/data/interviews.json"
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data.interviews as T;
  } catch (error) {
    console.error("Error reading interviews:", error);
    return [];
  }
}

export default async function InterviewsPage() {
  const interviews = await getInterviews<Interview[]>();

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
          <p className="text-muted-foreground">
            Manage your upcoming interviews and track your progress
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Interview
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search interviews..."
          className="w-full pl-8 md:max-w-xs"
        />
      </div>
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          {interviews
            .filter((interview) => interview.status === "scheduled")
            .map((interview) => (
              <Card key={interview.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{interview.company}</CardTitle>
                      <CardDescription>{interview.role}</CardDescription>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {interview.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center space-x-2 text-sm">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>May 15, 2025 at 10:00 AM</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>2 days away</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Preparation Progress</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Details</Button>
                  <Button>Prepare Now</Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          {interviews.filter((interview) => interview.status === "completed")
            .length === 0 && (
            <div className="p-4 text-muted-foreground text-center">
              No completed interviews yet.
            </div>
          )}
          {interviews
            .filter((interview) => interview.status === "completed")
            .map((interview) => (
              <Card key={interview.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{interview.company}</CardTitle>
                      <CardDescription>{interview.role}</CardDescription>
                    </div>
                    <Badge className="capitalize" variant="outline">
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center space-x-2 text-sm">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>April 28, 2025</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      Interview went well. Answered all technical questions
                      correctly. Waiting for feedback.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Details</Button>
                  <Button>Add Notes?</Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="companies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {interviews.length === 0 && (
              <>
                <div className="p-4 text-muted-foreground text-center">
                  No companies added yet.
                </div>
                <Button variant="outline" className="w-full justify-between">
                  Add Company
                  <Plus className="h-4 w-4" />
                </Button>
              </>
            )}
            {interviews.map((interview) => {
              const company = interview.company;
              return (
                <Card key={interview.id}>
                  <CardHeader>
                    <CardTitle>{interview.company}</CardTitle>
                    <CardDescription>{interview.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Latest Position:</span>{" "}
                        {interview.role}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Next Interview:</span>{" "}
                        {format(
                          new Date(interview.date),
                          "MMMM d, yyyy 'at' h:mm a"
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full justify-between">
                      View Company Profile
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
