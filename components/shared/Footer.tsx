import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.05] py-10 mt-10">
      <div className="container-pad mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-bold text-white">
            RT
          </span>
          <span>
            © {year} {profile.name}. Built with Next.js, Tailwind & a lot of vector math.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`mailto:${profile.email}`}
            className="text-muted-foreground hover:text-foreground transition"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
