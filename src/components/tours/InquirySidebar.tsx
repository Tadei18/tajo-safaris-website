"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/constants";
import { formatUsd } from "@/lib/utils";
import type { Tour } from "@/types";

const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  month: z.string().min(2, "Pick a month"),
  group: z.string().min(1, "Group size?"),
});

type Values = z.infer<typeof Schema>;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function InquirySidebar({ tour }: { tour: Tour }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(Schema),
    defaultValues: { name: "", email: "", month: "", group: "" },
  });

  const onSubmit = async (values: Values) => {
    setPending(true);
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, tourSlug: tour.slug, source: "tour-sidebar" }),
      });
      toast.success("We've got it — expect a tailored itinerary within 24 hours.");
      setSubmitted(true);
    } catch {
      toast.error("Couldn't send — try WhatsApp instead?");
    } finally {
      setPending(false);
    }
  };

  return (
    <aside className="rounded-2xl bg-surface p-6 shadow-soft ring-1 ring-ink/5">
      <div className="border-b border-ink/10 pb-4">
        <p className="text-xs uppercase tracking-wider text-ink-soft">From</p>
        <p className="font-display text-3xl font-bold text-rust">
          {formatUsd(tour.priceFromUsd)}
          <span className="text-sm font-normal text-ink-soft">
            {" "}
            / person
          </span>
        </p>
        <p className="mt-1 text-xs text-ink-soft">
          Based on double occupancy. Private departures available.
        </p>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold">
        Plan this safari
      </h3>

      {submitted ? (
        <div className="mt-4 flex flex-col items-center gap-3 rounded-xl bg-primary/5 p-4 text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
            <Check className="size-5" />
          </div>
          <p className="text-sm font-medium text-ink">We&apos;ve got it.</p>
          <p className="text-xs text-ink-soft">
            A tailored itinerary will land in your inbox within 24 hours.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="secondary" size="md" className="w-full">
              Continue on WhatsApp
            </Button>
          </a>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3">
            <SidebarField label="Your name" error={errors.name?.message}>
              <Input placeholder="Full name" {...register("name")} />
            </SidebarField>
            <SidebarField label="Email" error={errors.email?.message}>
              <Input type="email" placeholder="you@example.com" {...register("email")} />
            </SidebarField>
            <SidebarField label="Travel month" error={errors.month?.message}>
              <select
                {...register("month")}
                className="h-11 w-full rounded-full border border-ink/15 bg-white px-5 text-sm text-ink focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="">Pick a month</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </SidebarField>
            <SidebarField label="Group size" error={errors.group?.message}>
              <Input type="number" min={1} max={20} placeholder="2" {...register("group")} />
            </SidebarField>
            <Button type="submit" disabled={pending} className="mt-2 w-full">
              {pending ? "Sending..." : "Send inquiry"}
            </Button>
          </form>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block"
          >
            <Button variant="secondary" className="w-full">
              Chat on WhatsApp
            </Button>
          </a>

          <p className="mt-3 text-center text-[11px] text-ink-soft">
            Typical response: under 24 hours.
          </p>
        </>
      )}
    </aside>
  );
}

function SidebarField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-ink-soft">{label}</span>
      {children}
      {error && (
        <span className="text-xs text-rust" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
