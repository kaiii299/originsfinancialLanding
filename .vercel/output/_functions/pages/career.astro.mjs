import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_D45_yHnM.mjs';
import 'kleur/colors';
import { R as RichTextComponent } from '../chunks/RichTextComponent_BrNw1Q_n.mjs';
import { B as Button } from '../chunks/button_DNjIWrxJ.mjs';
import { $ as $$Title } from '../chunks/title_0R-bqxaQ.mjs';
import { $ as $$Layout } from '../chunks/Layout_CAwRDJsa.mjs';
import { c as client } from '../chunks/contentful_DXnB1I5a.mjs';
export { renderers } from '../renderers.mjs';

const $$Career = createComponent(async ($$result, $$props, $$slots) => {
  const careerData = await client.withoutUnresolvableLinks.getEntry(
    "1d9TUEQGK5lJ4QajdGSfHQ"
  );
  const { title, description, buttonText, images } = careerData.fields;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "canonicalUrl": "", "description": "", "title": "" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="first-section"> <div class="mb-32 space-y-10"> <div class="space-y-10"> ${renderComponent($$result2, "TitleComponent", $$Title, { "title": title })} ${renderComponent($$result2, "RichTextComponent", RichTextComponent, { "RichTextData": description })} <a href="/contact"> ${renderComponent($$result2, "Button", Button, { "className": "bg-main" }, { "default": ($$result3) => renderTemplate`${buttonText}` })} </a> </div> <div> ${renderComponent($$result2, "TitleComponent", $$Title, { "title": "Our Advenures" })} ${renderComponent($$result2, "ImageCarousel", null, { "images": images, "client:only": "React", "client:component-hydration": "only", "client:component-path": "@/components/imageCarousel", "client:component-export": "default" })} </div> </div> </section> ` })}`;
}, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/career.astro", void 0);

const $$file = "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/career.astro";
const $$url = "/career";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Career,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
