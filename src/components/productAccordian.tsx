import { useEffect, useState } from "react";
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
    Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
  >([]);
  const [groupedProducts, setGroupedProducts] = useState<
    Record<string, Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[]>
  >({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const queryCategory = new URLSearchParams(window.location.search).get(
      "category"
    );
    const readableCategory = queryCategory ? unslugify(queryCategory) : null;

    let filtered = productData;

    if (readableCategory && readableCategory.toLowerCase() !== "all") {
      filtered = productData.filter((product) => {
        const categories = product.fields.category || [];
        return categories.some(
          (category) =>
            category.toLowerCase() === readableCategory.toLowerCase()
        );
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.fields.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (readableCategory?.toLowerCase() === "all") {
      const grouped: Record<
        string,
        Entry<IProducts, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
      > = {};

      const displayedProducts = new Set<string>();

      filtered.forEach((product) => {
        const categories = product.fields.category || ["Uncategorized"];
        const primaryCategory = categories[0];

        if (!grouped[primaryCategory]) {
          grouped[primaryCategory] = [];
        }

        if (!displayedProducts.has(product.sys.id)) {
          grouped[primaryCategory].push(product);
          displayedProducts.add(product.sys.id);
        }
      });

      setGroupedProducts(grouped);
    } else {
      setGroupedProducts({});
    }

    setFilteredProducts(filtered);
  }, [productData, searchQuery]);

  const isEmpty = filteredProducts.length === 0;

  return (
    <div className="mt-8">
      <div className="mb-6 mx-1">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 md:w-1/3"
        />
      </div>

      {isEmpty ? (
        <div className="text-center text-gray-600 text-xl font-semibold mt-10">
          No products found.
        </div>
      ) : Object.keys(groupedProducts).length > 0 ? (
        Object.entries(groupedProducts).map(([category, products]) => (
          <div key={category} className="my-10">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              {category}
            </h2>

            <div className="flex flex-col gap-8">
              {products.map((product) => (
                <a href={`product/${product.fields.slug}`} key={product.sys.id}>
                  <Card className="group hover:shadow-md cursor-pointer duration-200 transition-all">
                    <CardHeader>
                      <div className="flex flex-col space-y-4">
                        <div className="font-bold text-xl">
                          {product.fields.title}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center ">
                          {product.fields.category.map((category) => (
                            <Badge variant="default" key={category}>
                              {category}
                            </Badge>
                          ))}
                          {product.fields.type &&
                            product.fields.type.length > 0 && (
                              <>
                                <span>|</span>
                                {product.fields.type.map((type) => (
                                  <Badge variant="secondary" key={type}>
                                    {type}
                                  </Badge>
                                ))}
                              </>
                            )}
                        </div>
                        <div className="line-clamp-2">
                          {product.fields.description}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <LearnButton
                        text="Learn more"
                        href={`product/${product.fields.slug}`}
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
          {filteredProducts.map((product) => (
            <a href={`product/${product.fields.slug}`} key={product.sys.id}>
              <Card className="group hover:shadow-md cursor-pointer duration-200 transition-all">
                <CardHeader>
                  <div className="flex flex-col space-y-4">
                    <div className="font-bold text-xl">
                      {product.fields.title}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center ">
                      {product.fields.category.map((category) => (
                        <Badge variant="default" key={category}>
                          {category}
                        </Badge>
                      ))}
                      {product.fields.type &&
                        product.fields.type.length > 0 && (
                          <>
                            <span>|</span>
                            {product.fields.type.map((type) => (
                              <Badge variant="secondary" key={type}>
                                {type}
                              </Badge>
                            ))}
                          </>
                        )}
                    </div>
                    <div className="line-clamp-2">
                      {product.fields.description}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <LearnButton
                    text="Learn more"
                    href={`product/${product.fields.slug}`}
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