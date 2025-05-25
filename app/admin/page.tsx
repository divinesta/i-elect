"use client";

import { Calendar, Users, Vote, BarChart3, Plus, Eye } from "lucide-react";
import Link from "next/link";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
   // Sample data
   const stats = {
      activeElections: 2,
      totalCandidates: 11,
      registeredVoters: 1500,
      completedElections: 5,
   };

   const recentElections = [
      {
         id: 1,
         name: "Student Government Elections 2025",
         status: "active",
         startDate: "2025-03-15",
         endDate: "2025-03-22",
         votersCount: 847,
         candidatesCount: 11,
      },
      {
         id: 2,
         name: "Faculty Representative Election",
         status: "upcoming",
         startDate: "2025-04-01",
         endDate: "2025-04-08",
         votersCount: 0,
         candidatesCount: 6,
      },
      {
         id: 3,
         name: "Club Leadership Elections",
         status: "completed",
         startDate: "2025-02-10",
         endDate: "2025-02-17",
         votersCount: 234,
         candidatesCount: 8,
      },
   ];

   const quickActions = [
      {
         title: "Create New Election",
         description: "Set up a new election with positions and dates",
         href: "/admin/elections/new",
         icon: Plus,
         color: "bg-[#1D4ED8]",
      },
      {
         title: "Add Candidates",
         description: "Upload candidate information and photos",
         href: "/admin/candidates/new",
         icon: Users,
         color: "bg-green-600",
      },
      {
         title: "View Analytics",
         description: "Check voter turnout and election statistics",
         href: "/admin/analytics",
         icon: BarChart3,
         color: "bg-purple-600",
      },
   ];

   return (
      <AdminLayout>
         <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600 mt-1">Manage elections, candidates, and voter analytics</p>
               </div>
               <Button className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white" asChild>
                  <Link href="/admin/elections/new">
                     <Plus className="h-4 w-4 mr-2" />
                     New Election
                  </Link>
               </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <Card>
                  <CardContent className="p-6">
                     <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                           <Vote className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                           <p className="text-sm font-medium text-gray-600">Active Elections</p>
                           <p className="text-2xl font-bold text-gray-900">{stats.activeElections}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardContent className="p-6">
                     <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                           <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                           <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                           <p className="text-2xl font-bold text-gray-900">{stats.totalCandidates}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardContent className="p-6">
                     <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                           <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                           <p className="text-sm font-medium text-gray-600">Registered Voters</p>
                           <p className="text-2xl font-bold text-gray-900">{stats.registeredVoters.toLocaleString()}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardContent className="p-6">
                     <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-lg">
                           <BarChart3 className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="ml-4">
                           <p className="text-sm font-medium text-gray-600">Completed Elections</p>
                           <p className="text-2xl font-bold text-gray-900">{stats.completedElections}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Quick Actions */}
            <div>
               <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {quickActions.map((action, index) => (
                     <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href={action.href}>
                           <CardContent className="p-6">
                              <div className="flex items-center space-x-4">
                                 <div className={`p-3 rounded-lg ${action.color}`}>
                                    <action.icon className="h-6 w-6 text-white" />
                                 </div>
                                 <div>
                                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                                    <p className="text-sm text-gray-600">{action.description}</p>
                                 </div>
                              </div>
                           </CardContent>
                        </Link>
                     </Card>
                  ))}
               </div>
            </div>

            {/* Recent Elections */}
            <div>
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Recent Elections</h2>
                  <Button variant="outline" asChild>
                     <Link href="/admin/elections">View All</Link>
                  </Button>
               </div>

               <div className="space-y-4">
                  {recentElections.map((election) => (
                     <Card key={election.id}>
                        <CardContent className="p-6">
                           <div className="flex items-center justify-between">
                              <div className="flex-1">
                                 <div className="flex items-center space-x-3">
                                    <h3 className="text-lg font-semibold text-gray-900">{election.name}</h3>
                                    <span
                                       className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          election.status === "active" ? "bg-green-100 text-green-800" : election.status === "upcoming" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                       }`}
                                    >
                                       {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                                    </span>
                                 </div>
                                 <div className="mt-2 flex items-center space-x-6 text-sm text-gray-600">
                                    <div className="flex items-center">
                                       <Calendar className="h-4 w-4 mr-1" />
                                       <span>
                                          {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
                                       </span>
                                    </div>
                                    <div className="flex items-center">
                                       <Users className="h-4 w-4 mr-1" />
                                       <span>{election.candidatesCount} candidates</span>
                                    </div>
                                    <div className="flex items-center">
                                       <Vote className="h-4 w-4 mr-1" />
                                       <span>{election.votersCount} votes</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex space-x-2">
                                 <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                 </Button>
                                 {election.status === "active" && (
                                    <Button size="sm" className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white">
                                       Manage
                                    </Button>
                                 )}
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>
         </div>
      </AdminLayout>
   );
}
