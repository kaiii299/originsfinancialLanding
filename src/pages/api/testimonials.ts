import type { ITestimonials } from "@/lib/interface";

const submitTestimonial = async (testimonialData: ITestimonials) => {
  try {
    const response = await fetch("https://testimonials-api.nihao-codenest.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testimonialData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Testimonial submitted:", result);
    } else {
      const error = await response.json();
      console.error("Error submitting testimonial:", error.message);
    }
  } catch (err) {
    console.error("Network error:", err);
  }
};