import type { Metadata } from "next";
import Link from "next/link";
import { projectSignals, projects, projectStories, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects | Web Developer",
  description: "Selected projects and delivery outcomes.",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="pageHero">
        <p className="sectionLabel reveal">{"// Projects"}</p>
        <h1 className="pageTitle reveal">Selected work built for business results</h1>
        <p className="pageLead reveal">
          The portfolio page is designed to feel like a proper case-study index:
          outcomes first, visual proof second, and enough context to make the work credible.
        </p>
      </section>

      <section className="pageSection">
        <div className="signalGrid reveal">
          {projectSignals.map((item) => (
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
                  Discuss a project
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="featureGrid reveal">
          {projectStories.map((item, index) => (
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
          <p className="sectionLabel">{"// Intent"}</p>
          <h2 className="sectionTitle">The goal is not to show volume. It is to show decision quality.</h2>
          <p className="pageLead">
            Every case is framed around what changed for the business: clearer messaging,
            better structure, stronger presentation, or cleaner technical execution.
          </p>
          <Link href="/contact" className="buttonPrimary">
            Build the next case
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
