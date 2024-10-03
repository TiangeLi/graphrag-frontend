"use client";
 
import type { ReactNode } from "react";
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  type ChatModelAdapter,
} from "@assistant-ui/react";


type Content = {
  type: "text" | "tool-call";
  text?: string;
  toolName?: string;
  args?: any;
  result?: any;
}
 
const createModelAdapter = (serverUrl: string): ChatModelAdapter => ({
  async *run({ messages, abortSignal }) {
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
      signal: abortSignal,
    });
  
      if (!response.body) {
        throw new Error("No response body");
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
  
      let buffer = '';
      let currentText = '';
      let textchunks: { [key: string]: string } = {}; 
      let accumulatedContent: any[] = [];

      let _toYield: any[] = [];

      let responseItems: { [key: string]: Content } = {};
  
      function parseJSON(str: string) {
        const results = [];
        let depth = 0;
        let startIndex = -1;
      
        for (let i = 0; i < str.length; i++) {
          if (str[i] === '{') {
            if (depth === 0) startIndex = i;
            depth++;
          }
          if (str[i] === '}') {
            depth--;
            if (depth === 0 && startIndex !== -1) {
              try {
                const obj = JSON.parse(str.slice(startIndex, i + 1));
                results.push(obj);
                startIndex = -1;
              } catch {
                // If parsing fails, we just continue
              }
            }
          }
        }
        return results;
      }
  
      while (true) {
        const { done, value } = await reader.read();
              
        const chunk = decoder.decode(value, { stream: true });
        buffer = chunk;
        
        const events = parseJSON(buffer);
      
        for (const event of events) {
          
          switch (event.type) {
            case "text":
              if (!responseItems[event.id]) {
                responseItems[event.id] = { type: "text", text: "" };
              }
              responseItems[event.id].text += event.text;
              for (const id in responseItems) {
                _toYield.push(responseItems[id]);
                if (responseItems[id].type === "text") {
                  _toYield.push({type:"text", text:"---"});
                }
              }
              yield { content: [responseItems[event.id]] };

              _toYield = [];
              break;
            case "suggestion":
              if (!responseItems[event.id]) {
                responseItems[event.id] = { type: "tool-call", toolName: "suggestion_btn", args: {suggestion: ""} };
              }
              responseItems[event.id].args.suggestion += event.text;
              for (const id in responseItems) {
                _toYield.push(responseItems[id]);
                if (responseItems[id].type === "text") {
                  _toYield.push({type:"text", text:"---"});
                }
              }
              //yield { content: [responseItems[event.id]] };
              _toYield = [];
              break;
          }
        }

        for (const id in responseItems) {
          _toYield.push(responseItems[id]);
          if (responseItems[id].type === "text") {
            _toYield.push({type:"text", text:"---"});
          }
        }
        yield { content: _toYield };
        _toYield = [];

        const lastEventEnd = buffer.lastIndexOf('}') + 1;
        const textChunk = buffer.slice(lastEventEnd);
        buffer = buffer.slice(0, lastEventEnd);
        
        if (textChunk) {
          currentText += textChunk;
          yield { content: [...accumulatedContent, {type: "text", text: currentText}] };
        }

        if (done) { break }
      }
    }
  });
 
  export function MyRuntimeProvider({
    children,
    serverUrl,
  }: Readonly<{
    children: ReactNode;
    serverUrl: string;
  }>) {
    const runtime = useLocalRuntime(createModelAdapter(serverUrl));
  
    return (
      <AssistantRuntimeProvider runtime={runtime}>
        {children}
      </AssistantRuntimeProvider>
    );
  }