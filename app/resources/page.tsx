import type { Metadata } from "next"
import { BookOpen, Code, ExternalLink, FileText, Layers, Search, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Resources | Interview Prep Tracker",
  description: "Manage your interview preparation resources",
}

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground">Manage your learning materials and references</p>
        </div>
        <Button>Add Resource</Button>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-64 lg:w-72">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search resources..." className="w-full pl-8" />
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Categories</h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <Code className="mr-2 h-4 w-4" />
                  Algorithms
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Layers className="mr-2 h-4 w-4" />
                  System Design
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Behavioral
                </Button>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer">
                  <Tag className="mr-1 h-3 w-3" />
                  Arrays
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  <Tag className="mr-1 h-3 w-3" />
                  Trees
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  <Tag className="mr-1 h-3 w-3" />
                  Graphs
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  <Tag className="mr-1 h-3 w-3" />
                  Dynamic Programming
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  <Tag className="mr-1 h-3 w-3" />
                  Microservices
                </Badge>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">Difficulty</h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  Easy
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Medium
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Hard
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="books">Books</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Design Interview Guide</CardTitle>
                  <CardDescription>Comprehensive guide to system design interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-md bg-muted">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge>System Design</Badge>
                        <Badge variant="outline">Medium</Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        A detailed guide covering distributed systems, scalability, and common architecture patterns for
                        tech interviews.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Add Notes
                  </Button>
                  <Button size="sm" className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Link
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Dynamic Programming Patterns</CardTitle>
                  <CardDescription>Common patterns for solving DP problems</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-md bg-muted">
                      <Code className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge>Algorithms</Badge>
                        <Badge variant="outline">Hard</Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Learn how to identify and solve dynamic programming problems using established patterns and
                        techniques.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Add Notes
                  </Button>
                  <Button size="sm" className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Link
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>STAR Method for Behavioral Questions</CardTitle>
                  <CardDescription>Framework for answering behavioral questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-md bg-muted">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge>Behavioral</Badge>
                        <Badge variant="outline">Easy</Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Learn how to structure your answers to behavioral questions using the Situation, Task, Action,
                        Result framework.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Add Notes
                  </Button>
                  <Button size="sm" className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Link
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="articles" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Design Interview Guide</CardTitle>
                  <CardDescription>Comprehensive guide to system design interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-md bg-muted">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge>System Design</Badge>
                        <Badge variant="outline">Medium</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Add Notes
                  </Button>
                  <Button size="sm" className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Link
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="videos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Graph Algorithms Explained</CardTitle>
                  <CardDescription>Visual explanation of common graph algorithms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-md bg-muted">
                      <Code className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge>Algorithms</Badge>
                        <Badge variant="outline">Medium</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Add Notes
                  </Button>
                  <Button size="sm" className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Link
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="books" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cracking the Coding Interview</CardTitle>
                  <CardDescription>Classic book for technical interview preparation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-md bg-muted">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge>Algorithms</Badge>
                        <Badge>System Design</Badge>
                        <Badge variant="outline">All Levels</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Add Notes
                  </Button>
                  <Button size="sm" className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

