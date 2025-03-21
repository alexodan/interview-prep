import type { Metadata } from "next"
import { CheckCircle, Code, FileText, Layers, Plus, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Learning Path | Interview Prep Tracker",
  description: "Customize your learning path",
}

export default function LearningPathPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Path</h1>
          <p className="text-muted-foreground">Customize your learning journey and track your progress</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Custom Path
        </Button>
      </div>
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Focus</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="custom">Custom Paths</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Focus Areas</CardTitle>
              <CardDescription>Your current learning priorities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Layers className="h-4 w-4" />
                      <span className="font-medium">System Design</span>
                    </div>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} />
                  <p className="text-sm text-muted-foreground">Focus on distributed systems and scalability patterns</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Code className="h-4 w-4" />
                      <span className="font-medium">Algorithms</span>
                    </div>
                    <span className="text-sm text-muted-foreground">60%</span>
                  </div>
                  <Progress value={60} />
                  <p className="text-sm text-muted-foreground">Practice dynamic programming and graph algorithms</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">Behavioral</span>
                    </div>
                    <span className="text-sm text-muted-foreground">90%</span>
                  </div>
                  <Progress value={90} />
                  <p className="text-sm text-muted-foreground">Prepare stories using the STAR method</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Adjust Focus Areas</Button>
            </CardFooter>
          </Card>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>System Design</CardTitle>
                  <Layers className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Next recommended topics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Load Balancing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Database Sharding</span>
                  </li>
                  <li className="flex items-center">
                    <Target className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="font-medium">Microservices Architecture</span>
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2 h-4 w-4">•</span>
                    <span>Caching Strategies</span>
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2 h-4 w-4">•</span>
                    <span>Distributed Consensus</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Topics
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Algorithms</CardTitle>
                  <Code className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Next recommended topics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Binary Search</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Two Pointers</span>
                  </li>
                  <li className="flex items-center">
                    <Target className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="font-medium">Dynamic Programming</span>
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2 h-4 w-4">•</span>
                    <span>Graph Traversal</span>
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2 h-4 w-4">•</span>
                    <span>Backtracking</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Topics
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Behavioral</CardTitle>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Next recommended topics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Leadership Principles</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Conflict Resolution</span>
                  </li>
                  <li className="flex items-center">
                    <Target className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="font-medium">Project Challenges</span>
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2 h-4 w-4">•</span>
                    <span>Team Collaboration</span>
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2 h-4 w-4">•</span>
                    <span>Career Growth</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Topics
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="recommended" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Frontend Engineer Path</CardTitle>
                <CardDescription>Specialized for frontend positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge>JavaScript</Badge>
                  <Badge>React</Badge>
                  <Badge>CSS</Badge>
                  <Badge>Web Performance</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Completion</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <Progress value={0} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start This Path</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Backend Engineer Path</CardTitle>
                <CardDescription>Specialized for backend positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge>Databases</Badge>
                  <Badge>APIs</Badge>
                  <Badge>Microservices</Badge>
                  <Badge>Scalability</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Completion</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <Progress value={0} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start This Path</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Machine Learning Path</CardTitle>
                <CardDescription>Specialized for ML/AI positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge>Algorithms</Badge>
                  <Badge>Statistics</Badge>
                  <Badge>Python</Badge>
                  <Badge>ML Models</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Completion</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <Progress value={0} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start This Path</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Google Interview Prep</CardTitle>
              <CardDescription>Custom path for upcoming Google interview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge>System Design</Badge>
                <Badge>Algorithms</Badge>
                <Badge>Google Leadership Principles</Badge>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Completion</span>
                  <span className="font-medium">65%</span>
                </div>
                <Progress value={65} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Edit Path</Button>
              <Button>Continue</Button>
            </CardFooter>
          </Card>
          <div className="flex items-center justify-center p-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Target className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Create a Custom Learning Path</h3>
                <p className="text-sm text-muted-foreground">
                  Tailor your learning experience to your specific needs and goals
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Custom Path
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

