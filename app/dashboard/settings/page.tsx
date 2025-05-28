"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Wallet, Check, X } from "lucide-react";

export default function SettingsPage() {
   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
   const [showNewPassword, setShowNewPassword] = useState(false);
   const [isWalletConnected, setIsWalletConnected] = useState(false);

   const [profileData, setProfileData] = useState({
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
   });

   const [passwordData, setPasswordData] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
   });

   const passwordRequirements = [
      { text: "At least 8 characters", met: passwordData.newPassword.length >= 8 },
      { text: "Contains uppercase letter", met: /[A-Z]/.test(passwordData.newPassword) },
      { text: "Contains lowercase letter", met: /[a-z]/.test(passwordData.newPassword) },
      { text: "Contains number", met: /\d/.test(passwordData.newPassword) },
   ];

   const handleProfileUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
      // Handle profile update
      console.log("Profile updated:", profileData);
   };

   const handlePasswordUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
      // Handle password update
      console.log("Password updated");
   };

   const handleWalletConnection = () => {
      setIsWalletConnected(!isWalletConnected);
   };

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Information */}
            <Card>
               <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={profileData.fullName} onChange={(e) => setProfileData((prev) => ({ ...prev, fullName: e.target.value }))} />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={profileData.email} onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))} />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={profileData.phone} onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))} />
                     </div>

                     <Button type="submit" className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white">
                        Update Profile
                     </Button>
                  </form>
               </CardContent>
            </Card>

            {/* Password Update */}
            <Card>
               <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                           <Input
                              id="currentPassword"
                              type={showCurrentPassword ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                           />
                           <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                           >
                              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                           </Button>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                           <Input
                              id="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                           />
                           <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                           >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                           </Button>
                        </div>

                        {passwordData.newPassword && (
                           <div className="space-y-1 mt-2">
                              <p className="text-xs font-medium text-gray-700">Password Requirements:</p>
                              {passwordRequirements.map((req, index) => (
                                 <div key={index} className="flex items-center space-x-2 text-xs">
                                    {req.met ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-red-500" />}
                                    <span className={req.met ? "text-green-600" : "text-red-600"}>{req.text}</span>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))} />
                     </div>

                     <Button type="submit" className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white">
                        Update Password
                     </Button>
                  </form>
               </CardContent>
            </Card>
         </div>

         {/* Wallet Connection */}
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5" />
                  <span>Blockchain Wallet</span>
               </CardTitle>
               <CardDescription>Connect your wallet to participate in blockchain-based voting</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <p className="font-medium">Wallet Status</p>
                     <div className="flex items-center space-x-2">
                        <Badge className={isWalletConnected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>{isWalletConnected ? "Connected" : "Not Connected"}</Badge>
                        {isWalletConnected && <span className="text-sm text-gray-600">0x1234...5678</span>}
                     </div>
                  </div>
                  <Button onClick={handleWalletConnection} variant={isWalletConnected ? "outline" : "default"} className={!isWalletConnected ? "bg-[#00A9FF] hover:bg-[#0088CC] text-white" : ""}>
                     {isWalletConnected ? "Disconnect" : "Connect Wallet"}
                  </Button>
               </div>

               {isWalletConnected && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                     <p className="text-sm text-green-800">✓ Your wallet is connected and ready for secure voting transactions</p>
                  </div>
               )}
            </CardContent>
         </Card>

         {/* Account Actions */}
         <Card>
            <CardHeader>
               <CardTitle className="text-red-600">Danger Zone</CardTitle>
               <CardDescription>Irreversible account actions</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <Separator />
                  <div className="flex items-center justify-between">
                     <div>
                        <h3 className="font-medium text-gray-900">Delete Account</h3>
                        <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                     </div>
                     <Button variant="destructive">Delete Account</Button>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
