"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Calendar, Code, FileText, Home, Layers, LineChart, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className="group flex w-16 flex-col border-r bg-background p-2 md:w-56 md:p-4">
      <nav className="grid gap-1 md:gap-2">
        <Button asChild variant={pathname === "/dashboard" ? "secondary" : "ghost"} className="justify-start">
          <Link href="/dashboard">
            <Home className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline-flex">Dashboard</span>
          </Link>
        </Button>
        <Button asChild variant={pathname === "/practice" ? "secondary" : "ghost"} className="justify-start">
          <Link href="/practice">
            <Code className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline-flex">Practice</span>
          </Link>
        </Button>
        <Button asChild variant={pathname === "/resources" ? "secondary" : "ghost"} className="justify-start">
          <Link href="/resources">
            <BookOpen className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline-flex">Resources</span>
          </Link>
        </Button>
        <Button asChild variant={pathname === "/interviews" ? "secondary" : "ghost"} className="justify-start">
          <Link href="/interviews">
            <Users className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline-flex">Interviews</span>
          </Link>
        </Button>
        <Button asChild variant={pathname === "/learning-path" ? "secondary" : "ghost"} className="justify-start">
          <Link href="/learning-path">
            <Target className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline-flex">Learning Path</span>
          </Link>
        </Button>
        <Button asChild variant={pathname === "/calendar" ? "secondary" : "ghost"} className="justify-start">
          <Link href="/calendar">
            <Calendar className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline-flex">Calendar</span>
          </Link>
        </Button>
        <Button asChild variant={pathname === "/analytics" ? "secondary" : "ghost"} className="justify-start">
          <Link href="/analytics">
            <LineChart className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline-flex">Analytics</span>
          </Link>
        </Button>
      </nav>
      <div className="mt-auto">
        <h3 className="hidden text-sm font-medium md:block">Categories</h3>
        <nav className="mt-2 grid gap-1 md:gap-2">
          <Button asChild variant="ghost" className="justify-start">
            <Link href="/categories/algorithms">
              <Code className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline-flex">Algorithms</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link href="/categories/system-design">
              <Layers className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline-flex">System Design</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link href="/categories/behavioral">
              <FileText className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline-flex">Behavioral</span>
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  )
}

