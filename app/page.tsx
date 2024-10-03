"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Pick a Chat PPT</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ServerCard 
          title="BPH" 
          description="BPH Specific Guidelines, from the CUA, AUA, and EAU"
          server="bph"
        />
        <ServerCard 
          title="CUA Guidelines" 
          description="Chat with all 61 CUA Guidelines"
          server="all_guidelines"
        />
      </div>
    </div>
  );
}

interface ServerCardProps {
  title: string;
  description: string;
  server: string;
}

const ServerCard: React.FC<ServerCardProps> = ({ title, description, server }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/chat?server=${server}`} passHref>
          <Button className="w-full">Connect</Button>
        </Link>
      </CardContent>
    </Card>
  );
};