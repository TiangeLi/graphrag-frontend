"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Pick a Chat PeePee T</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>BPH Guidelines</CardTitle>
            <CardDescription>Practice Guidelines from the CUA, AUA, and EAU</CardDescription>
          </CardHeader>
          <CardContent>
            <p>BPH specific treatments, symptoms, and management strategies.</p>
          </CardContent>
          <CardFooter>
            <Link href="/bph-guidelines" className="w-full">
              <Button className="w-full">Go to BPH Guidelines</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>CUA Guidelines</CardTitle>
            <CardDescription>Practice Guidelines from the CUA</CardDescription>
          </CardHeader>
          <CardContent>
            <p>All 61 Guidelines! Wow<br/><br/></p>
          </CardContent>
          <CardFooter>
            <Link href="/cua-guidelines" className="w-full">
              <Button className="w-full">Go to CUA Guidelines</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}