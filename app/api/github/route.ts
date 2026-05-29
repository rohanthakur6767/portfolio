import { NextResponse } from "next/server";
import { profile } from "@/lib/data";

export const runtime = "nodejs";
export const revalidate = 3600;

interface Repo {
  name: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  language: string | null;
  size: number;
}

interface User {
  public_repos: number;
  followers: number;
  following: number;
}

async function gh<T>(path: string): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "rohan-portfolio",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(`https://api.github.com${path}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

export async function GET() {
  const username = profile.githubUsername;
  try {
    const [user, repos] = await Promise.all([
      gh<User>(`/users/${username}`),
      gh<Repo[]>(`/users/${username}/repos?per_page=100&sort=updated`),
    ]);

    const owned = repos.filter((r) => !r.fork);
    const stars = owned.reduce((s, r) => s + r.stargazers_count, 0);
    const forks = owned.reduce((s, r) => s + r.forks_count, 0);

    const langSize = new Map<string, number>();
    for (const r of owned) {
      if (!r.language) continue;
      langSize.set(r.language, (langSize.get(r.language) ?? 0) + (r.size || 1));
    }
    const total = Array.from(langSize.values()).reduce((a, b) => a + b, 0) || 1;
    const topLanguages = Array.from(langSize.entries())
      .map(([name, size]) => ({ name, pct: (size / total) * 100 }))
      .sort((a, b) => b.pct - a.pct);

    return NextResponse.json(
      {
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        stars,
        forks,
        topLanguages,
      },
      { headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" } }
    );
  } catch (err) {
    console.warn("[/api/github] fallback:", err);
    return NextResponse.json(
      {
        publicRepos: 12,
        followers: 8,
        following: 14,
        stars: 6,
        forks: 2,
        topLanguages: [
          { name: "Python", pct: 58 },
          { name: "JavaScript", pct: 22 },
          { name: "TypeScript", pct: 10 },
          { name: "Jupyter Notebook", pct: 6 },
          { name: "C++", pct: 4 },
        ],
      },
      { headers: { "Cache-Control": "public, max-age=600" } }
    );
  }
}
