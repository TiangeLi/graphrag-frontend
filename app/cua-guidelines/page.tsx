"use client";

import React from 'react';
import Link from 'next/link';
import { MyRuntimeProvider } from "@/app/MyRuntimeProvider";
import { Button } from "@/components/ui/button";
import { Thread } from "@assistant-ui/react";
import { makeMarkdownText } from "@assistant-ui/react-markdown";
import { SuggestionBtnTool } from "@/components/tools/price-snapshot/SuggestionBtnTool";

import { FC } from 'react';
import {
  ThreadWelcome,
  Composer,
  type ThreadConfig,
} from "@assistant-ui/react";

const MarkdownText = makeMarkdownText();

const MainThread: FC<ThreadConfig> = (config) => {
    return (
      <Thread.Root config={config}>
        <Thread.Viewport>
          <ThreadWelcome.Root>
            <ThreadWelcome.Center>
              <ThreadWelcome.Avatar />
              <ThreadWelcome.Message message={"Ask me anything about the CUA Guidelines!"} />
            </ThreadWelcome.Center>
            <ThreadWelcome.Suggestions />
          </ThreadWelcome.Root>
          <Thread.Messages />
          <Thread.ViewportFooter>
            <Thread.ScrollToBottom />
            <Composer />
          </Thread.ViewportFooter>
        </Thread.Viewport>
      </Thread.Root>
    );
  };
export default function Page1() {
  return (
    <MyRuntimeProvider serverUrl={"http://aui-graphrag.auigraphrag.internal:8001/chat"}>

          <MainThread 
            welcome={{
              suggestions: [
                { prompt: "What is the postop surveillance schedule for RCC?" },
                { prompt: "What are the indications for timely cystectomy in NMIBC?" },
              ],
            }}
            tools={[SuggestionBtnTool]} 
            assistantMessage={{ components: { Text: MarkdownText } }} 
          />
    </MyRuntimeProvider>
  );
}