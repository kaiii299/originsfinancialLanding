import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { slugify } from "@/lib/slugify";
import brokenImage from "@/assets/images/broken image.jpg";
import { Badge } from "@/components/ui/badge";
import type { Entry, EntryCollection } from "contentful";
import type { IEvents } from "@/lib/interface";
import { Input } from "./ui/input";

type Props = {
  eventData: EntryCollection<IEvents, "WITHOUT_UNRESOLVABLE_LINKS", string>;
};

const EventPage: React.FC<Props> = ({ eventData }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const initialSearchQuery = queryParams.get("search") || "";

  // States for filtering
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  // Filter blogs based on selected tag and search query
  const filteredEvents = eventData.items.filter(
    (blog: Entry<IEvents, "WITHOUT_UNRESOLVABLE_LINKS", string>) => {
      // Search keyword by title or description
      const matchesSearch =
        blog.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.fields.description &&
          blog.fields.shortDescription
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));
      return matchesSearch;
    }
  );

  const featuredEvents =
    filteredEvents.filter((event) => event.fields.featured) || [];

  const unfeaturedEvents =
    filteredEvents.filter((event) => !event.fields.featured) || [];

  useEffect(() => {
    // Sync state with updated query params
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  return (
    <div>
      {/* Search bar */}
      <div className="mb-6 mx-1 mt-8">
        <Input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 md:w-1/3"
        />
      </div>
      {/* Featured Events Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Featured events</h2>
        {featuredEvents.length > 0 ? (
          featuredEvents.map((event) => (
            <a
              key={event.sys.id}
              href={`/events/${slugify(event.fields.slug)}`}
              className="md:grid-cols-2 my-10 grid-cols-1 grid justify-center items-center gap-5"
            >
              <div>
                <img
                  src={event.fields.image?.fields.file?.url || brokenImage.src}
                  alt={event.fields.image?.fields.title || "Event Image"}
                  title={event.fields.image?.fields.title || "Event"}
                  loading="lazy"
                  height={400}
                  width={500}
                  className="rounded-lg hover:scale-105 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <div>
                  {event.fields.location && (
                    <Badge variant="secondary">{event.fields.location}</Badge>
                  )}
                  {event.fields.when && (
                    <span className="text-gray-600 text-sm">
                      {event.fields.location && <span className="mx-2">|</span>}
                      {format(new Date(event.fields.when), "dd MMM yy")}
                    </span>
                  )}
                </div>
                <h2 className="capitalize font-bold text-2xl">
                  {event.fields.title}
                </h2>
                <p>{event.fields?.shortDescription}</p>
              </div>
            </a>
          ))
        ) : (
          <p>No featured events available.</p>
        )}
      </div>

      {/* Unfeatured Events Section */}
      <h2 className="text-2xl font-bold mb-4">Other events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {unfeaturedEvents.length > 0 ? (
          unfeaturedEvents.map((event) => (
            <a
              key={event.sys.id}
              href={`/events/${slugify(event.fields.slug)}`}
              className="flex flex-col justify-start items-start gap-5"
            >
              <div>
                <img
                  src={event.fields.image?.fields.file?.url || brokenImage.src}
                  alt={event.fields.image?.fields.title || "Event Image"}
                  title={event.fields.image?.fields.title || "Event"}
                  loading="lazy"
                  height={400}
                  width={500}
                  className="rounded-lg h-[250px] object-cover hover:scale-105 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <div>
                  {event.fields.location && (
                    <Badge variant="secondary">{event.fields.location}</Badge>
                  )}
                  {event.fields.when && (
                    <span className="text-gray-600 text-sm">
                      {event.fields.location && <span className="mx-2">|</span>}
                      {format(new Date(event.fields.when), "dd MMM yy")}
                    </span>
                  )}
                </div>
                <h2 className="capitalize font-bold text-2xl">
                  {event.fields.title}
                </h2>
                <p>{event.fields?.shortDescription}</p>
              </div>
            </a>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
