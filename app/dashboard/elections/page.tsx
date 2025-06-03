"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Settings, Eye, Vote, Plus } from "lucide-react";
import Link from "next/link";

export default function ElectionsPage() {
   const [activeTab, setActiveTab] = useState("my-elections");

   const myElections = [
      {
         id: 1,
         name: "Student Council Election 2024",
         status: "Active",
         startDate: "2024-01-15",
         endDate: "2024-01-20",
         totalVoters: 150,
         votesReceived: 89,
      },
      {
         id: 2,
         name: "Class Representative Election",
         status: "Draft",
         startDate: "2024-02-01",
         endDate: "2024-02-05",
         totalVoters: 45,
         votesReceived: 0,
      },
      {
         id: 3,
         name: "Club President Election",
         status: "Completed",
         startDate: "2024-01-01",
         endDate: "2024-01-07",
         totalVoters: 78,
         votesReceived: 78,
      },
   ];

   const availableElections = [
      {
         id: 4,
         name: "University Senate Election",
         status: "Active",
         startDate: "2024-01-18",
         endDate: "2024-01-25",
         organizer: "University Administration",
         hasVoted: false,
      },
      {
         id: 5,
         name: "Department Head Election",
         status: "Active",
         startDate: "2024-01-20",
         endDate: "2024-01-27",
         organizer: "Computer Science Dept",
         hasVoted: true,
      },
   ];

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Active":
            return "bg-green-100 text-green-800";
         case "Draft":
            return "bg-yellow-100 text-yellow-800";
         case "Completed":
            return "bg-gray-100 text-gray-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold text-gray-900">Elections</h1>
               <p className="text-gray-600">Manage your elections and participate in voting</p>
            </div>
            <Button className="bg-[#00A9FF] hover:bg-[#0088CC] text-white" asChild>
               <Link href="/dashboard/elections/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Election
               </Link>
            </Button>
         </div>

         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
               <TabsTrigger value="my-elections">My Elections</TabsTrigger>
               <TabsTrigger value="available-to-vote">Available to Vote</TabsTrigger>
            </TabsList>

            <TabsContent value="my-elections" className="space-y-4">
               {myElections.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {myElections.map((election) => (
                        <Card key={election.id} className="hover:shadow-lg transition-shadow">
                           <CardHeader>
                              <div className="flex items-start justify-between">
                                 <CardTitle className="text-lg">{election.name}</CardTitle>
                                 <Badge className={getStatusColor(election.status)}>{election.status}</Badge>
                              </div>
                              <CardDescription>
                                 <div className="flex items-center space-x-4 text-sm">
                                    <span className="flex items-center">
                                       <Calendar className="h-4 w-4 mr-1" />
                                       {election.startDate} - {election.endDate}
                                    </span>
                                 </div>
                              </CardDescription>
                           </CardHeader>
                           <CardContent className="space-y-4">
                              <div className="flex items-center justify-between text-sm">
                                 <span className="flex items-center text-gray-600">
                                    <Users className="h-4 w-4 mr-1" />
                                    Voters: {election.totalVoters}
                                 </span>
                                 <span className="text-[#00A9FF] font-medium">
                                    {election.votesReceived}/{election.totalVoters} votes
                                 </span>
                              </div>

                              <div className="flex space-x-2">
                                 <Button size="sm" variant="outline" className="flex-1" asChild>
                                    <Link href={`/dashboard/elections/${election.id}/manage`}>
                                       <Settings className="h-4 w-4 mr-1" />
                                       Manage
                                    </Link>
                                 </Button>
                                 <Button size="sm" variant="outline" className="flex-1" asChild>
                                    <Link href={`/dashboard/elections/${election.id}/results`}>
                                       <Eye className="h-4 w-4 mr-1" />
                                       Results
                                    </Link>
                                 </Button>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               ) : (
                  <Card className="text-center py-12">
                     <CardContent>
                        <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No elections yet</h3>
                        <p className="text-gray-600 mb-4">Create your first election to get started</p>
                        <Button className="bg-[#00A9FF] hover:bg-[#0088CC] text-white" asChild>
                           <Link href="/dashboard/elections/create">
                              <Plus className="h-4 w-4 mr-2" />
                              Create Election
                           </Link>
                        </Button>
                     </CardContent>
                  </Card>
               )}
            </TabsContent>

            <TabsContent value="available-to-vote" className="space-y-4">
               {availableElections.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {availableElections.map((election) => (
                        <Card key={election.id} className="hover:shadow-lg transition-shadow">
                           <CardHeader>
                              <div className="flex items-start justify-between">
                                 <CardTitle className="text-lg">{election.name}</CardTitle>
                                 <Badge className={getStatusColor(election.status)}>{election.status}</Badge>
                              </div>
                              <CardDescription>
                                 <div className="space-y-1 text-sm">
                                    <div className="flex items-center">
                                       <Calendar className="h-4 w-4 mr-1" />
                                       {election.startDate} - {election.endDate}
                                    </div>
                                    <div>Organized by: {election.organizer}</div>
                                 </div>
                              </CardDescription>
                           </CardHeader>
                           <CardContent className="space-y-4">
                              {election.hasVoted ? (
                                 <div className="text-center py-2">
                                    <Badge className="bg-green-100 text-green-800">✓ Vote Submitted</Badge>
                                 </div>
                              ) : (
                                 <Button className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white" asChild>
                                    <Link href={`/dashboard/elections/${election.id}/vote`}>
                                       <Vote className="h-4 w-4 mr-2" />
                                       Vote Now
                                    </Link>
                                 </Button>
                              )}

                              <Button size="sm" variant="outline" className="w-full" asChild>
                                 <Link href={`/dashboard/elections/${election.id}/results`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Details
                                 </Link>
                              </Button>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               ) : (
                  <Card className="text-center py-12">
                     <CardContent>
                        <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No elections available</h3>
                        <p className="text-gray-600">You haven&apos;t been added to any elections yet</p>
                     </CardContent>
                  </Card>
               )}
            </TabsContent>
         </Tabs>
      </div>
   );
}
