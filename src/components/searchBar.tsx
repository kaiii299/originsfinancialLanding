import React, { useState } from "react";
import { Input } from "./ui/input";
import { slugify } from "@/lib/slugify";

interface SearchBarProps {
  placeholder?: string; // Optional placeholder text for the search bar
  queryParam?: string; // The query parameter key, defaults to "q"
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  queryParam = "q",
}) => {
  const [searchValue, setSearchValue] = useState<string>("");

  // Handle input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchValue(query);

    // Replace spaces with dashes in the query string
    const slugifiedQuery = query.replace(/\s+/g, "-").toLowerCase(); // Replace spaces with -

    // Update the URL query string
    const currentUrl = new URL(window.location.href);

    if (slugifiedQuery) {
      currentUrl.searchParams.set(queryParam, slugifiedQuery); // Use slugified query for the URL
    } else {
      currentUrl.searchParams.delete(queryParam);
    }

    // Push the updated URL to the browser without reloading
    window.history.replaceState({}, "", currentUrl);
  };

  return (
    <Input
      type="text"
      value={searchValue} 
      onChange={handleSearchChange}
      placeholder={placeholder}
      className="w-full h-12 md:w-1/3"
    />
  );
};

export default SearchBar;