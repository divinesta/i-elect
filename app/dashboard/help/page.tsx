"use client";

import { Mail, MessageSquare } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function HelpPage() {
   return (
      <DashboardLayout>
         <div className="flex flex-col space-y-6">
            <div>
               <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
               <p className="text-muted-foreground">Find answers to common questions or contact support.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
               <Card>
                  <CardHeader>
                     <CardTitle>Frequently Asked Questions</CardTitle>
                     <CardDescription>Common questions about using iElect</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                           <AccordionTrigger>How do I vote in an election?</AccordionTrigger>
                           <AccordionContent>
                              To vote in an election, go to the Elections page, find an ongoing election, and click "Vote Now". Select your preferred candidate or option, review your choice, and click
                              "Confirm Vote". You'll receive a vote ID for verification purposes.
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                           <AccordionTrigger>What is a vote ID and why do I need it?</AccordionTrigger>
                           <AccordionContent>
                              A vote ID is a unique identifier for your vote on the blockchain. It allows you to verify that your vote was correctly recorded without revealing your identity. Keep your
                              vote ID secure as it's your proof of participation.
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                           <AccordionTrigger>How do I verify my vote?</AccordionTrigger>
                           <AccordionContent>
                              To verify your vote, go to the Voting History page and click "Verify" next to the election, or use the verification form at the bottom of the page. Enter your vote ID to
                              confirm your vote was recorded correctly on the blockchain.
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                           <AccordionTrigger>Why do I need to connect a wallet?</AccordionTrigger>
                           <AccordionContent>
                              Connecting a blockchain wallet allows you to securely sign your votes and verify your identity without revealing personal information. It's an essential part of ensuring
                              the security and transparency of the voting process.
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                           <AccordionTrigger>How is my privacy protected?</AccordionTrigger>
                           <AccordionContent>
                              iElect uses advanced cryptographic techniques to ensure your vote remains private while still being verifiable. Your personal identity is never stored on the blockchain,
                              only an encrypted version of your vote that you can verify with your vote ID.
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>Contact Support</CardTitle>
                     <CardDescription>Get help from our support team</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form className="space-y-4">
                        <div className="space-y-2">
                           <label htmlFor="name" className="text-sm font-medium">
                              Name
                           </label>
                           <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                           <label htmlFor="email" className="text-sm font-medium">
                              Email
                           </label>
                           <Input id="email" type="email" placeholder="Your email address" />
                        </div>
                        <div className="space-y-2">
                           <label htmlFor="subject" className="text-sm font-medium">
                              Subject
                           </label>
                           <Input id="subject" placeholder="How can we help you?" />
                        </div>
                        <div className="space-y-2">
                           <label htmlFor="message" className="text-sm font-medium">
                              Message
                           </label>
                           <Textarea id="message" placeholder="Describe your issue or question" rows={4} />
                        </div>
                        <Button type="submit" className="w-full">
                           Send Message
                        </Button>
                     </form>

                     <div className="mt-6 space-y-4">
                        <div className="flex items-start space-x-3">
                           <Mail className="h-5 w-5 text-blue-500" />
                           <div>
                              <h3 className="text-sm font-medium">Email Support</h3>
                              <p className="text-sm text-muted-foreground">support@ielect.com</p>
                           </div>
                        </div>
                        <div className="flex items-start space-x-3">
                           <MessageSquare className="h-5 w-5 text-blue-500" />
                           <div>
                              <h3 className="text-sm font-medium">Live Chat</h3>
                              <p className="text-sm text-muted-foreground">Available Monday-Friday, 9am-5pm ET</p>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </DashboardLayout>
   );
}
