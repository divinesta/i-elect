"use client";;
import { use } from "react";

import { ArrowLeft, Quote, GraduationCap, Users, Star } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/navigation";

import { VotingLayout } from "@/components/voting/voting-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RoleVotingPage(props: { params: Promise<{ role: string }> }) {
   const params = use(props.params);
   const router = useRouter();

   // Sample candidates data with real images
   const roleData = {
      president: {
         title: "Student Body President",
         description: "Lead the student government and represent student interests",
         candidates: [
            {
               id: "sarah-johnson",
               name: "Sarah Johnson",
               course: "Political Science",
               year: "Senior",
               image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face&auto=format",
               quote: "Together, we can build a more inclusive and vibrant campus community.",
               endorsements: 127,
            },
            {
               id: "michael-chen",
               name: "Michael Chen",
               course: "Business Administration",
               year: "Junior",
               image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format",
               quote: "Innovation and collaboration are the keys to unlocking our potential.",
               endorsements: 98,
            },
            {
               id: "emily-rodriguez",
               name: "Emily Rodriguez",
               course: "Environmental Science",
               year: "Senior",
               image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face&auto=format",
               quote: "Let's create sustainable solutions and meaningful change.",
               endorsements: 89,
            },
         ],
      },
      "vice-president": {
         title: "Vice President",
         description: "Support the president and oversee student activities",
         candidates: [
            {
               id: "david-kim",
               name: "David Kim",
               course: "Computer Science",
               year: "Junior",
               image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&auto=format",
               quote: "Technology should serve students, not the other way around.",
               endorsements: 76,
            },
            {
               id: "maria-santos",
               name: "Maria Santos",
               course: "Psychology",
               year: "Senior",
               image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face&auto=format",
               quote: "Mental health and student wellbeing should be our priority.",
               endorsements: 112,
            },
         ],
      },
   };

   const currentRole = roleData[params.role as keyof typeof roleData] || roleData.president;

   const handleVoteClick = (candidateId: string) => {
      const candidate = currentRole.candidates.find((c) => c.id === candidateId);
      if (candidate) {
         router.push(`/vote/${params.role}/confirm?candidate=${candidateId}`);
      }
   };

   return (
      <VotingLayout>
         <div className="max-w-4xl mx-auto space-y-8">
            {/* Simple Header */}
            <div className="space-y-6">
               <Link href="/vote" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Positions
               </Link>

               <div className="text-center space-y-3">
                  <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                     <Users className="h-4 w-4 mr-2" />
                     {currentRole.candidates.length} Candidates
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900">{currentRole.title}</h1>
                  <p className="text-gray-600 max-w-2xl mx-auto">{currentRole.description}</p>
               </div>
            </div>

            {/* Candidates Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
               {currentRole.candidates.map((candidate) => (
                  <Card
                     key={candidate.id}
                     className="group cursor-pointer border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                     onClick={() => handleVoteClick(candidate.id)}
                  >
                     <CardContent className="p-0">
                        {/* Image Section */}
                        <div className="relative">
                           <div className="aspect-[4/3] relative overflow-hidden">
                              <Image
                                 src={candidate.image || "/placeholder.svg"}
                                 alt={candidate.name}
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                 onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(candidate.name + " professional headshot")}`;
                                 }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                           </div>

                           {/* Endorsements Badge */}
                           <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
                              <div className="flex items-center space-x-1 text-xs">
                                 <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                 <span className="font-semibold text-gray-900">{candidate.endorsements}</span>
                              </div>
                           </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 space-y-4">
                           {/* Header */}
                           <div className="space-y-2">
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{candidate.name}</h3>
                              <div className="flex items-center text-sm text-gray-600">
                                 <GraduationCap className="h-4 w-4 mr-1 text-blue-500" />
                                 <span>
                                    {candidate.course} • {candidate.year}
                                 </span>
                              </div>
                           </div>

                           {/* Quote */}
                           <div className="bg-gray-50 rounded-lg p-3 border-l-3 border-blue-500">
                              <Quote className="h-4 w-4 text-blue-400 mb-2" />
                              <p className="text-sm text-gray-700 italic leading-relaxed">&quot;{candidate.quote}&quot;</p>
                           </div>

                           {/* Vote Button */}
                           <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors group-hover:scale-105 duration-300">
                              Vote for {candidate.name.split(" ")[0]}
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>

            {/* Simple Voting Info */}
            <Card className="bg-gray-50 border-gray-200">
               <CardContent className="p-6">
                  <div className="text-center space-y-4">
                     <h3 className="text-lg font-semibold text-gray-900">How to Vote</h3>
                     <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="space-y-2">
                           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-white font-bold text-sm">1</span>
                           </div>
                           <p>
                              <strong>Review</strong> each candidate&apos;s profile
                           </p>
                        </div>
                        <div className="space-y-2">
                           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-white font-bold text-sm">2</span>
                           </div>
                           <p>
                              <strong>Click</strong> on your preferred candidate
                           </p>
                        </div>
                        <div className="space-y-2">
                           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-white font-bold text-sm">3</span>
                           </div>
                           <p>
                              <strong>Confirm</strong> your vote on the next page
                           </p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </VotingLayout>
   );
}
