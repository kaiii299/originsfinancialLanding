import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_D45_yHnM.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CAwRDJsa.mjs';
import { $ as $$Title } from '../chunks/title_0R-bqxaQ.mjs';
export { renderers } from '../renderers.mjs';

const $$AboutUs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "canonicalUrl": "", "description": "", "title": "" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="first-section"> <div> ${renderComponent($$result2, "TitleComponent", $$Title, { "title": "About us" })} </div> </section> ` })}`;
}, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/about-us.astro", void 0);

const $$file = "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/about-us.astro";
const $$url = "/about-us";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$AboutUs,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
