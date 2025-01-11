import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import type { Entry } from "contentful";
import type { IProducts } from "@/lib/interface";
import { unslugify } from "@/lib/slugify";

type Props = {
  productData: Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
};

const ProductAccordion = ({ productData }: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<
    Record<string, Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[]>
  >({});

  useEffect(() => {
    // Get the category from query parameters
    const queryCategory = new URLSearchParams(window.location.search).get("category");

    if (queryCategory && queryCategory.toLowerCase() === "all") {
      // Group and sort products by category
      const groupedProducts = productData.reduce((acc, product) => {
        const category = product.fields.category || "Uncategorized";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {} as Record<string, Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[]>);

      setFilteredProducts(groupedProducts);
      return;
    }

    // Use unslugify to convert the query parameter into a readable category name
    const readableCategory = queryCategory ? unslugify(queryCategory) : null;

    if (readableCategory) {
      const filtered = productData.filter((product) =>
        product.fields.category?.includes(readableCategory)
      );
      setFilteredProducts({ [readableCategory]: filtered });
    } else {
      // If no category is specified, show all products grouped by category
      const groupedProducts = productData.reduce((acc, product) => {
        const category = product.fields.category || "Uncategorized";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {} as Record<string, Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[]>);

      setFilteredProducts(groupedProducts);
    }
  }, [productData]);

  return (
    <div className="mt-8">
      {Object.entries(filteredProducts).map(([category, products]) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            {category}
          </h2>
          <Accordion type="single" collapsible className="space-y-5">
            {products.map((product) => (
              <AccordionItem
                key={product.sys.id}
                value={`item-${product.sys.id}`}
                className="border-gray-200 border-2 p-4 rounded-lg hover:border-main"
              >
                <AccordionTrigger className="text-md md:text-md lg:text-xl font-bold text-gray-900">
                  {product.fields.title}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-start text-lg">
                  {product.fields.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default ProductAccordion;