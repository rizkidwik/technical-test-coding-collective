"use client";

import { cn, getTimezones } from "@/lib/utils";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";

interface TimezoneSelectorProps {
    value: string;
    onValueChange: (value: string) => void;
}

const TimezonePopover = ({ value, onValueChange }: TimezoneSelectorProps) => {
  const timezones = getTimezones()
  const [open, setOpen] = useState(false)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? timezones.find((timezone) => timezone === value) ?? 'UTC'
            : "Select timezone..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        side="bottom"
        className="w-64 overflow-y-auto p-4 bg-white border border-gray-300 rounded shadow-md"
      >
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              {timezones.map((timezone) => (
                <CommandItem
                  key={timezone}
                  value={timezone}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue);
                    setOpen(false);
                  }}
  
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === timezone ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {timezone}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        {/* <ul className="divide-y divide-gray-200">
          {timezones.map((timezone) => (
            <li
              key={timezone}
              className="cursor-pointer px-3 py-2 hover:bg-blue-100"
              onClick={() => {
                setSelectedTimezone(timezone);
              }}
            >
              {timezone}
            </li>
          ))}
        </ul> */}
      </PopoverContent>
    </Popover>
  );
};

export default TimezonePopover;
