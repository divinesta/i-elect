"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Plus, X } from "lucide-react";
import Link from "next/link";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewElectionPage() {
   const router = useRouter();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [positions, setPositions] = useState([{ id: 1, title: "Student Body President", description: "Lead the student government" }]);

   const [formData, setFormData] = useState({
      name: "",
      description: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
   });

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitting(false);
      router.push("/admin/elections");
   };

   const addPosition = () => {
      const newPosition = {
         id: positions.length + 1,
         title: "",
         description: "",
      };
      setPositions([...positions, newPosition]);
   };

   const removePosition = (id: number) => {
      setPositions(positions.filter((pos) => pos.id !== id));
   };

   const updatePosition = (id: number, field: string, value: string) => {
      setPositions(positions.map((pos) => (pos.id === id ? { ...pos, [field]: value } : pos)));
   };

   return (
      <AdminLayout>
         <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-4">
               <Link href="/admin/elections" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Elections
               </Link>
               <div>
                  <h1 className="text-3xl font-bold text-gray-900">Create New Election</h1>
                  <p className="text-gray-600 mt-1">Set up a new election with positions and schedule</p>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
               {/* Basic Information */}
               <Card>
                  <CardHeader>
                     <CardTitle>Basic Information</CardTitle>
                     <CardDescription>Enter the election name and description</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div>
                        <Label htmlFor="name">Election Name</Label>
                        <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Student Government Elections 2025" required />
                     </div>
                     <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                           id="description"
                           value={formData.description}
                           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                           placeholder="Brief description of the election"
                           rows={3}
                        />
                     </div>
                  </CardContent>
               </Card>

               {/* Schedule */}
               <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-[#1D4ED8]" />
                        Election Schedule
                     </CardTitle>
                     <CardDescription>Set the voting start and end times</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <h3 className="font-medium text-gray-900">Start Date & Time</h3>
                           <div className="space-y-2">
                              <Label htmlFor="startDate">Date</Label>
                              <Input id="startDate" type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="startTime">Time</Label>
                              <Input id="startTime" type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} required />
                           </div>
                        </div>

                        <div className="space-y-4">
                           <h3 className="font-medium text-gray-900">End Date & Time</h3>
                           <div className="space-y-2">
                              <Label htmlFor="endDate">Date</Label>
                              <Input id="endDate" type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} required />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="endTime">Time</Label>
                              <Input id="endTime" type="time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} required />
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Positions */}
               <Card>
                  <CardHeader>
                     <div className="flex items-center justify-between">
                        <div>
                           <CardTitle>Election Positions</CardTitle>
                           <CardDescription>Define the positions voters will elect</CardDescription>
                        </div>
                        <Button type="button" onClick={addPosition} variant="outline">
                           <Plus className="h-4 w-4 mr-2" />
                           Add Position
                        </Button>
                     </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {positions.map((position, index) => (
                        <div key={position.id} className="border border-gray-200 rounded-lg p-4">
                           <div className="flex items-center justify-between mb-4">
                              <h3 className="font-medium text-gray-900">Position {index + 1}</h3>
                              {positions.length > 1 && (
                                 <Button type="button" variant="ghost" size="icon" onClick={() => removePosition(position.id)}>
                                    <X className="h-4 w-4" />
                                 </Button>
                              )}
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                 <Label htmlFor={`position-title-${position.id}`}>Position Title</Label>
                                 <Input
                                    id={`position-title-${position.id}`}
                                    value={position.title}
                                    onChange={(e) => updatePosition(position.id, "title", e.target.value)}
                                    placeholder="e.g., Student Body President"
                                    required
                                 />
                              </div>
                              <div>
                                 <Label htmlFor={`position-description-${position.id}`}>Description</Label>
                                 <Input
                                    id={`position-description-${position.id}`}
                                    value={position.description}
                                    onChange={(e) => updatePosition(position.id, "description", e.target.value)}
                                    placeholder="Brief description of the role"
                                 />
                              </div>
                           </div>
                        </div>
                     ))}
                  </CardContent>
               </Card>

               {/* Submit */}
               <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                     Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white">
                     {isSubmitting ? "Creating..." : "Create Election"}
                  </Button>
               </div>
            </form>
         </div>
      </AdminLayout>
   );
}
