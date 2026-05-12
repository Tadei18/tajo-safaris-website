"use client";

import { Button } from "@/components/ui/button";
import { useChatLauncher } from "@/components/layout/ChatLauncher";
import { formatUsd } from "@/lib/utils";
import type { Tour } from "@/types";

export function MobileInquiryBar({ tour }: { tour: Tour }) {
  const chat = useChatLauncher();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-surface/95 p-3 shadow-lifted backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-2">
        <div className="leading-tight">
          <p className="text-[10px] uppercase tracking-wider text-ink-soft">
            From
          </p>
          <p className="font-display text-lg font-bold text-rust">
            {formatUsd(tour.priceFromUsd)}
            <span className="text-[11px] font-normal text-ink-soft">
              {" "}/ person
            </span>
          </p>
        </div>
        <Button
          size="md"
          onClick={() =>
            chat.open({
              message: `Hi Tajo — interested in the ${tour.title} (${tour.durationDays} days).`,
            })
          }
        >
          Inquire
        </Button>
      </div>
    </div>
  );
}
