import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { slugify } from "@/lib/slugify";

interface Props {
  categoryData: string[];
  defaultValue?: string;
  children: React.ReactNode;
}

export function ProductTabsComponent({ categoryData, defaultValue, children }: Props) {
  const [currentCategory, setCurrentCategory] = useState<string>(
    () => new URLSearchParams(window.location.search).get("category") || defaultValue || categoryData[0]
  );

  const handleTabChange = (value: string) => {
    setCurrentCategory(value);

    // Update the URL query parameter without reloading
    const url = new URL(window.location.href);
    url.searchParams.set("category", slugify(value));
    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    const urlCategory = new URLSearchParams(window.location.search).get("category");
    if (urlCategory && categoryData.includes(urlCategory)) {
      setCurrentCategory(urlCategory);
    } else {
      handleTabChange(defaultValue || categoryData[0]); // Fallback to default or first category
    }
  }, [categoryData, defaultValue]);

  return (
    <Tabs defaultValue="All" onValueChange={handleTabChange} className="overflow-hidden">
      {/* Render Tabs List */}
      <TabsList defaultValue={"all"} className="flex w-full bg-slate-300 text-black overflow-x-auto scrollbar-hide md:grid grid-cols-3 md:grid-cols-6">
        {categoryData.map((category) => (
          <TabsTrigger
            className="capitalize whitespace-nowrap px-4 py-2"
            key={category}
            value={category}
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Render Tabs Content */}
      {categoryData.map((category) => (
        <TabsContent key={category} value={category}>
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
}