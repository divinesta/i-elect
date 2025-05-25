"use client";
import Link from "next/link";
import { Calendar, CheckCircle, Clock } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ElectionsPage() {
   // Sample data - in a real app, this would come from an API
   const elections = [
      {
         id: 1,
         name: "City Council Election",
         description: "Vote for your local city council representatives",
         status: "ongoing",
         startDate: "2025-05-20",
         endDate: "2025-05-27",
      },
      {
         id: 2,
         name: "School Board Election",
         description: "Select members for the district school board",
         status: "ongoing",
         startDate: "2025-05-18",
         endDate: "2025-05-25",
      },
      {
         id: 3,
         name: "Community Center Proposal",
         description: "Vote on the proposal for a new community center",
         status: "upcoming",
         startDate: "2025-05-30",
         endDate: "2025-06-06",
      },
      {
         id: 4,
         name: "Park Renovation Budget",
         description: "Approve the budget for local park renovations",
         status: "upcoming",
         startDate: "2025-06-05",
         endDate: "2025-06-12",
      },
      {
         id: 5,
         name: "Neighborhood Watch Election",
         description: "Select neighborhood watch coordinators",
         status: "completed",
         startDate: "2025-04-10",
         endDate: "2025-04-17",
      },
      {
         id: 6,
         name: "Library Funding Proposal",
         description: "Vote on increased funding for public libraries",
         status: "completed",
         startDate: "2025-03-15",
         endDate: "2025-03-22",
      },
      {
         id: 7,
         name: "Transportation Initiative",
         description: "Vote on the city's new transportation initiative",
         status: "completed",
         startDate: "2025-02-20",
         endDate: "2025-02-27",
      },
   ];

   return (
      <DashboardLayout>
         <div className="flex flex-col space-y-6">
            <div>
               <h1 className="text-2xl font-bold tracking-tight">Elections</h1>
               <p className="text-muted-foreground">View and participate in available elections.</p>
            </div>

            <Tabs defaultValue="all" className="w-full">
               <TabsList className="grid w-full grid-cols-4 md:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
               </TabsList>

               {["all", "ongoing", "upcoming", "completed"].map((tab) => (
                  <TabsContent key={tab} value={tab} className="mt-6">
                     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {elections
                           .filter((election) => tab === "all" || election.status === tab)
                           .map((election) => (
                              <Card key={election.id} className="overflow-hidden">
                                 <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                       <div
                                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                             election.status === "ongoing" ? "bg-green-100 text-green-800" : election.status === "upcoming" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                          }`}
                                       >
                                          {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                                       </div>
                                       <div
                                          className={`rounded-full p-1 ${
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
                                    </div>
                                    <CardTitle className="text-lg">{election.name}</CardTitle>
                                 </CardHeader>
                                 <CardContent>
                                    <p className="text-sm text-muted-foreground">{election.description}</p>
                                    <div className="mt-2 text-xs text-muted-foreground">
                                       <div className="flex justify-between">
                                          <span>Start Date:</span>
                                          <span>{new Date(election.startDate).toLocaleDateString()}</span>
                                       </div>
                                       <div className="flex justify-between">
                                          <span>End Date:</span>
                                          <span>{new Date(election.endDate).toLocaleDateString()}</span>
                                       </div>
                                    </div>
                                 </CardContent>
                                 <CardFooter>
                                    {election.status === "ongoing" ? (
                                       <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                                          <Link href={`/dashboard/elections/${election.id}/vote`}>Vote Now</Link>
                                       </Button>
                                    ) : election.status === "upcoming" ? (
                                       <Button disabled className="w-full">
                                          Coming Soon
                                       </Button>
                                    ) : (
                                       <Button asChild variant="outline" className="w-full">
                                          <Link href={`/dashboard/elections/${election.id}/results`}>View Results</Link>
                                       </Button>
                                    )}
                                 </CardFooter>
                              </Card>
                           ))}
                     </div>

                     {elections.filter((election) => tab === "all" || election.status === tab).length === 0 && (
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                              <Calendar className="h-6 w-6 text-gray-400" />
                           </div>
                           <h3 className="mt-2 text-sm font-semibold text-gray-900">No elections found</h3>
                           <p className="mt-1 text-sm text-gray-500">
                              {tab === "ongoing"
                                 ? "There are no ongoing elections at the moment."
                                 : tab === "upcoming"
                                 ? "There are no upcoming elections scheduled."
                                 : tab === "completed"
                                 ? "You haven't participated in any elections yet."
                                 : "There are no elections available."}
                           </p>
                        </div>
                     )}
                  </TabsContent>
               ))}
            </Tabs>
         </div>
      </DashboardLayout>
   );
}
