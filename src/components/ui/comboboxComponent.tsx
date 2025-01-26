"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
import type { Entry } from "contentful";
import type { ITestimonials } from "@/lib/interface";
import { slugify } from "@/lib/slugify"; // Ensure slugify is properly imported

type Props = {
  data: Entry<ITestimonials, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
};

// Utility function to capitalize the first letter
const capitalize = (text: string) => {
  if (!text) return text;
  return text
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words back together
};

export function ComboboxComponent({ data }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  // Flatten testimonialFor data into a single array and remove duplicates
  const testimonialFor = Array.from(
    new Map(
      data
        .flatMap((entry) => entry.fields.testimonialFor)
        .map((item) => [item, item])
    ).values()
  ).sort();

  testimonialFor.unshift('all');

  const handleSelect = (selectedValue: string) => {
    const slugifiedName = slugify(selectedValue); // Slugify the selected name
    setValue(selectedValue); // Update the value state
    setOpen(false); // Close the dropdown

    // Update the query parameter in the URL
    const params = new URLSearchParams(window.location.search);
    params.set("name", slugifiedName);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl); 
    window.location.reload();
  };

    const params = new URLSearchParams(window.location.search);
    const params_data = params.get("name") || "Selct Consultant...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="none"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] rounded-lg text-gray-500 hover:none bg-transparent h-12 shadow-lg border-slate-300 border justify-between"
        >
          {params_data && capitalize(params_data) }
          <LuChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput autoFocus={false} placeholder="Search consultant..." className="h-9" />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {testimonialFor.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => handleSelect(item)} // Pass the selected item to the handler
                >
                  {capitalize(item)}
                  <LuCheck
                    className={cn(
                      "ml-auto",
                      value === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}