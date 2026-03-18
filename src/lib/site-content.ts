import { promises as fs } from "node:fs";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";

export type NavItem = { href: string; label: string };
export type Service = { number: string; icon: string; title: string; description: string };
export type Skill = { name: string; value: number };
export type Tool = { icon: string; name: string; tag: string };
export type Project = {
  icon: string;
  tone: string;
  image?: string;
  tags: string[];
  title: string;
  description: string;
};
export type ProjectDemo = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  services: string[];
  result: string;
};
export type ProjectCategory = {
  slug: string;
  icon: string;
  tone: string;
  title: string;
  summary: string;
  coverImage: string;
  demos: ProjectDemo[];
};
export type Stat = { number: string; label: string };
export type Contact = {
  href: string;
  className: string;
  icon: string;
  label: string;
  value: string;
};

export type SiteContent = {
  navigation: NavItem[];
  footer: { brand: string; copy: string; suffix: string };
  collections: {
    services: Service[];
    skills: Skill[];
    tools: Tool[];
    projects: Project[];
    stats: Stat[];
    contacts: Contact[];
  };
  home: {
    heroTag: string;
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroDescription: string;
    primaryCta: string;
    secondaryCta: string;
    scrollLabel: string;
    sectionsLabel: string;
    sectionsTitle: string;
    sectionCards: Array<{ number: string; title: string; description: string; href: string }>;
    servicesLabel: string;
    servicesTitle: string;
    projectsLabel: string;
    projectsTitle: string;
    projectCta: string;
  };
  servicesPage: {
    heroTag: string;
    heroTitle: string;
    heroLead: string;
    introTag: string;
    introTitle: string;
    outcomes: string[];
    packages: Array<{
      name: string;
      price: string;
      summary: string;
      items: string[];
    }>;
    processSteps: Array<{ number: string; title: string; description: string }>;
    deliveryTag: string;
    deliveryTitle: string;
    deliveryBody: string;
    nextTag: string;
    nextTitle: string;
    nextBody: string;
    nextCta: string;
  };
  skillsPage: {
    heroTag: string;
    heroTitle: string;
    heroLead: string;
    workflowTag: string;
    workflowTitle: string;
    signals: Array<{ label: string; value: string }>;
    coreTag: string;
    coreTitle: string;
    coreLead: string;
    groups: Array<{ title: string; body: string }>;
    principles: Array<{ title: string; body: string }>;
  };
  projectsPage: {
    heroTag: string;
    heroTitle: string;
    heroLead: string;
    signals: Array<{ label: string; value: string }>;
    projectCta: string;
    categoryLead: string;
    categories: ProjectCategory[];
    stories: Array<{ name: string; challenge: string; solution: string; result: string }>;
    quoteTag: string;
    quoteTitle: string;
    quoteLead: string;
    quoteCta: string;
  };
  contactPage: {
    heroTag: string;
    heroTitle: string;
    heroLead: string;
    channelsTag: string;
    channelsTitle: string;
    channelsLead: string;
    promises: string[];
    faqs: Array<{ question: string; answer: string }>;
    form: {
      title: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      projectTypeLabel: string;
      projectTypePlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitLabel: string;
      sentLabel: string;
    };
  };
};

const contentFilePath = path.join(process.cwd(), "content", "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  noStore();
  const file = await fs.readFile(contentFilePath, "utf8");
  return JSON.parse(file) as SiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const serialized = `${JSON.stringify(content, null, 2)}\n`;
  await fs.writeFile(contentFilePath, serialized, "utf8");
}
