"use client";

import * as React from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const INTERESTS = [
  "Big Five",
  "Great Migration",
  "Photography focus",
  "Honeymoon",
  "Family-friendly",
  "Walking safaris",
  "Cultural visits",
  "Birding",
  "Beach extension",
  "Mountain trekking",
] as const;

const COUNTRIES = [
  "United States", "United Kingdom", "Germany", "France", "Italy", "Spain",
  "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", "Norway",
  "Denmark", "Finland", "Australia", "New Zealand", "Canada", "Brazil",
  "Argentina", "Japan", "India", "Singapore", "United Arab Emirates",
  "Saudi Arabia", "South Africa", "Kenya", "Other",
];

const Schema = z.object({
  // Step 1 — trip basics
  primaryMonth: z.string().min(1, "Pick a primary month"),
  alternateMonth: z.string().optional(),
  duration: z.enum(["3-5", "6-8", "9-12", "13+"], {
    error: "Pick a trip length",
  }),
  adults: z.number().int().min(1, "At least 1 adult").max(20),
  children: z.number().int().min(0).max(20),

  // Step 2 — interests
  interests: z.array(z.string()).min(1, "Pick at least one interest"),

  // Step 3 — style & budget
  style: z.enum(["Budget", "Mid-range", "Luxury"], {
    error: "Pick a style",
  }),
  budgetUsd: z.number().min(500).max(15000),

  // Step 4 — contact
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  country: z.string().min(2, "Pick your country"),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

type Values = z.infer<typeof Schema>;

const STEP_FIELDS: Record<number, (keyof Values)[]> = {
  0: ["primaryMonth", "alternateMonth", "duration", "adults", "children"],
  1: ["interests"],
  2: ["style", "budgetUsd"],
  3: ["fullName", "email", "country", "phone", "notes"],
};

const STEP_LABELS = ["Trip basics", "Interests", "Style & budget", "Contact"];

export function MultiStepInquiry() {
  const [step, setStep] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const totalSteps = STEP_LABELS.length;

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(Schema),
    defaultValues: {
      primaryMonth: "",
      alternateMonth: "",
      duration: undefined,
      adults: 2,
      children: 0,
      interests: [],
      style: undefined,
      budgetUsd: 3000,
      fullName: "",
      email: "",
      country: "",
      phone: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: Values) => {
    setPending(true);
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "contact-form" }),
      });
      toast.success("We've got it — expect a tailored itinerary within 24 hours.");
      setSubmitted(true);
    } catch {
      toast.error("Couldn't send — try WhatsApp instead?");
    } finally {
      setPending(false);
    }
  };

  const next = async () => {
    const fields = STEP_FIELDS[step];
    const ok = await trigger(fields);
    if (ok) setStep((s) => Math.min(s + 1, totalSteps - 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const budgetValue = useWatch({ control, name: "budgetUsd" });

  if (submitted) return <SuccessView />;

  return (
    <div className="rounded-2xl bg-surface p-6 shadow-soft md:p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    i < step && "bg-primary text-white",
                    i === step && "bg-accent-deep text-ink ring-4 ring-accent-deep/20",
                    i > step && "bg-sand text-ink-soft"
                  )}
                >
                  {i < step ? <Check className="size-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden sm:block text-[10px] uppercase tracking-wider whitespace-nowrap",
                    i === step ? "text-ink font-semibold" : "text-ink-soft"
                  )}
                >
                  {label}
                </span>
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={cn(
                    "h-px flex-1 transition-colors",
                    i < step ? "bg-primary" : "bg-ink/15"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                When are you thinking?
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                Even rough months help us position guides and lodges.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Primary month" error={errors.primaryMonth?.message}>
                <select
                  {...register("primaryMonth")}
                  className="h-11 w-full rounded-full border border-ink/15 bg-white px-5 text-sm focus-visible:border-primary focus-visible:outline-none"
                >
                  <option value="">Pick a month</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field label="Alternate month (optional)">
                <select
                  {...register("alternateMonth")}
                  className="h-11 w-full rounded-full border border-ink/15 bg-white px-5 text-sm focus-visible:border-primary focus-visible:outline-none"
                >
                  <option value="">No preference</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Trip duration" error={errors.duration?.message}>
              <Controller
                control={control}
                name="duration"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {(["3-5", "6-8", "9-12", "13+"] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => field.onChange(d)}
                        className={cn(
                          "h-10 rounded-full border px-5 text-sm font-medium transition-colors",
                          field.value === d
                            ? "border-primary bg-primary text-white"
                            : "border-ink/15 bg-white text-ink hover:border-primary"
                        )}
                      >
                        {d} days
                      </button>
                    ))}
                  </div>
                )}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Adults" error={errors.adults?.message}>
                <Input
                  type="number"
                  min={1}
                  max={20}
                  {...register("adults", { valueAsNumber: true })}
                />
              </Field>
              <Field label="Children (under 12)" error={errors.children?.message}>
                <Input
                  type="number"
                  min={0}
                  max={20}
                  {...register("children", { valueAsNumber: true })}
                />
              </Field>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                What are you most interested in?
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                Pick everything that applies. We&apos;ll match the right
                regions and guides.
              </p>
            </div>

            <Field error={errors.interests?.message}>
              <Controller
                control={control}
                name="interests"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((i) => {
                      const active = field.value?.includes(i) ?? false;
                      return (
                        <button
                          key={i}
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            const set = new Set(field.value ?? []);
                            if (set.has(i)) set.delete(i);
                            else set.add(i);
                            field.onChange(Array.from(set));
                          }}
                          className={cn(
                            "h-10 rounded-full border px-5 text-sm font-medium transition-colors",
                            active
                              ? "border-primary bg-primary text-white"
                              : "border-ink/15 bg-white text-ink hover:border-primary"
                          )}
                        >
                          {i}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Style and budget.
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                Honest answers help us pitch lodges that actually suit you.
              </p>
            </div>

            <Field label="Style" error={errors.style?.message}>
              <Controller
                control={control}
                name="style"
                render={({ field }) => (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {(["Budget", "Mid-range", "Luxury"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => field.onChange(s)}
                        className={cn(
                          "rounded-2xl border p-4 text-left transition-colors",
                          field.value === s
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-ink/15 bg-white hover:border-primary"
                        )}
                      >
                        <p className="font-display text-lg font-semibold">
                          {s}
                        </p>
                        <p className="mt-1 text-xs text-ink-soft">
                          {s === "Budget" && "Camping or basic lodges."}
                          {s === "Mid-range" && "Tented camps and good lodges."}
                          {s === "Luxury" && "Top-tier camps and private guides."}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              />
            </Field>

            <Field
              label={`Approx. budget per person — $${(budgetValue ?? 3000).toLocaleString()}`}
              error={errors.budgetUsd?.message}
            >
              <input
                type="range"
                min={500}
                max={15000}
                step={100}
                {...register("budgetUsd", { valueAsNumber: true })}
                className="w-full accent-primary"
              />
              <div className="mt-1 flex justify-between text-[11px] text-ink-soft">
                <span>$500</span>
                <span>$15,000+</span>
              </div>
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                How can we reach you?
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                We&apos;ll send a tailored itinerary within 24 hours.
              </p>
            </div>

            <Field label="Full name" error={errors.fullName?.message}>
              <Input placeholder="Jane Doe" {...register("fullName")} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <Input type="email" placeholder="you@example.com" {...register("email")} />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Country" error={errors.country?.message}>
                <select
                  {...register("country")}
                  className="h-11 w-full rounded-full border border-ink/15 bg-white px-5 text-sm focus-visible:border-primary focus-visible:outline-none"
                >
                  <option value="">Pick your country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Phone (optional)">
                <Input type="tel" placeholder="+1 555 000 0000" {...register("phone")} />
              </Field>
            </div>

            <Field label="Anything else? (optional)">
              <Textarea
                rows={4}
                placeholder="Travelling with mobility considerations, photography rigs, a specific wish list — anything you want us to know."
                {...register("notes")}
              />
            </Field>
          </div>
        )}

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={back}>
              <ArrowLeft className="size-4" /> Back
            </Button>
          ) : (
            <span />
          )}
          {step < totalSteps - 1 ? (
            <Button type="button" onClick={next}>
              Continue <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={pending}>
              {pending ? "Sending..." : "Send inquiry"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function SuccessView() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-surface p-10 text-center shadow-soft">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary text-white">
        <Check className="size-7" />
      </div>
      <h2 className="font-display text-2xl font-semibold">We&apos;ve got it.</h2>
      <p className="max-w-md text-base text-ink-soft">
        Expect a tailored itinerary within 24 hours. If you&apos;d like to
        chat sooner, message us on WhatsApp.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary">Continue on WhatsApp</Button>
        </a>
        <Link href="/safaris">
          <Button variant="ghost">Browse safaris while you wait →</Button>
        </Link>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && (
        <span className="text-xs font-medium uppercase tracking-wider text-ink-soft">
          {label}
        </span>
      )}
      {children}
      {error && (
        <span className="text-xs text-rust" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
