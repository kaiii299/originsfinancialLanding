import { jsxs, jsx } from 'react/jsx-runtime';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import 'react';

const RichTextComponent = ({ RichTextData }) => {
  let index = 0;
  const options = {
    renderNode: {
      // Paragraph
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const currentIndex = index++;
        return /* @__PURE__ */ jsxs(
          "p",
          {
            className: "text-slate-600 text-md",
            style: { whiteSpace: "pre-wrap" },
            children: [
              children,
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("br", {})
            ]
          },
          currentIndex
        );
      },
      // Headings (H1-H6)
      [BLOCKS.HEADING_1]: (node, children) => {
        const currentIndex = index++;
        return /* @__PURE__ */ jsxs("h1", { className: "text-4xl my-4 font-bold", children: [
          children,
          " ",
          /* @__PURE__ */ jsx("br", {})
        ] }, currentIndex);
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        const currentIndex = index++;
        return /* @__PURE__ */ jsxs("h2", { className: "text-3xl my-5 font-bold", children: [
          children,
          " ",
          /* @__PURE__ */ jsx("br", {})
        ] }, currentIndex);
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        const currentIndex = index++;
        return /* @__PURE__ */ jsxs("h3", { className: "text-2xl mt-3 mb-1 font-bold", children: [
          children,
          " ",
          /* @__PURE__ */ jsx("br", {})
        ] }, currentIndex);
      },
      // Ordered and Unordered Lists
      [BLOCKS.OL_LIST]: (node, children) => {
        const currentIndex = index++;
        return /* @__PURE__ */ jsx("ol", { className: "list-decimal pl-6", children }, currentIndex);
      },
      [BLOCKS.UL_LIST]: (node, children) => {
        const currentIndex = index++;
        return /* @__PURE__ */ jsx("ul", { className: "list-disc pl-6", children }, currentIndex);
      },
      // List Items
      [BLOCKS.LIST_ITEM]: (node, children) => {
        const currentIndex = index++;
        return /* @__PURE__ */ jsx("li", { children }, currentIndex);
      },
      // Inline Embedded Entry
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const { title, description } = node.data.target.fields;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "border p-4 rounded-lg bg-gray-100 my-4",
            children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold", children: title }),
              /* @__PURE__ */ jsx("p", { className: "text-md text-gray-600", children: description })
            ]
          },
          index++
        );
      },
      // Block Embedded Asset (e.g., images)
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const currentIndex = index++;
        const assetUrl = node.data.target.fields.file.url;
        const altText = node.data.target.fields.title;
        return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "img",
          {
            src: assetUrl,
            alt: altText,
            className: "h-full w-full rounded-lg md:min-w-[600px] max-w-[750px]"
          }
        ) }, currentIndex);
      },
      // Block Quotes
      [BLOCKS.QUOTE]: (node, children) => /* @__PURE__ */ jsx(
        "blockquote",
        {
          className: "border-l-4 border-gray-300 pl-4 my-4 text-gray-700 italic bg-gray-100 relative",
          children
        },
        index++
      ),
      // Tables
      [BLOCKS.TABLE]: (node, children) => {
        const currentIndex = index++;
        return /* @__PURE__ */ jsx("table", { className: "table-auto border-collapse border border-gray-300 w-full my-6", children: /* @__PURE__ */ jsx("tbody", { children }) }, currentIndex);
      },
      [BLOCKS.TABLE_ROW]: (node, children) => {
        const currentIndex = index++;
        return /* @__PURE__ */ jsx("tr", { className: "border border-gray-300", children }, currentIndex);
      },
      [BLOCKS.TABLE_HEADER_CELL]: (node, children) => {
        const currentIndex = index++;
        return /* @__PURE__ */ jsx("th", { className: "border border-gray-300 bg-gray-100 p-2 text-left font-bold", children }, currentIndex);
      },
      [BLOCKS.TABLE_CELL]: (node, children) => {
        const currentIndex = index++;
        return /* @__PURE__ */ jsx("td", { className: "border border-gray-300 p-2", children }, currentIndex);
      },
      // Inline Hyperlinks
      [INLINES.HYPERLINK]: ({ data }, children) => {
        const website_url = "https://techcloud.sg";
        return /* @__PURE__ */ jsx(
          "a",
          {
            href: data.uri,
            target: `${data.uri.startsWith(website_url) ? "_self" : "_blank"}`,
            rel: `${data.uri.startsWith(website_url) ? "" : "noopener noreferrer"}`,
            className: "text-primary font-bold underline",
            children
          }
        );
      }
    }
  };
  const renderedContent = documentToReactComponents(RichTextData, options);
  return /* @__PURE__ */ jsx("div", { children: renderedContent });
};

export { RichTextComponent as R };
