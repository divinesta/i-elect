"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CandidatesPage() {
   const [searchTerm, setSearchTerm] = useState("");

   // Sample candidates data
   const candidates = [
      {
         id: 1,
         name: "Sarah Johnson",
         position: "Student Body President",
         course: "Political Science",
         year: "Senior",
         university: "State University",
         image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
         quote: "Together, we can build a more inclusive campus community.",
         status: "active",
      },
      {
         id: 2,
         name: "Michael Chen",
         position: "Student Body President",
         course: "Business Administration",
         year: "Junior",
         university: "State University",
         image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
         quote: "Innovation and collaboration are the keys to success.",
         status: "active",
      },
      {
         id: 3,
         name: "David Kim",
         position: "Vice President",
         course: "Computer Science",
         year: "Junior",
         university: "State University",
         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
         quote: "Technology should serve students, not the other way around.",
         status: "active",
      },
      {
         id: 4,
         name: "Maria Santos",
         position: "Vice President",
         course: "Psychology",
         year: "Senior",
         university: "State University",
         image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
         quote: "Mental health and student wellbeing should be our priority.",
         status: "draft",
      },
   ];

   const filteredCandidates = candidates.filter(
      (candidate) =>
         candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
         candidate.course.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <AdminLayout>
         <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
                  <p className="text-gray-600 mt-1">Manage candidate information and photos</p>
               </div>
               <Button className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white" asChild>
                  <Link href="/admin/candidates/new">
                     <Plus className="h-4 w-4 mr-2" />
                     Add Candidate
                  </Link>
               </Button>
            </div>

            {/* Search */}
            <Card>
               <CardContent className="p-6">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                     <Input placeholder="Search candidates by name, position, or course..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                  </div>
               </CardContent>
            </Card>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredCandidates.map((candidate) => (
                  <Card key={candidate.id} className="overflow-hidden">
                     <CardContent className="p-0">
                        {/* Image */}
                        <div className="relative h-48 bg-gray-200">
                           <img
                              src={candidate.image || "/placeholder.svg"}
                              alt={candidate.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                 const target = e.target as HTMLImageElement;
                                 target.src = `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(candidate.name + " portrait")}`;
                              }}
                           />
                           <div className="absolute top-3 right-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${candidate.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                 {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                              </span>
                           </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                           <div>
                              <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                              <p className="text-sm text-[#1D4ED8] font-medium">{candidate.position}</p>
                              <p className="text-sm text-gray-600">
                                 {candidate.course} • {candidate.year}
                              </p>
                              <p className="text-xs text-gray-500">{candidate.university}</p>
                           </div>

                           <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-sm text-gray-700 italic">"{candidate.quote}"</p>
                           </div>

                           {/* Actions */}
                           <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="flex-1">
                                 <Eye className="h-4 w-4 mr-1" />
                                 Preview
                              </Button>
                              <Button variant="outline" size="sm">
                                 <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                 <Trash2 className="h-4 w-4" />
                              </Button>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>

            {filteredCandidates.length === 0 && (
               <Card>
                  <CardContent className="p-12 text-center">
                     <div className="text-gray-400 mb-4">
                        <Plus className="h-12 w-12 mx-auto" />
                     </div>
                     <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
                     <p className="text-gray-600 mb-4">{searchTerm ? "Try adjusting your search terms." : "Get started by adding your first candidate."}</p>
                     <Button className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white" asChild>
                        <Link href="/admin/candidates/new">Add Candidate</Link>
                     </Button>
                  </CardContent>
               </Card>
            )}
         </div>
      </AdminLayout>
   );
}
