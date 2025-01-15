import { z } from "zod";
import type { APIRoute } from "astro";
import { managementClient } from "@/lib/contentful";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
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

    // Post the data to Contentful
    const space = await managementClient.getSpace(import.meta.env.PUBLIC_CONTENTFUL_SPACE_ID || '');
    const environment = await space.getEnvironment(import.meta.env.PUBLIC_CONTENTFUL_ENVIRONMENT_ID || '');
    const entry = await environment.createEntry("testimonials", {
      fields: {
        description: {
          "en-US": description,
        },
        name: {
          "en-US": name,
        },
        role: {
          "en-US": role,
        },
        ratings: {
          "en-US": ratings,
        },
        testimonialFor: {
          "en-US": testimonialFor,
        },
      },
    });

    // Return the created entry
    return new Response(
      JSON.stringify({
        message: "Testimonial created successfully",
        entry: entry.sys,
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