"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, GraduationCap, Briefcase } from "lucide-react";
import Link from "next/link";

export default function RoleVotingPage() {
   const params = useParams();
   const router = useRouter();
   const { id: electionId, roleId } = params;

   const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

   const role = {
      id: 1,
      name: "President",
      description: "Chief Executive Officer of the Association",
   };

   const candidates = [
      {
         id: 1,
         name: "Sarah Johnson",
         title: "Senior Marketing Director",
         company: "TechCorp Solutions",
         image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
         education: "MBA, Harvard Business School",
         experience: "8 years in leadership",
         quote: "Together, we can build a more inclusive and vibrant campus community.",
         initials: "SJ",
      },
      {
         id: 2,
         name: "Michael Chen",
         title: "Operations Manager",
         company: "Global Dynamics Inc",
         image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
         education: "MS Engineering, Stanford University",
         experience: "12 years in operations",
         quote: "Innovation and collaboration are the keys to unlocking our potential.",
         initials: "MC",
      },
      {
         id: 3,
         name: "Emily Rodriguez",
         title: "Environmental Scientist",
         company: "Green Future Labs",
         image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
         education: "PhD Environmental Science, MIT",
         experience: "6 years in research",
         quote: "Let's create sustainable solutions and meaningful change.",
         initials: "ER",
      },
   ];

   const handleCandidateSelect = (candidateId: number) => {
      setSelectedCandidate(candidateId);
   };

   const handleContinue = () => {
      if (selectedCandidate) {
         router.push(`/dashboard/elections/${electionId}/vote/${roleId}/confirm?candidate=${selectedCandidate}`);
      }
   };

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center space-x-4">
               <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/elections/${electionId}/vote`}>
                     <ArrowLeft className="h-4 w-4 mr-2" />
                     Back
                  </Link>
               </Button>
               <div>
                  <h1 className="text-3xl font-bold text-gray-900">Select Your Candidate</h1>
                  <p className="text-gray-600">
                     Voting for {role.name} • {role.description}
                  </p>
               </div>
            </div>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
               {candidates.map((candidate) => (
                  <Card
                     key={candidate.id}
                     className={`group cursor-pointer transition-all duration-300 hover:shadow-xl ${
                        selectedCandidate === candidate.id ? "ring-2 ring-blue-500 bg-blue-50 border-blue-200" : "hover:border-blue-300"
                     }`}
                     onClick={() => handleCandidateSelect(candidate.id)}
                  >
                     <CardContent className="p-0">
                        {/* Selected Badge */}
                        {selectedCandidate === candidate.id && (
                           <div className="absolute top-4 right-4 z-10">
                              <Badge className="bg-blue-600 text-white">Selected</Badge>
                           </div>
                        )}

                        {/* Image or Initials */}
                        <div className="relative h-48 bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
                           {candidate.image ? (
                              <Image
                                 src={candidate.image || "/placeholder.svg"}
                                 alt={candidate.name}
                                 className="w-full h-full object-cover"
                                 onError={(e) => {
                                    // Fallback to initials if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = "none";
                                    const parent = target.parentElement;
                                    if (parent) {
                                       parent.innerHTML = `
                           <div class="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                              <span class="text-2xl font-bold text-white">${candidate.initials}</span>
                           </div>
                        `;
                                    }
                                 }}
                              />
                           ) : (
                              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                                 <span className="text-2xl font-bold text-white">{candidate.initials}</span>
                              </div>
                           )}
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                           <div>
                              <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                              <div className="flex items-center space-x-2 text-sm text-blue-600 mt-1">
                                 <Briefcase className="h-4 w-4" />
                                 <span>{candidate.title}</span>
                              </div>
                              <p className="text-sm text-gray-600">{candidate.company}</p>
                           </div>

                           <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-1 text-gray-600">
                                 <Briefcase className="h-4 w-4" />
                                 <span>{candidate.experience}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-gray-600">
                                 <GraduationCap className="h-4 w-4" />
                                 <span>{candidate.education.split(",")[0]}</span>
                              </div>
                           </div>

                           <blockquote className="text-sm italic text-blue-700 border-l-4 border-blue-200 pl-3 py-2 bg-blue-50 rounded-r">&quot;{candidate.quote}&quot;</blockquote>

                           <Button
                              className={`w-full transition-all duration-200 ${
                                 selectedCandidate === candidate.id ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                              }`}
                              onClick={(e) => {
                                 e.stopPropagation();
                                 handleCandidateSelect(candidate.id);
                              }}
                           >
                              Vote for {candidate.name}
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>

            {/* Continue Button */}
            {selectedCandidate && (
               <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="bg-white rounded-full shadow-lg border p-2">
                     <div className="flex items-center space-x-3 px-4 py-2">
                        <div className="flex items-center space-x-2 text-sm text-green-700">
                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                           <span>Candidate selected: {candidates.find((c) => c.id === selectedCandidate)?.name}</span>
                        </div>
                        <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                           Continue to Confirmation
                        </Button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
