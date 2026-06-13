"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import logoSrc from "../../public/logo.png";
import type { Locale } from "@/lib/i18n.client";
import type { Dictionary } from "@/lib/dictionaries/en";

function LanguageSwitcherFallback() {
  return <div aria-hidden className="h-7 w-[88px]" />;
}

export function SiteHeader({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks: { href: string; label: string; isAnchor?: boolean }[] = [];

  const isActive = (href: string, isAnchor?: boolean) => {
    if (isAnchor) return false;
    if (href === `/${lang}`) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`sticky top-0 z-40 relative transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-shogun-cream/90 backdrop-blur-md border-b border-shogun-black/10"
          : "bg-shogun-cream/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-20 sm:h-24 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            aria-label="Shogun Sushi — home"
            onClick={(e) => {
              if (pathname === `/${lang}`) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center shrink-0 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-shogun-red focus-visible:ring-offset-2 focus-visible:ring-offset-shogun-cream"
          >
            <Image
              src={logoSrc}
              alt="Shogun Sushi"
              priority
              placeholder="blur"
              sizes="(max-width: 640px) 170px, 220px"
              className="h-14 sm:h-16 w-auto select-none"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href, link.isAnchor);
              const className = `relative px-3 py-2 font-display tracking-[0.22em] text-sm transition-colors ${
                active
                  ? "text-shogun-red"
                  : "text-shogun-black hover:text-shogun-red"
              }`;
              const underline = (
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] origin-left bg-shogun-red transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              );
              return link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={className}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {underline}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={className}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {underline}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Suspense fallback={<LanguageSwitcherFallback />}>
              <LanguageSwitcher current={lang} variant="dark" />
            </Suspense>
            <a
              href="tel:+995599130920"
              className="inline-flex items-center gap-2 bg-shogun-red text-shogun-cream font-display tracking-[0.22em] text-sm px-5 py-2.5 hover:bg-shogun-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-shogun-red focus-visible:ring-offset-2 focus-visible:ring-offset-shogun-cream"
            >
              <PhoneIcon />
              {dict.nav.call}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-shogun-black hover:bg-shogun-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-shogun-red"
          >
            <BurgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden border-t border-shogun-black/10 transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col gap-1 bg-shogun-cream"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href, link.isAnchor);
            const className = `font-display tracking-[0.22em] text-base px-3 py-3 rounded-md border-l-2 transition-colors ${
              active
                ? "text-shogun-red border-shogun-red bg-shogun-red/5"
                : "text-shogun-black border-transparent hover:bg-shogun-black/5"
            }`;
            return link.isAnchor ? (
              <a
                key={link.href}
                href={link.href}
                className={className}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={className}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-shogun-black/10">
            <Suspense fallback={<LanguageSwitcherFallback />}>
              <LanguageSwitcher current={lang} variant="dark" />
            </Suspense>
            <a
              href="tel:+995599130920"
              className="inline-flex items-center gap-2 bg-shogun-red text-shogun-cream font-display tracking-[0.22em] text-sm px-5 py-3 hover:bg-shogun-black transition-colors"
            >
              <PhoneIcon />
              {dict.nav.call}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
      <line
        x1="3"
        x2="19"
        y1="6"
        y2="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          transform: open ? "translateY(5px) rotate(45deg)" : "none",
          transformOrigin: "center",
          transition: "transform 250ms ease",
        }}
      />
      <line
        x1="3"
        x2="19"
        y1="11"
        y2="11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          opacity: open ? 0 : 1,
          transition: "opacity 150ms ease",
        }}
      />
      <line
        x1="3"
        x2="19"
        y1="16"
        y2="16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
          transformOrigin: "center",
          transition: "transform 250ms ease",
        }}
      />
    </svg>
  );
}
