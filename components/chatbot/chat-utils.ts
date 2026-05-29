export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const SUGGESTED_PROMPTS = [
  "What kind of AI work has Rohan shipped?",
  "Tell me about the LangGraph newsletter agent.",
  "Why should we interview him?",
  "Is he open to roles right now?",
];

export const INITIAL_GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hey — I'm Rohan's portfolio assistant. Ask me about his agentic AI projects, the RAG internship, the fraud-detection system, or his availability.",
};
