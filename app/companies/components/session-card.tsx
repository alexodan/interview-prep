"use client";

import { useState } from "react";
import { CheckCircle, Clock, Code, XCircle } from "lucide-react";
import { PracticeSession } from "@/app/practice/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddPracticeDialog } from "@/app/practice/add-practice-dialog";

export function SessionCard({ session }: { session: PracticeSession }) {
  const [open, setOpen] = useState(false);

  const title =
    session.type === "typing"
      ? `Typing Practice - ${new Date(session.createdAt).toLocaleDateString()}`
      : session.type === "study"
      ? `${session.topic} - ${new Date(session.createdAt).toLocaleDateString()}`
      : session.title;

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
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
        {open && (
          <AddPracticeDialog
            mode="edit"
            session={session}
            trigger={<Button variant="outline">View Details</Button>}
            open={open}
            setOpen={setOpen}
          />
        )}
        <Button onClick={() => setOpen(true)}>Add Notes!!</Button>
      </CardFooter>
    </Card>
  );
}
