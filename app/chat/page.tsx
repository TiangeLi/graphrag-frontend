"use client";

import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ResizablePanelGroup,
  ResizablePanel,
} from "@/components/ui/resizable";
import {
  Thread, 
  ThreadWelcome,
  Composer,
  type ThreadConfig,
} from "@assistant-ui/react";
import { makeMarkdownText } from "@assistant-ui/react-markdown";
import { SuggestionBtnTool } from "@/components/tools/price-snapshot/SuggestionBtnTool";
import { MyRuntimeProvider } from "../MyRuntimeProvider";

const MarkdownText = makeMarkdownText();

const MainThread: FC<ThreadConfig> = (config) => {
  return (
    <Thread.Root config={config}>
      <Thread.Viewport>
        <ThreadWelcome.Root>
          <ThreadWelcome.Center>
            <ThreadWelcome.Avatar />
            <ThreadWelcome.Message message={config.welcome?.message || "Ask me anything!"} />
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

export default function Chat() {
  const searchParams = useSearchParams();
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [welcomeConfig, setWelcomeConfig] = useState<ThreadConfig['welcome']>({
    message: "Ask me anything!",
    suggestions: [],
  });

  useEffect(() => {
    const server = searchParams.get('server');
    if (server === 'bph') {
      setServerUrl(process.env.NEXT_PUBLIC_BACKEND_URL_BPH || '');
      setWelcomeConfig({
        message: "Ask me anything about BPH!",
        suggestions: [
          {
            prompt: "How does Rezum work for BPH?",
          },
          {
            prompt: "What are the possible side effects of Urolift?",
          },
        ],
      });
    } else if (server === 'all_guidelines') {
      setServerUrl(process.env.NEXT_PUBLIC_BACKEND_URL_ALL_GUIDELINES || '');
      setWelcomeConfig({
        message: "Ask me anything about the CUA guidelines!",
        suggestions: [
          {
            prompt: "What are the indications for timely cystectomy in NMIBC?",
          },
          {
            prompt: "What is the postop surveillance schedule for RCC?",
          }
        ],
      });
    } else {
      setServerUrl(process.env.NEXT_PUBLIC_BACKEND_URL_ALL_GUIDELINES || '');
      setWelcomeConfig({
        message: "Ask me anything about the CUA guidelines!",
        suggestions: [],
      });
    }
  }, [searchParams]);

  if (!serverUrl) {
    return <div>Loading...</div>;
  }

  return (
    <MyRuntimeProvider serverUrl={serverUrl}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <main className="h-full w-full">
            <MainThread 
              welcome={welcomeConfig}
              tools={[SuggestionBtnTool]} 
              assistantMessage={{ components: { Text: MarkdownText } }} 
            />
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </MyRuntimeProvider>
  );
}