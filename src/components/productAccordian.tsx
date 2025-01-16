import { useEffect, useState } from "react";
import type { Entry } from "contentful";
import type { IProducts } from "@/lib/interface";
import { unslugify } from "@/lib/slugify";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import LearnButton from "./ui/learnButton";
import { format } from "date-fns";

type Props = {
  productData: Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
};

const ProductAccordion = ({ productData }: Props) => {
  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState<
    Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
  >([]);

  // State for grouped products (used for "All" category)
  const [groupedProducts, setGroupedProducts] = useState<
    Record<string, Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[]>
  >({});

  // State for search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Get the "category" query parameter from the URL
    const queryCategory = new URLSearchParams(window.location.search).get(
      "category"
    );

    // Convert slugified category name to readable format
    const readableCategory = queryCategory ? unslugify(queryCategory) : null;

    let filtered = productData; // Initialize filtered products with all products

    // Filter products based on the selected category
    if (readableCategory && readableCategory.toLowerCase() !== "all") {
      filtered = productData.filter((product) => {
        const categories = product.fields.category || []; // Get product categories
        return categories.some(
          (category) =>
            category.toLowerCase() === readableCategory.toLowerCase() // Check if category matches
        );
      });
    }

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) // Check if product title matches query
      );
    }

    // Group products by their first category if "All" is selected
    if (readableCategory?.toLowerCase() === "all") {
      const grouped: Record<
        string,
        Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
      > = {};

      const displayedProducts = new Set<string>(); // To track already displayed products

      filtered.forEach((product) => {
        const categories = product.fields.category || ["Uncategorized"]; // Default category
        const primaryCategory = categories[0]; // Use the first category as primary

        // Initialize the category in the grouped object if not already present
        if (!grouped[primaryCategory]) {
          grouped[primaryCategory] = [];
        }

        // Add product to the grouped object if not already displayed
        if (!displayedProducts.has(product.sys.id)) {
          grouped[primaryCategory].push(product);
          displayedProducts.add(product.sys.id); // Mark product as displayed
        }
      });

      setGroupedProducts(grouped); // Update grouped products state
    } else {
      setGroupedProducts({}); // Clear grouped products if not "All"
    }

    setFilteredProducts(filtered); // Update filtered products state
  }, [productData, searchQuery]); // Dependencies: productData and searchQuery

  // Check if there are no filtered products
  const isEmpty = filteredProducts.length === 0;

  return (
    <div className="mt-8">
      {/* Search bar */}
      <div className="mb-6 mx-1">
        <Input
          type="text"
          placeholder="Search products..." // Placeholder text for the search input
          value={searchQuery} // Bind input value to searchQuery state
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
          className="w-full h-12 md:w-1/3" // Styling for the input
        />
      </div>

      {/* Check if no products are found */}
      {isEmpty ? (
        <div className="text-center text-gray-600 text-xl font-semibold mt-10">
          No products found. {/* Display message when no products are found */}
        </div>
      ) : Object.keys(groupedProducts).length > 0 ? ( // Check if products are grouped
        Object.entries(groupedProducts).map(([category, products]) => (
          // Render each category with its products
          <div key={category} className="my-10">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              {category} {/* Category title */}
            </h2>

            <div className="flex flex-col gap-8">
              {/* Render each product in the category */}
              {products.map((product) => (
                <a href={`product/${product.fields.slug}`} key={product.sys.id}>
                  <Card className="group hover:shadow-md cursor-pointer duration-200 transition-all">
                    <CardHeader>
                      <div className="flex flex-col space-y-4">
                        <div className="font-bold text-xl">
                          {product.fields.title} {/* Product title */}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-4">
                        <div className="md:flex-row flex items-start flex-col md:gap-0 gap-2 md:items-center">
                          {/* Render product categories */}
                          {product.fields.category.map((category) => (
                            <Badge variant="default" key={category}>
                              {category}
                            </Badge>
                          ))}
                          {/* Render product types */}
                          {product.fields.type &&
                            product.fields.type.length > 0 && (
                              <>
                                <span className="mr-2 hidden md:block">|</span>{" "}
                                {/* Separator */}
                                {product.fields.type.map((type) => (
                                  <Badge variant="secondary" key={type}>
                                    {type}
                                  </Badge>
                                ))}
                              </>
                            )}
                          {/* {product.sys.createdAt && (
                            <>
                              <span className="mr-2 hidden md:flex">|</span>{" "}
                              <Badge variant={"outline"}>
                                {format(product.sys.createdAt, "dd MMM yy ")}
                              </Badge>
                            </>
                          )} */}
                        </div>
                        <div className="line-clamp-2">
                          {product.fields.description}{" "}
                          {/* Product description */}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <LearnButton
                        text="Learn more" // Button text
                        href={`product/${product.fields.slug}`} // Link to product page
                      />
                    </CardFooter>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="my-10 flex flex-col gap-8">
          {/* Render filtered products if not grouped */}
          {filteredProducts.map((product) => (
            <a href={`product/${product.fields.slug}`} key={product.sys.id}>
              <Card className="group hover:shadow-md cursor-pointer duration-200 transition-all">
                <CardHeader>
                  <div className="flex flex-col space-y-4">
                    <div className="font-bold text-xl">
                      {product.fields.title} {/* Product title */}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <div className="md:flex-row flex items-start flex-col md:gap-0 gap-2 md:items-center ">
                      {/* Render product categories */}
                      {product.fields.category.map((category) => (
                        <Badge variant="default" key={category}>
                          {category}
                        </Badge>
                      ))}
                      {/* Render product types */}
                      {product.fields.type &&
                        product.fields.type.length > 0 && (
                          <>
                            <span className="mr-2">|</span> {/* Separator */}
                            {product.fields.type.map((type) => (
                              <Badge variant="secondary" key={type}>
                                {type}
                              </Badge>
                            ))}
                          </>
                        )}
                      {/* {product.sys.createdAt && (
                        <>
                          <span className="mr-2 hidden md:flex">|</span>{" "}
                          <Badge variant={"outline"}>
                            {format(product.sys.createdAt, "dd MMM yy ")}
                          </Badge>
                        </>
                      )} */}
                    </div>
                    <div className="line-clamp-2">
                      {product.fields.description} {/* Product description */}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <LearnButton
                    text="Learn more" // Button text
                    href={`product/${product.fields.slug}`} // Link to product page
                  />
                </CardFooter>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductAccordion;
