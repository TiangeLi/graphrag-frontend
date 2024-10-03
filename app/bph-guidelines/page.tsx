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
              <ThreadWelcome.Message message={"Ask me anything about the BPH Guidelines!"} />
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

export default function Page2() {
  return (
    <MyRuntimeProvider serverUrl={"aui-graphrag.auigraphrag.internal:8000/chat"}>

    <MainThread 
      welcome={{
        suggestions: [
            { prompt: "How does Rezum work?" },
            { prompt: "What are the possible side effects of Urolift?" },
        ],
      }}
      tools={[SuggestionBtnTool]} 
      assistantMessage={{ components: { Text: MarkdownText } }} 
    />
    </MyRuntimeProvider>
  );
}