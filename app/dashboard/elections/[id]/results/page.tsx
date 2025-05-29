"use client";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, ExternalLink, Users, BarChart3, TrendingUp, Calendar } from "lucide-react";

export default function ResultsPage() {
   const params = useParams();
   const electionId = params.id;

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
               photo: "/placeholder.svg?height=200&width=200&text=Alice",
               votes: 78,
               percentage: 54.9,
               isWinner: true,
            },
            {
               id: 2,
               name: "Bob Smith",
               course: "Business Administration",
               university: "Tech University",
               photo: "/placeholder.svg?height=200&width=200&text=Bob",
               votes: 45,
               percentage: 31.7,
               isWinner: false,
            },
            {
               id: 3,
               name: "Carol Davis",
               course: "Engineering",
               university: "Tech University",
               photo: "/placeholder.svg?height=200&width=200&text=Carol",
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
               photo: "/placeholder.svg?height=200&width=200&text=David",
               votes: 89,
               percentage: 62.7,
               isWinner: true,
            },
            {
               id: 5,
               name: "Emma Brown",
               course: "Communications",
               university: "Tech University",
               photo: "/placeholder.svg?height=200&width=200&text=Emma",
               votes: 53,
               percentage: 37.3,
               isWinner: false,
            },
         ],
      },
   ];

   const blockchainTxId = "0xabcd1234efgh5678ijkl9012mnop3456qrst7890";

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

         <Tabs defaultValue="winners" className="space-y-6">
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
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                           <BarChart3 className="h-5 w-5" />
                           <span>Voter Turnout</span>
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           <div className="text-center">
                              <div className="text-3xl font-bold text-[#00A9FF]">{((election.totalVotes / election.totalVoters) * 100).toFixed(1)}%</div>
                              <p className="text-sm text-gray-600">Overall turnout</p>
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
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>Vote Distribution</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-3">
                           {results.map((role) => (
                              <div key={role.roleId}>
                                 <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium">{role.roleName}</span>
                                    <span className="text-sm text-gray-600">{role.totalVotes} votes</span>
                                 </div>
                                 <Progress value={100} className="h-2" />
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>Election Summary</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-3 text-sm">
                           <div className="flex justify-between">
                              <span>Total Roles</span>
                              <span className="font-medium">{results.length}</span>
                           </div>
                           <div className="flex justify-between">
                              <span>Total Candidates</span>
                              <span className="font-medium">{results.reduce((acc, role) => acc + role.candidates.length, 0)}</span>
                           </div>
                           <div className="flex justify-between">
                              <span>Election Duration</span>
                              <span className="font-medium">7 days</span>
                           </div>
                           <div className="flex justify-between">
                              <span>Blockchain Verified</span>
                              <span className="font-medium text-green-600">✓ Yes</span>
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
