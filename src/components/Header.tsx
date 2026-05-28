import { Blend } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/menu";

export default function Header() {
  return (
    <header className="px-6">
      <Link to="/">
        <Button
          size="icon"
          className="fixed left-6 top-6 z-50 rounded-full bg-black text-white hover:bg-black/80 group"
        >
          <Blend
            size={20}
            className="transition-transform duration-500 group-hover:rotate-180"
          />
        </Button>
      </Link>

      <nav className="fixed right-6 top-6 z-50 flex flex-col items-end gap-2">
        {navLinks.map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              className="font-google-sans-flex font-medium text-gray-900 hover:text-gray-500 transition-colors flex items-center justify-end gap-1"
            >
              {link.label}
              <span className="text-gray-300">—</span>
            </a>
          ) : (
            <Link
              key={link.label}
              to={link.href}
              className="font-google-sans-flex font-medium text-gray-900 hover:text-gray-500 transition-colors flex items-center justify-end gap-1"
            >
              {link.label}
              <span className="text-gray-300">—</span>
            </Link>
          ),
        )}
      </nav>
    </header>
  );
}
