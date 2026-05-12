"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Check, Phone } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { whatsappUrl, contact } from "@/lib/constants";

// PHASE 2: This widget currently submits to a stub /api/chat/start that
// returns { ok: true, sessionId }. The component is architected so that
// swapping in a live message stream is a single-component change:
//   - Keep the form view as today.
//   - After successful submit, replace the SuccessView with a MessageList +
//     MessageInput pair that subscribes to /api/chat/[sessionId]/stream (SSE).
//   - Use the session id to tag outbound WhatsApp messages with `[#sessionId]`
//     so reply webhooks can route messages back to the right widget session.

// Simple global event bus — lets any component (e.g. Header CTA, Hero CTA)
// open the chat launcher without having to wire React context through every
// page. Single event channel, single listener inside ChatLauncher.
const CHAT_EVENT = "tajo:openchat";
type ChatOpenDetail = { prefill?: { name?: string; message?: string } };

export function useChatLauncher() {
  return {
    open: (prefill?: ChatOpenDetail["prefill"]) => {
      if (typeof window === "undefined") return;
      window.dispatchEvent(
        new CustomEvent<ChatOpenDetail>(CHAT_EVENT, { detail: { prefill } })
      );
    },
  };
}

const ChatSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell us a little more — at least 10 characters"),
});

type ChatValues = z.infer<typeof ChatSchema>;

export function ChatLauncher() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatValues>({
    resolver: zodResolver(ChatSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<ChatOpenDetail>).detail;
      if (detail?.prefill) {
        reset({ name: "", email: "", phone: "", message: "", ...detail.prefill });
      }
      setIsOpen(true);
    };
    window.addEventListener(CHAT_EVENT, onOpen);
    return () => window.removeEventListener(CHAT_EVENT, onOpen);
  }, [reset]);

  // Lock body scroll on mobile when open.
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen && window.matchMedia("(max-width: 640px)").matches) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  const onSubmit = async (values: ChatValues) => {
    setPending(true);
    try {
      const res = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Network error");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setPending(false);
    }
  };

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  return (
    <>
      <motion.button
        type="button"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        onClick={toggle}
        aria-label={isOpen ? "Close chat" : "Open chat with Tajo"}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 inline-flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lifted transition-transform hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {isOpen ? (
          <X className="size-6" />
        ) : (
          <MessageCircle className="size-6" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl bg-surface shadow-lifted sm:h-[520px] max-h-[calc(100vh-7rem)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-launcher-title"
          >
            <div className="bg-primary p-5 text-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2
                    id="chat-launcher-title"
                    className="font-display text-xl font-semibold"
                  >
                    Talk to Tajo
                  </h2>
                  <p className="mt-1 text-xs text-white/80">
                    We usually reply within an hour. Nairobi time (GMT+3).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close chat"
                  className="rounded-full p-1 text-white/80 hover:bg-white/10"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {!submitted ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  <Field label="Name" error={errors.name?.message}>
                    <Input
                      placeholder="Your name"
                      {...register("name")}
                      className="h-10"
                    />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className="h-10"
                    />
                  </Field>
                  <Field label="Phone (optional)">
                    <Input
                      type="tel"
                      placeholder="+1 555 000 0000"
                      {...register("phone")}
                      className="h-10"
                    />
                  </Field>
                  <Field
                    label="What are you thinking about?"
                    error={errors.message?.message}
                  >
                    <Textarea
                      placeholder="Couple, ten days in October, big-cat focus..."
                      rows={4}
                      {...register("message")}
                      className="min-h-[100px]"
                    />
                  </Field>

                  <Button
                    type="submit"
                    size="md"
                    disabled={pending}
                    className="mt-2"
                  >
                    {pending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="size-4" /> Send
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <SuccessView onClose={close} />
              )}
            </div>

            <div className="border-t border-ink/10 bg-bg/60 p-4">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-ink-soft">Prefer WhatsApp?</span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                  Open chat →
                </a>
              </div>
              <p className="mt-2 flex items-center gap-1 text-[11px] text-ink-soft">
                <Phone className="size-3" /> Or call {contact.phoneDisplay}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({
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

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary-300/30 text-primary">
        <Check className="size-7" />
      </div>
      <div>
        <p className="font-display text-lg font-semibold">We&apos;ve got it.</p>
        <p className="mt-1 text-sm text-ink-soft">
          Expect a reply within an hour during business hours.
        </p>
      </div>
      {/* PHASE 2: Replace this static success state with a live message
          thread once the chat backend is in place. */}
      <div className="mt-4 flex w-full max-w-[260px] flex-col gap-2">
        <div className="rounded-2xl rounded-bl-md bg-sand/80 p-3 text-left text-xs text-ink">
          Hi there — Mary from Tajo will pick this up shortly.
        </div>
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 w-full"
      >
        <Button variant="secondary" size="md" className="w-full">
          Continue on WhatsApp
        </Button>
      </a>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="text-ink-soft"
      >
        Close
      </Button>
    </div>
  );
}
