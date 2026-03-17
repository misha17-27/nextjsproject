import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Services | Web Developer",
  description: "Development, server setup, business email, and design services.",
};

export default async function ServicesPage() {
  const content = await getSiteContent();
  const { services } = content.collections;
  const page = content.servicesPage;

  return (
    <main>
      <section className="pageHero">
        <p className="sectionLabel reveal">{page.heroTag}</p>
        <h1 className="pageTitle reveal">{page.heroTitle}</h1>
        <p className="pageLead reveal">{page.heroLead}</p>
      </section>

      <section className="pageSection">
        <div className="pageIntroBand reveal">
          <div className="introBandCopy">
            <p className="sectionLabel">{page.introTag}</p>
            <h2 className="sectionTitle">{page.introTitle}</h2>
          </div>
          <div className="bulletStack">
            {page.outcomes.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div className="servicesGrid reveal">
          {services.map((service) => (
            <article className="serviceCard" key={service.title}>
              <div className="serviceNumber">{service.number}</div>
              <span className="serviceIcon">{service.icon}</span>
              <h2 className="serviceName">{service.title}</h2>
              <p className="serviceDescription">{service.description}</p>
            </article>
          ))}
        </div>

        <div className="pricingGrid reveal topGap">
          {page.packages.map((item) => (
            <article className="pricingCard" key={item.name}>
              <p className="pricingName">{item.name}</p>
              <div className="pricingPrice">{item.price}</div>
              <p className="pricingSummary">{item.summary}</p>
              <div className="bulletStack compact">
                {item.items.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="featureGrid reveal topGap">
          {page.processSteps.map((step) => (
            <article className="featureCard" key={step.number}>
              <div className="featureMeta">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="contentStrip reveal">
          <div className="contentCard">
            <p className="sectionLabel">{page.deliveryTag}</p>
            <h3>{page.deliveryTitle}</h3>
            <p>{page.deliveryBody}</p>
          </div>
          <div className="contentCard">
            <p className="sectionLabel">{page.nextTag}</p>
            <h3>{page.nextTitle}</h3>
            <p>{page.nextBody}</p>
            <Link href="/contact" className="inlineAction">
              {page.nextCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
