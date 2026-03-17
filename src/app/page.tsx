"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    icon: "⚡",
    title: "WordPress Development",
    description:
      "Custom themes, plugin integrations, WooCommerce builds, and performance-first websites designed to convert.",
  },
  {
    number: "02",
    icon: "🖥️",
    title: "Server Setup",
    description:
      "VPS and dedicated server configuration with Nginx, Apache, SSL, backups, monitoring, and hardening.",
  },
  {
    number: "03",
    icon: "✉️",
    title: "Business Email",
    description:
      "Domain mail setup for Google Workspace, Yandex 360, or cPanel with SPF, DKIM, and DMARC configured correctly.",
  },
  {
    number: "04",
    icon: "🎨",
    title: "Design From Scratch",
    description:
      "Interface design in Figma, from wireframes to polished, brand-specific layouts ready for development.",
  },
];

const skills = [
  { name: "HTML5 / CSS3", value: 95 },
  { name: "JavaScript", value: 85 },
  { name: "WordPress", value: 95 },
  { name: "Figma", value: 88 },
  { name: "Server / Linux", value: 80 },
];

const tools = [
  { icon: "🌐", name: "HTML5", tag: "Semantic markup" },
  { icon: "🎨", name: "CSS3", tag: "Animation and layout" },
  { icon: "⚡", name: "JavaScript", tag: "Interactive UI" },
  { icon: "🖋️", name: "Figma", tag: "UI and UX design" },
  { icon: "⬢", name: "WordPress", tag: "CMS delivery" },
  { icon: "🐧", name: "Linux", tag: "Server operations" },
];

const projects = [
  {
    icon: "🏁",
    tone: "projectImageOne",
    tags: ["WordPress", "WooCommerce", "Figma"],
    title: "E-Commerce Platform",
    description:
      "A custom online store with payment integration, account flows, and a sharper buying journey that improved conversions.",
  },
  {
    icon: "🏢",
    tone: "projectImageTwo",
    tags: ["WordPress", "Business Email", "VPS"],
    title: "Corporate Website",
    description:
      "A business site paired with server setup, company mail, and CRM-ready infrastructure for a cleaner internal workflow.",
  },
  {
    icon: "🌿",
    tone: "projectImageThree",
    tags: ["HTML/CSS/JS", "Figma", "Motion"],
    title: "Landing Page",
    description:
      "A high-speed animated landing page built from scratch with pixel-accurate implementation and strong page performance.",
  },
];

const stats = [
  { number: "50+", label: "Projects Done" },
  { number: "3+", label: "Years Experience" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "24h", label: "Response Time" },
];

const contacts = [
  {
    href: "https://wa.me/994XXXXXXXXX",
    className: "contactCard whatsapp",
    icon: "💬",
    label: "WhatsApp",
    value: "+994 XX XXX XX XX",
  },
  {
    href: "https://t.me/yourusername",
    className: "contactCard telegram",
    icon: "✈️",
    label: "Telegram",
    value: "@yourusername",
  },
  {
    href: "mailto:hello@yourdomain.com",
    className: "contactCard email",
    icon: "📧",
    label: "Email",
    value: "hello@yourdomain.com",
  },
];

