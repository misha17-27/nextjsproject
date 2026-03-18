"use client";

import { useEffect, useState } from "react";

export function HireModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSubmit = () => {
    setIsSent(true);
    window.setTimeout(() => {
      setIsSent(false);
      setIsOpen(false);
      setName("");
      setPhone("");
      setEmail("");
    }, 1500);
  };

  return (
    <>
      <button type="button" className="navCta" onClick={() => setIsOpen(true)}>
        Hire Me
      </button>

      {isOpen ? (
        <div className="hireModalOverlay" onClick={() => setIsOpen(false)} role="presentation">
          <div className="hireModal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Hire me form">
            <button type="button" className="hireModalClose" onClick={() => setIsOpen(false)} aria-label="Close">
              ×
            </button>

            <div className="hireModalArt" aria-hidden="true">
              <div className="hireModalCup">
                <div className="hireModalCoffee" />
              </div>
            </div>

            <div className="hireModalContent">
              <p className="hireModalEyebrow">Contact us</p>
              <h2 className="hireModalTitle">Let&apos;s talk about your project</h2>

              <div className="hireModalField">
                <label htmlFor="hire-name">Your name</label>
                <input id="hire-name" value={name} onChange={(event) => setName(event.target.value)} />
              </div>

              <div className="hireModalField">
                <label htmlFor="hire-phone">Your phone</label>
                <input id="hire-phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
              </div>

              <div className="hireModalField">
                <label htmlFor="hire-email">Your email address</label>
                <input id="hire-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>

              <button type="button" className={`hireModalSubmit ${isSent ? "sent" : ""}`} onClick={handleSubmit}>
                {isSent ? "Sent" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
