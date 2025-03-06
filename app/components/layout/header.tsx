"use client"; // Next.js Client Component Directive

import { useState } from "react";
import { BookOpen, CreditCard, Euro, Home, Mail, Menu, User, X } from "lucide-react"; // X für Schließen-Symbol
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WandSparkles } from "lucide-react";
import HeaderAuth from "./header-auth";

const Header = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();


  const MenuItems = [
    {
      name: "Start Generating",
      href: "/",
      icon: <WandSparkles className="w-4 h-4" />,
    },
    {
      name: "Pricing",
      href: "/pricing",
      icon: <Euro  className="w-4 h-4" />,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      name: "Blog",
      href: "/blog",
      icon: <BookOpen className="w-4 h-4" />,
    },

  ];

  return (
    <header className="w-full bg-secondary text-white shadow-md sticky md:relative top-0 md:top-auto z-50">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold hover:underline underline-offset-4 decoration-primary">
          Railwail
        </Link>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="focus:outline-none"
          >
            {isOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {MenuItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="flex items-center text-white gap-2 text-lg hover:text-white hover:underline underline-offset-4 decoration-primary transition-colors"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
          {children}
        </nav>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-secondary flex flex-col items-center gap-4 py-4">
          {MenuItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              onClick={() => setIsOpen(false)} // Schließt Menü nach Klick
              className={`flex items-center gap-2 hover:text-white text-lg hover:underline underline-offset-4 decoration-primary transition-colors ${pathname === item.href ? "text-primary" : "text-white"}`}
            >
              {item.icon}
              <span className="text-lg">{item.name}</span>
            </Link>
          ))}
          {children}
        </nav>
      )}
    </header>
  );
};

export default Header;