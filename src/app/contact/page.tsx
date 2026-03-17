import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { contactFaqs, contactPromises, contacts } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact | Web Developer",
  description: "Contact page for project inquiries and direct communication.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="pageHero">
        <p className="sectionLabel reveal">{"// Contact"}</p>
        <h1 className="pageTitle reveal">Start the conversation</h1>
        <p className="pageLead reveal">
          This page is designed to be shareable on its own: concise, direct, and
          clear about what happens after the first message.
        </p>
      </section>

      <section className="contactSection">
        <div className="contactLayout">
          <div className="contactText">
            <p className="sectionLabel reveal">{"// Channels"}</p>
            <h2 className="sectionTitle reveal">Reach me where it is easiest</h2>
            <p className="contactLead reveal">
              For quick communication, direct channels work best. For structured
              requests, use the form and describe the project clearly.
            </p>
            <div className="bulletStack reveal">
              {contactPromises.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <div className="contactMethods reveal">
              {contacts.map((contact) => (
                <a
                  href={contact.href}
                  key={contact.label}
                  className={contact.className}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noreferrer noopener" : undefined}
                >
                  <div className="contactIcon">{contact.icon}</div>
                  <div>
                    <div className="contactLabel">{contact.label}</div>
                    <div className="contactValue">{contact.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="pageSection">
        <div className="contentStrip reveal">
          {contactFaqs.map((item) => (
            <article className="contentCard" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
