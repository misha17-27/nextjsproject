import type { Metadata } from "next";
import { skillGroups, skills, tools, workPrinciples } from "@/data/site";

export const metadata: Metadata = {
  title: "Skills | Web Developer",
  description: "Technical stack, tools, and working strengths.",
};

export default function SkillsPage() {
  return (
    <main>
      <section className="pageHero">
        <p className="sectionLabel reveal">{"// Skills"}</p>
        <h1 className="pageTitle reveal">Modern stack, practical delivery</h1>
        <p className="pageLead reveal">
          This page is structured to show technical confidence, not just logos.
          It explains what the stack is used for and how it supports delivery.
        </p>
      </section>

      <section className="pageSection">
        <div className="pageIntroBand reveal">
          <div className="introBandCopy">
            <p className="sectionLabel">{"// Workflow"}</p>
            <h2 className="sectionTitle">Design, build, and launch stay inside one process</h2>
          </div>
          <div className="signalGrid">
            <div className="signalCard">
              <span>Approach</span>
              <strong>End-to-end</strong>
            </div>
            <div className="signalCard">
              <span>Priority</span>
              <strong>Maintainable</strong>
            </div>
            <div className="signalCard">
              <span>Output</span>
              <strong>Launch ready</strong>
            </div>
          </div>
        </div>

        <div className="skillsLayout">
          <div className="skillsText">
            <p className="sectionLabel reveal">{"// Core Strengths"}</p>
            <h2 className="sectionTitle reveal">Technical confidence</h2>
            <p className="skillsLead reveal">
              Design, development, and deployment stay inside one process instead of
              being split across disconnected specialists.
            </p>
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
          {skillGroups.map((area, index) => (
            <article className="featureCard" key={area.title}>
              <div className="featureMeta">{`0${index + 1}`}</div>
              <h3>{area.title}</h3>
              <p>{area.body}</p>
            </article>
          ))}
        </div>

        <div className="contentStrip reveal topGap">
          {workPrinciples.map((item) => (
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
