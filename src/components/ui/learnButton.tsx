type Props = {
    text:string
    href?: string
    arrow_hidden?:boolean
    text_color?: string
    className? :string
    deg?:boolean
}

const LearnButton = ({text, href , arrow_hidden,text_color, className, deg}: Props) => {
    return (
        <div className="mt-auto cursor-pointer group">
            <a href={`${href}`} className={`${className} inline-flex group-hover:underline underline-offset-4 items-center text-md md:text-base group ${text_color? text_color : 'text-dark'}`}>
                {text}
                <div className={`flex justify-center items-center bg-primary rounded-full w-5 h-5 ml-1 group-hover:translate-x-3  ${deg ? `group-hover:rotate-[90deg]` : 'group-hover:rotate-[0deg]'}  transition-transform duration-300 ${arrow_hidden? 'hidden': 'inline-flex'}`}>
                    {/* Arrow */}
                    <svg className="w-3 h-3" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </div>
            </a>
        </div>
    )
}

export default LearnButton