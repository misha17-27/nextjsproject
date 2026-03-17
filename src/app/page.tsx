import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

export default async function HomePage() {
  const content = await getSiteContent();
  const { home } = content;
  const { projects, services, stats } = content.collections;

  return (
    <main>
      <section className="hero">
        <div className="heroGlow" />
        <div className="heroGlowSecondary" />
        <div className="heroContent">
          <p className="heroTag">{home.heroTag}</p>
          <h1 className="heroTitle">
            {home.heroTitleLine1}
            <br />
            <span>{home.heroTitleLine2}</span>
          </h1>
          <p className="heroDescription">{home.heroDescription}</p>
          <div className="heroButtons">
            <Link href="/projects" className="buttonPrimary">
              {home.primaryCta}
            </Link>
            <Link href="/contact" className="buttonSecondary">
              {home.secondaryCta}
            </Link>
          </div>
        </div>
        <div className="heroScroll">
          <div className="scrollLine" />
          {home.scrollLabel}
        </div>
      </section>

      <section className="pageSection">
        <p className="sectionLabel reveal">{home.sectionsLabel}</p>
        <h2 className="sectionTitle reveal">{home.sectionsTitle}</h2>
        <div className="featureGrid reveal">
          {home.sectionCards.map((card) => (
            <Link href={card.href} className="featureCard" key={card.href}>
              <div className="featureMeta">{card.number}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="servicesSection">
        <p className="sectionLabel reveal">{home.servicesLabel}</p>
        <h2 className="sectionTitle reveal">{home.servicesTitle}</h2>
        <div className="servicesGrid reveal">
          {services.map((service) => (
            <article className="serviceCard" key={service.title}>
              <div className="serviceNumber">{service.number}</div>
              <span className="serviceIcon">{service.icon}</span>
              <h3 className="serviceName">{service.title}</h3>
              <p className="serviceDescription">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="projectsSection">
        <p className="sectionLabel reveal">{home.projectsLabel}</p>
        <h2 className="sectionTitle reveal">{home.projectsTitle}</h2>
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
                <h3 className="projectName">{project.title}</h3>
                <p className="projectDescription">{project.description}</p>
                <Link href="/contact" className="projectLink">
                  {home.projectCta}
                </Link>
              </div>
            </article>
          ))}
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