export default function Home() {
  const [isSent, setIsSent] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const ringPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const revealed = new Set<Element>();
    const animatedBars = new Set<Element>();

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${event.clientX - 6}px, ${event.clientY - 6}px)`;
      }
    };

    let frame = 0;
    const animateRing = () => {
      ringPosition.current = {
        x: ringPosition.current.x + (mousePosition.current.x - ringPosition.current.x) * 0.12,
        y: ringPosition.current.y + (mousePosition.current.y - ringPosition.current.y) * 0.12,
      };
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosition.current.x - 18}px, ${ringPosition.current.y - 18}px)`;
      }
      frame = window.requestAnimationFrame(animateRing);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting || revealed.has(entry.target)) {
            return;
          }

          window.setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 80);
          revealed.add(entry.target);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || animatedBars.has(entry.target)) {
            return;
          }

          const width = entry.target.getAttribute("data-width");
          window.setTimeout(() => {
            (entry.target as HTMLElement).style.width = `${width}%`;
          }, 300);
          animatedBars.add(entry.target);
          barObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      revealObserver.observe(element);
    });

    document.querySelectorAll<HTMLElement>(".skillFill").forEach((element) => {
      barObserver.observe(element);
    });

    window.addEventListener("mousemove", handleMouseMove);
    frame = window.requestAnimationFrame(animateRing);

    return () => {
      revealObserver.disconnect();
      barObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isSent) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsSent(false);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [isSent]);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursorRing" ref={ringRef} />

      <nav className="siteNav">
        <div className="navLogo">
          &lt;<span>dev</span>/&gt;
        </div>
        <ul className="navLinks">
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <a href="#contact" className="navCta">
          Hire Me
        </a>
      </nav>

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
              design.
              <br />
              From concept to launch, every detail is built to support your
              brand.
            </p>
            <div className="heroButtons">
              <a href="#projects" className="buttonPrimary">
                View Work
              </a>
              <a href="#contact" className="buttonSecondary">
                Get In Touch
              </a>
            </div>
          </div>
          <div className="heroScroll">
            <div className="scrollLine" />
            Scroll down
          </div>
        </section>

        <section className="servicesSection" id="services">
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

        <section className="skillsSection" id="skills">
          <div className="skillsLayout">
            <div className="skillsText">
              <p className="sectionLabel reveal">{"// Tech Stack"}</p>
              <h2 className="sectionTitle reveal">
                Skills and
                <br />
                Tools
              </h2>
              <p className="skillsLead reveal">
                I build modern websites that balance aesthetics, speed, and
                maintainability. Design, development, and deployment stay in one
                workflow instead of being split across multiple contractors.
              </p>
              <div className="skillsList reveal">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="skillHeader">
                      <span className="skillName">{skill.name}</span>
                      <span className="skillPercent">{skill.value}%</span>
                    </div>
                    <div className="skillBar">
                      <div
                        className="skillFill"
                        data-width={skill.value}
                        aria-hidden="true"
                      />
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
        </section>

        <section className="projectsSection" id="projects">
          <p className="sectionLabel reveal">{"// Portfolio"}</p>
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
                  <a href="#contact" className="projectLink">
                    Start a Similar Project →
                  </a>
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

        <section className="contactSection" id="contact">
          <div className="contactLayout">
            <div className="contactText">
              <p className="sectionLabel reveal">{"// Get In Touch"}</p>
              <h2 className="sectionTitle reveal">
                Let&apos;s Work
                <br />
                Together
              </h2>
              <p className="contactLead reveal">
                If you need a website, landing page, server setup, or a cleaner
                digital presence, send a message through the channel that suits
                you best.
              </p>
              <div className="contactMethods reveal">
                {contacts.map((contact) => (
                  <a
                    href={contact.href}
                    key={contact.label}
                    className={contact.className}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      contact.href.startsWith("http")
                        ? "noreferrer noopener"
                        : undefined
                    }
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

            <div className="contactForm reveal">
              <h3 className="formTitle">Send a Message</h3>
              <div className="formGroup">
                <label className="formLabel" htmlFor="name">
                  Your Name
                </label>
                <input id="name" type="text" className="formInput" placeholder="John Doe" />
              </div>
              <div className="formGroup">
                <label className="formLabel" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="formInput"
                  placeholder="john@example.com"
                />
              </div>
              <div className="formGroup">
                <label className="formLabel" htmlFor="projectType">
                  Project Type
                </label>
                <input
                  id="projectType"
                  type="text"
                  className="formInput"
                  placeholder="Website, landing page, server setup..."
                />
              </div>
              <div className="formGroup">
                <label className="formLabel" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  className="formTextarea"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="button"
                className={`formButton ${isSent ? "sent" : ""}`}
                onClick={() => setIsSent(true)}
              >
                {isSent ? "Sent! ✓" : "Send Message →"}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <p className="footerCopy">
          © 2026 <span>&lt;dev/&gt;</span> All rights reserved
        </p>
        <div className="footerLinks">
          <a href="#services">Services</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </>
  );
}
