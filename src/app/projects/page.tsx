import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Projects | Web Developer",
  description: "Selected projects and delivery outcomes.",
};

export default async function ProjectsPage() {
  const content = await getSiteContent();
  const { projects, stats } = content.collections;
  const page = content.projectsPage;

  return (
    <main>
      <section className="pageHero">
        <p className="sectionLabel reveal">{page.heroTag}</p>
        <h1 className="pageTitle reveal">{page.heroTitle}</h1>
        <p className="pageLead reveal">{page.heroLead}</p>
      </section>

      <section className="pageSection">
        <div className="signalGrid reveal">
          {page.signals.map((item) => (
            <article className="signalCard" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="projectsSection">
        <div className="projectsGrid reveal">
          {projects.map((project) => (
            <article className="projectCard" key={project.title}>
              <div className={`projectImage ${project.tone}`}>
                <div className="projectOverlay" />
                {project.icon}
              </div>
              <div className="projectBody">
                <div className="projectTags">
                  {project.tags.map((tag) => (
                    <span className="projectTag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="projectName">{project.title}</h2>
                <p className="projectDescription">{project.description}</p>
                <Link href="/contact" className="projectLink">
                  {page.projectCta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="featureGrid reveal">
          {page.stories.map((item, index) => (
            <article className="featureCard storyCard" key={item.name}>
              <div className="featureMeta">{`0${index + 1}`}</div>
              <h3>{item.name}</h3>
              <p><strong>Challenge:</strong> {item.challenge}</p>
              <p><strong>Solution:</strong> {item.solution}</p>
              <p><strong>Result:</strong> {item.result}</p>
            </article>
          ))}
        </div>

        <div className="quotePanel reveal">
          <p className="sectionLabel">{page.quoteTag}</p>
          <h2 className="sectionTitle">{page.quoteTitle}</h2>
          <p className="pageLead">{page.quoteLead}</p>
          <Link href="/contact" className="buttonPrimary">
            {page.quoteCta}
          </Link>
        </div>
      </section>

      <section className="statsGrid">
        {stats.map((stat) => (
          <article className="statCard reveal" key={stat.label}>
            <div className="statNumber">{stat.number}</div>
            <div className="statLabel">{stat.label}</div>
          </article>
        ))}
      </section>
    </main>
  );
}
