import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/constants";

const FAQAccordion = () => {

  return (
    <section className="py-10">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold sm:text-4xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mt-8">
        <Accordion type="single" collapsible className="space-y-5">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-gray-200 border-2 p-4  rounded-lg hover:border-yellow-200">
              <AccordionTrigger className="text-md md:text-md lg:text-xl font-bold text-gray-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQAccordion;
