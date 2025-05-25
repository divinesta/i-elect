"use client"

import { Clock, Users, Vote, TrendingUp } from "lucide-react"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"

export default function RealTimeResultsPage() {
  // Sample data
  const stats = [
    {
      title: "Total Votes",
      value: "1,277",
      change: "+23 in last hour",
      icon: Vote,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Participation Rate",
      value: "71.5%",
      change: "+1.2% today",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Positions",
      value: "6",
      change: "All positions live",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Time Remaining",
      value: "2d 5h",
      change: "Until deadline",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const hourlyData = [
    { time: "9 AM", votes: 45 },
    { time: "10 AM", votes: 78 },
    { time: "11 AM", votes: 123 },
    { time: "12 PM", votes: 156 },
    { time: "1 PM", votes: 189 },
    { time: "2 PM", votes: 234 },
    { time: "3 PM", votes: 198 },
    { time: "4 PM", votes: 167 },
  ]

  const maxVotes = Math.max(...hourlyData.map((h) => h.votes))

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Real-time Results</h1>
            <p className="text-gray-600 mt-1">Live voting results and detailed analytics</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Live Updates</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Voting Activity Chart */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Voting Activity Today</h2>
            <div className="space-y-4">
              <div className="flex items-end justify-between h-64 px-4">
                {hourlyData.map((hour, index) => {
                  const height = (hour.votes / maxVotes) * 100
                  return (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div className="relative flex items-end h-48">
                        <div
                          className="w-8 bg-[#1D4ED8] rounded-t transition-all duration-500 hover:bg-[#1e40af]"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{hour.time}</span>
                      <span className="text-xs font-medium text-gray-900">{hour.votes}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between text-xs text-gray-500 px-4">
                <span>0</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
