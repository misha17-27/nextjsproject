"use client";

import { useEffect, useState } from "react";

export function ContactForm() {
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
      <h3 className="formTitle">Send a Message</h3>
      <div className="formGroup">
        <label className="formLabel" htmlFor="name">
          Your Name
        </label>
        <input id="name" type="text" className="formInput" placeholder="John Doe" />
      </div>
      <div className="formGroup">
        <label className="formLabel" htmlFor="email">
          Email
        </label>
        <input id="email" type="email" className="formInput" placeholder="john@example.com" />
      </div>
      <div className="formGroup">
        <label className="formLabel" htmlFor="projectType">
          Project Type
        </label>
        <input
          id="projectType"
          type="text"
          className="formInput"
          placeholder="Website, landing page, server setup..."
        />
      </div>
      <div className="formGroup">
        <label className="formLabel" htmlFor="message">
          Message
        </label>
        <textarea id="message" className="formTextarea" placeholder="Tell me about your project..." />
      </div>
      <button
        type="button"
        className={`formButton ${isSent ? "sent" : ""}`}
        onClick={() => setIsSent(true)}
      >
        {isSent ? "Sent!" : "Send Message"}
      </button>
    </div>
  );
}
