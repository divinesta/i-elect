"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vote, Users, Calendar, AlertCircle } from "lucide-react";

export default function DashboardHomePage() {
   const notifications = [
      {
         id: 1,
         message: "Student Council Election starts tomorrow",
         type: "info",
         time: "2 hours ago",
      },
      {
         id: 2,
         message: "You have been added as a voter to 'Class Representative Election'",
         type: "success",
         time: "1 day ago",
      },
      {
         id: 3,
         message: "Presidential Election voting ends in 3 days",
         type: "warning",
         time: "2 days ago",
      },
   ];

   return (
      <div className="space-y-6">
         {/* Welcome Section */}
         <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Hello, John Doe! 👋</h1>
            <p className="text-gray-600">Welcome back to your voting dashboard</p>
         </div>

         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Elections You Created</CardTitle>
                  <Vote className="h-5 w-5 text-[#1d4ed8]" />
               </CardHeader>
               <CardContent>
                  <div className="text-3xl font-bold text-gray-900">5</div>
                  <p className="text-xs text-gray-500 mt-1">
                     <span className="text-green-600">+2</span> from last month
                  </p>
               </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Elections You Can Vote In</CardTitle>
                  <Users className="h-5 w-5 text-[#3b82f6]" />
               </CardHeader>
               <CardContent>
                  <div className="text-3xl font-bold text-gray-900">3</div>
                  <p className="text-xs text-gray-500 mt-1">
                     <span className="text-blue-600">2 active</span> elections
                  </p>
               </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Votes Cast</CardTitle>
                  <Calendar className="h-5 w-5 text-[#60a5fa]" />
               </CardHeader>
               <CardContent>
                  <div className="text-3xl font-bold text-gray-900">12</div>
                  <p className="text-xs text-gray-500 mt-1">Across all elections</p>
               </CardContent>
            </Card>
         </div>

         {/* Recent Notifications */}
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-[#1d4ed8]" />
                  <span>Recent Notifications</span>
               </CardTitle>
               <CardDescription>Stay updated with your election activities</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {notifications.map((notification) => (
                     <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.type === "info" ? "bg-blue-500" : notification.type === "success" ? "bg-green-500" : "bg-yellow-500"}`} />
                        <div className="flex-1 space-y-1">
                           <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                           <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                        <Badge variant={notification.type === "info" ? "default" : notification.type === "success" ? "secondary" : "outline"} className="text-xs">
                           {notification.type}
                        </Badge>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Quick Actions */}
         <Card>
            <CardHeader>
               <CardTitle>Quick Actions</CardTitle>
               <CardDescription>Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-[#1d4ed8] hover:bg-[#60a5fa]/10 transition-colors cursor-pointer">
                     <h3 className="font-medium text-gray-900 mb-2">Create New Election</h3>
                     <p className="text-sm text-gray-600">Set up a new voting process for your organization</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-[#1d4ed8] hover:bg-[#60a5fa]/10 transition-colors cursor-pointer">
                     <h3 className="font-medium text-gray-900 mb-2">View Active Elections</h3>
                     <p className="text-sm text-gray-600">Check elections you can participate in</p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
