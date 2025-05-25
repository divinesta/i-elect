"use client";

import { ArrowRight, Calendar, CheckCircle, Clock, Bell } from "lucide-react";
import Link from "next/link";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
   // Sample data - in a real app, this would come from an API
   const summaryData = {
      ongoing: 2,
      upcoming: 3,
      completed: 5,
   };

   const recentElections = [
      {
         id: 1,
         name: "City Council Election",
         status: "ongoing",
         startDate: "2025-05-20",
         endDate: "2025-05-27",
      },
      {
         id: 2,
         name: "School Board Election",
         status: "ongoing",
         startDate: "2025-05-18",
         endDate: "2025-05-25",
      },
      {
         id: 3,
         name: "Community Center Proposal",
         status: "upcoming",
         startDate: "2025-05-30",
         endDate: "2025-06-06",
      },
   ];

   const notifications = [
      {
         id: 1,
         title: "New election available",
         message: "City Council Election is now open for voting",
         time: "2 hours ago",
         isUnread: true,
      },
      {
         id: 2,
         title: "Reminder: School Board Election",
         message: "Don't forget to cast your vote before May 25",
         time: "1 day ago",
         isUnread: false,
      },
      {
         id: 3,
         title: "Vote recorded",
         message: "Your vote in Neighborhood Watch Election has been recorded",
         time: "3 days ago",
         isUnread: false,
      },
   ];

   return (
      <DashboardLayout>
         <div className="flex flex-col space-y-6">
            <div>
               <h1 className="text-2xl font-bold tracking-tight">Hello, John Doe!</h1>
               <p className="text-muted-foreground">Here's what's happening with your elections.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
               <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm font-medium">Ongoing Elections</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{summaryData.ongoing}</div>
                     <p className="text-xs text-muted-foreground">Elections you can vote in now</p>
                  </CardContent>
               </Card>
               <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm font-medium">Upcoming Elections</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{summaryData.upcoming}</div>
                     <p className="text-xs text-muted-foreground">Elections starting soon</p>
                  </CardContent>
               </Card>
               <Card className="border-l-4 border-l-gray-500">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm font-medium">Completed Elections</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{summaryData.completed}</div>
                     <p className="text-xs text-muted-foreground">Elections you've participated in</p>
                  </CardContent>
               </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
               {/* Recent Elections */}
               <Card className="col-span-1">
                  <CardHeader>
                     <CardTitle>Recent Elections</CardTitle>
                     <CardDescription>Your most recent election activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        {recentElections.map((election) => (
                           <div key={election.id} className="flex items-start space-x-4">
                              <div
                                 className={`mt-0.5 rounded-full p-1 ${
                                    election.status === "ongoing" ? "bg-green-100 text-green-600" : election.status === "upcoming" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                                 }`}
                              >
                                 {election.status === "ongoing" ? (
                                    <CheckCircle className="h-4 w-4" />
                                 ) : election.status === "upcoming" ? (
                                    <Calendar className="h-4 w-4" />
                                 ) : (
                                    <Clock className="h-4 w-4" />
                                 )}
                              </div>
                              <div className="flex-1 space-y-1">
                                 <p className="text-sm font-medium leading-none">{election.name}</p>
                                 <p className="text-xs text-muted-foreground">
                                    {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
                                 </p>
                              </div>
                              <div>
                                 <Link
                                    href={
                                       election.status === "ongoing"
                                          ? `/dashboard/elections/${election.id}/vote`
                                          : election.status === "upcoming"
                                          ? `/dashboard/elections/${election.id}`
                                          : `/dashboard/elections/${election.id}/results`
                                    }
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                       election.status === "ongoing" ? "bg-green-100 text-green-800" : election.status === "upcoming" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                    }`}
                                 >
                                    {election.status === "ongoing" ? "Vote Now" : election.status === "upcoming" ? "Coming Soon" : "View Results"}
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                 </Link>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="mt-4 text-center">
                        <Link href="/dashboard/elections" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                           View all elections
                        </Link>
                     </div>
                  </CardContent>
               </Card>

               {/* Recent Notifications */}
               <Card className="col-span-1">
                  <CardHeader>
                     <CardTitle>Recent Notifications</CardTitle>
                     <CardDescription>Updates about your elections</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        {notifications.map((notification) => (
                           <div key={notification.id} className="flex items-start space-x-4">
                              <div className={`mt-0.5 rounded-full p-1 ${notification.isUnread ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
                                 <Bell className="h-4 w-4" />
                              </div>
                              <div className="flex-1 space-y-1">
                                 <p className={`text-sm leading-none ${notification.isUnread ? "font-medium" : "font-normal text-muted-foreground"}`}>{notification.title}</p>
                                 <p className="text-xs text-muted-foreground">{notification.message}</p>
                                 <p className="text-xs text-gray-400">{notification.time}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="mt-4 text-center">
                        <Link href="/dashboard/notifications" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                           View all notifications
                        </Link>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </DashboardLayout>
   );
}
