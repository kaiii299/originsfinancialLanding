import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_Bz0gunOJ.mjs';
import { manifest } from './manifest_C7sL1a_m.mjs';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about-us.astro.mjs');
const _page3 = () => import('./pages/api/testimonials.astro.mjs');
const _page4 = () => import('./pages/blog/_slug_.astro.mjs');
const _page5 = () => import('./pages/blogs.astro.mjs');
const _page6 = () => import('./pages/career.astro.mjs');
const _page7 = () => import('./pages/contact.astro.mjs');
const _page8 = () => import('./pages/our-team.astro.mjs');
const _page9 = () => import('./pages/product/_slug_.astro.mjs');
const _page10 = () => import('./pages/products.astro.mjs');
const _page11 = () => import('./pages/services.astro.mjs');
const _page12 = () => import('./pages/testimonials.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about-us.astro", _page2],
    ["src/pages/api/testimonials.ts", _page3],
    ["src/pages/blog/[slug].astro", _page4],
    ["src/pages/blogs.astro", _page5],
    ["src/pages/career.astro", _page6],
    ["src/pages/contact.astro", _page7],
    ["src/pages/our-team.astro", _page8],
    ["src/pages/product/[slug].astro", _page9],
    ["src/pages/products.astro", _page10],
    ["src/pages/services.astro", _page11],
    ["src/pages/testimonials.astro", _page12],
    ["src/pages/index.astro", _page13]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "7b12380a-aae5-4a5b-96e2-c589661860c0",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
