"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Eye } from "lucide-react";
import Link from "next/link";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewCandidatePage() {
   const router = useRouter();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [imagePreview, setImagePreview] = useState<string | null>(null);

   const [formData, setFormData] = useState({
      name: "",
      position: "",
      course: "",
      year: "",
      university: "",
      quote: "",
      image: null as File | null,
   });

   const positions = ["Student Body President", "Vice President", "Secretary", "Treasurer"];

   const years = ["Freshman", "Sophomore", "Junior", "Senior"];

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setFormData({ ...formData, image: file });
         const reader = new FileReader();
         reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitting(false);
      router.push("/admin/candidates");
   };

   return (
      <AdminLayout>
         <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-4">
               <Link href="/admin/candidates" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Candidates
               </Link>
               <div>
                  <h1 className="text-3xl font-bold text-gray-900">Add New Candidate</h1>
                  <p className="text-gray-600 mt-1">Upload candidate information and photo</p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Form */}
               <div className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                     {/* Basic Information */}
                     <Card>
                        <CardHeader>
                           <CardTitle>Basic Information</CardTitle>
                           <CardDescription>Enter the candidate's personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div>
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Sarah Johnson" required />
                           </div>

                           <div>
                              <Label htmlFor="position">Position</Label>
                              <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })}>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select position" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {positions.map((position) => (
                                       <SelectItem key={position} value={position}>
                                          {position}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                 <Label htmlFor="course">Course of Study</Label>
                                 <Input id="course" value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} placeholder="e.g., Political Science" required />
                              </div>
                              <div>
                                 <Label htmlFor="year">Academic Year</Label>
                                 <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       {years.map((year) => (
                                          <SelectItem key={year} value={year}>
                                             {year}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </div>
                           </div>

                           <div>
                              <Label htmlFor="university">University</Label>
                              <Input
                                 id="university"
                                 value={formData.university}
                                 onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                                 placeholder="e.g., State University"
                                 required
                              />
                           </div>

                           <div>
                              <Label htmlFor="quote">Campaign Quote</Label>
                              <Textarea
                                 id="quote"
                                 value={formData.quote}
                                 onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                 placeholder="A brief campaign message or quote"
                                 rows={3}
                                 required
                              />
                           </div>
                        </CardContent>
                     </Card>

                     {/* Photo Upload */}
                     <Card>
                        <CardHeader>
                           <CardTitle>Photo Upload</CardTitle>
                           <CardDescription>Upload a professional headshot (recommended: 300x300px)</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-4">
                              <div className="flex items-center justify-center w-full">
                                 <label
                                    htmlFor="image"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                 >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                       <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                       <p className="mb-2 text-sm text-gray-500">
                                          <span className="font-semibold">Click to upload</span> or drag and drop
                                       </p>
                                       <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                                    </div>
                                    <input id="image" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required />
                                 </label>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Submit */}
                     <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                           Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white">
                           {isSubmitting ? "Adding..." : "Add Candidate"}
                        </Button>
                     </div>
                  </form>
               </div>

               {/* Preview */}
               <div className="space-y-6">
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center">
                           <Eye className="h-5 w-5 mr-2 text-[#1D4ED8]" />
                           Card Preview
                        </CardTitle>
                        <CardDescription>How this candidate will appear to voters</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                           <div className="flex">
                              {/* Image Section */}
                              <div className="relative w-32 flex-shrink-0">
                                 <div className="h-28 relative overflow-hidden bg-gray-100">
                                    {imagePreview ? (
                                       <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                       <div className="w-full h-full flex items-center justify-center text-gray-400">
                                          <Upload className="h-8 w-8" />
                                       </div>
                                    )}
                                 </div>
                              </div>

                              {/* Content Section */}
                              <div className="flex-1 p-4">
                                 <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-gray-900">{formData.name || "Candidate Name"}</h3>
                                    <div className="text-sm text-gray-600">{formData.course && formData.year ? `${formData.course} • ${formData.year}` : "Course • Year"}</div>
                                    <div className="bg-gray-50 rounded p-2 border-l-4 border-[#1D4ED8]">
                                       <p className="text-sm text-gray-700 italic">"{formData.quote || "Campaign quote will appear here"}"</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </AdminLayout>
   );
}
