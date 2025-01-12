import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import type { Entry } from "contentful";
import type { IProducts } from "@/lib/interface";
import { unslugify } from "@/lib/slugify";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import LearnButton from "./ui/learnButton";

type Props = {
  productData: Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
};

const ProductAccordion = ({ productData }: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<
    Record<string, Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[]>
  >({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Get the category from query parameters
    const queryCategory = new URLSearchParams(window.location.search).get(
      "category"
    );

    // Group products by category
    const groupProducts = (
      products: Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
    ) =>
      products.reduce((acc, product) => {
        const category = product.fields.category || "Uncategorized";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {} as Record<string, Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[]>);

    let filtered;

    if (queryCategory && queryCategory.toLowerCase() !== "all") {
      const readableCategory = unslugify(queryCategory);
      filtered = productData.filter((product) =>
        product.fields.category?.includes(readableCategory)
      );
    } else {
      filtered = productData;
    }

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.fields.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(groupProducts(filtered));
  }, [productData, searchQuery]);

  // Check if no products are found
  const isEmpty =
    Object.keys(filteredProducts).length === 0 ||
    Object.values(filteredProducts).every((products) => products.length === 0);

  return (
    <div className="mt-8">
      {/* Search Bar */}
      <div className="mb-6 mx-1">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 md:w-1/3"
        />
      </div>

      {/* Render "No Products Found" if the results are empty */}
      {isEmpty ? (
        <div className="text-center text-gray-600 text-xl font-semibold mt-10">
          No products found.
        </div>
      ) : (
        // Render Accordion
        Object.entries(filteredProducts).map(([category, products]) => (
          <div key={category} className="my-10">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              {category}
            </h2>
            <div className="flex flex-col gap-8">
              {products.map((product) => (
                <a href={`product/${product.fields.slug}`}>
                  <Card className="group hover:shadow-md cursor-pointer duration-200 transition-all">
                    <CardHeader>
                      <div className="space-y-2">
                        <div>
                          {product.fields.type &&
                            product.fields.type.map((type) => {
                              return (
                                <Badge variant={"secondary"} key={type}>
                                  {type}
                                </Badge>
                              );
                            })}
                        </div>
                        <div className="font-bold text-xl">
                          {product.fields.title}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="line-clamp-2">
                        {product.fields.description}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div>
                        <LearnButton
                          text="Learn more"
                          href={`product/${product.fields.slug}`}
                        />
                      </div>
                    </CardFooter>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductAccordion;
