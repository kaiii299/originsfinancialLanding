import { z } from 'zod';
import { m as managementClient } from '../../chunks/contentful_DXnB1I5a.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const testimonialSchema = z.object({
      description: z.string().min(1, "Description is required"),
      name: z.string().min(1, "Name is required"),
      role: z.string().min(1, "Role is required"),
      ratings: z.number().min(1, "Rating is required"),
      testimonialFor: z.string().min(1, "Testimonial For is required")
    });
    const body = await request.json();
    const validatedData = testimonialSchema.parse(body);
    const { description, name, role, ratings, testimonialFor } = validatedData;
    const space = await managementClient.getSpace("u67fntqfkhe1");
    const environment = await space.getEnvironment("master");
    const entry = await environment.createEntry("testimonials", {
      fields: {
        description: {
          "en-US": description
        },
        name: {
          "en-US": name
        },
        role: {
          "en-US": role
        },
        ratings: {
          "en-US": ratings
        },
        testimonialFor: {
          "en-US": testimonialFor
        }
      }
    });
    return new Response(
      JSON.stringify({
        message: "Testimonial created successfully",
        entry: entry.sys
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Failed to create testimonial",
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
