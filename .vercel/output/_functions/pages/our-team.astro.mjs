import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent, b as createAstro } from '../chunks/astro/server_D45_yHnM.mjs';
import 'kleur/colors';
import { $ as $$Image } from '../chunks/_astro_assets_Dx92fFQD.mjs';
import { jsx } from 'react/jsx-runtime';
import 'react';
import { $ as $$Title } from '../chunks/title_0R-bqxaQ.mjs';
import { $ as $$Layout } from '../chunks/Layout_CAwRDJsa.mjs';
import { c as client } from '../chunks/contentful_DXnB1I5a.mjs';
export { renderers } from '../renderers.mjs';

const MarkdownComponent = ({
  markdown,
  className
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `${className} whitespace-pre-wrap`,
      dangerouslySetInnerHTML: { __html: markdown }
    }
  );
};

const $$Astro = createAstro();
const $$OurTeamComponent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$OurTeamComponent;
  const { membersData, className } = Astro2.props;
  const { profileImage, name, description, featured, role } = membersData.fields;
  return renderTemplate`${maybeRenderHead()}<div class="space-y-8"> <!-- Featured Member Section --> ${featured && renderTemplate`<div class="grid md:grid-cols-2 gap-5 justify-center items-center text-start"> <div class="space-y-4"> ${renderComponent($$result, "Image", $$Image, { "src": profileImage?.fields.file?.url, "alt": profileImage?.fields.title || "Featured Member", "title": profileImage?.fields.title || "Featured Member", "width": 500, "height": 500, "class": "md:w-[430px] md:h-[500px] h-[420px] rounded-lg object-cover", "format": "webp", "draggable": false })} </div> <div class="space-y-5"> <div class="space-y-2"> <h2 class="font-bold text-2xl">${name}</h2> <span class="text-sm">${role}</span> </div> ${renderComponent($$result, "MarkdownComponent", MarkdownComponent, { "markdown": description })} </div> </div>`} <!-- Other Team Members Section --> <div> ${!featured && renderTemplate`<div> <div> ${renderComponent($$result, "Image", $$Image, { "src": profileImage?.fields.file?.url, "alt": profileImage?.fields.title || "Featured Member", "title": profileImage?.fields.title || "Featured Member", "width": 400, "height": 500, "class": `${className ? className : "md:h-[500px] h-[190px]"} rounded-lg object-cover`, "format": "webp", "draggable": false })} </div> <div class="flex justify-start items-start flex-col my-3 space-y-1"> <h2 class="font-bold text-2xl text-start">${name}</h2> <span class="text-sm text-start">${role}</span> </div> </div>`} </div> </div>`;
}, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/components/ourTeamComponent.astro", void 0);

const $$OurTeam = createComponent(async ($$result, $$props, $$slots) => {
  const ourTeamData = await client.withoutUnresolvableLinks.getEntries({
    content_type: "ourTeam"
  });
  const testimonialData = await client.withoutUnresolvableLinks.getEntries({
    content_type: "testimonials"
  });
  const featuredMembers = ourTeamData.items.filter((member) => member.fields.featured);
  const nonFeaturedMembers = ourTeamData.items.filter((member) => !member.fields.featured);
  const leaders = nonFeaturedMembers.filter((member) => member.fields.group === "Leader");
  const teamMembers = nonFeaturedMembers.filter((member) => member.fields.group !== "Leader");
  const pluralizeTitle = (singular, plural, count) => count === 1 ? singular : plural;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "canonicalUrl": "", "description": "", "title": "" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="first-section mb-32"> <div> ${featuredMembers.length > 0 && renderTemplate`${renderComponent($$result2, "TitleComponent", $$Title, { "title": pluralizeTitle("Featured Member", "Featured Members", featuredMembers.length) })}`} </div> <!-- Featured Members Section --> ${featuredMembers.length > 0 && renderTemplate`<div class="space-y-8 mb-12"> ${featuredMembers.map((member) => renderTemplate`<div class="featured-member"> ${renderComponent($$result2, "OurTeamSheetComponent", null, { "client:only": "React", "ourTeamMemberData": member, "testimonialData": testimonialData, "client:component-hydration": "only", "client:component-path": "@/components/ourTeamSheetComponent", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "OurTeamComponent", $$OurTeamComponent, { "membersData": member })} ` })} </div>`)} </div>`} <div> ${leaders.length > 0 && renderTemplate`${renderComponent($$result2, "TitleComponent", $$Title, { "title": pluralizeTitle("Our Leader", "Our Leaders", leaders.length) })}`} </div> <!-- Leaders Section --> ${leaders.length > 0 ? renderTemplate`<div class="grid md:grid-cols-3 grid-cols-2 gap-8"> ${leaders.map((member) => renderTemplate`<div class="team-member"> ${renderComponent($$result2, "OurTeamSheetComponent", null, { "client:only": "React", "ourTeamMemberData": member, "testimonialData": testimonialData, "client:component-hydration": "only", "client:component-path": "@/components/ourTeamSheetComponent", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "OurTeamComponent", $$OurTeamComponent, { "membersData": member })} ` })} </div>`)} </div>` : renderTemplate`<div></div>`} <div> ${teamMembers.length > 0 && renderTemplate`${renderComponent($$result2, "TitleComponent", $$Title, { "title": pluralizeTitle("Team Member", "Team Members", teamMembers.length) })}`} </div> <!-- Members Section --> ${teamMembers.length > 0 ? renderTemplate`<div class="grid md:grid-cols-4 grid-cols-2 gap-8"> ${teamMembers.map((member) => renderTemplate`<div class="team-member"> ${renderComponent($$result2, "OurTeamSheetComponent", null, { "client:only": "React", "ourTeamMemberData": member, "testimonialData": testimonialData, "client:component-hydration": "only", "client:component-path": "@/components/ourTeamSheetComponent", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "OurTeamComponent", $$OurTeamComponent, { "membersData": member, "className": "md:h-[280px] h-[190px] md:w-[250px] object-cover" })} ` })} </div>`)} </div>` : renderTemplate`<div></div>`} </section> ` })}`;
}, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/our-team.astro", void 0);

const $$file = "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/pages/our-team.astro";
const $$url = "/our-team";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$OurTeam,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
