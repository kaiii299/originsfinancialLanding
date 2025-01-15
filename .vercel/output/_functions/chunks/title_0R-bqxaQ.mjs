import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro } from './astro/server_D45_yHnM.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Title = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Title;
  const { title, className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="md:my-14 my-5"> <h2${addAttribute(`text-3xl capitalize font-bold sm:text-4xl ${className}`, "class")}> ${title} </h2> </div>`;
}, "/Users/unknownphone/Downloads/Code/Clients/Origins Financial/originsfinancialLanding/src/components/ui/title.astro", void 0);

export { $$Title as $ };
