"use client";

import type React from "react";

import { useState } from "react";
import { Wallet } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
   const [isUpdating, setIsUpdating] = useState(false);
   const [isConnectingWallet, setIsConnectingWallet] = useState(false);
   const [walletConnected, setWalletConnected] = useState(false);
   const [walletAddress, setWalletAddress] = useState("");

   const handleProfileUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      setIsUpdating(true);
      // Simulate API call
      setTimeout(() => {
         setIsUpdating(false);
         // Show success message
      }, 1000);
   };

   const handlePasswordUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      setIsUpdating(true);
      // Simulate API call
      setTimeout(() => {
         setIsUpdating(false);
         // Show success message
      }, 1000);
   };

   const handleConnectWallet = () => {
      setIsConnectingWallet(true);
      // Simulate wallet connection
      setTimeout(() => {
         setIsConnectingWallet(false);
         setWalletConnected(true);
         setWalletAddress("0x7f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a");
      }, 1500);
   };

   const handleDisconnectWallet = () => {
      setWalletConnected(false);
      setWalletAddress("");
   };

   return (
      <DashboardLayout>
         <div className="flex flex-col space-y-6">
            <div>
               <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
               <p className="text-muted-foreground">Manage your account details and security.</p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
               <TabsList className="grid w-full grid-cols-3 md:w-auto">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="wallet">Wallet</TabsTrigger>
               </TabsList>

               <TabsContent value="profile" className="mt-6">
                  <Card>
                     <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                     </CardHeader>
                     <form onSubmit={handleProfileUpdate}>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" defaultValue="John Doe" />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input id="email" type="email" defaultValue="john.doe@example.com" />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                           </div>
                        </CardContent>
                        <CardFooter>
                           <Button type="submit" disabled={isUpdating}>
                              {isUpdating ? "Saving..." : "Save Changes"}
                           </Button>
                        </CardFooter>
                     </form>
                  </Card>
               </TabsContent>

               <TabsContent value="password" className="mt-6">
                  <Card>
                     <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password to keep your account secure</CardDescription>
                     </CardHeader>
                     <form onSubmit={handlePasswordUpdate}>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                              <Label htmlFor="current-password">Current Password</Label>
                              <Input id="current-password" type="password" />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <Input id="new-password" type="password" />
                              <p className="text-xs text-muted-foreground">Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.</p>
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="confirm-password">Confirm New Password</Label>
                              <Input id="confirm-password" type="password" />
                           </div>
                        </CardContent>
                        <CardFooter>
                           <Button type="submit" disabled={isUpdating}>
                              {isUpdating ? "Updating..." : "Update Password"}
                           </Button>
                        </CardFooter>
                     </form>
                  </Card>
               </TabsContent>

               <TabsContent value="wallet" className="mt-6">
                  <Card>
                     <CardHeader>
                        <CardTitle>Blockchain Wallet</CardTitle>
                        <CardDescription>Connect your wallet for vote verification</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        {walletConnected ? (
                           <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                              <div className="flex items-center space-x-4">
                                 <div className="rounded-full bg-green-100 p-2">
                                    <Wallet className="h-5 w-5 text-green-600" />
                                 </div>
                                 <div className="flex-1">
                                    <h3 className="text-sm font-medium">Wallet Connected</h3>
                                    <p className="text-xs text-muted-foreground break-all">{walletAddress}</p>
                                 </div>
                              </div>
                           </div>
                        ) : (
                           <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center">
                              <Wallet className="mx-auto h-8 w-8 text-gray-400" />
                              <h3 className="mt-2 text-sm font-medium text-gray-900">No wallet connected</h3>
                              <p className="mt-1 text-xs text-gray-500">Connect your blockchain wallet to verify your votes and participate in elections.</p>
                           </div>
                        )}

                        <div className="text-sm text-muted-foreground">
                           <p>Your wallet is used to securely sign your votes and verify your identity on the blockchain without revealing your personal information.</p>
                        </div>
                     </CardContent>
                     <CardFooter>
                        {walletConnected ? (
                           <Button variant="outline" onClick={handleDisconnectWallet}>
                              Disconnect Wallet
                           </Button>
                        ) : (
                           <Button onClick={handleConnectWallet} disabled={isConnectingWallet}>
                              {isConnectingWallet ? "Connecting..." : "Connect Wallet"}
                           </Button>
                        )}
                     </CardFooter>
                  </Card>
               </TabsContent>
            </Tabs>
         </div>
      </DashboardLayout>
   );
}
