import { Cookie, MapPin, Scale, WandSparkles } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const footerItems = [
    {
      title: "Our Services",
      links: [
        {
          name: "Start Generating",
          href: "/generate",
          icon: <WandSparkles className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "Legal",
      links: [
        {
          name: "Impressum",
          href: "/impressum",
          icon: <MapPin className="w-5 h-5" />,
        },
        {
          name: "Terms of Service",
          href: "/terms-of-service",
          icon: <Scale className="w-5 h-5" />,
        },
        {
          name: "Privacy Policy",
          href: "/privacy-policy",
          icon: <Cookie className="w-5 h-5" />,
        },
      ],
    },
  ];

  return (
    <footer className="bg-secondary text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid für Responsivität */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {footerItems.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-bold mb-4 text-primary underline underline-offset-4 decoration-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-base w-max hover:underline hover:decoration-primary hover:underline-offset-2"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Zusätzliche coole Elemente */}
        <div className="mt-10 pt-6 border-t border-white/20 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <span className="sr-only">X</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.205 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817H1.643l7.665-8.754-8.058-10.746h6.822l4.733 6.254 5.4-6.254zm-1.148 17.543h1.84L6.955 4.693h-1.97l12.072 15.1z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1-.7 0-.7 0-.7 1.2 0 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .3-.8.6-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.8-.5-2.7.2-5.5 0 0 1.7-.5 5.5 2 1.6-.5 3.3-.7 5-.7 1.7 0 3.4.2 5 .7 3.8-2.5 5.5-2 5.5-2 .7 2.8.2 4.7.1 5.5.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;