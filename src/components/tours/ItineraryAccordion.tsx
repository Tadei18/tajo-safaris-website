import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bed, Utensils } from "lucide-react";
import type { ItineraryDay } from "@/types";
import { cn } from "@/lib/utils";

const ALL_MEALS = ["B", "L", "D"] as const;

export function ItineraryAccordion({ days }: { days: ItineraryDay[] }) {
  return (
    <Accordion
      type="multiple"
      defaultValue={["day-1"]}
      className="w-full"
    >
      {days.map((d) => (
        <AccordionItem key={d.day} value={`day-${d.day}`}>
          <AccordionTrigger>
            <span className="flex flex-1 items-baseline gap-3 text-left">
              <span className="font-display text-lg font-semibold text-primary">
                Day {d.day}
              </span>
              <span className="text-base font-medium text-ink">
                — {d.title}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 text-sm text-ink-soft">
            {d.description.map((p, i) => (
              <p key={i} className="leading-relaxed">{p}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 border-t border-ink/10 pt-4 text-xs">
              {d.lodge && (
                <span className="inline-flex items-center gap-2 text-ink">
                  <Bed className="size-4 text-primary" />
                  <span>
                    <span className="font-semibold">Accommodation:</span>{" "}
                    {d.lodge}
                  </span>
                </span>
              )}
              <span className="inline-flex items-center gap-2 text-ink">
                <Utensils className="size-4 text-primary" />
                <span>
                  <span className="font-semibold">Meals:</span>{" "}
                  {ALL_MEALS.map((m) => (
                    <span
                      key={m}
                      className={cn(
                        "ml-1 inline-flex size-5 items-center justify-center rounded-full text-[10px] font-bold",
                        d.meals.includes(m)
                          ? "bg-primary text-white"
                          : "bg-sand/40 text-ink-soft/40"
                      )}
                    >
                      {m}
                    </span>
                  ))}
                </span>
              </span>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
