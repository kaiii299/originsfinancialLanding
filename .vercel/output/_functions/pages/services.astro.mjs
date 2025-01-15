import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent, a as addAttribute, b as createAstro } from '../chunks/astro/server_D45_yHnM.mjs';
import 'kleur/colors';
import { s as services, $ as $$Layout } from '../chunks/Layout_CAwRDJsa.mjs';
import { $ as $$Title } from '../chunks/title_0R-bqxaQ.mjs';
import { B as Button } from '../chunks/button_DNjIWrxJ.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_Dx92fFQD.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$LeftRightCol = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LeftRightCol;
  const { data, title, buttonText, buttonVisible, buttonLink } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section> <div> ${renderComponent($$result, "TitleComponent", $$Title, { "title": title })} </div> <div> ${data.map((item, index) => renderTemplate`<div${addAttribute(`flex flex-col md:flex-row items-center gap-8 mb-12 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`, "class")}> <div class="md:w-1/2"> ${renderComponent($$result, "Image", $$Image, { "src": item.image, "alt": `Image ${index + 1}`, "draggable": false, "class": "w-[70%] h-auto rounded-lg" })} </div> <!-- Text Content --> <div class="md:w-1/2"> ${renderComponent($$result, "TitleComponent", $$Title, { "title": item.title })} <p class="text-gray-600">${item.description}</p> ${buttonVisible && buttonText && buttonLink && renderTemplate`<a${addAttribute(buttonLink, "href")}> ${renderComponent($$result, "Button", Button, { "className": "mt-4 bg-main" }, { "default": ($$result2) => renderTemplate`${buttonText}` })} </a>`} </div> </div>`)} </div> </section>`;
}, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/components/leftRightCol.astro", void 0);

const $$Services = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "canonicalUrl": "", "description": "", "title": "" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LeftRightCol", $$LeftRightCol, { "title": "Our services", "buttonText": "Learn more", "buttonLink": "/", "buttonVisible": true, "data": services, "buttonLink": "Learn more" })} ` })}`;
}, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/services.astro", void 0);

const $$file = "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/services.astro";
const $$url = "/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
