import { Blend } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks } from "@/lib/menu";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-4">
        {/* 로고 */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white">
          <Blend size={16} />
        </div>

        {/* 링크 */}
        <nav className="flex items-center gap-6">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* 카피라이트 */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} openzoa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
