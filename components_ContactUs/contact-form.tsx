"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";

const GOAL_OPTIONS = [
  "Provide a suggestion",
  "Ask a question",
  "Report a problem",
  "Account concerns (activation/deletion/questions)",
];

const MAX_MESSAGE_LENGTH = 500;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  goal: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  goal: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.goal) next.goal = "Please select a goal.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          title: form.goal,
          message: form.message,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  }

  const inputBase =
    "w-full rounded border px-3 py-2 text-sm outline-none transition-all duration-200 " +
    "border-(--color-border) focus:border-(--color-navy) focus:ring-2 focus:ring-(--color-navy)/20";

  const inputStyle = {
    backgroundColor: "var(--color-page-bg)",
    color: "var(--color-navy)",
  };

  return (
    <section
      style={{ backgroundColor: "var(--color-page-bg)" }}
      className="w-full pb-20 px-6"
      aria-label="Contact form"
    >
      <div className="max-w-4xl mx-auto">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          {/* Row 1 — First Name / Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="firstName"
                className="text-sm font-medium"
                style={{ color: "var(--color-navy)" }}
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={form.firstName}
                onChange={handleChange}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                className={inputBase}
                style={inputStyle}
              />
              {errors.firstName && (
                <p id="firstName-error" className="text-xs" style={{ color: "var(--color-crimson)" }}>
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="lastName"
                className="text-sm font-medium"
                style={{ color: "var(--color-navy)" }}
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={form.lastName}
                onChange={handleChange}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                className={inputBase}
                style={inputStyle}
              />
              {errors.lastName && (
                <p id="lastName-error" className="text-xs" style={{ color: "var(--color-crimson)" }}>
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Row 2 — Email / Goal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium"
                style={{ color: "var(--color-navy)" }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputBase}
                style={inputStyle}
              />
              {errors.email && (
                <p id="email-error" className="text-xs" style={{ color: "var(--color-crimson)" }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="goal"
                className="text-sm font-medium"
                style={{ color: "var(--color-navy)" }}
              >
                My main goal is to:
              </label>
              <select
                id="goal"
                name="goal"
                value={form.goal}
                onChange={handleChange}
                aria-describedby={errors.goal ? "goal-error" : undefined}
                className={inputBase}
                style={inputStyle}
              >
                <option value="" disabled />
                {GOAL_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.goal && (
                <p id="goal-error" className="text-xs" style={{ color: "var(--color-crimson)" }}>
                  {errors.goal}
                </p>
              )}
            </div>
          </div>

          {/* Row 3 — Message */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="message"
              className="text-sm font-medium"
              style={{ color: "var(--color-navy)" }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={form.message}
              onChange={handleChange}
              aria-describedby="message-counter message-error"
              className={`${inputBase} resize-y`}
              style={inputStyle}
            />
            <div className="flex items-center justify-between">
              <span
                id="message-counter"
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
                aria-live="polite"
              >
                {form.message.length}/{MAX_MESSAGE_LENGTH}
              </span>
              {errors.message && (
                <p id="message-error" className="text-xs" style={{ color: "var(--color-crimson)" }}>
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          {/* Success / Error banners */}
          {status === "success" && (
            <p
              role="status"
              className="rounded px-4 py-3 text-sm font-medium text-white"
              style={{ backgroundColor: "#1A7FA0" }}
            >
              Message sent! We&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="rounded px-4 py-3 text-sm font-medium text-white"
              style={{ backgroundColor: "var(--color-crimson)" }}
            >
              Something went wrong. Please try again or email us directly at{" "}
              <a href="mailto:shpe@stevens.edu" className="underline">
                shpe@stevens.edu
              </a>
              .
            </p>
          )}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-2.5 rounded text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90"
              style={{ backgroundColor: "#1A7FA0" }}
            >
              {status === "loading" ? "Sending…" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
