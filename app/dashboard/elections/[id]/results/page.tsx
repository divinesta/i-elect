"use client";
// import { useParams } from "next/navigation"; // Removing unused import
import type React from "react";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, ExternalLink, Users, BarChart3, TrendingUp, Calendar, PieChart, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function ResultsPage() {
   // const params = useParams(); // Commenting out as params is unused
   // const electionId = params.id; // Commenting out as electionId is unused
   const [activeTab, setActiveTab] = useState("winners");
   const [chartLoaded, setChartLoaded] = useState(false);

   const election = {
      name: "Student Council Election 2024",
      description: "Annual student council election for academic year 2024-2025",
      startDate: "2024-02-01",
      endDate: "2024-02-07",
      status: "Completed",
      totalVoters: 150,
      totalVotes: 142,
   };

   const results = [
      {
         roleId: 1,
         roleName: "President",
         totalVotes: 142,
         candidates: [
            {
               id: 1,
               name: "Alice Johnson",
               course: "Computer Science",
               university: "Tech University",
               photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
               votes: 78,
               percentage: 54.9,
               isWinner: true,
            },
            {
               id: 2,
               name: "Bob Smith",
               course: "Business Administration",
               university: "Tech University",
               photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
               votes: 45,
               percentage: 31.7,
               isWinner: false,
            },
            {
               id: 3,
               name: "Carol Davis",
               course: "Engineering",
               university: "Tech University",
               photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
               votes: 19,
               percentage: 13.4,
               isWinner: false,
            },
         ],
      },
      {
         roleId: 2,
         roleName: "Vice President",
         totalVotes: 142,
         candidates: [
            {
               id: 4,
               name: "David Wilson",
               course: "Political Science",
               university: "Tech University",
               photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
               votes: 89,
               percentage: 62.7,
               isWinner: true,
            },
            {
               id: 5,
               name: "Emma Brown",
               course: "Communications",
               university: "Tech University",
               photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
               votes: 53,
               percentage: 37.3,
               isWinner: false,
            },
         ],
      },
   ];

   const blockchainTxId = "0xabcd1234efgh5678ijkl9012mnop3456qrst7890";

   // Analytics data
   const votingTrends = [
      { day: "Day 1", votes: 35 },
      { day: "Day 2", votes: 28 },
      { day: "Day 3", votes: 42 },
      { day: "Day 4", votes: 18 },
      { day: "Day 5", votes: 19 },
   ];

   const demographicData = {
      departments: [
         { name: "Computer Science", percentage: 32 },
         { name: "Business", percentage: 28 },
         { name: "Engineering", percentage: 22 },
         { name: "Arts", percentage: 12 },
         { name: "Others", percentage: 6 },
      ],
      years: [
         { name: "Freshman", percentage: 18 },
         { name: "Sophomore", percentage: 22 },
         { name: "Junior", percentage: 31 },
         { name: "Senior", percentage: 29 },
      ],
   };

   // Simulate chart loading
   useEffect(() => {
      const timer = setTimeout(() => {
         setChartLoaded(true);
      }, 1000);
      return () => clearTimeout(timer);
   }, []);

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
               <h1 className="text-3xl font-bold text-gray-900">{election.name}</h1>
               <Badge className="bg-green-100 text-green-800">Completed</Badge>
            </div>
            <p className="text-gray-600">{election.description}</p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
               <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                     {election.startDate} - {election.endDate}
                  </span>
               </div>
               <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>
                     {election.totalVotes}/{election.totalVoters} votes cast
                  </span>
               </div>
               <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>{((election.totalVotes / election.totalVoters) * 100).toFixed(1)}% turnout</span>
               </div>
            </div>
         </div>

         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
               <TabsTrigger value="winners">Winners</TabsTrigger>
               <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
               <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Winners Tab */}
            <TabsContent value="winners">
               <div className="space-y-6">
                  <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                     <CardHeader className="text-center">
                        <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                           <Crown className="h-6 w-6 text-yellow-600" />
                           <span>Election Winners</span>
                        </CardTitle>
                        <CardDescription>Congratulations to the newly elected representatives!</CardDescription>
                     </CardHeader>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {results.map((role) => {
                        const winner = role.candidates.find((c) => c.isWinner);
                        if (!winner) return null;

                        return (
                           <Card key={role.roleId} className="hover:shadow-lg transition-shadow">
                              <CardHeader>
                                 <CardTitle className="flex items-center justify-between">
                                    <span>{role.roleName}</span>
                                    <Crown className="h-5 w-5 text-yellow-600" />
                                 </CardTitle>
                              </CardHeader>
                              <CardContent>
                                 <div className="text-center space-y-4">
                                    <Image src={winner.photo || "/placeholder.svg"} alt={winner.name} width={96} height={96} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-yellow-400" />
                                    <div>
                                       <h3 className="text-xl font-bold text-gray-900">{winner.name}</h3>
                                       <p className="text-sm text-gray-600">{winner.course}</p>
                                       <p className="text-xs text-gray-500">{winner.university}</p>
                                    </div>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                       <div className="text-2xl font-bold text-green-800">{winner.votes} votes</div>
                                       <div className="text-sm text-green-600">{winner.percentage}% of total votes</div>
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>
                        );
                     })}
                  </div>

                  <Card>
                     <CardContent className="p-6">
                        <div className="text-center space-y-4">
                           <h3 className="text-lg font-semibold">Verify Results on Blockchain</h3>
                           <p className="text-gray-600">All votes are permanently recorded and verifiable on the blockchain</p>
                           <Button variant="outline" className="space-x-2">
                              <ExternalLink className="h-4 w-4" />
                              <span>Check on Blockchain</span>
                           </Button>
                           <p className="text-xs text-gray-500 break-all">Transaction ID: {blockchainTxId}</p>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>

            {/* Detailed Results Tab */}
            <TabsContent value="detailed">
               <div className="space-y-8">
                  {results.map((role) => (
                     <Card key={role.roleId}>
                        <CardHeader>
                           <CardTitle className="flex items-center justify-between">
                              <span>{role.roleName}</span>
                              <Badge variant="outline">{role.totalVotes} total votes</Badge>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-4">
                              {role.candidates
                                 .sort((a, b) => b.votes - a.votes)
                                 .map((candidate, index) => (
                                    <div key={candidate.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                       <div className="flex items-center space-x-3">
                                          <div className="text-lg font-bold text-gray-500">#{index + 1}</div>
                                          <Image src={candidate.photo || "/placeholder.svg"} alt={candidate.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                                          <div>
                                             <h4 className="font-semibold flex items-center space-x-2">
                                                <span>{candidate.name}</span>
                                                {candidate.isWinner && <Crown className="h-4 w-4 text-yellow-600" />}
                                             </h4>
                                             <p className="text-sm text-gray-600">{candidate.course}</p>
                                          </div>
                                       </div>
                                       <div className="flex-1 space-y-2">
                                          <div className="flex justify-between items-center">
                                             <span className="text-sm text-gray-600">{candidate.votes} votes</span>
                                             <span className="font-semibold">{candidate.percentage}%</span>
                                          </div>
                                          <Progress value={candidate.percentage} className="h-2" />
                                       </div>
                                    </div>
                                 ))}
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Voter Turnout Card */}
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                           <BarChart3 className="h-5 w-5" />
                           <span>Voter Turnout</span>
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <div>
                                 <p className="text-sm text-gray-600">Total Turnout</p>
                                 <div className="text-3xl font-bold text-[#00A9FF]">{((election.totalVotes / election.totalVoters) * 100).toFixed(1)}%</div>
                              </div>
                              <div className="w-20 h-20 rounded-full border-8 border-[#00A9FF] flex items-center justify-center">
                                 <span className="text-lg font-bold">
                                    {election.totalVotes}/{election.totalVoters}
                                 </span>
                              </div>
                           </div>

                           <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                 <span>Votes Cast</span>
                                 <span>{election.totalVotes}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                 <span>Eligible Voters</span>
                                 <span>{election.totalVoters}</span>
                              </div>
                              <Progress value={(election.totalVotes / election.totalVoters) * 100} className="h-2" />
                           </div>

                           <div className="pt-4 border-t">
                              <h4 className="text-sm font-medium mb-2">Comparison to Previous Elections</h4>
                              <div className="space-y-2">
                                 <div className="flex items-center justify-between text-sm">
                                    <span>Last Election</span>
                                    <div className="flex items-center text-green-600">
                                       <ArrowUp className="h-3 w-3 mr-1" />
                                       <span>+12.5%</span>
                                    </div>
                                 </div>
                                 <div className="flex items-center justify-between text-sm">
                                    <span>Average Turnout</span>
                                    <div className="flex items-center text-green-600">
                                       <ArrowUp className="h-3 w-3 mr-1" />
                                       <span>+8.2%</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Voting Trends Card */}
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                           <TrendingUp className="h-5 w-5" />
                           <span>Voting Trends</span>
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           <div className="h-48 w-full">
                              {chartLoaded ? (
                                 <div className="relative h-full">
                                    {/* Simple bar chart visualization */}
                                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-40">
                                       {votingTrends.map((day, i) => (
                                          <div key={i} className="flex flex-col items-center w-1/5">
                                             <div
                                                className="w-12 bg-blue-500 rounded-t-md transition-all duration-1000"
                                                style={{
                                                   height: `${(day.votes / 45) * 100}%`,
                                                   opacity: 0.7 + i * 0.05,
                                                }}
                                             ></div>
                                             <div className="text-xs mt-2">{day.day}</div>
                                             <div className="text-xs font-medium">{day.votes}</div>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              ) : (
                                 <div className="h-full flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                 </div>
                              )}
                           </div>

                           <div className="pt-4 border-t">
                              <h4 className="text-sm font-medium mb-2">Key Insights</h4>
                              <ul className="space-y-1 text-sm">
                                 <li className="flex items-center space-x-2">
                                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                    <span>Highest participation on Day 3 (42 votes)</span>
                                 </li>
                                 <li className="flex items-center space-x-2">
                                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                    <span>25% of votes cast in the first 24 hours</span>
                                 </li>
                                 <li className="flex items-center space-x-2">
                                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                    <span>Reminder emails sent on Day 3 increased turnout</span>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Demographic Breakdown */}
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                           <PieChart className="h-5 w-5" />
                           <span>Voter Demographics</span>
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-6">
                           <div>
                              <h4 className="text-sm font-medium mb-2">By Department</h4>
                              <div className="space-y-2">
                                 {demographicData.departments.map((dept, i) => (
                                    <div key={i} className="space-y-1">
                                       <div className="flex justify-between text-sm">
                                          <span>{dept.name}</span>
                                          <span>{dept.percentage}%</span>
                                       </div>
                                       <Progress
                                          value={dept.percentage}
                                          className="h-2"
                                          style={
                                             {
                                                background: "#e2e8f0",
                                                "--tw-progress-color": `hsl(${210 + i * 30}, 80%, 60%)`,
                                             } as React.CSSProperties
                                          }
                                       />
                                    </div>
                                 ))}
                              </div>
                           </div>

                           <div>
                              <h4 className="text-sm font-medium mb-2">By Year</h4>
                              <div className="space-y-2">
                                 {demographicData.years.map((year, i) => (
                                    <div key={i} className="space-y-1">
                                       <div className="flex justify-between text-sm">
                                          <span>{year.name}</span>
                                          <span>{year.percentage}%</span>
                                       </div>
                                       <Progress
                                          value={year.percentage}
                                          className="h-2"
                                          style={
                                             {
                                                background: "#e2e8f0",
                                                "--tw-progress-color": `hsl(${120 + i * 30}, 70%, 50%)`,
                                             } as React.CSSProperties
                                          }
                                       />
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Election Summary */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Election Summary</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-6">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                                 <div className="text-sm text-blue-600 mb-1">Total Roles</div>
                                 <div className="text-3xl font-bold text-blue-700">{results.length}</div>
                              </div>
                              <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                                 <div className="text-sm text-green-600 mb-1">Total Candidates</div>
                                 <div className="text-3xl font-bold text-green-700">{results.reduce((acc, role) => acc + role.candidates.length, 0)}</div>
                              </div>
                              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 text-center">
                                 <div className="text-sm text-purple-600 mb-1">Election Duration</div>
                                 <div className="text-3xl font-bold text-purple-700">7 days</div>
                              </div>
                              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-center">
                                 <div className="text-sm text-yellow-600 mb-1">Avg. Votes Per Day</div>
                                 <div className="text-3xl font-bold text-yellow-700">{Math.round(election.totalVotes / 7)}</div>
                              </div>
                           </div>

                           <div className="pt-4 border-t">
                              <h4 className="text-sm font-medium mb-3">Key Statistics</h4>
                              <div className="space-y-2">
                                 <div className="flex justify-between items-center">
                                    <span className="text-sm">Highest Winning Margin</span>
                                    <span className="font-medium">25.4%</span>
                                 </div>
                                 <div className="flex justify-between items-center">
                                    <span className="text-sm">Most Competitive Race</span>
                                    <span className="font-medium">Vice President</span>
                                 </div>
                                 <div className="flex justify-between items-center">
                                    <span className="text-sm">Blockchain Verified</span>
                                    <span className="font-medium text-green-600">✓ Yes</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>
         </Tabs>
      </div>
   );
}
