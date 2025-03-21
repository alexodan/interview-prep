"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideNav } from "@/components/side-nav";
import { ModeToggle } from "@/components/mode-toggle";

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SideNav />
          </SheetContent>
        </Sheet>
        <Link href="/" className="mx-6 flex items-center space-x-2">
          <span className="font-bold">Interview Prep Tracker</span>
        </Link>
        <div className="flex items-center md:ml-auto md:gap-4 lg:gap-6">
          <form className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
