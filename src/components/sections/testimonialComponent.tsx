import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ITestimonials } from "@/lib/interface";
import type { EntryCollection } from "contentful";
import { slugify } from "@/lib/slugify";

const PAGE_SIZE = 8;

type TestimonialsProps = {
  testimonialsData: EntryCollection<
    ITestimonials,
    "WITHOUT_UNRESOLVABLE_LINKS",
    string
  >;
};

const Testimonials = ({ testimonialsData }: TestimonialsProps) => {
  const [filteredTestimonials, setFilteredTestimonials] = useState(
    testimonialsData.items
  );
  const [displayedTestimonials, setDisplayedTestimonials] = useState(
    testimonialsData.items.slice(0, PAGE_SIZE)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [allTestimonialsLoaded, setAllTestimonialsLoaded] = useState(
    testimonialsData.items.length <= PAGE_SIZE
  );

  useEffect(() => {
    // Extract search parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");

    if (name) {
      // Filter testimonials matching the name
      const filtered = testimonialsData.items.filter(
        (testimonial) =>
          slugify(testimonial.fields.testimonialFor) === slugify(name)
      );
      setFilteredTestimonials(filtered);
      setDisplayedTestimonials(filtered.slice(0, PAGE_SIZE));
      setAllTestimonialsLoaded(filtered.length <= PAGE_SIZE);
    } else {
      // If no search parameter, show all testimonials
      setFilteredTestimonials(testimonialsData.items);
      setDisplayedTestimonials(testimonialsData.items.slice(0, PAGE_SIZE));
      setAllTestimonialsLoaded(testimonialsData.items.length <= PAGE_SIZE);
    }
  }, [testimonialsData]);

  const loadMore = () => {
    const nextPage = currentPage + 1;
    const newTestimonials = filteredTestimonials.slice(0, nextPage * PAGE_SIZE);

    setDisplayedTestimonials(newTestimonials);
    setCurrentPage(nextPage);

    if (newTestimonials.length === filteredTestimonials.length) {
      setAllTestimonialsLoaded(true);
    }
  };

  if (filteredTestimonials.length === 0) {
    return <p className="text-center text-gray-500">No testimonials found.</p>;
  }

  return (
    <div className="first-section md:mb-32 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {displayedTestimonials.map((testimonial, index) => (
          <Card
            className="flex flex-col flex-1 hover:shadow-md cursor-pointer transition-all duration-200"
            key={index}
          >
            <a
              href={`our-team?name=${slugify(
                testimonial.fields.testimonialFor
              )}`}
            >
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.fields.ratings }).map(
                      (_, i) => (
                        <span className="text-main text-lg" key={i}>
                          &#9733;
                        </span>
                      )
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{testimonial.fields.description}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <div className="flex flex-col">
                  <h2 className="text-2xl">{testimonial.fields.name}</h2>
                  <span className="text-sm">{testimonial.fields.role}</span>
                </div>
              </CardFooter>
            </a>
          </Card>
        ))}
      </div>

      {!allTestimonialsLoaded && (
        <Button
          className="mt-10 px-6 py-3 bg-main text-white rounded-md hover:bg-main-dark transition"
          onClick={loadMore}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default Testimonials;