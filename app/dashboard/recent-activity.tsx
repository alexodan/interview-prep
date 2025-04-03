"use client";

import * as React from "react";
import { Code, FileText, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  icon: React.ReactNode;
  color: string;
  timestamp: string;
  title: string;
  description: string;
}

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItemProps[];
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items = [], className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {items.length > 0 ? (
          <div>
            {items.map((item, index) => (
              <div key={index} className="flex">
                <div className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center",
                      item.color
                    )}
                  >
                    {item.icon}
                  </div>
                  {index < items.length - 1 && (
                    <div className="w-[2px] h-16 bg-border" />
                  )}
                </div>
                <div className="ml-4 pb-8">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No activity to display.
          </p>
        )}
      </div>
    );
  }
);

Timeline.displayName = "Timeline";

export function RecentActivity() {
  const activities = [
    {
      icon: <Code className="h-4 w-4 text-white" />,
      color: "bg-blue-500",
      timestamp: "2 hours ago",
      title: "Two Sum",
      description: "Completed algorithm practice - Arrays & Hashing",
    },
    {
      icon: <Layers className="h-4 w-4 text-white" />,
      color: "bg-emerald-500",
      timestamp: "Yesterday",
      title: "Microservices Architecture",
      description: "Added notes on distributed systems design patterns",
    },
    {
      icon: <Code className="h-4 w-4 text-white" />,
      color: "bg-purple-500",
      timestamp: "Yesterday",
      title: "LRU Cache",
      description: "Solved medium difficulty problem - Data Structures",
    },
    {
      icon: <FileText className="h-4 w-4 text-white" />,
      color: "bg-amber-500",
      timestamp: "2 days ago",
      title: "Leadership Principles",
      description: "Updated behavioral interview preparation notes",
    },
  ];

  return <Timeline items={activities} />;
}

