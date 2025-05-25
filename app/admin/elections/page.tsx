"use client";

import { useState } from "react";
import { Calendar, Users, Vote, Search, Plus, Eye, Edit, Trash2, Play, BarChart3 } from "lucide-react";
import Link from "next/link";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ElectionsPage() {
   const [searchTerm, setSearchTerm] = useState("");

   // Sample elections data
   const elections = [
      {
         id: 1,
         name: "Student Government Elections 2025",
         description: "Annual student government representative elections",
         status: "active",
         startDate: "2025-03-15",
         endDate: "2025-03-22",
         startTime: "08:00",
         endTime: "18:00",
         positions: 4,
         candidates: 11,
         voters: 847,
         totalEligible: 1500,
      },
      {
         id: 2,
         name: "Faculty Representative Election",
         description: "Election for faculty representatives to the academic board",
         status: "upcoming",
         startDate: "2025-04-01",
         endDate: "2025-04-08",
         startTime: "09:00",
         endTime: "17:00",
         positions: 2,
         candidates: 6,
         voters: 0,
         totalEligible: 1200,
      },
      {
         id: 3,
         name: "Club Leadership Elections",
         description: "Elections for various student club leadership positions",
         status: "completed",
         startDate: "2025-02-10",
         endDate: "2025-02-17",
         startTime: "08:00",
         endTime: "20:00",
         positions: 6,
         candidates: 18,
         voters: 456,
         totalEligible: 800,
      },
      {
         id: 4,
         name: "Dormitory Council Elections",
         description: "Election for dormitory council representatives",
         status: "draft",
         startDate: "2025-05-01",
         endDate: "2025-05-08",
         startTime: "08:00",
         endTime: "18:00",
         positions: 3,
         candidates: 0,
         voters: 0,
         totalEligible: 600,
      },
   ];

   const filteredElections = elections.filter((election) => election.name.toLowerCase().includes(searchTerm.toLowerCase()) || election.description.toLowerCase().includes(searchTerm.toLowerCase()));

   const getStatusColor = (status: string) => {
      switch (status) {
         case "active":
            return "bg-green-100 text-green-800";
         case "upcoming":
            return "bg-blue-100 text-blue-800";
         case "completed":
            return "bg-gray-100 text-gray-800";
         case "draft":
            return "bg-yellow-100 text-yellow-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   const getStatusIcon = (status: string) => {
      switch (status) {
         case "active":
            return <Play className="h-4 w-4" />;
         case "upcoming":
            return <Calendar className="h-4 w-4" />;
         case "completed":
            return <BarChart3 className="h-4 w-4" />;
         case "draft":
            return <Edit className="h-4 w-4" />;
         default:
            return <Calendar className="h-4 w-4" />;
      }
   };

   const filterByStatus = (status: string) => {
      if (status === "all") return elections;
      return elections.filter((election) => election.status === status);
   };

   return (
      <AdminLayout>
         <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold text-gray-900">Elections</h1>
                  <p className="text-gray-600 mt-1">Manage and monitor all elections</p>
               </div>
               <Button className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white" asChild>
                  <Link href="/admin/elections/new">
                     <Plus className="h-4 w-4 mr-2" />
                     Create Election
                  </Link>
               </Button>
            </div>

            {/* Search */}
            <Card>
               <CardContent className="p-6">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                     <Input placeholder="Search elections by name or description..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                  </div>
               </CardContent>
            </Card>

            {/* Elections Tabs */}
            <Tabs defaultValue="all" className="w-full">
               <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All ({elections.length})</TabsTrigger>
                  <TabsTrigger value="active">Active ({filterByStatus("active").length})</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming ({filterByStatus("upcoming").length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({filterByStatus("completed").length})</TabsTrigger>
                  <TabsTrigger value="draft">Draft ({filterByStatus("draft").length})</TabsTrigger>
               </TabsList>

               {["all", "active", "upcoming", "completed", "draft"].map((tab) => (
                  <TabsContent key={tab} value={tab} className="mt-6">
                     <div className="space-y-4">
                        {(tab === "all" ? filteredElections : filterByStatus(tab)).map((election) => (
                           <Card key={election.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-6">
                                 <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                       {/* Header */}
                                       <div className="flex items-center space-x-3 mb-3">
                                          <h3 className="text-xl font-semibold text-gray-900">{election.name}</h3>
                                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(election.status)}`}>
                                             {getStatusIcon(election.status)}
                                             <span className="ml-1">{election.status.charAt(0).toUpperCase() + election.status.slice(1)}</span>
                                          </span>
                                       </div>

                                       {/* Description */}
                                       <p className="text-gray-600 mb-4">{election.description}</p>

                                       {/* Stats */}
                                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                          <div className="flex items-center space-x-2">
                                             <Calendar className="h-4 w-4 text-gray-400" />
                                             <div>
                                                <p className="text-sm text-gray-600">Duration</p>
                                                <p className="text-sm font-medium">
                                                   {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
                                                </p>
                                             </div>
                                          </div>

                                          <div className="flex items-center space-x-2">
                                             <Vote className="h-4 w-4 text-gray-400" />
                                             <div>
                                                <p className="text-sm text-gray-600">Positions</p>
                                                <p className="text-sm font-medium">{election.positions}</p>
                                             </div>
                                          </div>

                                          <div className="flex items-center space-x-2">
                                             <Users className="h-4 w-4 text-gray-400" />
                                             <div>
                                                <p className="text-sm text-gray-600">Candidates</p>
                                                <p className="text-sm font-medium">{election.candidates}</p>
                                             </div>
                                          </div>

                                          <div className="flex items-center space-x-2">
                                             <BarChart3 className="h-4 w-4 text-gray-400" />
                                             <div>
                                                <p className="text-sm text-gray-600">Participation</p>
                                                <p className="text-sm font-medium">
                                                   {election.voters} / {election.totalEligible} ({((election.voters / election.totalEligible) * 100).toFixed(1)}%)
                                                </p>
                                             </div>
                                          </div>
                                       </div>

                                       {/* Progress Bar for Active Elections */}
                                       {election.status === "active" && (
                                          <div className="mb-4">
                                             <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                <span>Voter Turnout</span>
                                                <span>{((election.voters / election.totalEligible) * 100).toFixed(1)}%</span>
                                             </div>
                                             <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-[#1D4ED8] h-2 rounded-full" style={{ width: `${(election.voters / election.totalEligible) * 100}%` }} />
                                             </div>
                                          </div>
                                       )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col space-y-2 ml-6">
                                       <Button variant="outline" size="sm" className="w-24">
                                          <Eye className="h-4 w-4 mr-1" />
                                          View
                                       </Button>

                                       {election.status !== "completed" && (
                                          <Button variant="outline" size="sm" className="w-24">
                                             <Edit className="h-4 w-4 mr-1" />
                                             Edit
                                          </Button>
                                       )}

                                       {election.status === "active" && (
                                          <Button size="sm" className="w-24 bg-[#1D4ED8] hover:bg-[#1e40af] text-white">
                                             <BarChart3 className="h-4 w-4 mr-1" />
                                             Monitor
                                          </Button>
                                       )}

                                       {election.status === "completed" && (
                                          <Button size="sm" className="w-24 bg-green-600 hover:bg-green-700 text-white">
                                             <BarChart3 className="h-4 w-4 mr-1" />
                                             Results
                                          </Button>
                                       )}

                                       {election.status === "draft" && (
                                          <Button variant="outline" size="sm" className="w-24 text-red-600 hover:text-red-700">
                                             <Trash2 className="h-4 w-4 mr-1" />
                                             Delete
                                          </Button>
                                       )}
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>
                        ))}

                        {(tab === "all" ? filteredElections : filterByStatus(tab)).length === 0 && (
                           <Card>
                              <CardContent className="p-12 text-center">
                                 <div className="text-gray-400 mb-4">
                                    <Vote className="h-12 w-12 mx-auto" />
                                 </div>
                                 <h3 className="text-lg font-medium text-gray-900 mb-2">{tab === "all" && searchTerm ? "No elections found" : `No ${tab} elections`}</h3>
                                 <p className="text-gray-600 mb-4">{tab === "all" && searchTerm ? "Try adjusting your search terms." : `There are no ${tab} elections at the moment.`}</p>
                                 {tab === "all" && !searchTerm && (
                                    <Button className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white" asChild>
                                       <Link href="/admin/elections/new">Create Your First Election</Link>
                                    </Button>
                                 )}
                              </CardContent>
                           </Card>
                        )}
                     </div>
                  </TabsContent>
               ))}
            </Tabs>
         </div>
      </AdminLayout>
   );
}
