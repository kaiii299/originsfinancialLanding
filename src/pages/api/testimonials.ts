import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Manual validation of incoming data
    if (
      !body.description ||
      typeof body.description !== "string" ||
      body.description.trim().length === 0
    ) {
      throw new Error("Description is required and must be a non-empty string.");
    }

    if (
      !body.name ||
      typeof body.name !== "string" ||
      body.name.trim().length === 0
    ) {
      throw new Error("Name is required and must be a non-empty string.");
    }

    if (
      !body.role ||
      typeof body.role !== "string" ||
      body.role.trim().length === 0
    ) {
      throw new Error("Role is required and must be a non-empty string.");
    }

    if (
      typeof body.ratings !== "number" ||
      body.ratings < 1 ||
      body.ratings > 5
    ) {
      throw new Error("Ratings must be a number between 1 and 5.");
    }

    if (
      !body.testimonialFor ||
      typeof body.testimonialFor !== "string" ||
      body.testimonialFor.trim().length === 0
    ) {
      throw new Error(
        "Testimonial For is required and must be a non-empty string."
      );
    }

    // Forward the request to your Worker endpoint
    const response = await fetch(
      "https://testimonials-api.nihao-codenest.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Contentful-Content-Type": "testimonials",
        },
        body: JSON.stringify({
          description: body.description.trim(),
          name: body.name.trim(),
          role: body.role.trim(),
          ratings: body.ratings,
          testimonialFor: body.testimonialFor.trim(),
        }),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message || "Failed to forward the request."
      );
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