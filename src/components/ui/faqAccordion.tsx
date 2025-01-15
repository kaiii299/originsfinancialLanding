import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { IFaq } from "@/lib/interface";
import type { Entry } from "contentful";


type Props = {
  faqData: Entry<IFaq, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
}

const FAQAccordion = ({faqData}: Props) => {

  return (
    <div className="mt-8">
      <Accordion type="single" collapsible className="space-y-5">
        {faqData.map((faq) => (
          <AccordionItem
            key={faq.sys.id}
            value={`item-${faq.sys.id}`}
            className="border-gray-200 border-2 p-4 rounded-lg hover:border-main"
          >
            <AccordionTrigger className="text-md md:text-md lg:text-xl font-bold text-gray-900">
              {faq.fields.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-start text-lg">
              {faq.fields.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;