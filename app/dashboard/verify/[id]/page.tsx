"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyPage({ params }: { params: { id: string } }) {
   const router = useRouter();
   const [isVerifying, setIsVerifying] = useState(true);
   const [copied, setCopied] = useState(false);

   // Sample data - in a real app, this would come from an API
   const voteData = {
      id: Number.parseInt(params.id),
      electionId: 5,
      electionName: "Neighborhood Watch Election",
      dateVoted: "2025-04-15",
      voteId: "0x7f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a",
      candidate: "Jane Smith",
      blockNumber: 14356789,
      timestamp: "2025-04-15T14:32:45Z",
      transactionHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
   };

   useEffect(() => {
      // Simulate blockchain verification
      const timer = setTimeout(() => {
         setIsVerifying(false);
      }, 2000);

      return () => clearTimeout(timer);
   }, []);

   const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <DashboardLayout>
         <div className="flex flex-col space-y-6">
            <div>
               <h1 className="text-2xl font-bold tracking-tight">Vote Verification</h1>
               <p className="text-muted-foreground">Verify your vote on the blockchain</p>
            </div>

            <Card>
               <CardHeader>
                  <CardTitle>Verify Vote for {voteData.electionName}</CardTitle>
                  <CardDescription>
                     Voted on {new Date(voteData.dateVoted).toLocaleDateString()} at {new Date(voteData.timestamp).toLocaleTimeString()}
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  {isVerifying ? (
                     <div className="flex flex-col items-center justify-center py-8">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                        <p className="mt-4 text-sm text-gray-500">Verifying your vote on the blockchain...</p>
                     </div>
                  ) : (
                     <div className="space-y-6">
                        <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                           <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <h3 className="ml-2 text-lg font-medium text-green-800">Vote Verified</h3>
                           </div>
                           <p className="mt-1 text-sm text-green-600">
                              Your vote for <strong>{voteData.candidate}</strong> was successfully recorded on the blockchain.
                           </p>
                        </div>

                        <div className="space-y-4">
                           <div>
                              <h3 className="text-sm font-medium text-gray-700">Vote ID</h3>
                              <div className="mt-1 flex items-center space-x-2">
                                 <code className="flex-1 rounded bg-gray-100 px-2 py-1 text-xs font-mono">{voteData.voteId}</code>
                                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(voteData.voteId)}>
                                    {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                 </Button>
                              </div>
                           </div>

                           <div>
                              <h3 className="text-sm font-medium text-gray-700">Transaction Hash</h3>
                              <div className="mt-1 flex items-center space-x-2">
                                 <code className="flex-1 rounded bg-gray-100 px-2 py-1 text-xs font-mono overflow-x-auto">{voteData.transactionHash}</code>
                                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(voteData.transactionHash)}>
                                    {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                 </Button>
                              </div>
                           </div>

                           <div>
                              <h3 className="text-sm font-medium text-gray-700">Block Number</h3>
                              <p className="mt-1 text-sm text-gray-600">{voteData.blockNumber}</p>
                           </div>

                           <div>
                              <h3 className="text-sm font-medium text-gray-700">Timestamp</h3>
                              <p className="mt-1 text-sm text-gray-600">{new Date(voteData.timestamp).toLocaleString()}</p>
                           </div>
                        </div>
                     </div>
                  )}
               </CardContent>
               <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                     <Link href="/dashboard/history">Back to History</Link>
                  </Button>
                  <Button variant="outline" className="gap-2">
                     <ExternalLink className="h-4 w-4" />
                     View on Blockchain Explorer
                  </Button>
               </CardFooter>
            </Card>
         </div>
      </DashboardLayout>
   );
}
