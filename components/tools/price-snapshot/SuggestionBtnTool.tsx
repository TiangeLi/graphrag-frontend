"use client";
 
import { SuggestionBtn } from "./suggestion_btn";
import { makeAssistantToolUI } from "@assistant-ui/react";
 
type SuggestionProps = {
  suggestion: string;
};
 
export const SuggestionBtnTool = makeAssistantToolUI<
  SuggestionProps,
  string
>({
  toolName: "suggestion_btn",
  render: function PercentagesUI({ part: { args, result } }) {
    return (
      <SuggestionBtn suggestion={args.suggestion} />
    );
  },
});