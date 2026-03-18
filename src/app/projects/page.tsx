import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Projects | Web Developer",
  description: "Selected projects and delivery outcomes.",
};

export default async function ProjectsPage() {
  const content = await getSiteContent();
  const { stats } = content.collections;
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
        <div className="projectsPageIntro reveal">
          <p className="pageLead">{page.categoryLead}</p>
        </div>
        <div className="projectsGrid reveal">
          {page.categories.map((category) => (
            <Link href={`/projects/${category.slug}`} className="projectCard categoryCard clickableProjectCard" key={category.slug}>
              <div className="projectImage categoryImage">
                <Image src={category.coverImage} alt={category.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
                <div className="projectOverlay" />
              </div>
              <div className="projectBody">
                <div className="projectTags">
                  <span className="projectTag">{category.icon}</span>
                  <span className="projectTag">{`${category.demos.length} demos`}</span>
                </div>
                <h2 className="projectName">{category.title}</h2>
                <p className="projectDescription">{category.summary}</p>
                <span className="projectLink">
                  View category
                </span>
              </div>
            </Link>
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
