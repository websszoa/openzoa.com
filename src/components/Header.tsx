import { Blend } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = ["Details", "Resources", "About", "Submit"];

export default function Header() {
  return (
    <header className="h-20 px-6">
      <Button
        size="icon"
        className="fixed left-6 top-6 z-50 rounded-full bg-black text-white hover:bg-black/80"
      >
        <Blend size={20} />
      </Button>

      <nav className="fixed right-6 top-6 z-50 flex flex-col items-end gap-2">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="font-google-sans-flex font-medium text-gray-900 hover:text-gray-900 transition-colors flex items-center justify-end gap-1"
          >
            {link}
            <span className="text-gray-300">—</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
