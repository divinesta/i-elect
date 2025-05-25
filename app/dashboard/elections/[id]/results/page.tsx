"use client"

import Link from "next/link"
import { ExternalLink, Info } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ResultsPage({ params }: { params: { id: string } }) {
  // Sample data - in a real app, this would come from an API
  const election = {
    id: Number.parseInt(params.id),
    name: "Neighborhood Watch Election",
    description: "Select neighborhood watch coordinators",
    startDate: "2025-04-10",
    endDate: "2025-04-17",
    totalVotes: 256,
    blockchainAddress: "0x7f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a",
    results: [
      { id: "1", name: "Jane Smith", party: "Progressive Party", votes: 112, percentage: 43.75 },
      { id: "2", name: "John Johnson", party: "Community First", votes: 78, percentage: 30.47 },
      { id: "3", name: "Maria Garcia", party: "Future Forward", votes: 42, percentage: 16.41 },
      { id: "4", name: "Robert Lee", party: "Independent", votes: 24, percentage: 9.37 },
    ],
  }

  // Sort results by votes (descending)
  const sortedResults = [...election.results].sort((a, b) => b.votes - a.votes)
  const winner = sortedResults[0]

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{election.name} Results</h1>
          <p className="text-muted-foreground">
            Election period: {new Date(election.startDate).toLocaleDateString()} to{" "}
            {new Date(election.endDate).toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Election Results</CardTitle>
            <CardDescription>
              Total votes cast: {election.totalVotes} • Completed on {new Date(election.endDate).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-green-100 bg-green-50 p-4">
              <h3 className="text-lg font-medium text-green-800">Winner: {winner.name}</h3>
              <p className="text-sm text-green-600">
                {winner.party} • {winner.votes} votes ({winner.percentage}%)
              </p>
            </div>

            <div className="space-y-4">
              {sortedResults.map((candidate, index) => (
                <div key={candidate.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">{candidate.name}</span>
                      <span className="ml-2 text-xs text-gray-500">{candidate.party}</span>
                    </div>
                    <span className="text-sm">
                      {candidate.votes} votes ({candidate.percentage}%)
                    </span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-blue-500"
                      style={{ width: `${candidate.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Blockchain Verification</AlertTitle>
              <AlertDescription>
                These results are immutably recorded on the blockchain and cannot be altered. You can verify the results
                using the blockchain explorer.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/elections">Back to Elections</Link>
            </Button>
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              View on Blockchain
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
