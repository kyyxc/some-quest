'use client';

import { Command, CommandInput, CommandItem, CommandList } from 'cmdk';
import { Check, ChevronDown, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Option } from '../../stores/employeeStore';

export function MultiSelect({
    options,
    values,
    onChange,
    placeholder,
    id,
    openId,
    setOpenId,
}: {
    options: { label: string; value: number }[];
    values: number[];
    onChange: (values: number[]) => void;
    placeholder?: string;
    id: string;
    openId: string | null;
    setOpenId: (id: string | null) => void;
}) {
    const [internalOpen, setInternalOpen] = useState(false);

    useEffect(() => {
        setInternalOpen(openId === id);
    }, [openId, id]);

    const toggle = (val: number) => {
        if (values.includes(val)) {
            onChange(values.filter((v) => v !== val));
        } else {
            onChange([...values, val]);
        }
    };

    const handleTriggerClick = () => {
        if (internalOpen) {
            setOpenId(null);
        } else {
            setOpenId(id);
        }
    };

    return (
        <div className="relative flex w-full flex-col items-center">
            <div
                className="flex w-full items-center justify-between rounded border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                onClick={handleTriggerClick}
            >
                <div className="flex-1">
                    {values.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                            {values.map((val, i) => {
                                const option = options.find((o: Option) => o.value === val);
                                return (
                                    <span key={i} className="flex items-center rounded bg-gray-200 px-3 py-1.5 text-xs text-gray-800">
                                        {option ? option.label : val}
                                        <span
                                            className="ml-1 cursor-pointer text-red-400 hover:text-red-500"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggle(val);
                                            }}
                                        >
                                            <X size={16} className="text-gray-800" />
                                        </span>
                                    </span>
                                );
                            })}
                        </div>
                    ) : (
                        <span className="text-gray-500">{placeholder ?? 'Select...'}</span>
                    )}
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${internalOpen ? 'rotate-180' : ''}`} />
            </div>

            {internalOpen && (
                <div className="absolute top-full left-1/2 z-50 mt-1 w-[50%] -translate-x-1/2 transform rounded-md border border-gray-200 bg-white shadow-lg">
                    <Command className="w-full">
                        <CommandInput
                            placeholder="Search options..."
                            className="h-9 w-full px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-none focus:outline-none"
                        />
                        <hr className="border-gray-200" />
                        <CommandList className="no-scrollbar max-h-60 overflow-y-auto">
                            {options.map((opt) => (
                                <CommandItem
                                    key={opt.value}
                                    onSelect={() => toggle(opt.value)}
                                    className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm hover:bg-gray-100"
                                >
                                    <span>{opt.label}</span>
                                    {values.includes(opt.value) && <Check className="h-4 w-4 text-blue-500" />}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </div>
            )}
        </div>
    );
}
