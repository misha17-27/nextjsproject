import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact | Web Developer",
  description: "Contact page for project inquiries and direct communication.",
};

export default async function ContactPage() {
  const content = await getSiteContent();
  const { contacts } = content.collections;
  const page = content.contactPage;

  return (
    <main>
      <section className="pageHero">
        <p className="sectionLabel reveal">{page.heroTag}</p>
        <h1 className="pageTitle reveal">{page.heroTitle}</h1>
        <p className="pageLead reveal">{page.heroLead}</p>
      </section>

      <section className="contactSection">
        <div className="contactLayout">
          <div className="contactText">
            <p className="sectionLabel reveal">{page.channelsTag}</p>
            <h2 className="sectionTitle reveal">{page.channelsTitle}</h2>
            <p className="contactLead reveal">{page.channelsLead}</p>
            <div className="bulletStack reveal">
              {page.promises.map((item) => (
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

          <ContactForm form={page.form} />
        </div>
      </section>

      <section className="pageSection">
        <div className="contentStrip reveal">
          {page.faqs.map((item) => (
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
