import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const runtime = "edge";
export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse at top left, #2e1065 0%, #0a0a0f 60%), #0a0a0f",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#a78bfa",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          {profile.title}
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05, marginBottom: 32 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.75)", maxWidth: 900, lineHeight: 1.3 }}>
          {profile.tagline}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.55)",
            fontSize: 22,
          }}
        >
          <span>github.com/{profile.githubUsername}</span>
          <span>{profile.location}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
