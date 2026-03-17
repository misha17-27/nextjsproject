"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/site-content";

type ContactFormProps = {
  form: SiteContent["contactPage"]["form"];
};

export function ContactForm({ form }: ContactFormProps) {
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (!isSent) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsSent(false);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [isSent]);

  return (
    <div className="contactForm reveal">
      <h3 className="formTitle">{form.title}</h3>
      <div className="formGroup">
        <label className="formLabel" htmlFor="name">
          {form.nameLabel}
        </label>
        <input id="name" type="text" className="formInput" placeholder={form.namePlaceholder} />
      </div>
      <div className="formGroup">
        <label className="formLabel" htmlFor="email">
          {form.emailLabel}
        </label>
        <input id="email" type="email" className="formInput" placeholder={form.emailPlaceholder} />
      </div>
      <div className="formGroup">
        <label className="formLabel" htmlFor="projectType">
          {form.projectTypeLabel}
        </label>
        <input
          id="projectType"
          type="text"
          className="formInput"
          placeholder={form.projectTypePlaceholder}
        />
      </div>
      <div className="formGroup">
        <label className="formLabel" htmlFor="message">
          {form.messageLabel}
        </label>
        <textarea id="message" className="formTextarea" placeholder={form.messagePlaceholder} />
      </div>
      <button
        type="button"
        className={`formButton ${isSent ? "sent" : ""}`}
        onClick={() => setIsSent(true)}
      >
        {isSent ? form.sentLabel : form.submitLabel}
      </button>
    </div>
  );
}
