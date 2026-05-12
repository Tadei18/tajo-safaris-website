"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, siteName, siteTagline } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useChatLauncher } from "@/components/layout/ChatLauncher";

function Wordmark({ inverted }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label={`${siteName} — Home`}
    >
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-full transition-colors",
          inverted ? "bg-white/15" : "bg-primary"
        )}
      >
        <span
          className={cn(
            "font-display text-lg font-bold leading-none",
            inverted ? "text-white" : "text-accent"
          )}
        >
          T
        </span>
      </div>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-2xl font-bold tracking-tight",
            inverted ? "text-white" : "text-ink"
          )}
        >
          Tajo
        </span>
        <span
          className={cn(
            "text-[10px] uppercase tracking-[0.18em] mt-0.5",
            inverted ? "text-white/80" : "text-ink-soft"
          )}
        >
          Safaris &amp; Tours
        </span>
      </span>
      <span className="sr-only">{siteTagline}</span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  const chat = useChatLauncher();
  const openChat = () => chat.open();

  // React-recommended pattern: reset derived state when a prop changes.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (open) setOpen(false);
  }

  React.useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Off home, the header is always solid.
  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "bg-surface/95 shadow-soft backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Wordmark inverted={transparent} />

        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  transparent
                    ? "text-white/90 hover:text-white"
                    : "text-ink-soft hover:text-ink",
                  active &&
                    (transparent ? "text-white" : "text-primary")
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button onClick={openChat} size="md">
            Plan Your Safari
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "md:hidden inline-flex size-10 items-center justify-center rounded-full",
            transparent ? "text-white" : "text-ink"
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-20 z-30 origin-top bg-bg transition-all duration-300",
          open
            ? "pointer-events-auto opacity-100 scale-100"
            : "pointer-events-none opacity-0 scale-95"
        )}
        aria-hidden={!open}
      >
        <nav
          className="flex h-full flex-col gap-2 p-6"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-3xl text-ink py-4 border-b border-ink/10"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-6">
            <Button
              onClick={() => {
                setOpen(false);
                openChat();
              }}
              size="lg"
              className="w-full"
            >
              Plan Your Safari
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
