"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const whenOptions = [
  { value: "any", label: "Any time" },
  { value: "jan-mar", label: "Jan – Mar" },
  { value: "apr-jun", label: "Apr – Jun" },
  { value: "jul-sep", label: "Jul – Sep" },
  { value: "oct-dec", label: "Oct – Dec" },
];

const daysOptions = [
  { value: "any", label: "Any length" },
  { value: "3-5", label: "3 – 5 days" },
  { value: "6-8", label: "6 – 8 days" },
  { value: "9-12", label: "9 – 12 days" },
  { value: "13+", label: "13+ days" },
];

const styleOptions = [
  { value: "any", label: "Any style" },
  { value: "Budget", label: "Budget" },
  { value: "Mid-range", label: "Mid-range" },
  { value: "Luxury", label: "Luxury" },
  { value: "Family", label: "Family" },
];

export function QuickMatch() {
  const router = useRouter();
  const [when, setWhen] = React.useState("any");
  const [days, setDays] = React.useState("any");
  const [style, setStyle] = React.useState("any");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (when !== "any") params.set("when", when);
    if (days !== "any") params.set("days", days);
    if (style !== "any") params.set("style", style);
    const qs = params.toString();
    router.push(`/safaris${qs ? `?${qs}` : ""}`);
  };

  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="rounded-3xl bg-sand p-8 shadow-soft md:p-12">
          <p className="eyebrow text-primary">Quick Match</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
            Tell us three things.
          </h2>
          <p className="mt-2 max-w-md text-sm text-ink-soft">
            We&apos;ll narrow the list. The full planning conversation comes
            after.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <SelectField
              label="When are you traveling?"
              value={when}
              onChange={setWhen}
              options={whenOptions}
              placeholder="Pick a window"
            />
            <SelectField
              label="How many days?"
              value={days}
              onChange={setDays}
              options={daysOptions}
              placeholder="Trip length"
            />
            <SelectField
              label="What style?"
              value={style}
              onChange={setStyle}
              options={styleOptions}
              placeholder="Pick a style"
            />
            <div className="flex items-end">
              <Button
                type="submit"
                size="lg"
                className="w-full"
              >
                Show matching safaris <ArrowRight className="size-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-ink-soft">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
