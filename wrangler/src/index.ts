import { z } from "zod";

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const CONTENTFUL_SPACE_ID = env.PUBLIC_CONTENTFUL_SPACE_ID;
    const CONTENTFUL_ENVIRONMENT_ID = env.PUBLIC_CONTENTFUL_ENVIRONMENT_ID;
    const CONTENTFUL_CMA_TOKEN = env.PUBLIC_CONTENTFUL_CMA_TOKEN;

    try {
      // Parse and validate the incoming data using Zod
      const testimonialSchema = z.object({
        description: z.string().min(1, "Description is required"),
        name: z.string().min(1, "Name is required"),
        role: z.string().min(1, "Role is required"),
        ratings: z.number().min(1, "Rating is required"),
        testimonialFor: z.string().min(1, "Testimonial For is required"),
      });

      const body = await request.json();
      const validatedData = testimonialSchema.parse(body);

      // Extract the validated fields
      const { description, name, role, ratings, testimonialFor } = validatedData;

      // Make the request to the Contentful API
      const response = await fetch(
        `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT_ID}/entries`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CONTENTFUL_CMA_TOKEN}`,
            "Content-Type": "application/vnd.contentful.management.v1+json",
            "X-Contentful-Content-Type": "testimonials", // Specify the content type
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

      // Check for errors in the response
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Contentful API error: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();

      // Return the created entry
      return new Response(
        JSON.stringify({
          message: "Testimonial created successfully",
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error(error);

      // Handle validation or other errors
      return new Response(
        JSON.stringify({
          message: "Failed to create testimonial",
          error: error instanceof Error ? error.message : "Unknown error",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};