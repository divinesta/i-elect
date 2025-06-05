"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Vote, Users, Calendar, AlertCircle, TrendingUp, ArrowUpRight, Plus, Settings, Eye } from "lucide-react";
import Link from "next/link";

export default function DashboardHomePage() {
   const myElections = [
      {
         id: 1,
         name: "Student Council Election 2024",
         status: "Active",
         totalVoters: 150,
         votesReceived: 89,
         pendingAccreditations: 5,
         endDate: "2024-02-07",
      },
      {
         id: 2,
         name: "Department Head Election",
         status: "Completed",
         totalVoters: 45,
         votesReceived: 45,
         pendingAccreditations: 0,
         endDate: "2024-01-30",
      },
      {
         id: 3,
         name: "Club President Election",
         status: "Draft",
         totalVoters: 0,
         votesReceived: 0,
         pendingAccreditations: 0,
         endDate: "2024-03-15",
      },
   ];

   const availableElections = [
      {
         id: 4,
         name: "University Senate Election",
         organization: "University Administration",
         status: "Active",
         hasVoted: false,
         endDate: "2024-02-25",
      },
      {
         id: 5,
         name: "Community Board Election",
         organization: "Riverside Community",
         status: "Upcoming",
         hasVoted: false,
         endDate: "2024-03-10",
      },
   ];

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Active":
            return "bg-green-100 text-green-800 border-green-200";
         case "Draft":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
         case "Completed":
            return "bg-slate-100 text-slate-800 border-slate-200";
         case "Upcoming":
            return "bg-blue-100 text-blue-800 border-blue-200";
         default:
            return "bg-slate-100 text-slate-800 border-slate-200";
      }
   };

   return (
      <div className="space-y-8">
         {/* Welcome Section */}
         <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">Hello, John Doe! 👋</h1>
            <p className="text-slate-600 text-lg">Welcome back to your voting dashboard</p>
         </div>

         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="modern-card group hover:scale-[1.02] transition-all duration-200">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Elections Created</CardTitle>
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                     <Vote className="h-5 w-5 text-blue-700" />
                  </div>
               </CardHeader>
               <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{myElections.length}</div>
                  <div className="flex items-center space-x-1 mt-2">
                     <TrendingUp className="h-4 w-4 text-green-600" />
                     <span className="text-sm text-green-600 font-medium">{myElections.filter((e) => e.status === "Active").length} active</span>
                  </div>
               </CardContent>
            </Card>

            <Card className="modern-card group hover:scale-[1.02] transition-all duration-200">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Available to Vote</CardTitle>
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                     <Users className="h-5 w-5 text-green-700" />
                  </div>
               </CardHeader>
               <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{availableElections.length}</div>
                  <div className="flex items-center space-x-1 mt-2">
                     <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                     <span className="text-sm text-green-600 font-medium">{availableElections.filter((e) => !e.hasVoted).length} pending votes</span>
                  </div>
               </CardContent>
            </Card>

            <Card className="modern-card group hover:scale-[1.02] transition-all duration-200">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Pending Accreditations</CardTitle>
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                     <AlertCircle className="h-5 w-5 text-orange-700" />
                  </div>
               </CardHeader>
               <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{myElections.reduce((acc, e) => acc + e.pendingAccreditations, 0)}</div>
                  <div className="flex items-center space-x-1 mt-2">
                     <AlertCircle className="h-4 w-4 text-orange-600" />
                     <span className="text-sm text-orange-600 font-medium">Needs attention</span>
                  </div>
               </CardContent>
            </Card>

            <Card className="modern-card group hover:scale-[1.02] transition-all duration-200">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Votes Cast</CardTitle>
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                     <Calendar className="h-5 w-5 text-purple-700" />
                  </div>
               </CardHeader>
               <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{myElections.reduce((acc, e) => acc + e.votesReceived, 0)}</div>
                  <p className="text-sm text-slate-500 mt-2">Across all elections</p>
               </CardContent>
            </Card>
         </div>

         {/* Available Elections */}
         <Card className="modern-card">
            <CardHeader>
               <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                     <Users className="h-5 w-5 text-green-700" />
                  </div>
                  <span className="text-slate-900">Elections You Can Vote In</span>
               </CardTitle>
               <CardDescription>Elections where you&apos;re eligible to participate</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {availableElections.map((election) => (
                     <div key={election.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex-1">
                           <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-slate-900">{election.name}</h3>
                              <Badge className={`${getStatusColor(election.status)} border`}>{election.status}</Badge>
                              {election.hasVoted && <Badge className="bg-green-100 text-green-800 border-green-200">✓ Voted</Badge>}
                           </div>
                           <div className="flex items-center space-x-6 text-sm text-slate-600">
                              <span>By: {election.organization}</span>
                              <span>Ends: {election.endDate}</span>
                           </div>
                        </div>
                        <div className="flex items-center space-x-2">
                           {!election.hasVoted && election.status === "Active" ? (
                              <Button className="bg-green-700 hover:bg-green-800 text-white" size="sm" asChild>
                                 <Link href={`/dashboard/elections/${election.id}/vote`}>
                                    <Vote className="h-4 w-4 mr-1" />
                                    Vote Now
                                 </Link>
                              </Button>
                           ) : (
                              <Button variant="outline" size="sm" asChild>
                                 <Link href={`/dashboard/elections/${election.id}/results`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Details
                                 </Link>
                              </Button>
                           )}
                           <ArrowUpRight className="h-4 w-4 text-slate-400" />
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* My Elections */}
         <Card className="modern-card">
            <CardHeader>
               <div className="flex items-center justify-between">
                  <div>
                     <CardTitle className="flex items-center space-x-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                           <Vote className="h-5 w-5 text-blue-700" />
                        </div>
                        <span className="text-slate-900">My Elections</span>
                     </CardTitle>
                     <CardDescription>Elections you&apos;ve created and are managing</CardDescription>
                  </div>
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white" asChild>
                     <Link href="/dashboard/elections/create">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Election
                     </Link>
                  </Button>
               </div>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {myElections.map((election) => (
                     <div key={election.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex-1">
                           <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-slate-900">{election.name}</h3>
                              <Badge className={`${getStatusColor(election.status)} border`}>{election.status}</Badge>
                              {election.pendingAccreditations > 0 && <Badge className="bg-orange-100 text-orange-800 border-orange-200">{election.pendingAccreditations} pending</Badge>}
                           </div>
                           <div className="flex items-center space-x-6 text-sm text-slate-600">
                              <span>
                                 {election.votesReceived}/{election.totalVoters} votes
                              </span>
                              <span>Ends: {election.endDate}</span>
                           </div>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/elections/${election.id}/manage`}>
                                 <Settings className="h-4 w-4 mr-1" />
                                 Manage
                              </Link>
                           </Button>
                           <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/elections/${election.id}/results`}>
                                 <Eye className="h-4 w-4 mr-1" />
                                 Results
                              </Link>
                           </Button>
                           <ArrowUpRight className="h-4 w-4 text-slate-400" />
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Quick Actions */}
         <Card className="modern-card">
            <CardHeader>
               <CardTitle className="text-slate-900">Quick Actions</CardTitle>
               <CardDescription>Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link
                     href="/dashboard/elections/create"
                     className="p-6 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer group"
                  >
                     <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                           <Plus className="h-5 w-5 text-blue-700" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Create New Election</h3>
                     </div>
                     <p className="text-sm text-slate-600">Set up a new voting process with custom requirements</p>
                  </Link>

                  <Link href="/dashboard/elections" className="p-6 border border-slate-200 rounded-xl hover:border-green-300 hover:bg-green-50/50 transition-all duration-200 cursor-pointer group">
                     <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                           <Users className="h-5 w-5 text-green-700" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Browse Public Elections</h3>
                     </div>
                     <p className="text-sm text-slate-600">Find and participate in elections happening around you</p>
                  </Link>

                  <Link href="/dashboard/elections" className="p-6 border border-slate-200 rounded-xl hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 cursor-pointer group">
                     <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                           <Vote className="h-5 w-5 text-purple-700" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Manage All Elections</h3>
                     </div>
                     <p className="text-sm text-slate-600">View and manage all your elections in one place</p>
                  </Link>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
