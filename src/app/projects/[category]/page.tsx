import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/site-content";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const content = await getSiteContent();
  const item = content.projectsPage.categories.find((entry) => entry.slug === category);

  if (!item) {
    return { title: "Projects" };
  }

  return {
    title: `${item.title} | Projects`,
    description: item.summary,
  };
}

export async function generateStaticParams() {
  const content = await getSiteContent();
  return content.projectsPage.categories.map((category) => ({ category: category.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const content = await getSiteContent();
  const item = content.projectsPage.categories.find((entry) => entry.slug === category);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <section className="pageHero">
        <p className="sectionLabel reveal">Project Category</p>
        <h1 className="pageTitle reveal">{item.title}</h1>
        <p className="pageLead reveal">{item.summary}</p>
      </section>

      <section className="pageSection">
        <div className="categoryHeroCard reveal">
          <div className="categoryHeroMedia">
            <Image src={item.coverImage} alt={item.title} fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="categoryHeroCopy">
            <p className="sectionLabel">Category Focus</p>
            <h2 className="sectionTitle">Demo builds inside this direction</h2>
            <p className="pageLead">
              Each demo project below shows a different direction inside the same category, so you can open a project and review visual examples with a dedicated image.
            </p>
          </div>
        </div>
      </section>

      <section className="projectsSection">
        <div className="projectsGrid reveal">
          {item.demos.map((demo) => (
            <Link href={`/projects/${item.slug}/${demo.slug}`} className="projectCard demoProjectCard clickableProjectCard" key={demo.slug}>
              <div className="projectImage demoProjectImage">
                <Image src={demo.image} alt={demo.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="projectBody">
                <div className="projectTags">
                  {demo.services.map((service) => (
                    <span className="projectTag" key={service}>
                      {service}
                    </span>
                  ))}
                </div>
                <h2 className="projectName">{demo.title}</h2>
                <p className="projectDescription">{demo.subtitle}</p>
                <span className="projectLink">
                  Open demo project
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
