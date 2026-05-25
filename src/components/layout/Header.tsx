"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, siteName } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useChatLauncher } from "@/components/layout/ChatLauncher";

function Logo({ transparent }: { transparent?: boolean }) {
  return (
    <Link
      href="/"
      className="relative flex items-center"
      aria-label={`${siteName} — Home`}
    >
      {/* Light variant — shown when header is transparent over the dark hero */}
      <Image
        src="/brand/tajo-logo-light.png"
        alt=""
        aria-hidden
        width={600}
        height={589}
        priority
        className={cn(
          "h-12 w-auto lg:h-14 transition-opacity duration-300",
          transparent ? "opacity-100" : "opacity-0"
        )}
      />
      {/* Dark variant — shown when the header is solid white */}
      <Image
        src="/brand/tajo-logo.png"
        alt={siteName}
        width={600}
        height={589}
        priority
        className={cn(
          "absolute inset-y-0 left-0 h-12 w-auto lg:h-14 transition-opacity duration-300",
          transparent ? "opacity-0" : "opacity-100"
        )}
      />
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
        <Logo transparent={transparent} />

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
          <Button
            onClick={openChat}
            size="md"
            variant={transparent ? "accent" : "primary"}
          >
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
