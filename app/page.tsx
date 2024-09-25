"use client";

import React, { FC } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Thread, 
  ThreadWelcome,
  Composer,
  type ThreadConfig,
  MessagePrimitive
} from "@assistant-ui/react";
import { makeMarkdownText } from "@assistant-ui/react-markdown";
import { SuggestionBtnTool } from "@/components/tools/price-snapshot/SuggestionBtnTool";

const MarkdownText = makeMarkdownText();

const MyAssistantMessage = () => {
  return (
  <MessagePrimitive.Root >
    <MessagePrimitive.Content />
  </MessagePrimitive.Root>
  )
};

const MyThread: FC<ThreadConfig> = (config) => {
  return (
    <Thread.Root config={config}>
      <Thread.Viewport>
        <Thread.Messages components={{
          AssistantMessage: MyAssistantMessage,
          UserMessage: () => null
        }}/>
      </Thread.Viewport>
    </Thread.Root>
  );
};

const MyThreadWelcome: FC = () => {
  return (
    <ThreadWelcome.Root>
      <ThreadWelcome.Center>
        <ThreadWelcome.Avatar />
        <ThreadWelcome.Message message="Ask me anything about BPH!" />
      </ThreadWelcome.Center>
      <ThreadWelcome.Suggestions />
    </ThreadWelcome.Root>
  );
};

const MainThread: FC<ThreadConfig> = (config) => {
  return (
    <Thread.Root config={config}>
      <Thread.Viewport>
        <MyThreadWelcome />
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
  return (
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
  );
}


//<ResizableHandle />
 //     <ResizablePanel>
   //     <MyThread/>
    //  </ResizablePanel>
