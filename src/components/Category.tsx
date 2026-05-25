import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  Sparkles,
  Code2,
  Layers,
  Wand2,
  PenTool,
  Image,
  Type,
  Globe,
  Box,
  Clapperboard,
  Share2,
} from "lucide-react";

export const CATEGORIES = [
  { label: "전체", icon: LayoutGrid },
  { label: "Prototyping", icon: Layers },
  { label: "Generated Code", icon: Sparkles },
  { label: "Code Tool", icon: Code2 },
  { label: "UI Generator", icon: Wand2 },
  { label: "Figma", icon: PenTool },
  { label: "Site Builder", icon: Globe },
  { label: "Design Systems", icon: Share2 },
  { label: "Images", icon: Image },
  { label: "Animation", icon: Clapperboard },
  { label: "Typography", icon: Type },
  { label: "3D", icon: Box },
];

type Props = {
  active: string;
  onChange: (label: string) => void;
};

export default function Category({ active, onChange }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-2">
      {CATEGORIES.map(({ label, icon: Icon }) => (
        <Button
          key={label}
          variant={active === label ? "default" : "outline"}
          className="font-anyvid rounded-full"
          onClick={() => onChange(label)}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
