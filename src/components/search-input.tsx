import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#555555] dark:text-[#7f7f7f] w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-64 bg-white dark:bg-[#121212] border-[#e3e3e3] dark:border-[#323232] text-[#121212] dark:text-white placeholder:text-[#555555] dark:placeholder:text-[#7f7f7f] focus-visible:ring-gray-400"
      />
    </div>
  );
}
