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
import { MyRuntimeProvider } from "./MyRuntimeProvider";

const MarkdownText = makeMarkdownText();

const MainThread: FC<ThreadConfig> = (config) => {
  return (
    <Thread.Root config={config}>
      <Thread.Viewport>
        <ThreadWelcome.Root>
          <ThreadWelcome.Center>
            <ThreadWelcome.Avatar />
            <ThreadWelcome.Message message="Ask me anything about BPH!" />
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

export default function Home() {
  const searchParams = useSearchParams();
  const [serverUrl, setServerUrl] = useState<string | null>(null);

  useEffect(() => {
    const server = searchParams.get('server');
    if (server === '1') {
      setServerUrl(process.env.NEXT_PUBLIC_BACKEND_URL_BPH || '');
    } else if (server === '2') {
      setServerUrl(process.env.NEXT_PUBLIC_BACKEND_URL_ALL_GUIDELINES || '');
    } else {
      setServerUrl(process.env.NEXT_PUBLIC_BACKEND_URL_ALL_GUIDELINES || '');
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
              welcome={{
                suggestions: [
                  {
                    prompt: "How does Rezum work?",
                  },
                  {
                    prompt: "What are the possible side effects of Urolift?",
                  },
                ],
              }}
              tools={[SuggestionBtnTool]} 
              assistantMessage={{ components: { Text: MarkdownText } }} 
            />
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </MyRuntimeProvider>
  );
}