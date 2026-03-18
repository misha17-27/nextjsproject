import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/site-content";

type ProjectPageProps = {
  params: Promise<{ category: string; project: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { category, project } = await params;
  const content = await getSiteContent();
  const categoryItem = content.projectsPage.categories.find((entry) => entry.slug === category);
  const projectItem = categoryItem?.demos.find((entry) => entry.slug === project);

  if (!projectItem) {
    return { title: "Project" };
  }

  return {
    title: `${projectItem.title} | ${categoryItem?.title ?? "Projects"}`,
    description: projectItem.description,
  };
}

export async function generateStaticParams() {
  const content = await getSiteContent();
  return content.projectsPage.categories.flatMap((category) =>
    category.demos.map((project) => ({
      category: category.slug,
      project: project.slug,
    })),
  );
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { category, project } = await params;
  const content = await getSiteContent();
  const categoryItem = content.projectsPage.categories.find((entry) => entry.slug === category);
  const projectItem = categoryItem?.demos.find((entry) => entry.slug === project);

  if (!categoryItem || !projectItem) {
    notFound();
  }

  return (
    <main>
      <section className="pageHero">
        <p className="sectionLabel reveal">{categoryItem.title}</p>
        <h1 className="pageTitle reveal">{projectItem.title}</h1>
        <p className="pageLead reveal">{projectItem.subtitle}</p>
      </section>

      <section className="pageSection">
        <div className="projectDetailHero reveal">
          <div className="projectDetailImage">
            <Image src={projectItem.image} alt={projectItem.title} fill sizes="100vw" />
          </div>
        </div>
      </section>

      <section className="pageSection">
        <div className="contentStrip reveal">
          <article className="contentCard">
            <p className="sectionLabel">Overview</p>
            <h3>{projectItem.title}</h3>
            <p>{projectItem.description}</p>
          </article>
          <article className="contentCard">
            <p className="sectionLabel">Result</p>
            <h3>Project outcome</h3>
            <p>{projectItem.result}</p>
          </article>
        </div>

        <div className="projectDetailMeta reveal">
          <div className="projectTags">
            {projectItem.services.map((service) => (
              <span className="projectTag" key={service}>
                {service}
              </span>
            ))}
          </div>
          <div className="projectDetailActions">
            <Link href={`/projects/${categoryItem.slug}`} className="buttonSecondary">
              Back to category
            </Link>
            <Link href="/contact" className="buttonPrimary">
              Start similar project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
