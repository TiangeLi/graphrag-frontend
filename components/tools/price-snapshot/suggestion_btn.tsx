"use client";
 
import { Button } from "@/components/ui/button"

import { ThreadPrimitive } from "@assistant-ui/react";

 
type SuggestionProps = {
  suggestion: string;
};
 
export function SuggestionBtn({
  suggestion
}: SuggestionProps) {
  return (
    <ThreadPrimitive.Suggestion
        prompt={suggestion || ""}
        method="replace"
        autoSend
        asChild
      >
        <Button
          variant="outline"
          className="w-full h-auto flex-1 p-2"
          style={{ whiteSpace: "normal", wordWrap: "break-word" }}
        >
          {suggestion}
        </Button>
      </ThreadPrimitive.Suggestion>
  )
}

