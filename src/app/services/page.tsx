import type { Metadata } from "next";
import Link from "next/link";
import { serviceOutcomes, servicePackages, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services | Web Developer",
  description: "Development, server setup, business email, and design services.",
};

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Scope, priorities, audience, and goals are defined before design or code starts.",
  },
  {
    number: "02",
    title: "Design Direction",
    description: "The visual language and page structure are aligned to the brand and conversion goal.",
  },
  {
    number: "03",
    title: "Implementation",
    description: "Frontend, CMS, or infrastructure work is delivered with performance and maintainability in mind.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Deployment, final checks, and handoff are completed so the site is ready for production.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="pageHero">
        <p className="sectionLabel reveal">{"// Services"}</p>
        <h1 className="pageTitle reveal">Solutions for launch, growth, and stability</h1>
        <p className="pageLead reveal">
          Each service is presented as a distinct offer with a clearer delivery
          shape, so this page reads more like a sales deck than a generic list.
        </p>
      </section>

      <section className="pageSection">
        <div className="pageIntroBand reveal">
          <div className="introBandCopy">
            <p className="sectionLabel">{"// Positioning"}</p>
            <h2 className="sectionTitle">Built for businesses that need clarity, speed, and clean execution</h2>
          </div>
          <div className="bulletStack">
            {serviceOutcomes.map((item) => (
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
          {servicePackages.map((item) => (
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
          {processSteps.map((step) => (
            <article className="featureCard" key={step.number}>
              <div className="featureMeta">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="contentStrip reveal">
          <div className="contentCard">
            <p className="sectionLabel">{"// Delivery"}</p>
            <h3>What is included</h3>
            <p>
              Planning, execution, launch support, and the technical cleanup needed
              to hand over a stable result instead of a fragile prototype.
            </p>
          </div>
          <div className="contentCard">
            <p className="sectionLabel">{"// Next Step"}</p>
            <h3>Need a quote?</h3>
            <p>
              If the scope is already clear, move to the contact page and send the
              project requirements directly.
            </p>
            <Link href="/contact" className="inlineAction">
              Start inquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
