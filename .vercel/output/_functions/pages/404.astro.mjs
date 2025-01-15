import { c as createComponent, r as renderTemplate, d as renderComponent, e as renderScript, m as maybeRenderHead } from '../chunks/astro/server_D45_yHnM.mjs';
import 'kleur/colors';
import { B as Button } from '../chunks/button_DNjIWrxJ.mjs';
import { $ as $$Layout } from '../chunks/Layout_CAwRDJsa.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "", "description": "", "canonicalUrl": "" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="w-screen h-screen flex flex-col justify-center items-center first-section"> <div class="flex flex-col gap-10 justify-center items-center"> <h2 class="md:text-6xl text-5xl font-bold">404 page not found</h2> ${renderComponent($$result2, "Button", Button, { "className": "bg-main", "id": "goBackButton" }, { "default": ($$result3) => renderTemplate` Go back ` })} </div> </section> ` })} ${renderScript($$result, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/404.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/404.astro", void 0);

const $$file = "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
