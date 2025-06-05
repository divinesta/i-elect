"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, ExternalLink, Users, BarChart3, TrendingUp, Calendar, PieChart, ArrowLeft, Shield, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PublicResultsPage() {
   const params = useParams();
   const electionId = params.id;
   const [activeTab, setActiveTab] = useState("overview");
   const [chartLoaded, setChartLoaded] = useState(false);

   const election = {
      name: "Student Council Election 2024",
      organization: "Tech University",
      description: "Annual student council election for academic year 2024-2025",
      startDate: "2024-02-01",
      endDate: "2024-02-07",
      status: "Completed",
      totalVoters: 150,
      totalVotes: 142,
      isPublic: true,
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
      {
         roleId: 3,
         roleName: "Secretary",
         totalVotes: 142,
         candidates: [
            {
               id: 6,
               name: "Frank Miller",
               course: "Law",
               university: "Tech University",
               photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
               votes: 95,
               percentage: 66.9,
               isWinner: true,
            },
            {
               id: 7,
               name: "Grace Lee",
               course: "Economics",
               university: "Tech University",
               photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
               votes: 47,
               percentage: 33.1,
               isWinner: false,
            },
         ],
      },
   ];

   const blockchainTxId = "0xabcd1234efgh5678ijkl9012mnop3456qrst7890";

   // Analytics data
   const votingTrends = [
      { day: "Day 1", votes: 35, percentage: 24.6 },
      { day: "Day 2", votes: 28, percentage: 19.7 },
      { day: "Day 3", votes: 42, percentage: 29.6 },
      { day: "Day 4", votes: 18, percentage: 12.7 },
      { day: "Day 5", votes: 19, percentage: 13.4 },
   ];

   const demographicData = {
      departments: [
         { name: "Computer Science", percentage: 32, votes: 45 },
         { name: "Business", percentage: 28, votes: 40 },
         { name: "Engineering", percentage: 22, votes: 31 },
         { name: "Arts", percentage: 12, votes: 17 },
         { name: "Others", percentage: 6, votes: 9 },
      ],
      years: [
         { name: "Freshman", percentage: 18, votes: 26 },
         { name: "Sophomore", percentage: 22, votes: 31 },
         { name: "Junior", percentage: 31, votes: 44 },
         { name: "Senior", percentage: 29, votes: 41 },
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
      <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <div className="bg-gradient-to-r from-[#00A9FF] to-[#89CFF3] text-white">
            <div className="max-w-7xl mx-auto px-6 py-8">
               <div className="flex items-center space-x-4 mb-6">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
                     <Link href="/elections">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Elections
                     </Link>
                  </Button>
               </div>
               <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                     <h1 className="text-4xl font-bold">{election.name}</h1>
                     <Badge className="bg-green-100 text-green-800 border-green-200">
                        <Crown className="h-3 w-3 mr-1" />
                        {election.status}
                     </Badge>
                  </div>
                  <p className="text-xl text-blue-100">{election.organization}</p>
                  <p className="text-blue-100">{election.description}</p>
                  <div className="flex items-center justify-center space-x-8 text-sm text-blue-100">
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
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-6 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
               <TabsList className="grid w-full grid-cols-4 lg:w-[500px] mx-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="verification">Verification</TabsTrigger>
               </TabsList>

               {/* Overview Tab */}
               <TabsContent value="overview">
                  <div className="space-y-8">
                     {/* Winners Section */}
                     <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                        <CardHeader className="text-center">
                           <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                              <Crown className="h-6 w-6 text-yellow-600" />
                              <span>Election Winners</span>
                           </CardTitle>
                           <CardDescription>Congratulations to the newly elected representatives!</CardDescription>
                        </CardHeader>
                     </Card>

                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                       <img src={winner.photo || "/placeholder.svg"} alt={winner.name} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-yellow-400" />
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

                     {/* Quick Stats */}
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card>
                           <CardContent className="p-6 text-center">
                              <div className="text-3xl font-bold text-blue-700">{results.length}</div>
                              <div className="text-sm text-gray-600">Positions Filled</div>
                           </CardContent>
                        </Card>
                        <Card>
                           <CardContent className="p-6 text-center">
                              <div className="text-3xl font-bold text-green-700">{results.reduce((acc, role) => acc + role.candidates.length, 0)}</div>
                              <div className="text-sm text-gray-600">Total Candidates</div>
                           </CardContent>
                        </Card>
                        <Card>
                           <CardContent className="p-6 text-center">
                              <div className="text-3xl font-bold text-purple-700">{election.totalVotes}</div>
                              <div className="text-sm text-gray-600">Votes Cast</div>
                           </CardContent>
                        </Card>
                        <Card>
                           <CardContent className="p-6 text-center">
                              <div className="text-3xl font-bold text-orange-700">{((election.totalVotes / election.totalVoters) * 100).toFixed(1)}%</div>
                              <div className="text-sm text-gray-600">Voter Turnout</div>
                           </CardContent>
                        </Card>
                     </div>
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
                                             <img src={candidate.photo || "/placeholder.svg"} alt={candidate.name} className="w-12 h-12 rounded-full object-cover" />
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
                              <span>Voter Turnout Analysis</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                 <div>
                                    <p className="text-sm text-gray-600">Overall Turnout</p>
                                    <div className="text-3xl font-bold text-[#00A9FF]">{((election.totalVotes / election.totalVoters) * 100).toFixed(1)}%</div>
                                 </div>
                                 <div className="w-20 h-20 rounded-full border-8 border-[#00A9FF] flex items-center justify-center">
                                    <span className="text-sm font-bold">
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
                                 <h4 className="text-sm font-medium mb-3">Daily Voting Pattern</h4>
                                 <div className="space-y-2">
                                    {votingTrends.map((day, index) => (
                                       <div key={index} className="flex items-center justify-between text-sm">
                                          <span>{day.day}</span>
                                          <div className="flex items-center space-x-2">
                                             <div className="w-20 bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${day.percentage}%` }}></div>
                                             </div>
                                             <span className="w-12 text-right">{day.votes}</span>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
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
                                 <h4 className="text-sm font-medium mb-3">By Department</h4>
                                 <div className="space-y-3">
                                    {demographicData.departments.map((dept, i) => (
                                       <div key={i} className="space-y-1">
                                          <div className="flex justify-between text-sm">
                                             <span>{dept.name}</span>
                                             <span>
                                                {dept.votes} votes ({dept.percentage}%)
                                             </span>
                                          </div>
                                          <Progress value={dept.percentage} className="h-2" />
                                       </div>
                                    ))}
                                 </div>
                              </div>

                              <div>
                                 <h4 className="text-sm font-medium mb-3">By Academic Year</h4>
                                 <div className="space-y-3">
                                    {demographicData.years.map((year, i) => (
                                       <div key={i} className="space-y-1">
                                          <div className="flex justify-between text-sm">
                                             <span>{year.name}</span>
                                             <span>
                                                {year.votes} votes ({year.percentage}%)
                                             </span>
                                          </div>
                                          <Progress value={year.percentage} className="h-2" />
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Voting Timeline */}
                     <Card>
                        <CardHeader>
                           <CardTitle className="flex items-center space-x-2">
                              <Clock className="h-5 w-5" />
                              <span>Voting Timeline</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-4">
                              <div className="h-48 w-full">
                                 {chartLoaded ? (
                                    <div className="relative h-full">
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
                                       <span>Peak voting occurred on Day 3 (42 votes)</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                       <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                       <span>25% of votes cast in the first 24 hours</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                       <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                       <span>Steady participation throughout the voting period</span>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Competition Analysis */}
                     <Card>
                        <CardHeader>
                           <CardTitle>Competition Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-4">
                              {results.map((role) => {
                                 const sortedCandidates = role.candidates.sort((a, b) => b.votes - a.votes);
                                 const winner = sortedCandidates[0];
                                 const runnerUp = sortedCandidates[1];
                                 const margin = winner && runnerUp ? winner.percentage - runnerUp.percentage : 0;

                                 return (
                                    <div key={role.roleId} className="p-4 border rounded-lg">
                                       <div className="flex items-center justify-between mb-2">
                                          <h4 className="font-medium">{role.roleName}</h4>
                                          <Badge className={margin > 30 ? "bg-green-100 text-green-800" : margin > 15 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}>
                                             {margin > 30 ? "Decisive" : margin > 15 ? "Clear" : "Close"}
                                          </Badge>
                                       </div>
                                       <div className="text-sm text-gray-600">
                                          <p>
                                             Winner: {winner?.name} ({winner?.percentage}%)
                                          </p>
                                          {runnerUp && (
                                             <p>
                                                Runner-up: {runnerUp.name} ({runnerUp.percentage}%)
                                             </p>
                                          )}
                                          <p>Margin: {margin.toFixed(1)} percentage points</p>
                                       </div>
                                    </div>
                                 );
                              })}
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </TabsContent>

               {/* Verification Tab */}
               <TabsContent value="verification">
                  <div className="space-y-6">
                     <Card>
                        <CardHeader>
                           <CardTitle className="flex items-center space-x-2">
                              <Shield className="h-5 w-5" />
                              <span>Blockchain Verification</span>
                           </CardTitle>
                           <CardDescription>Verify the integrity and authenticity of election results</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                              <div className="flex items-center space-x-3 mb-4">
                                 <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                    <Shield className="h-4 w-4 text-white" />
                                 </div>
                                 <div>
                                    <h3 className="font-semibold text-green-900">Election Verified</h3>
                                    <p className="text-sm text-green-700">All votes have been cryptographically verified</p>
                                 </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                 <div>
                                    <span className="text-green-700 font-medium">Blockchain Network:</span>
                                    <p className="text-green-900">Ethereum Mainnet</p>
                                 </div>
                                 <div>
                                    <span className="text-green-700 font-medium">Smart Contract:</span>
                                    <p className="text-green-900 break-all">0x742d35Cc6634C0532925a3b8D</p>
                                 </div>
                                 <div>
                                    <span className="text-green-700 font-medium">Total Transactions:</span>
                                    <p className="text-green-900">{election.totalVotes}</p>
                                 </div>
                                 <div>
                                    <span className="text-green-700 font-medium">Gas Used:</span>
                                    <p className="text-green-900">2,840,000 wei</p>
                                 </div>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                 <h4 className="font-medium">Verification Steps</h4>
                                 <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                       <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                          <span className="text-xs text-white">✓</span>
                                       </div>
                                       <span className="text-sm">Vote encryption verified</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                       <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                          <span className="text-xs text-white">✓</span>
                                       </div>
                                       <span className="text-sm">Voter eligibility confirmed</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                       <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                          <span className="text-xs text-white">✓</span>
                                       </div>
                                       <span className="text-sm">Double voting prevented</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                       <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                          <span className="text-xs text-white">✓</span>
                                       </div>
                                       <span className="text-sm">Results immutably recorded</span>
                                    </div>
                                 </div>
                              </div>

                              <div className="space-y-4">
                                 <h4 className="font-medium">Transaction Details</h4>
                                 <div className="bg-gray-50 border rounded-lg p-4">
                                    <div className="space-y-2 text-sm">
                                       <div>
                                          <span className="text-gray-600">Transaction Hash:</span>
                                          <p className="font-mono text-xs break-all">{blockchainTxId}</p>
                                       </div>
                                       <div>
                                          <span className="text-gray-600">Block Number:</span>
                                          <p className="font-mono">18,945,672</p>
                                       </div>
                                       <div>
                                          <span className="text-gray-600">Timestamp:</span>
                                          <p>2024-02-07 23:59:45 UTC</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="flex space-x-4">
                              <Button variant="outline" className="space-x-2">
                                 <ExternalLink className="h-4 w-4" />
                                 <span>View on Etherscan</span>
                              </Button>
                              <Button variant="outline" className="space-x-2">
                                 <Shield className="h-4 w-4" />
                                 <span>Download Verification Report</span>
                              </Button>
                           </div>
                        </CardContent>
                     </Card>

                     <Card>
                        <CardHeader>
                           <CardTitle>Audit Trail</CardTitle>
                           <CardDescription>Complete timeline of election events</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-4">
                              <div className="flex items-start space-x-4 p-3 border-l-4 border-blue-500 bg-blue-50">
                                 <div className="text-sm">
                                    <p className="font-medium">Election Created</p>
                                    <p className="text-gray-600">2024-01-15 10:00:00 UTC</p>
                                 </div>
                              </div>
                              <div className="flex items-start space-x-4 p-3 border-l-4 border-green-500 bg-green-50">
                                 <div className="text-sm">
                                    <p className="font-medium">Voting Period Started</p>
                                    <p className="text-gray-600">2024-02-01 00:00:00 UTC</p>
                                 </div>
                              </div>
                              <div className="flex items-start space-x-4 p-3 border-l-4 border-orange-500 bg-orange-50">
                                 <div className="text-sm">
                                    <p className="font-medium">Voting Period Ended</p>
                                    <p className="text-gray-600">2024-02-07 23:59:59 UTC</p>
                                 </div>
                              </div>
                              <div className="flex items-start space-x-4 p-3 border-l-4 border-purple-500 bg-purple-50">
                                 <div className="text-sm">
                                    <p className="font-medium">Results Published</p>
                                    <p className="text-gray-600">2024-02-08 00:15:30 UTC</p>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
}
