import { Code, FileText, Layers } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "problem",
      title: "Two Sum",
      category: "Algorithms",
      time: "2 hours ago",
      icon: Code,
    },
    {
      id: 2,
      type: "note",
      title: "Microservices Architecture",
      category: "System Design",
      time: "Yesterday",
      icon: Layers,
    },
    {
      id: 3,
      type: "problem",
      title: "LRU Cache",
      category: "Algorithms",
      time: "Yesterday",
      icon: Code,
    },
    {
      id: 4,
      type: "note",
      title: "Leadership Principles",
      category: "Behavioral",
      time: "2 days ago",
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <div className="p-2 rounded-md bg-muted">
            <activity.icon className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{activity.title}</p>
            <p className="text-sm text-muted-foreground">{activity.category}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

