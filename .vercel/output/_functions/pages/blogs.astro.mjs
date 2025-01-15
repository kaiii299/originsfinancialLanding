import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent, a as addAttribute, b as createAstro } from '../chunks/astro/server_D45_yHnM.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CAwRDJsa.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_Dx92fFQD.mjs';
import { B as Badge } from '../chunks/badge_37TbSqtb.mjs';
import { format } from 'date-fns';
import { $ as $$Title } from '../chunks/title_0R-bqxaQ.mjs';
import { c as client } from '../chunks/contentful_DXnB1I5a.mjs';
export { renderers } from '../renderers.mjs';

const slugify = (text) => {
  return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-");
};

const $$Astro = createAstro();
const $$BlogsComponent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogsComponent;
  const { blogData } = Astro2.props;
  const featuredBlogs = blogData.items.filter(
    (blog) => blog.fields.featured
  );
  const unfeaturedBlogs = blogData.items.filter(
    (blog) => !blog.fields.featured
  );
  return renderTemplate`${maybeRenderHead()}<div> <!-- Featured Posts Section --> <div> <div> ${renderComponent($$result, "TitleComponent", $$Title, { "title": `Featured ${featuredBlogs.length === 1 ? "Blog" : "Blogs"}` })} </div> ${featuredBlogs.length > 0 ? featuredBlogs.map((blog) => renderTemplate`<a${addAttribute(`/blog/${slugify(blog.fields.slug)}`, "href")} class="md:grid-cols-2 grid-cols-1 grid justify-center items-center gap-5"> <div> ${renderComponent($$result, "Image", $$Image, { "src": blog.fields.image?.fields.file?.url, "alt": blog.fields.image?.fields.title, "title": blog.fields.image?.fields.title, "loading": "lazy", "height": 400, "width": 500, "class": "rounded-lg" })} </div> <div class="space-y-3"> <div> <div> ${blog.fields.tags.map((tag) => {
    return renderTemplate`${renderComponent($$result, "Badge", Badge, { "variant": "secondary" }, { "default": ($$result2) => renderTemplate`${tag}` })}`;
  })} ${blog.sys.createdAt && renderTemplate`<span> <span class="mr-2">|</span> ${format(blog.sys.createdAt, "dd MMM yy")} </span>`} </div> </div> <h2 class="capitalize font-bold text-2xl">${blog.fields.title}</h2> <p>${blog.fields.description}</p> </div> </a>`) : renderTemplate`<p>No blogs found</p>`} </div> <!-- Unfeatured Posts Section --> <div> ${renderComponent($$result, "TitleComponent", $$Title, { "title": `Our ${unfeaturedBlogs.length === 1 ? "Blog" : "Blogs"}` })} </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-5"> ${unfeaturedBlogs.length > 0 ? unfeaturedBlogs.map((blog) => renderTemplate`<a${addAttribute(`/blog/${slugify(blog.fields.slug)}`, "href")} class="flex flex-col justify-start items-start gap-5"> <div> ${renderComponent($$result, "Image", $$Image, { "src": blog.fields.image?.fields.file?.url, "alt": blog.fields.image?.fields.title, "title": blog.fields.image?.fields.title, "loading": "lazy", "height": 400, "width": 500, "class": "rounded-lg md:h-[250px] object-cover" })} </div> <div class="space-y-3"> <div> <div> ${blog.fields.tags.map((tag) => {
    return renderTemplate`${renderComponent($$result, "Badge", Badge, { "variant": "secondary" }, { "default": ($$result2) => renderTemplate`${tag}` })}`;
  })} ${blog.sys.createdAt && renderTemplate`<span> <span class="mr-2">|</span> ${format(blog.sys.createdAt, "dd MMM yy")} </span>`} </div> </div> <h2 class="capitalize font-bold text-2xl">${blog.fields.title}</h2> <p>${blog.fields.description}</p> </div> </a>`) : renderTemplate`<p>No blogs found</p>`} </div> </div>`;
}, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/components/blogsComponent.astro", void 0);

const $$Blogs = createComponent(async ($$result, $$props, $$slots) => {
  const blogData = await client.withoutUnresolvableLinks.getEntries({
    content_type: "blogs",
    order: "sys.createdAt"
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "canonicalUrl": "", "description": "Our blog", "title": "Origins Financial Blogs" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="first-section mb-32"> ${renderComponent($$result2, "BlogsComponent", $$BlogsComponent, { "blogData": blogData })} </section> ` })}`;
}, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/blogs.astro", void 0);

const $$file = "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/blogs.astro";
const $$url = "/blogs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blogs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
