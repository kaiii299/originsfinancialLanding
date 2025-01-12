import { documentToReactComponents, type RenderNode } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { type ReactNode } from 'react';

type Props = {
    RichTextData: any;
};

const RichTextComponent = ({ RichTextData }: Props) => {
    let index = 0;

    const options: any = {
        renderNode: {
            // Paragraph
            [BLOCKS.PARAGRAPH]: (node: RenderNode, children: ReactNode) => {
                const currentIndex = index++;
                return (
                    <p
                        key={currentIndex}
                        className="text-slate-600 text-md"
                        style={{ whiteSpace: 'pre-wrap' }}
                    >
                        {children}
                        <br />
                        <br />
                    </p>
                );
            },

            // Headings (H1-H6)
            [BLOCKS.HEADING_1]: (node: RenderNode, children: ReactNode) => {
                const currentIndex = index++;
                return (
                    <h1 key={currentIndex} className="text-4xl my-4 font-bold">
                        {children} <br />
                    </h1>
                );
            },
            [BLOCKS.HEADING_2]: (node: RenderNode, children: ReactNode) => {
                const currentIndex = index++;
                return (
                    <h2 key={currentIndex} className="text-3xl my-5 font-bold">
                        {children} <br />
                    </h2>
                );
            },
            [BLOCKS.HEADING_3]: (node: RenderNode, children: ReactNode) => {
                const currentIndex = index++;
                return (
                    <h3 key={currentIndex} className="text-2xl mt-3 mb-1 font-bold">
                        {children} <br />
                    </h3>
                );
            },

            // Ordered and Unordered Lists
            [BLOCKS.OL_LIST]: (node: RenderNode, children: ReactNode) => {
                const currentIndex = index++;
                return <ol key={currentIndex} className="list-decimal pl-6">{children}</ol>;
            },
            [BLOCKS.UL_LIST]: (node: RenderNode, children: ReactNode) => {
                const currentIndex = index++;
                return <ul key={currentIndex} className="list-disc pl-6">{children}</ul>;
            },

            // List Items
            [BLOCKS.LIST_ITEM]: (node: RenderNode, children: ReactNode) => {
                const currentIndex = index++;
                return <li key={currentIndex}>{children}</li>;
            },

            // Inline Embedded Entry
            [INLINES.EMBEDDED_ENTRY]: (node: any) => {
                const { title, description } = node.data.target.fields;

                return (
                    <div
                        key={index++}
                        className="border p-4 rounded-lg bg-gray-100 my-4"
                    >
                        <h4 className="text-lg font-bold">{title}</h4>
                        <p className="text-md text-gray-600">{description}</p>
                    </div>
                );
            },

            // Block Embedded Asset (e.g., images)
            [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
                const currentIndex = index++;
                const assetUrl = node.data.target.fields.file.url;
                const altText = node.data.target.fields.title;

                return (
                    <div key={currentIndex}>
                        <img
                            src={assetUrl}
                            alt={altText}
                            className="h-full w-full rounded-lg md:min-w-[600px] max-w-[750px]"
                        />
                    </div>
                );
            },

            // Block Quotes
            [BLOCKS.QUOTE]: (node: any, children: ReactNode) => (
                <blockquote
                    key={index++}
                    className="border-l-4 border-gray-300 pl-4 my-4 text-gray-700 italic bg-gray-100 relative"
                >
                    {children}
                </blockquote>
            ),

            // Tables
            [BLOCKS.TABLE]: (node: RenderNode, children: ReactNode) => {
                const currentIndex = index++;
                return (
                    <table key={currentIndex} className="table-auto border-collapse border border-gray-300 w-full my-6">
                        <tbody>{children}</tbody>
                    </table>
                );
            },
            [BLOCKS.TABLE_ROW]: (node: RenderNode, children: ReactNode) => {
                const currentIndex = index++;
                return <tr key={currentIndex} className="border border-gray-300">{children}</tr>;
            },
            [BLOCKS.TABLE_HEADER_CELL]: (node: RenderNode, children: ReactNode) => {
                const currentIndex = index++;
                return (
                    <th key={currentIndex} className="border border-gray-300 bg-gray-100 p-2 text-left font-bold">
                        {children}
                    </th>
                );
            },
            [BLOCKS.TABLE_CELL]: (node: RenderNode, children: ReactNode) => {
                const currentIndex = index++;
                return (
                    <td key={currentIndex} className="border border-gray-300 p-2">
                        {children}
                    </td>
                );
            },

            // Inline Hyperlinks
            [INLINES.HYPERLINK]: ({ data }: any, children: ReactNode) => {
                const website_url = 'https://techcloud.sg';

                return (
                    <a
                        href={data.uri}
                        target={`${data.uri.startsWith(website_url) ? '_self' : '_blank'}`}
                        rel={`${data.uri.startsWith(website_url) ? '' : 'noopener noreferrer'}`}
                        className="text-primary font-bold underline"
                    >
                        {children}
                    </a>
                );
            },
        },
    };

    const renderedContent: ReactNode = documentToReactComponents(RichTextData, options);

    return <div>{renderedContent}</div>;
};

export default RichTextComponent;