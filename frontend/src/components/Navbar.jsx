"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Training", path: "/training" },
  { name: "Staffing", path: "/staffing" },
  { name: "Career", path: "/career" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const linkClass = (path) =>
    `block rounded-xl px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
      pathname === path ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-gray-200 bg-white shadow-sm">
      <nav aria-label="Main navigation" className="relative z-10 mx-auto max-w-7xl bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex h-[var(--navbar-height)] items-center justify-between gap-4">
          <Link href="/" aria-label="Internfy home" onClick={() => setMenuOpen(false)} className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-blue-600">
            <Image src="/internfy-logo.png" alt="" width={48} height={48} sizes="(min-width: 768px) 48px, 40px" loading="eager" className="h-10 w-10 rounded-full object-contain md:h-12 md:w-12" />
            <span className="text-lg font-bold text-cyan-600 sm:text-xl">Internfy</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path} aria-current={pathname === item.path ? "page" : undefined} className={linkClass(item.path)}>{item.name}</Link>
              </li>
            ))}
          </ul>

          <button ref={menuButton} type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-gray-800 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-blue-600 lg:hidden">
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <div id="mobile-navigation" hidden={!menuOpen} className="max-h-[calc(100dvh-var(--navbar-height))] overflow-y-auto border-t border-gray-100 py-3 lg:hidden" onBlur={(event) => {
          if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== menuButton.current) setMenuOpen(false);
        }}>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path} aria-current={pathname === item.path ? "page" : undefined} onClick={() => setMenuOpen(false)} className={linkClass(item.path)}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {menuOpen && <button type="button" tabIndex={-1} aria-label="Close navigation" onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/40 lg:hidden" />}
    </header>
  );
}
