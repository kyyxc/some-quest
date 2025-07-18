'use client';

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import { Check, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Option } from "../../stores/employeeStore";

export function MultiSelect({
  options,
  values,
  onChange,
  placeholder,
}: {
  options: { label: string; value: number }[];
  values: number[];
  onChange: (values: number[]) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = (val: number) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="flex w-full cursor-pointer items-center justify-between rounded-[4px] border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          {values.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {values.map((val, i) => {
                const option = options.find((o: Option) => o.value === val)
                return(
                <span
                  key={i}
                  className="rounded-[4px] bg-gray-100 px-2 py-0.5 text-xs text-gray-800"
                >
                {option ? option.label : val}
                </span>
                )
          })}
            </div>
          ) : (
            <span className="text-gray-500">{placeholder ?? "Select..."}</span>
          )}
        </div>
        <ChevronDown 
          className={`h-4 w-4 text-gray-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`} 
        />
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <Command>
            <CommandInput
              placeholder="Search options..."
              className="h-9 border-none w-full px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-0"
            />
            <CommandList className="max-h-60 overflow-y-auto">
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  onSelect={() => toggle(opt.value)}
                  className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <span>{opt.label}</span>
                  {values.includes(opt.value) && (
                    <Check className="h-4 w-4 text-blue-500" />
                  )}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}