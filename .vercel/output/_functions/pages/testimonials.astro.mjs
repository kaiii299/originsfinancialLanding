import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_D45_yHnM.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CAwRDJsa.mjs';
import { c as client } from '../chunks/contentful_DXnB1I5a.mjs';
import { $ as $$Title } from '../chunks/title_0R-bqxaQ.mjs';
export { renderers } from '../renderers.mjs';

const $$Testimonials = createComponent(async ($$result, $$props, $$slots) => {
  const testimonialData = await client.withoutUnresolvableLinks.getEntries({
    content_type: "testimonials"
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "canonicalUrl": "", "description": "Testimonials", "title": "Origins Financial Testimonials" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="first-section md:mb-32"> <div> ${renderComponent($$result2, "TitleComponent", $$Title, { "title": "What people say" })} </div> <div> ${renderComponent($$result2, "TestimonialComponent", null, { "testimonialsData": testimonialData, "client:only": "React", "client:component-hydration": "only", "client:component-path": "@/components/sections/testimonialComponent", "client:component-export": "default" })} </div> </section> ` })}`;
}, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/testimonials.astro", void 0);

const $$file = "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/testimonials.astro";
const $$url = "/testimonials";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Testimonials,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
