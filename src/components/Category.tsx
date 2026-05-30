import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  Sparkles,
  Wand2,
  Image,
  PenTool,
  Terminal,
} from "lucide-react";

export const CATEGORIES = [
  { label: "전체", icon: LayoutGrid },
  { label: "Design Tool", icon: PenTool },
  { label: "Design AI", icon: Wand2 },
  { label: "Code Editor", icon: Terminal },
  { label: "Code AI", icon: Sparkles },
  { label: "Image AI", icon: Image },
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
          className="font-anyvid rounded-full text-[13px]"
          onClick={() => onChange(label)}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
