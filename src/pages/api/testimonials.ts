import { z } from "zod";
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse and validate the incoming data using Zod
    const testimonialSchema = z.object({
      description: z.string().min(1, "Description is required"),
      name: z.string().min(1, "Name is required"),
      role: z.string().min(1, "Role is required"),
      ratings: z.number().min(1, "Rating is required").max(5, "Rating cannot exceed 5"),
      testimonialFor: z.string().min(1, "Testimonial For is required"),
    });

    const body = await request.json();
    const validatedData = testimonialSchema.parse(body);

    // Forward the request to your Worker endpoint
    const response = await fetch("https://testimonials-api.nihao-codenest.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData), // Forward the validated data
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to forward the request.");
    }

    const data = await response.json();

    // Return the response from the Worker
    return new Response(
      JSON.stringify({
        message: "Testimonial created successfully",
        entry: data.entry,
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
};