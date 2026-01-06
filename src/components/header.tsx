"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

export function Header() {
  const t = useTranslations("Header");
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname.endsWith("/");
    }
    return pathname.includes(path);
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDarkMode =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    const theme = newIsDark ? "dark" : "light";
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  };

  return (
    <header className="w-full py-6 px-5.5 md:px-15 lg:px-24 flex items-center justify-between relative">
      <div className="flex items-center">
        <Link href="/">
          <span className="text-xl font-bold text-[#121212] dark:text-white">
            SpaceX L.
          </span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-10">
        <Link
          className={`text-[14px] font-medium tracking-[0.05em] uppercase transition-opacity relative group ${
            isActive("/")
              ? "text-[#121212] dark:text-white"
              : "text-[#555555] dark:text-[#7f7f7f] hover:opacity-80"
          }`}
          href="/"
        >
          <span className="absolute -top-6 left-0 right-0 h-0.5 bg-[#121212] dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
          {t("home")}
        </Link>
        <Link
          className={`text-[12px] lg:text-[14px] tracking-[0.05em] uppercase transition-opacity relative group ${
            isActive("/launches")
              ? "text-[#121212] dark:text-white font-medium"
              : "text-[#555555] dark:text-[#7f7f7f] font-normal hover:opacity-80"
          }`}
          href="/launches"
        >
          <span className="absolute -top-6 left-0 right-0 h-0.5 bg-[#121212] dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
          {t("launches")}
        </Link>
        <button
          aria-label={t("toggleTheme")}
          className="p-1.5 rounded-full hover:bg-[#f5f5f5] dark:hover:bg-[#323232] transition-colors"
          onClick={toggleTheme}
          type="button"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-[#555555] dark:text-[#7f7f7f]" />
          ) : (
            <Moon className="w-6 h-6 text-[#555555] dark:text-[#7f7f7f]" />
          )}
        </button>
      </nav>

      <div className="flex md:hidden items-center gap-4">
        <button
          aria-label={t("toggleTheme")}
          className="p-1.5 rounded-full hover:bg-[#f5f5f5] dark:hover:bg-[#323232] transition-colors"
          onClick={toggleTheme}
          type="button"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-[#555555] dark:text-[#7f7f7f]" />
          ) : (
            <Moon className="w-5 h-5 text-[#555555] dark:text-[#7f7f7f]" />
          )}
        </button>
        <button
          aria-label={t("toggleMenu")}
          className="p-1.5 rounded-full hover:bg-[#f5f5f5] dark:hover:bg-[#323232] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-18 right-4 bg-white dark:bg-[#121212] border border-[#e3e3e3] dark:border-[#323232] rounded-lg shadow-lg p-4 flex flex-col gap-4 md:hidden z-50">
          <Link
            className={`text-[13px] tracking-[0.05em] uppercase transition-opacity ${
              isActive("/")
                ? "text-[#121212] dark:text-white font-medium"
                : "text-[#555555] dark:text-[#7f7f7f] font-normal hover:opacity-60"
            }`}
            href="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("home")}
          </Link>
          <Link
            className={`text-[13px] tracking-[0.05em] uppercase transition-opacity ${
              isActive("/launches")
                ? "text-[#121212] dark:text-white font-medium"
                : "text-[#555555] dark:text-[#7f7f7f] font-normal hover:opacity-80"
            }`}
            href="/launches"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("launches")}
          </Link>
        </div>
      )}
    </header>
  );
}
