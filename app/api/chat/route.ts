import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildSystemInstruction } from "@/lib/gemini-context";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 12;
const buckets = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.reset < now) {
    buckets.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  b.count += 1;
  return b.count > RATE_MAX;
}

function demoReply(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("project") || p.includes("work") || p.includes("build"))
    return "Rohan's featured work includes the Autonomous AI Newsletter Agent (a 7-node LangGraph state machine with human-in-the-loop approval), an AI Fraud Detection ecosystem with XGBoost + SHAP + an RPA pipeline (AUC 0.9522, workflow cut from 12 min to <2s), and a Traffic-Sign CNN at 98%+ accuracy. Live demos are linked under Projects.";
  if (p.includes("rag") || p.includes("retrieval") || p.includes("vector"))
    return "Rohan ships RAG in production. At his current internship (AI Future Gen) he built a Node.js + PostgreSQL/pgvector pipeline with PDF and JSON ingestion plus embedding-based semantic search.";
  if (p.includes("hire") || p.includes("availability") || p.includes("open"))
    return "Rohan is open to AI/ML Engineer roles — full-time and internships. Fastest contact: rt633811@gmail.com or the contact form below.";
  if (p.includes("stack") || p.includes("skills") || p.includes("tech"))
    return "Core stack: Python, FastAPI, Node.js, LangGraph/LangChain, PostgreSQL + pgvector, PyTorch/TensorFlow, XGBoost, Docker, React + Next.js. GCP Pro ML Engineer certified.";
  return "I'm Rohan's portfolio assistant. Ask me about his agentic AI work, RAG projects, the fraud-detection system, or his availability — and I'll share the specifics. (Running in demo mode: configure GEMINI_API_KEY for live responses.)";
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anon";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again in a minute." },
        { status: 429 }
      );
    }

    const body = (await req.json()) as {
      messages?: ChatMessage[];
      message?: string;
    };
    const history = Array.isArray(body.messages) ? body.messages : [];
    const latest =
      body.message ?? history.filter((m) => m.role === "user").slice(-1)[0]?.content ?? "";

    if (!latest || typeof latest !== "string" || latest.length > 2000) {
      return NextResponse.json({ error: "Invalid message." }, { status: 400 });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return NextResponse.json({ reply: demoReply(latest), mode: "demo" });
    }

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: buildSystemInstruction(),
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 512,
      },
    });

    const chat = model.startChat({
      history: history
        .slice(0, -1)
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
    });

    const result = await chat.sendMessage(latest);
    const reply = result.response.text();

    return NextResponse.json({ reply, mode: "live" });
  } catch (err) {
    console.error("[/api/chat] error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
