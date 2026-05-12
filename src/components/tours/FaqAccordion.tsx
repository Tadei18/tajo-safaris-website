import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/types";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="font-display text-lg">
            {f.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-ink-soft">
            {f.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
