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

  // Ensure "All" is always first, followed by alphabetically sorted categories
  const sortedCategoryData = [
    "All", // Add "All" first
    ...[...categoryData.filter((category) => category !== "All")].sort((a, b) => a.localeCompare(b)), // Sort and exclude "All"
  ];

  return (
    <Tabs defaultValue={"All"} onValueChange={handleTabChange} className="overflow-hidden">
      {/* Render Tabs List */}
      <TabsList
        className="flex w-full bg-slate-300 text-black overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {sortedCategoryData.map((category) => (
          <TabsTrigger
            className="flex-1 basis-0 text-center capitalize px-4 py-2"
            key={category}
            value={category}
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Render Tabs Content */}
      {sortedCategoryData.map((category) => (
        <TabsContent key={category} value={category}>
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
}