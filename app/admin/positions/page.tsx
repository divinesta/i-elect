"use client"

import { Plus, Edit } from "lucide-react"
import Link from "next/link"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PositionsPage() {
  const positions = [
    {
      id: 1,
      title: "President",
      description: "Chief Executive Officer of the Association",
      candidates: 3,
      votesCast: 456,
      participation: 51.1,
      candidateList: [
        { name: "Sarah Johnson", votes: 158, avatar: "SJ" },
        { name: "Michael Chen", votes: 142, avatar: "MC" },
        { name: "Dr. Emily Rodriguez", votes: 156, avatar: "ER" },
      ],
    },
    {
      id: 2,
      title: "Vice President",
      description: "Chief Executive Officer of the Association",
      candidates: 2,
      votesCast: 423,
      participation: 47.3,
      candidateList: [
        { name: "James Wilson", votes: 234, avatar: "JW" },
        { name: "Lisa Anderson", votes: 189, avatar: "LA" },
      ],
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Positions</h1>
            <p className="text-gray-600 mt-1">Manage election positions and candidates</p>
          </div>
          <Button className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white" asChild>
            <Link href="/admin/positions/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Position
            </Link>
          </Button>
        </div>

        {/* Positions */}
        <div className="space-y-8">
          {positions.map((position) => (
            <Card key={position.id} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{position.title}</h2>
                    <p className="text-gray-600">{position.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Candidate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Candidates</p>
                    <p className="text-2xl font-bold text-gray-900">{position.candidates}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Votes Cast</p>
                    <p className="text-2xl font-bold text-gray-900">{position.votesCast}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Participation</p>
                    <p className="text-2xl font-bold text-gray-900">{position.participation}%</p>
                  </div>
                </div>

                {/* Candidates */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {position.candidateList.map((candidate, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-[#1D4ED8] rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">{candidate.avatar}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{candidate.name}</p>
                            <p className="text-sm text-gray-600">{candidate.votes} votes</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
