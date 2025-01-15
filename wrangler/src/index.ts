export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const { PUBLIC_CONTENTFUL_SPACE_ID, PUBLIC_CONTENTFUL_ENVIRONMENT_ID, PUBLIC_CONTENTFUL_CMA_TOKEN } = env;

    try {
      const body: any = await request.json();
      const { description, name, role, ratings, testimonialFor } = body;

      // Manual validation
      if (!description?.trim()) throw new Error("Description is required.");
      if (!name?.trim()) throw new Error("Name is required.");
      if (!role?.trim()) throw new Error("Role is required.");
      if (typeof ratings !== "number" || ratings < 1 || ratings > 5) throw new Error("Ratings must be 1-5.");
      if (!testimonialFor?.trim()) throw new Error("Testimonial For is required.");

      const response = await fetch(
        `https://api.contentful.com/spaces/${PUBLIC_CONTENTFUL_SPACE_ID}/environments/${PUBLIC_CONTENTFUL_ENVIRONMENT_ID}/entries`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${PUBLIC_CONTENTFUL_CMA_TOKEN}`,
            "Content-Type": "application/vnd.contentful.management.v1+json",
            "X-Contentful-Content-Type": "testimonials",
          },
          body: JSON.stringify({
            fields: {
              description: { "en-US": description },
              name: { "en-US": name },
              role: { "en-US": role },
              ratings: { "en-US": ratings },
              testimonialFor: { "en-US": testimonialFor },
            },
          }),
        }
      );

      if (!response.ok) throw new Error(`Contentful API error: ${response.statusText} - ${await response.text()}`);

      return new Response(JSON.stringify({ message: "Testimonial created successfully" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      return new Response(
        JSON.stringify({ message: "Failed to create testimonial", error: error.message || "Unknown error" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};