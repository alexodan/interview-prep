"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function DailyGoalsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Sample data
    const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const studyHours = [3.5, 2, 4, 3, 5, 4.5, 2.5]
    const problemsSolved = [5, 3, 6, 4, 7, 5, 3]

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Study Hours",
            data: studyHours,
            backgroundColor: "rgba(99, 102, 241, 0.5)",
            borderColor: "rgb(99, 102, 241)",
            borderWidth: 1,
            yAxisID: "y",
          },
          {
            label: "Problems Solved",
            data: problemsSolved,
            backgroundColor: "rgba(14, 165, 233, 0.5)",
            borderColor: "rgb(14, 165, 233)",
            borderWidth: 1,
            type: "line",
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Study Hours",
            },
            min: 0,
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Problems Solved",
            },
            min: 0,
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-80">
      <canvas ref={chartRef} />
    </div>
  )
}

