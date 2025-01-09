import { documentToReactComponents, type RenderNode } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, } from '@contentful/rich-text-types';
import { type ReactNode } from 'react';

type Props = {
    RichTextData: any;
}

const RichTextComponent = ({ RichTextData }: Props) => {

    let index = 0;

    const options: any = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node: RenderNode, Children: ReactNode) => {
                const currentIndex = index++
                return <p key={currentIndex} className="text-slate-600 text-md" style={{ whiteSpace: 'pre-wrap' }}>{Children}<br /><br /></p>
            },

            // H1
            [BLOCKS.HEADING_1]: (node: RenderNode, Children: ReactNode) => {
                const currentIndex = index++
                return <h1 key={currentIndex} className="text-4xl my-4 font-bold" >{Children} <br /></h1>
            },
            // H2
            [BLOCKS.HEADING_2]: (node: RenderNode, Children: ReactNode) => {
                const currentIndex = index++
                return <h2 key={currentIndex} className="text-3xl my-5 font-bold">{Children} <br /></h2>
            },
            // H3
            [BLOCKS.HEADING_3]: (node: RenderNode, Children: ReactNode) => {

                const currentIndex = index++
                return <h3 key={currentIndex} className="text-2xl mt-3 mb-1  font-bold" >{Children} <br /></h3>
            },
            // H4  
            [BLOCKS.HEADING_4]: (node: RenderNode, Children: ReactNode) => {

                const currentIndex = index++
                return <h4 key={currentIndex} className="text-xl font-bold mb-4">{Children} <br /></h4>
            },
            // H5
            [BLOCKS.HEADING_5]: (node: RenderNode, Children: ReactNode) => {

                const currentIndex = index++
                return <h5 key={currentIndex} className="text-lg font-bold mb-4" >{Children} <br /></h5>
            },

            //H6
            [BLOCKS.HEADING_6]: (node: RenderNode, Children: ReactNode) => {

                const currentIndex = index++
                return <h6 key={currentIndex} className="text-base font-bold mb-4" >{Children} <br /></h6>
            },

            // OL list
            [BLOCKS.OL_LIST]: (node: RenderNode, Children: ReactNode) => {

                const currentIndex = index++
                return <ol key={currentIndex} className="list-decimal pl-6">{Children}</ol>
            },
            // UL list
            [BLOCKS.UL_LIST]: (node: RenderNode, Children: ReactNode) => {

                const currentIndex = index++
                return <ul key={currentIndex} className="list-disc pl-6">{Children}</ul>
            },
            // List item
            [BLOCKS.LIST_ITEM]: (node: RenderNode, children: ReactNode) => {
                const currentIndex = index++
                return <li key={currentIndex} className="list-decimal">{children}</li>
            },
            // Line 
            [BLOCKS.HR]: (node: RenderNode, Children: ReactNode) => {
                const currentIndex = index++
                return <div key={currentIndex} className="border-b-2 bg-[#ccc] border-solid border-[#ccc] my-4"><hr /></div>
            },
            // Embeded Assets e.g images 
            [BLOCKS.EMBEDDED_ASSET]: (node: any, children: ReactNode) => {
                const currentIndex = index++;
                const assetUrl = node.data.target.fields.file.url;
                const altText = node.data.target.fields.title;

                return <div>
                    <br />
                    <img src={assetUrl} alt={altText} key={currentIndex} className="h-full w-full rounded-lg md:min-w-[800px]  max-w-[950px]" />
                    <br />
                    <br />
                </div>
            },
            // Block Quotes
            [BLOCKS.QUOTE]: (node: any, children: ReactNode) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-700 italic bg-gray-100 relative ">
                    {children}
                </blockquote>
            ),
            // Bold
            [MARKS.BOLD]: (text: string, children: ReactNode) => {
                return <b key={`${text}-key`} className="text-xl font mb-4" >{children}</b>
            },
            // Italic
            [MARKS.ITALIC]: (text: string, children: ReactNode) => {
                return <i key={`${text}-key`} className="text-xl mb-4 italic">{children}</i>
            },
            //Underline
            [MARKS.UNDERLINE]: (text: string, children: ReactNode) => {
                return <u key={`${text}-key`} className="text-xl mb-4 underlineline">{children}</u>
            },
            // HyperLink
            [INLINES.HYPERLINK]: ({ data }: any, children: ReactNode) => {

                const website_url = 'https://techcloud.sg'

                // Open link in current tab if its a current link
                return <a href={data.uri} target={`${data.uri.startsWith(website_url) ? '_self' : '_blank'}`} rel={`${data.uri.startsWith(website_url) ? '' : 'noopener noreferrer'}`} className="text-primary font-bold underline">{children}</a>
            },
        },
    }

    const renderedContent: ReactNode = documentToReactComponents(RichTextData, options)

    return (
        <div>
            {renderedContent}
        </div>
    )
}

export default RichTextComponent