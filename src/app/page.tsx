import Link from "next/link";
import { projects, services, stats } from "@/data/site";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="heroGlow" />
        <div className="heroGlowSecondary" />
        <div className="heroContent">
          <p className="heroTag">{"// Web Developer and Designer"}</p>
          <h1 className="heroTitle">
            Building Sites
            <br />
            <span>That Convert.</span>
          </h1>
          <p className="heroDescription">
            WordPress development, server setup, business email, and bespoke
            design. From concept to launch, every detail is built to support your
            brand.
          </p>
          <div className="heroButtons">
            <Link href="/projects" className="buttonPrimary">
              View Work
            </Link>
            <Link href="/contact" className="buttonSecondary">
              Get In Touch
            </Link>
          </div>
        </div>
        <div className="heroScroll">
          <div className="scrollLine" />
          Explore pages
        </div>
      </section>

      <section className="pageSection">
        <p className="sectionLabel reveal">{"// Website Sections"}</p>
        <h2 className="sectionTitle reveal">Separate pages for every key area</h2>
        <div className="featureGrid reveal">
          <Link href="/services" className="featureCard">
            <div className="featureMeta">01</div>
            <h3>Services</h3>
            <p>Dedicated page for delivery areas, infrastructure work, and design support.</p>
          </Link>
          <Link href="/skills" className="featureCard">
            <div className="featureMeta">02</div>
            <h3>Skills</h3>
            <p>Separate route for stack overview, strengths, and supporting tools.</p>
          </Link>
          <Link href="/projects" className="featureCard">
            <div className="featureMeta">03</div>
            <h3>Projects</h3>
            <p>Focused portfolio page instead of mixing all project content into the homepage.</p>
          </Link>
          <Link href="/contact" className="featureCard">
            <div className="featureMeta">04</div>
            <h3>Contact</h3>
            <p>Direct route for communication channels and project inquiries.</p>
          </Link>
        </div>
      </section>

      <section className="servicesSection">
        <p className="sectionLabel reveal">{"// What I Do"}</p>
        <h2 className="sectionTitle reveal">Services</h2>
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
        <p className="sectionLabel reveal">{"// Featured Work"}</p>
        <h2 className="sectionTitle reveal">Recent Projects</h2>
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
                  Start a Similar Project
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
