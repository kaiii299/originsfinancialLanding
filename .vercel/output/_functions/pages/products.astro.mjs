import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_D45_yHnM.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CAwRDJsa.mjs';
import { $ as $$Title } from '../chunks/title_0R-bqxaQ.mjs';
import { c as client } from '../chunks/contentful_DXnB1I5a.mjs';
export { renderers } from '../renderers.mjs';

const $$Products = createComponent(async ($$result, $$props, $$slots) => {
  const productData = await client.withoutUnresolvableLinks.getEntries(
    {
      content_type: "products",
      order: "fields.title"
    }
  );
  const categories = [
    "All",
    ...productData.items.flatMap((item) => item.fields.category).filter((category, index, self) => self.indexOf(category) === index)
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "canonicalUrl": "", "description": "Origins Financial Product Page", "title": "Our products" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="first-section"> <div> ${renderComponent($$result2, "TitleComponent", $$Title, { "title": "Our products" })} </div> <div class="my-12 mb-20 main-section"> ${renderComponent($$result2, "ProductTabsComponent", null, { "categoryData": categories, "client:only": "React", "client:component-hydration": "only", "client:component-path": "@/components/productTabsComponent", "client:component-export": "ProductTabsComponent" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "ProductAccordian", null, { "productData": productData.items, "client:only": "React", "client:component-hydration": "only", "client:component-path": "@/components/productAccordian", "client:component-export": "default" })} ` })} </div> </section> ` })}`;
}, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/products.astro", void 0);

const $$file = "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/products.astro";
const $$url = "/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Products,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
