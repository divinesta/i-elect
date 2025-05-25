"use client";

import Link from "next/link";
import { CheckCircle, ExternalLink } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function VotingHistoryPage() {
   // Sample data - in a real app, this would come from an API
   const votingHistory = [
      {
         id: 1,
         electionId: 5,
         electionName: "Neighborhood Watch Election",
         dateVoted: "2025-04-15",
         voteId: "0x7f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a",
         verified: true,
      },
      {
         id: 2,
         electionId: 6,
         electionName: "Library Funding Proposal",
         dateVoted: "2025-03-18",
         voteId: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
         verified: true,
      },
      {
         id: 3,
         electionId: 7,
         electionName: "Transportation Initiative",
         dateVoted: "2025-02-25",
         voteId: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
         verified: false,
      },
   ];

   return (
      <DashboardLayout>
         <div className="flex flex-col space-y-6">
            <div>
               <h1 className="text-2xl font-bold tracking-tight">Voting History</h1>
               <p className="text-muted-foreground">View and verify your past votes.</p>
            </div>

            <Card>
               <CardHeader>
                  <CardTitle>Your Past Votes</CardTitle>
                  <CardDescription>A record of all elections you've participated in</CardDescription>
               </CardHeader>
               <CardContent>
                  {votingHistory.length > 0 ? (
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableHead>Election</TableHead>
                              <TableHead>Date Voted</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {votingHistory.map((vote) => (
                              <TableRow key={vote.id}>
                                 <TableCell className="font-medium">{vote.electionName}</TableCell>
                                 <TableCell>{new Date(vote.dateVoted).toLocaleDateString()}</TableCell>
                                 <TableCell>
                                    {vote.verified ? (
                                       <div className="flex items-center text-green-600">
                                          <CheckCircle className="mr-1 h-4 w-4" />
                                          <span>Verified</span>
                                       </div>
                                    ) : (
                                       <span className="text-amber-600">Unverified</span>
                                    )}
                                 </TableCell>
                                 <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                       <Button variant="outline" size="sm" asChild className="h-8 px-2 text-xs">
                                          <Link href={`/dashboard/elections/${vote.electionId}/results`}>Results</Link>
                                       </Button>
                                       <Button variant={vote.verified ? "outline" : "default"} size="sm" asChild className="h-8 px-2 text-xs">
                                          <Link href={`/dashboard/verify/${vote.id}`}>{vote.verified ? "View Verification" : "Verify Vote"}</Link>
                                       </Button>
                                    </div>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  ) : (
                     <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                           <CheckCircle className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No voting history</h3>
                        <p className="mt-1 text-sm text-gray-500">You haven't voted in any elections yet.</p>
                        <div className="mt-6">
                           <Button asChild>
                              <Link href="/dashboard/elections">View Available Elections</Link>
                           </Button>
                        </div>
                     </div>
                  )}
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Vote Verification</CardTitle>
                  <CardDescription>Verify any vote using its blockchain ID</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                     <div className="relative flex-1">
                        <input
                           type="text"
                           placeholder="Enter vote ID (e.g., 0x7f9a8b7c6d...)"
                           className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                     </div>
                     <Button>Verify Vote</Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Enter the vote ID you received after voting to verify that your vote was recorded on the blockchain.</p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Blockchain Explorer</CardTitle>
                  <CardDescription>View all votes on the public blockchain</CardDescription>
               </CardHeader>
               <CardContent>
                  <p className="text-sm text-muted-foreground">
                     All votes are recorded on a public blockchain for transparency and verification. You can view the entire voting record without revealing individual voter identities.
                  </p>
                  <div className="mt-4">
                     <Button variant="outline" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Open Blockchain Explorer
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      </DashboardLayout>
   );
}
