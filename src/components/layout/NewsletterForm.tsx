"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Schema = z.object({
  email: z.string().email("Enter a valid email"),
});
type Values = z.infer<typeof Schema>;

export function NewsletterForm({
  className,
  variant = "inline",
}: {
  className?: string;
  variant?: "inline" | "stacked";
}) {
  const [pending, setPending] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(Schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: Values) => {
    setPending(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      toast.success("You're on the list.");
      reset();
    } catch {
      toast.error("Something went wrong. Try again?");
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "flex w-full gap-2",
        variant === "stacked" ? "flex-col" : "flex-row",
        className
      )}
    >
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "newsletter-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="newsletter-error" className="mt-1 text-xs text-rust">
            {errors.email.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : (
          <>
            <Send className="size-4" />
            Subscribe
          </>
        )}
      </Button>
    </form>
  );
}
