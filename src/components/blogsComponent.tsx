import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { slugify } from "@/lib/slugify";
import type { IBlogs } from "@/lib/interface";
import { Input } from "./ui/input";
import type { Entry } from "contentful";

type Props = {
  blogData: any;
};

const BlogPage = ({ blogData }: Props) => {
  // Parse the `query` parameter from params
  const queryParams = new URLSearchParams(window.location.search);
  const initialSearchQuery = queryParams.get("search") || "";
  const initialTag = queryParams.get("category") || "All";

  // States for filtering
  const [selectedTag, setSelectedTag] = useState<string>(initialTag);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  // Filter blogs based on selected tag and search query
  const filteredBlogs = blogData.items.filter(
    (blog: Entry<IBlogs, "WITHOUT_UNRESOLVABLE_LINKS", string>) => {
      // Fallback if category is undefined
      const blogCategories = blog.fields.category || [];
      const matchesTag =
        selectedTag === "all" || // Match "all" to show all items
        blogCategories.some((cat: string) =>
          cat.toLowerCase().includes(selectedTag.toLowerCase())
        );

      // Search keyword by title or description
      const matchesSearch =
        blog.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.fields.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    }
  );

  const featuredBlogs = filteredBlogs.filter(
    (blog: IBlogs) => blog.fields.featured
  );

  const unfeaturedBlogs = filteredBlogs.filter(
    (blog: IBlogs) => !blog.fields.featured
  );

  useEffect(() => {
    // Sync state with updated query params
    setSelectedTag(initialTag);
    setSearchQuery(initialSearchQuery);
  }, [initialTag, initialSearchQuery]);

  return (
    <div>
      {/* Search bar */}
      <div className="mb-6 mx-1 mt-8">
        <Input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 md:w-1/3"
        />
      </div>

      {/* Featured Blogs Section */}
      <div>
        {featuredBlogs.length > 0 && (
          <h2 className="text-2xl font-bold mb-4">
            Featured {featuredBlogs.length === 1 ? "blog" : "blogs"}
          </h2>
        )}
        <div>
          {featuredBlogs.length > 0 ? (
            featuredBlogs.map((blog: any) => (
              <a
                key={blog.sys.id}
                href={`/blog/${slugify(blog.fields.slug)}`}
                className="md:grid-cols-2 my-10 grid-cols-1 grid justify-center items-center gap-10"
              >
                <div>
                  <img
                    src={
                      blog.fields.image?.fields.file?.url || "/placeholder.png"
                    }
                    alt={blog.fields.image?.fields.title || "Blog Image"}
                    title={blog.fields.image?.fields.title || "Blog"}
                    loading="lazy"
                    height={400}
                    width={500}
                    className="rounded-lg hover:scale-105 transition-all duration-200"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    {blog.fields.category?.map((category: any) => (
                      <Badge key={category} variant={"secondary"}>
                        {category}
                      </Badge>
                    ))}
                    {blog.sys.createdAt && (
                      <span>
                        <span className="mr-2">|</span>
                        {format(new Date(blog.sys.createdAt), "dd MMM yy")}
                      </span>
                    )}
                  </div>
                  <h2 className="capitalize font-bold text-2xl">
                    {blog.fields.title}
                  </h2>
                  <p>{blog.fields.description}</p>
                </div>
              </a>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {/* Unfeatured Blogs Section */}
      <div className="mt-14">
        {unfeaturedBlogs.length > 0 && (
          <h2 className="text-2xl font-bold mb-4">Other blogs</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {unfeaturedBlogs.length > 0 ? (
            unfeaturedBlogs.map((blog: any) => (
              <a
                key={blog.sys.id}
                href={`/blog/${slugify(blog.fields.slug)}`}
                className="flex flex-col justify-start items-start gap-5"
              >
                <div>
                  <img
                    src={
                      blog.fields.image?.fields.file?.url || "/placeholder.png"
                    }
                    alt={blog.fields.image?.fields.title || "Blog Image"}
                    title={blog.fields.image?.fields.title || "Blog"}
                    loading="lazy"
                    height={400}
                    width={500}
                    className="rounded-lg h-[250px] object-cover hover:scale-105 transition-all duration-200"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    {blog.fields.category?.map((category: any) => (
                      <Badge key={category} variant={"secondary"}>
                        {category}
                      </Badge>
                    ))}
                    {blog.sys.createdAt && (
                      <span>
                        <span className="mr-2">|</span>
                        {format(new Date(blog.sys.createdAt), "dd MMM yy")}
                      </span>
                    )}
                  </div>
                  <h2 className="capitalize font-bold text-xl">
                    {blog.fields.title}
                  </h2>
                  <p>{blog.fields.description}</p>
                </div>
              </a>
            ))
          ) : (
            <p>No blogs found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
