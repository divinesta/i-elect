"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Users, MapPin, ArrowRight, Settings } from "lucide-react";
import Link from "next/link";

export default function PublicElectionsPage() {
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("all");

   const publicElections = [
      {
         id: 1,
         name: "Student Council Election 2024",
         organization: "Tech University",
         description: "Annual student council election for academic year 2024-2025",
         category: "Academic",
         startDate: "2024-02-01",
         endDate: "2024-02-07",
         status: "Active",
         totalVoters: 1500,
         location: "Tech University Campus",
         isPublic: true,
         accreditationOpen: true,
      },
      {
         id: 2,
         name: "Department Head Election",
         organization: "Computer Science Department",
         description: "Election for the new Computer Science Department Head",
         category: "Academic",
         startDate: "2024-02-10",
         endDate: "2024-02-15",
         status: "Upcoming",
         totalVoters: 45,
         location: "CS Department",
         isPublic: true,
         accreditationOpen: true,
      },
      {
         id: 3,
         name: "Community Board Election",
         organization: "Riverside Community",
         description: "Election for community board representatives",
         category: "Community",
         startDate: "2024-02-20",
         endDate: "2024-02-25",
         status: "Upcoming",
         totalVoters: 850,
         location: "Riverside District",
         isPublic: true,
         accreditationOpen: false,
      },
      {
         id: 4,
         name: "Club President Election",
         organization: "Photography Club",
         description: "Annual election for club president and executive positions",
         category: "Organization",
         startDate: "2024-01-25",
         endDate: "2024-01-30",
         status: "Completed",
         totalVoters: 120,
         location: "Photography Club",
         isPublic: true,
         accreditationOpen: false,
      },
   ];

   const categories = ["all", "Academic", "Community", "Organization", "Corporate"];

   const filteredElections = publicElections.filter((election) => {
      const matchesSearch = election.name.toLowerCase().includes(searchTerm.toLowerCase()) || election.organization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || election.category === selectedCategory;
      return matchesSearch && matchesCategory;
   });

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Active":
            return "bg-green-100 text-green-800 border-green-200";
         case "Upcoming":
            return "bg-blue-100 text-blue-800 border-blue-200";
         case "Completed":
            return "bg-gray-100 text-gray-800 border-gray-200";
         default:
            return "bg-gray-100 text-gray-800 border-gray-200";
      }
   };

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <div className="bg-gradient-to-r from-[#00A9FF] to-[#89CFF3] text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
               <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold">Discover Elections</h1>
                  <p className="text-xl text-blue-100">Find and participate in elections happening around you</p>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input placeholder="Search elections by name or organization..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 h-12 text-lg" />
               </div>

               <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                     <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category ? "bg-[#00A9FF] hover:bg-[#0088CC]" : ""}
                     >
                        {category === "all" ? "All Categories" : category}
                     </Button>
                  ))}
               </div>
            </div>

            {/* Elections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredElections.map((election) => (
                  <Card key={election.id} className="hover:shadow-lg transition-shadow group">
                     <CardHeader>
                        <div className="flex items-start justify-between">
                           <div className="space-y-1">
                              <CardTitle className="text-lg group-hover:text-[#00A9FF] transition-colors">{election.name}</CardTitle>
                              <CardDescription className="font-medium text-[#00A9FF]">{election.organization}</CardDescription>
                           </div>
                           <Badge className={`${getStatusColor(election.status)} border`}>{election.status}</Badge>
                        </div>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600 line-clamp-2">{election.description}</p>

                        <div className="space-y-2 text-sm">
                           <div className="flex items-center space-x-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>
                                 {election.startDate} - {election.endDate}
                              </span>
                           </div>
                           <div className="flex items-center space-x-2 text-gray-600">
                              <Users className="h-4 w-4" />
                              <span>{election.totalVoters} eligible voters</span>
                           </div>
                           <div className="flex items-center space-x-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{election.location}</span>
                           </div>
                        </div>

                        <div className="pt-4 border-t">
                           <div className="flex flex-col space-y-2">
                              {/* Admin/Manage Button */}
                              <Button variant="outline" className="w-full" asChild>
                                 <Link href={`/dashboard/elections/${election.id}/admin`}>
                                    <Settings className="h-4 w-4 mr-2" />
                                    Manage Election
                                 </Link>
                              </Button>

                              {/* Existing action buttons */}
                              {election.accreditationOpen ? (
                                 <Button className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white" asChild>
                                    <Link href={`/dashboard/elections/${election.id}/accredit`}>
                                       Get Accredited
                                       <ArrowRight className="h-4 w-4 ml-2" />
                                    </Link>
                                 </Button>
                              ) : election.status === "Active" ? (
                                 <Button variant="outline" className="w-full" disabled>
                                    Accreditation Closed
                                 </Button>
                              ) : (
                                 <Button variant="outline" className="w-full" asChild>
                                    <Link href={`/dashboard/elections/${election.id}/results`}>
                                       View Results
                                       <ArrowRight className="h-4 w-4 ml-2" />
                                    </Link>
                                 </Button>
                              )}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>

            {filteredElections.length === 0 && (
               <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No elections found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or filters</p>
               </div>
            )}
         </div>
      </div>
   );
}
