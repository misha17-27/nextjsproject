import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Skills | Web Developer",
  description: "Technical stack, tools, and working strengths.",
};

export default async function SkillsPage() {
  const content = await getSiteContent();
  const { skills, tools } = content.collections;
  const page = content.skillsPage;

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
            <p className="sectionLabel">{page.workflowTag}</p>
            <h2 className="sectionTitle">{page.workflowTitle}</h2>
          </div>
          <div className="signalGrid">
            {page.signals.map((signal) => (
              <div className="signalCard" key={signal.label}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="skillsLayout">
          <div className="skillsText">
            <p className="sectionLabel reveal">{page.coreTag}</p>
            <h2 className="sectionTitle reveal">{page.coreTitle}</h2>
            <p className="skillsLead reveal">{page.coreLead}</p>
            <div className="skillsList reveal">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="skillHeader">
                    <span className="skillName">{skill.name}</span>
                    <span className="skillPercent">{skill.value}%</span>
                  </div>
                  <div className="skillBar">
                    <div className="skillFill" data-width={skill.value} aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="toolsGrid reveal">
            {tools.map((tool) => (
              <article className="toolCard" key={tool.name}>
                <div className="toolBackground" />
                <div className="toolIcon">{tool.icon}</div>
                <div className="toolName">{tool.name}</div>
                <div className="toolTag">{tool.tag}</div>
              </article>
            ))}
          </div>
        </div>

        <div className="featureGrid reveal topGap">
          {page.groups.map((area, index) => (
            <article className="featureCard" key={area.title}>
              <div className="featureMeta">{`0${index + 1}`}</div>
              <h3>{area.title}</h3>
              <p>{area.body}</p>
            </article>
          ))}
        </div>

        <div className="contentStrip reveal topGap">
          {page.principles.map((item) => (
            <article className="contentCard" key={item.title}>
              <p className="sectionLabel">{"// Principle"}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
