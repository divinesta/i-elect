"use client";
import { Calendar, Users, Trophy, Medal, Award, Crown, CheckCircle } from "lucide-react";

import { VotingLayout } from "@/components/voting/voting-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultsPage() {
   // Sample results data with enhanced information
   const electionResults = [
      {
         position: "Student Body President",
         totalVotes: 1247,
         candidates: [
            {
               name: "Sarah Johnson",
               votes: 542,
               percentage: 43.5,
               winner: true,
               image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face&auto=format",
               course: "Political Science",
               margin: "+11.6%",
            },
            {
               name: "Michael Chen",
               votes: 398,
               percentage: 31.9,
               winner: false,
               image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
               course: "Business Administration",
               margin: "+7.3%",
            },
            {
               name: "Emily Rodriguez",
               votes: 307,
               percentage: 24.6,
               winner: false,
               image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&auto=format",
               course: "Environmental Science",
               margin: "-",
            },
         ],
      },
      {
         position: "Vice President",
         totalVotes: 1198,
         candidates: [
            {
               name: "David Kim",
               votes: 687,
               percentage: 57.3,
               winner: true,
               image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&auto=format",
               course: "Computer Science",
               margin: "+14.6%",
            },
            {
               name: "Maria Santos",
               votes: 511,
               percentage: 42.7,
               winner: false,
               image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face&auto=format",
               course: "Psychology",
               margin: "-",
            },
         ],
      },
      {
         position: "Secretary",
         totalVotes: 1156,
         candidates: [
            {
               name: "Alex Thompson",
               votes: 445,
               percentage: 38.5,
               winner: true,
               image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&auto=format",
               course: "Communications",
               margin: "+4.1%",
            },
            {
               name: "Jessica Lee",
               votes: 398,
               percentage: 34.4,
               winner: false,
               image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&auto=format",
               course: "Journalism",
               margin: "+16.8%",
            },
            {
               name: "Ryan Martinez",
               votes: 203,
               percentage: 17.6,
               winner: false,
               image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face&auto=format",
               course: "English Literature",
               margin: "+8.1%",
            },
            {
               name: "Sophie Wilson",
               votes: 110,
               percentage: 9.5,
               winner: false,
               image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face&auto=format",
               course: "Media Studies",
               margin: "-",
            },
         ],
      },
      {
         position: "Treasurer",
         totalVotes: 1089,
         candidates: [
            {
               name: "James Park",
               votes: 623,
               percentage: 57.2,
               winner: true,
               image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face&auto=format",
               course: "Finance",
               margin: "+14.4%",
            },
            {
               name: "Lisa Chang",
               votes: 466,
               percentage: 42.8,
               winner: false,
               image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face&auto=format",
               course: "Accounting",
               margin: "-",
            },
         ],
      },
   ];

   const totalParticipation = 1247;
   const participationRate = ((totalParticipation / 1500) * 100).toFixed(1);

   const getRankIcon = (index: number) => {
      if (index === 0) return <Crown className="h-5 w-5 text-yellow-500" />;
      if (index === 1) return <Trophy className="h-5 w-5 text-gray-400" />;
      if (index === 2) return <Medal className="h-5 w-5 text-amber-600" />;
      return <Award className="h-4 w-4 text-gray-300" />;
   };

   return (
      <VotingLayout>
         <div className="max-w-6xl mx-auto space-y-8">
            {/* Simple Header */}
            <div className="text-center space-y-4">
               <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  <Calendar className="h-4 w-4 mr-2" />
                  Election Results • March 2025
               </div>
               <h1 className="text-4xl font-bold text-[#1D4ED8]">Election Results</h1>
               <p className="text-lg text-gray-600">Student Government Elections 2025</p>
            </div>

            {/* Simple Stats */}
            <div className="grid grid-cols-3 gap-4">
               <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-[#1D4ED8]">{totalParticipation.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Votes</div>
               </div>
               <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-[#1D4ED8]">{participationRate}%</div>
                  <div className="text-sm text-gray-600">Participation</div>
               </div>
               <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-[#1D4ED8]">4/4</div>
                  <div className="text-sm text-gray-600">Positions Filled</div>
               </div>
            </div>

            {/* Winners Section */}
            <div className="space-y-6">
               <h2 className="text-2xl font-bold text-[#1D4ED8]">🎉 Election Winners</h2>
               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {electionResults.map((position, index) => {
                     const winner = position.candidates.find((c) => c.winner);

                     return (
                        <Card
                           key={index}
                           className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-2 border-green-200 hover:border-green-300 transition-all duration-300 group"
                        >
                           <CardContent className="p-6 relative">
                              <div className="flex items-center justify-between mb-4">
                                 <Crown className="h-6 w-6 text-yellow-500" />
                                 <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">WINNER</div>
                              </div>

                              <div className="text-center space-y-4">
                                 <div className="relative">
                                    <img
                                       src={winner?.image || "/placeholder.svg"}
                                       alt={winner?.name}
                                       className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                                       onError={(e) => {
                                          const target = e.target as HTMLImageElement;
                                          target.src = `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(winner?.name + " winner portrait")}`;
                                       }}
                                    />
                                    <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                                       <Crown className="h-3 w-3 text-yellow-800" />
                                    </div>
                                 </div>

                                 <div>
                                    <h3 className="font-bold text-[#1D4ED8]">{winner?.name}</h3>
                                    <p className="text-sm text-gray-600">{winner?.course}</p>
                                    <p className="text-xs text-gray-500 mt-1">{position.position}</p>
                                 </div>

                                 <div className="bg-green-50 rounded-lg p-3">
                                    <div className="text-xl font-bold text-green-600">{winner?.percentage}%</div>
                                    <div className="text-xs text-gray-600">{winner?.votes.toLocaleString()} votes</div>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     );
                  })}
               </div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-8">
               <h2 className="text-2xl font-bold text-[#1D4ED8]">Detailed Results by Position</h2>

               {electionResults.map((position, positionIndex) => (
                  <Card key={positionIndex} className="border border-gray-200 shadow-sm bg-white">
                     <CardHeader className="bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                           <div>
                              <CardTitle className="text-xl text-[#1D4ED8]">{position.position}</CardTitle>
                              <CardDescription className="mt-1">{position.totalVotes.toLocaleString()} total votes cast</CardDescription>
                           </div>
                           <div className="text-right">
                              <div className="text-sm text-gray-500">Turnout</div>
                              <div className="text-xl font-bold text-[#1D4ED8]">{((position.totalVotes / 1500) * 100).toFixed(1)}%</div>
                           </div>
                        </div>
                     </CardHeader>

                     <CardContent className="p-6">
                        <div className="space-y-6">
                           {position.candidates
                              .sort((a, b) => b.votes - a.votes)
                              .map((candidate, candidateIndex) => (
                                 <div key={candidateIndex} className="group">
                                    <div className="flex items-center space-x-6 mb-4">
                                       <div className="flex items-center space-x-4">
                                          <div className="relative">
                                             {getRankIcon(candidateIndex)}
                                             <span className="absolute -bottom-1 -right-1 bg-gray-100 text-gray-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                                {candidateIndex + 1}
                                             </span>
                                          </div>

                                          <img
                                             src={candidate.image || "/placeholder.svg"}
                                             alt={candidate.name}
                                             className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                             onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(candidate.name + " candidate photo")}`;
                                             }}
                                          />

                                          <div className="flex-1">
                                             <div className="flex items-center space-x-3">
                                                <h3 className={`text-lg font-bold ${candidate.winner ? "text-green-700" : "text-[#1D4ED8]"}`}>{candidate.name}</h3>
                                                {candidate.winner && (
                                                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                      <Crown className="h-3 w-3 mr-1" />
                                                      Winner
                                                   </span>
                                                )}
                                             </div>
                                             <p className="text-gray-600">{candidate.course}</p>
                                          </div>
                                       </div>

                                       <div className="text-right space-y-1">
                                          <div className="text-xl font-bold text-[#1D4ED8]">{candidate.votes.toLocaleString()}</div>
                                          <div className="text-lg font-semibold text-gray-600">{candidate.percentage}%</div>
                                          {candidate.margin !== "-" && <div className="text-sm text-gray-500">{candidate.margin} margin</div>}
                                       </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative">
                                       <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                          <div
                                             className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                                                candidate.winner ? "bg-green-500" : candidateIndex === 1 ? "bg-gray-400" : candidateIndex === 2 ? "bg-gray-300" : "bg-gray-200"
                                             }`}
                                             style={{ width: `${candidate.percentage}%` }}
                                          />
                                       </div>
                                       <div className="absolute inset-0 flex items-center justify-center">
                                          <span className="text-xs font-semibold text-white drop-shadow-sm">{candidate.percentage}%</span>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>

            {/* Election Timeline */}
            <Card className="border border-gray-200 bg-gray-50">
               <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#1D4ED8] mb-6 text-center">Election Timeline</h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                     <div className="text-center space-y-3">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto">
                           <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div>
                           <p className="font-semibold text-[#1D4ED8]">Voting Period</p>
                           <p className="text-gray-600 text-sm">March 15 - 22, 2025</p>
                        </div>
                     </div>
                     <div className="text-center space-y-3">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto">
                           <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                           <p className="font-semibold text-[#1D4ED8]">Results Certified</p>
                           <p className="text-gray-600 text-sm">March 23, 2025</p>
                        </div>
                     </div>
                     <div className="text-center space-y-3">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto">
                           <Trophy className="h-6 w-6 text-white" />
                        </div>
                        <div>
                           <p className="font-semibold text-[#1D4ED8]">Term Begins</p>
                           <p className="text-gray-600 text-sm">April 1, 2025</p>
                        </div>
                     </div>
                     <div className="text-center space-y-3">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto">
                           <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                           <p className="font-semibold text-[#1D4ED8]">Term Duration</p>
                           <p className="text-gray-600 text-sm">One Academic Year</p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </VotingLayout>
   );
}
