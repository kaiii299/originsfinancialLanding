import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { IFaq } from "@/lib/interface";
import { client } from "@/lib/contentful";
import type { Entry } from "contentful";


const FAQAccordion = () => {
  const [faqData, setFaqData] = useState<Entry<IFaq, undefined, string>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {

        const data = await client.getEntries<IFaq>({ content_type: "faq" }); 

        setFaqData(data.items);

      } catch (error) {
        console.error("Error fetching FAQs:", error);

      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (loading) {
    return <p className="my-10">Loading FAQs...</p>;
  }

  return (
    <div className="mt-8">
      <Accordion type="single" collapsible className="space-y-5">
        {faqData.map((faq) => (
          <AccordionItem
            key={faq.sys.id}
            value={`item-${faq.sys.id}`}
            className="border-gray-200 border-2 p-4 rounded-lg hover:border-yellow-200"
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