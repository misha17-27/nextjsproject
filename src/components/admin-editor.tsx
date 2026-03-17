"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import type { Contact, NavItem, Project, Service, SiteContent, Skill, Stat, Tool } from "@/lib/site-content";

type SectionKey =
  | "home"
  | "servicesPage"
  | "skillsPage"
  | "projectsPage"
  | "contactPage"
  | "collections"
  | "navigation"
  | "footer";

type AdminEditorProps = { initialContent: SiteContent };

function SidebarIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="adminSectionSvg">
      {children}
    </svg>
  );
}

const sectionMeta: Array<{ key: SectionKey; label: string; icon: ReactNode }> = [
  {
    key: "home",
    label: "Home",
    icon: <SidebarIcon><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></SidebarIcon>,
  },
  {
    key: "servicesPage",
    label: "Services",
    icon: <SidebarIcon><rect x="4" y="5" width="16" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M8 9h8M8 12h8M8 15h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SidebarIcon>,
  },
  {
    key: "skillsPage",
    label: "Skills",
    icon: <SidebarIcon><path d="M6 17 10 13l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 5v14h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></SidebarIcon>,
  },
  {
    key: "projectsPage",
    label: "Projects",
    icon: <SidebarIcon><rect x="4" y="5" width="16" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m8 14 2.5-2.5L13 14l2-2 3 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="9" r="1.4" fill="currentColor" /></SidebarIcon>,
  },
  {
    key: "contactPage",
    label: "Contact",
    icon: <SidebarIcon><path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 16.5z" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m6.5 8.5 5.5 4 5.5-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></SidebarIcon>,
  },
  {
    key: "collections",
    label: "Collections",
    icon: <SidebarIcon><rect x="4" y="5" width="7" height="6" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><rect x="13" y="5" width="7" height="6" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><rect x="4" y="13" width="7" height="6" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><rect x="13" y="13" width="7" height="6" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" /></SidebarIcon>,
  },
  {
    key: "navigation",
    label: "Navigation",
    icon: <SidebarIcon><path d="M5 7h14M5 12h14M5 17h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SidebarIcon>,
  },
  {
    key: "footer",
    label: "Footer",
    icon: <SidebarIcon><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M7 15h10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SidebarIcon>,
  },
];

const linesToArray = (value: string) =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

const arrayToLines = (value: string[]) => value.join("\n");

export function AdminEditor({ initialContent }: AdminEditorProps) {
  const [selectedSection, setSelectedSection] = useState<SectionKey>("home");
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [status, setStatus] = useState("Ready");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<number | null>(null);

  const overviewCards = useMemo(
    () => [
      { label: "Editable Pages", value: "5", accent: "violet" },
      { label: "Services", value: String(content.collections.services.length), accent: "orange" },
      { label: "Projects", value: String(content.collections.projects.length), accent: "blue" },
      { label: "Contacts", value: String(content.collections.contacts.length), accent: "green" },
    ],
    [content.collections.contacts.length, content.collections.projects.length, content.collections.services.length],
  );

  const pageTitle = sectionMeta.find((section) => section.key === selectedSection)?.label ?? "Admin";

  const updateTopLevelSection = <T extends keyof SiteContent>(key: T, value: SiteContent[T]) => {
    setContent((current) => ({ ...current, [key]: value }));
  };

  const updateCollection = <T extends keyof SiteContent["collections"]>(
    key: T,
    value: SiteContent["collections"][T],
  ) => {
    setContent((current) => ({
      ...current,
      collections: { ...current.collections, [key]: value },
    }));
  };

  const updateNavigation = (index: number, field: keyof NavItem, value: string) =>
    setContent((current) => {
      const navigation = [...current.navigation];
      navigation[index] = { ...navigation[index], [field]: value };
      return { ...current, navigation };
    });

  const updateService = (index: number, field: keyof Service, value: string) =>
    setContent((current) => {
      const services = [...current.collections.services];
      services[index] = { ...services[index], [field]: value };
      return { ...current, collections: { ...current.collections, services } };
    });

  const updateSkill = (index: number, field: keyof Skill, value: string | number) =>
    setContent((current) => {
      const skills = [...current.collections.skills];
      skills[index] = { ...skills[index], [field]: value };
      return { ...current, collections: { ...current.collections, skills } };
    });

  const updateTool = (index: number, field: keyof Tool, value: string) =>
    setContent((current) => {
      const tools = [...current.collections.tools];
      tools[index] = { ...tools[index], [field]: value };
      return { ...current, collections: { ...current.collections, tools } };
    });

  const updateStat = (index: number, field: keyof Stat, value: string) =>
    setContent((current) => {
      const stats = [...current.collections.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...current, collections: { ...current.collections, stats } };
    });

  const updateProject = (index: number, field: keyof Project, value: string | string[]) =>
    setContent((current) => {
      const projects = [...current.collections.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...current, collections: { ...current.collections, projects } };
    });

  const updateContact = (index: number, field: keyof Contact, value: string) =>
    setContent((current) => {
      const contacts = [...current.collections.contacts];
      contacts[index] = { ...contacts[index], [field]: value };
      return { ...current, collections: { ...current.collections, contacts } };
    });

  const handleSaveAll = async () => {
    setIsSaving(true);
    setStatus("Saving...");
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const result = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Failed to save content");
      }
      setStatus("Saved successfully");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const handleProjectImageUpload = async (index: number, file: File) => {
    setIsUploading(index);
    setStatus("Uploading image...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const result = (await response.json()) as { ok: boolean; path?: string; error?: string };
      if (!response.ok || !result.ok || !result.path) {
        throw new Error(result.error ?? "Upload failed");
      }
      updateProject(index, "image", result.path);
      setStatus("Image uploaded");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(null);
    }
  };

  const addNavigationItem = () =>
    updateTopLevelSection("navigation", [...content.navigation, { href: "/new-page", label: "New Page" }]);

  const removeNavigationItem = (index: number) =>
    updateTopLevelSection(
      "navigation",
      content.navigation.filter((_, currentIndex) => currentIndex !== index),
    );

  const addService = () =>
    updateCollection("services", [
      ...content.collections.services,
      { number: "00", icon: "NW", title: "New Service", description: "Describe the new service." },
    ]);

  const addSkill = () =>
    updateCollection("skills", [...content.collections.skills, { name: "New Skill", value: 80 }]);

  const addTool = () =>
    updateCollection("tools", [...content.collections.tools, { icon: "NW", name: "New Tool", tag: "Tool tag" }]);

  const addStat = () =>
    updateCollection("stats", [...content.collections.stats, { number: "0", label: "New Metric" }]);

  const addProject = () =>
    updateCollection("projects", [
      ...content.collections.projects,
      { icon: "NW", tone: "projectImageOne", image: "", tags: ["Tag"], title: "New Project", description: "Describe the new project." },
    ]);

  const addContact = () =>
    updateCollection("contacts", [
      ...content.collections.contacts,
      { href: "#", className: "contactCard email", icon: "CT", label: "New Channel", value: "value" },
    ]);

  const removeFromCollection = (key: keyof SiteContent["collections"], index: number) => {
    updateCollection(
      key,
      content.collections[key].filter((_, currentIndex) => currentIndex !== index) as SiteContent["collections"][typeof key],
    );
  };

  const renderField = (
    label: string,
    value: string,
    onChange: (value: string) => void,
    options?: { textarea?: boolean; full?: boolean; rows?: number },
  ) => (
    <label className={`adminField ${options?.full ? "full" : ""}`}>
      <span>{label}</span>
      {options?.textarea ? (
        <textarea rows={options.rows ?? 5} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );

  const renderHomeEditor = () => (
    <div className="adminFormGrid">
      {renderField("Hero Tag", content.home.heroTag, (value) => updateTopLevelSection("home", { ...content.home, heroTag: value }))}
      {renderField("Hero Line 1", content.home.heroTitleLine1, (value) => updateTopLevelSection("home", { ...content.home, heroTitleLine1: value }))}
      {renderField("Hero Line 2", content.home.heroTitleLine2, (value) => updateTopLevelSection("home", { ...content.home, heroTitleLine2: value }))}
      {renderField("Primary CTA", content.home.primaryCta, (value) => updateTopLevelSection("home", { ...content.home, primaryCta: value }))}
      {renderField("Secondary CTA", content.home.secondaryCta, (value) => updateTopLevelSection("home", { ...content.home, secondaryCta: value }))}
      {renderField("Scroll Label", content.home.scrollLabel, (value) => updateTopLevelSection("home", { ...content.home, scrollLabel: value }))}
      {renderField("Sections Label", content.home.sectionsLabel, (value) => updateTopLevelSection("home", { ...content.home, sectionsLabel: value }))}
      {renderField("Sections Title", content.home.sectionsTitle, (value) => updateTopLevelSection("home", { ...content.home, sectionsTitle: value }))}
      {renderField("Services Label", content.home.servicesLabel, (value) => updateTopLevelSection("home", { ...content.home, servicesLabel: value }))}
      {renderField("Services Title", content.home.servicesTitle, (value) => updateTopLevelSection("home", { ...content.home, servicesTitle: value }))}
      {renderField("Projects Label", content.home.projectsLabel, (value) => updateTopLevelSection("home", { ...content.home, projectsLabel: value }))}
      {renderField("Projects Title", content.home.projectsTitle, (value) => updateTopLevelSection("home", { ...content.home, projectsTitle: value }))}
      {renderField("Project CTA", content.home.projectCta, (value) => updateTopLevelSection("home", { ...content.home, projectCta: value }))}
      {renderField("Hero Description", content.home.heroDescription, (value) => updateTopLevelSection("home", { ...content.home, heroDescription: value }), { textarea: true, full: true, rows: 5 })}
    </div>
  );

  const renderServicesPageEditor = () => (
    <div className="adminFormGrid">
      {renderField("Hero Tag", content.servicesPage.heroTag, (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, heroTag: value }))}
      {renderField("Hero Title", content.servicesPage.heroTitle, (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, heroTitle: value }), { full: true })}
      {renderField("Hero Lead", content.servicesPage.heroLead, (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, heroLead: value }), { textarea: true, full: true })}
      {renderField("Intro Tag", content.servicesPage.introTag, (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, introTag: value }))}
      {renderField("Intro Title", content.servicesPage.introTitle, (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, introTitle: value }), { full: true })}
      {renderField("Outcomes (one per line)", arrayToLines(content.servicesPage.outcomes), (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, outcomes: linesToArray(value) }), { textarea: true, full: true })}
      {renderField("Delivery Tag", content.servicesPage.deliveryTag, (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, deliveryTag: value }))}
      {renderField("Delivery Title", content.servicesPage.deliveryTitle, (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, deliveryTitle: value }))}
      {renderField("Delivery Body", content.servicesPage.deliveryBody, (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, deliveryBody: value }), { textarea: true, full: true })}
      {renderField("Next Tag", content.servicesPage.nextTag, (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, nextTag: value }))}
      {renderField("Next Title", content.servicesPage.nextTitle, (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, nextTitle: value }))}
      {renderField("Next Body", content.servicesPage.nextBody, (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, nextBody: value }), { textarea: true, full: true })}
      {renderField("Next CTA", content.servicesPage.nextCta, (value) => updateTopLevelSection("servicesPage", { ...content.servicesPage, nextCta: value }))}
    </div>
  );

  const renderSkillsPageEditor = () => (
    <div className="adminFormGrid">
      {renderField("Hero Tag", content.skillsPage.heroTag, (value) => updateTopLevelSection("skillsPage", { ...content.skillsPage, heroTag: value }))}
      {renderField("Hero Title", content.skillsPage.heroTitle, (value) => updateTopLevelSection("skillsPage", { ...content.skillsPage, heroTitle: value }), { full: true })}
      {renderField("Hero Lead", content.skillsPage.heroLead, (value) => updateTopLevelSection("skillsPage", { ...content.skillsPage, heroLead: value }), { textarea: true, full: true })}
      {renderField("Workflow Tag", content.skillsPage.workflowTag, (value) => updateTopLevelSection("skillsPage", { ...content.skillsPage, workflowTag: value }))}
      {renderField("Workflow Title", content.skillsPage.workflowTitle, (value) => updateTopLevelSection("skillsPage", { ...content.skillsPage, workflowTitle: value }), { full: true })}
      {renderField("Core Tag", content.skillsPage.coreTag, (value) => updateTopLevelSection("skillsPage", { ...content.skillsPage, coreTag: value }))}
      {renderField("Core Title", content.skillsPage.coreTitle, (value) => updateTopLevelSection("skillsPage", { ...content.skillsPage, coreTitle: value }))}
      {renderField("Core Lead", content.skillsPage.coreLead, (value) => updateTopLevelSection("skillsPage", { ...content.skillsPage, coreLead: value }), { textarea: true, full: true })}
    </div>
  );

  const renderProjectsPageEditor = () => (
    <div className="adminFormGrid">
      {renderField("Hero Tag", content.projectsPage.heroTag, (value) => updateTopLevelSection("projectsPage", { ...content.projectsPage, heroTag: value }))}
      {renderField("Hero Title", content.projectsPage.heroTitle, (value) => updateTopLevelSection("projectsPage", { ...content.projectsPage, heroTitle: value }), { full: true })}
      {renderField("Hero Lead", content.projectsPage.heroLead, (value) => updateTopLevelSection("projectsPage", { ...content.projectsPage, heroLead: value }), { textarea: true, full: true })}
      {renderField("Project CTA", content.projectsPage.projectCta, (value) => updateTopLevelSection("projectsPage", { ...content.projectsPage, projectCta: value }))}
      {renderField("Quote Tag", content.projectsPage.quoteTag, (value) => updateTopLevelSection("projectsPage", { ...content.projectsPage, quoteTag: value }))}
      {renderField("Quote Title", content.projectsPage.quoteTitle, (value) => updateTopLevelSection("projectsPage", { ...content.projectsPage, quoteTitle: value }), { full: true })}
      {renderField("Quote Lead", content.projectsPage.quoteLead, (value) => updateTopLevelSection("projectsPage", { ...content.projectsPage, quoteLead: value }), { textarea: true, full: true })}
      {renderField("Quote CTA", content.projectsPage.quoteCta, (value) => updateTopLevelSection("projectsPage", { ...content.projectsPage, quoteCta: value }))}
    </div>
  );

  const renderContactPageEditor = () => (
    <div className="adminFormGrid">
      {renderField("Hero Tag", content.contactPage.heroTag, (value) => updateTopLevelSection("contactPage", { ...content.contactPage, heroTag: value }))}
      {renderField("Hero Title", content.contactPage.heroTitle, (value) => updateTopLevelSection("contactPage", { ...content.contactPage, heroTitle: value }), { full: true })}
      {renderField("Hero Lead", content.contactPage.heroLead, (value) => updateTopLevelSection("contactPage", { ...content.contactPage, heroLead: value }), { textarea: true, full: true })}
      {renderField("Channels Tag", content.contactPage.channelsTag, (value) => updateTopLevelSection("contactPage", { ...content.contactPage, channelsTag: value }))}
      {renderField("Channels Title", content.contactPage.channelsTitle, (value) => updateTopLevelSection("contactPage", { ...content.contactPage, channelsTitle: value }), { full: true })}
      {renderField("Channels Lead", content.contactPage.channelsLead, (value) => updateTopLevelSection("contactPage", { ...content.contactPage, channelsLead: value }), { textarea: true, full: true })}
      {renderField("Promises (one per line)", arrayToLines(content.contactPage.promises), (value) => updateTopLevelSection("contactPage", { ...content.contactPage, promises: linesToArray(value) }), { textarea: true, full: true })}
      {renderField("Form Title", content.contactPage.form.title, (value) => updateTopLevelSection("contactPage", { ...content.contactPage, form: { ...content.contactPage.form, title: value } }))}
      {renderField("Submit Label", content.contactPage.form.submitLabel, (value) => updateTopLevelSection("contactPage", { ...content.contactPage, form: { ...content.contactPage.form, submitLabel: value } }))}
      {renderField("Sent Label", content.contactPage.form.sentLabel, (value) => updateTopLevelSection("contactPage", { ...content.contactPage, form: { ...content.contactPage.form, sentLabel: value } }))}
    </div>
  );

  const renderNavigationEditor = () => (
    <div className="adminCollectionSections">
      <div className="adminSubSection">
        <div className="adminSubSectionHeader">
          <div>
            <p className="adminEyebrow">Menu</p>
            <h3>Header navigation</h3>
          </div>
          <button type="button" className="adminMiniButton" onClick={addNavigationItem}>
            Add item
          </button>
        </div>
        <div className="adminTableWrap">
          <table className="adminTable">
            <thead>
              <tr>
                <th>Label</th>
                <th>Href</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {content.navigation.map((item, index) => (
                <tr key={`${item.href}-${index}`}>
                  <td><input value={item.label} onChange={(event) => updateNavigation(index, "label", event.target.value)} /></td>
                  <td><input value={item.href} onChange={(event) => updateNavigation(index, "href", event.target.value)} /></td>
                  <td>
                    <button type="button" className="adminMiniButton danger" onClick={() => removeNavigationItem(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFooterEditor = () => (
    <div className="adminFormGrid">
      {renderField("Brand", content.footer.brand, (value) => updateTopLevelSection("footer", { ...content.footer, brand: value }))}
      {renderField("Copyright Text", content.footer.copy, (value) => updateTopLevelSection("footer", { ...content.footer, copy: value }))}
      {renderField("Suffix", content.footer.suffix, (value) => updateTopLevelSection("footer", { ...content.footer, suffix: value }))}
    </div>
  );

  const renderCollectionsEditor = () => (
    <div className="adminCollectionSections">
      <section className="adminSubSection">
        <div className="adminSubSectionHeader">
          <div>
            <p className="adminEyebrow">Table Editor</p>
            <h3>Services</h3>
          </div>
          <button type="button" className="adminMiniButton" onClick={addService}>Add service</button>
        </div>
        <div className="adminTableWrap">
          <table className="adminTable">
            <thead>
              <tr><th>No.</th><th>Icon</th><th>Title</th><th>Description</th><th>Action</th></tr>
            </thead>
            <tbody>
              {content.collections.services.map((service, index) => (
                <tr key={`${service.title}-${index}`}>
                  <td><input value={service.number} onChange={(event) => updateService(index, "number", event.target.value)} /></td>
                  <td><input value={service.icon} onChange={(event) => updateService(index, "icon", event.target.value)} /></td>
                  <td><input value={service.title} onChange={(event) => updateService(index, "title", event.target.value)} /></td>
                  <td><textarea rows={3} value={service.description} onChange={(event) => updateService(index, "description", event.target.value)} /></td>
                  <td><button type="button" className="adminMiniButton danger" onClick={() => removeFromCollection("services", index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="adminSubSection">
        <div className="adminSubSectionHeader">
          <div>
            <p className="adminEyebrow">Table Editor</p>
            <h3>Projects</h3>
          </div>
          <button type="button" className="adminMiniButton" onClick={addProject}>Add project</button>
        </div>
        <div className="adminTableWrap">
          <table className="adminTable">
            <thead>
              <tr><th>Preview</th><th>Image</th><th>Icon</th><th>Tone</th><th>Tags</th><th>Title</th><th>Description</th><th>Action</th></tr>
            </thead>
            <tbody>
              {content.collections.projects.map((project, index) => (
                <tr key={`${project.title}-${index}`}>
                  <td>
                    <div className="adminImagePreview">
                      {project.image ? <Image src={project.image} alt={project.title} fill sizes="72px" /> : <span>{project.icon}</span>}
                    </div>
                  </td>
                  <td className="adminUploadCell">
                    <input value={project.image ?? ""} onChange={(event) => updateProject(index, "image", event.target.value)} />
                    <label className="adminUploadButton">
                      {isUploading === index ? "Uploading..." : "Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            void handleProjectImageUpload(index, file);
                          }
                        }}
                      />
                    </label>
                  </td>
                  <td><input value={project.icon} onChange={(event) => updateProject(index, "icon", event.target.value)} /></td>
                  <td><input value={project.tone} onChange={(event) => updateProject(index, "tone", event.target.value)} /></td>
                  <td><textarea rows={3} value={arrayToLines(project.tags)} onChange={(event) => updateProject(index, "tags", linesToArray(event.target.value))} /></td>
                  <td><input value={project.title} onChange={(event) => updateProject(index, "title", event.target.value)} /></td>
                  <td><textarea rows={3} value={project.description} onChange={(event) => updateProject(index, "description", event.target.value)} /></td>
                  <td><button type="button" className="adminMiniButton danger" onClick={() => removeFromCollection("projects", index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="adminSubSection">
        <div className="adminSubSectionHeader">
          <div>
            <p className="adminEyebrow">Table Editor</p>
            <h3>Contacts</h3>
          </div>
          <button type="button" className="adminMiniButton" onClick={addContact}>Add contact</button>
        </div>
        <div className="adminTableWrap">
          <table className="adminTable">
            <thead>
              <tr><th>Label</th><th>Value</th><th>Href</th><th>Icon</th><th>Class</th><th>Action</th></tr>
            </thead>
            <tbody>
              {content.collections.contacts.map((contact, index) => (
                <tr key={`${contact.label}-${index}`}>
                  <td><input value={contact.label} onChange={(event) => updateContact(index, "label", event.target.value)} /></td>
                  <td><input value={contact.value} onChange={(event) => updateContact(index, "value", event.target.value)} /></td>
                  <td><input value={contact.href} onChange={(event) => updateContact(index, "href", event.target.value)} /></td>
                  <td><input value={contact.icon} onChange={(event) => updateContact(index, "icon", event.target.value)} /></td>
                  <td><input value={contact.className} onChange={(event) => updateContact(index, "className", event.target.value)} /></td>
                  <td><button type="button" className="adminMiniButton danger" onClick={() => removeFromCollection("contacts", index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="adminSubSection">
        <div className="adminSubSectionHeader">
          <div>
            <p className="adminEyebrow">Supporting Data</p>
            <h3>Skills</h3>
          </div>
          <button type="button" className="adminMiniButton" onClick={addSkill}>Add skill</button>
        </div>
        <div className="adminTableWrap">
          <table className="adminTable compact">
            <thead>
              <tr><th>Name</th><th>Value</th><th>Action</th></tr>
            </thead>
            <tbody>
              {content.collections.skills.map((skill, index) => (
                <tr key={`${skill.name}-${index}`}>
                  <td><input value={skill.name} onChange={(event) => updateSkill(index, "name", event.target.value)} /></td>
                  <td><input type="number" value={skill.value} onChange={(event) => updateSkill(index, "value", Number(event.target.value) || 0)} /></td>
                  <td><button type="button" className="adminMiniButton danger" onClick={() => removeFromCollection("skills", index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="adminSubSection">
        <div className="adminSubSectionHeader">
          <div>
            <p className="adminEyebrow">Supporting Data</p>
            <h3>Tools</h3>
          </div>
          <button type="button" className="adminMiniButton" onClick={addTool}>Add tool</button>
        </div>
        <div className="adminTableWrap">
          <table className="adminTable compact">
            <thead>
              <tr><th>Icon</th><th>Name</th><th>Tag</th><th>Action</th></tr>
            </thead>
            <tbody>
              {content.collections.tools.map((tool, index) => (
                <tr key={`${tool.name}-${index}`}>
                  <td><input value={tool.icon} onChange={(event) => updateTool(index, "icon", event.target.value)} /></td>
                  <td><input value={tool.name} onChange={(event) => updateTool(index, "name", event.target.value)} /></td>
                  <td><input value={tool.tag} onChange={(event) => updateTool(index, "tag", event.target.value)} /></td>
                  <td><button type="button" className="adminMiniButton danger" onClick={() => removeFromCollection("tools", index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="adminSubSection">
        <div className="adminSubSectionHeader">
          <div>
            <p className="adminEyebrow">Supporting Data</p>
            <h3>Stats</h3>
          </div>
          <button type="button" className="adminMiniButton" onClick={addStat}>Add stat</button>
        </div>
        <div className="adminTableWrap">
          <table className="adminTable compact">
            <thead>
              <tr><th>Number</th><th>Label</th><th>Action</th></tr>
            </thead>
            <tbody>
              {content.collections.stats.map((stat, index) => (
                <tr key={`${stat.label}-${index}`}>
                  <td><input value={stat.number} onChange={(event) => updateStat(index, "number", event.target.value)} /></td>
                  <td><input value={stat.label} onChange={(event) => updateStat(index, "label", event.target.value)} /></td>
                  <td><button type="button" className="adminMiniButton danger" onClick={() => removeFromCollection("stats", index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const renderEditorContent = () => {
    switch (selectedSection) {
      case "home":
        return renderHomeEditor();
      case "servicesPage":
        return renderServicesPageEditor();
      case "skillsPage":
        return renderSkillsPageEditor();
      case "projectsPage":
        return renderProjectsPageEditor();
      case "contactPage":
        return renderContactPageEditor();
      case "collections":
        return renderCollectionsEditor();
      case "navigation":
        return renderNavigationEditor();
      case "footer":
        return renderFooterEditor();
      default:
        return null;
    }
  };

  return (
    <div className="adminShell">
      <aside className="adminSidebar">
        <div className="adminBrand">
          <div className="adminBrandMark">V</div>
          <div>
            <p className="adminBrandName">Velmax CMS</p>
            <p className="adminBrandMeta">Local content control</p>
          </div>
        </div>

        <div>
          <p className="adminGroupLabel">Content Sections</p>
          <div className="adminSectionList">
            {sectionMeta.map((section) => (
              <button
                key={section.key}
                type="button"
                className={`adminSectionButton ${selectedSection === section.key ? "activeAdminSection" : ""}`}
                onClick={() => setSelectedSection(section.key)}
              >
                <span className="adminSectionIcon">{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="adminActions">
          <button type="button" className="adminSaveButton" onClick={handleSaveAll} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" className="adminLogoutButton" onClick={handleLogout}>
            Logout
          </button>
          <p className="adminStatus">{status}</p>
        </div>
      </aside>

      <section className="adminMain">
        <div className="adminTopbar">
          <div>
            <p className="adminEyebrow">Dashboard</p>
            <h1 className="adminTitle">Content Admin</h1>
          </div>
          <div className="adminTopbarMeta">
            <div className="adminMetaBadge">Protected</div>
            <div className="adminMetaBadge">Text editor</div>
            <div className="adminMetaBadge">Uploads enabled</div>
          </div>
        </div>

        <div className="adminOverviewGrid">
          {overviewCards.map((card) => (
            <article className={`adminOverviewCard ${card.accent}`} key={card.label}>
              <div>
                <p className="adminCardLabel">{card.label}</p>
                <div className="adminCardValue">{card.value}</div>
              </div>
              <div className="adminCardIcon">{card.value}</div>
            </article>
          ))}
        </div>

        <div className="adminContentGrid">
          <section className="adminEditorPanel lightPanel">
            <div className="adminEditorHeader">
              <div>
                <p className="adminEyebrow">Editing</p>
                <h2>{pageTitle}</h2>
              </div>
              <div className="adminEditorPill">Live form</div>
            </div>
            {renderEditorContent()}
          </section>

          <aside className="adminInfoPanel">
            <div className="adminInfoCard lightPanel">
              <p className="adminEyebrow">Current Section</p>
              <h3>{pageTitle}</h3>
              <p className="adminLead">Right panel uses plain text fields and tables instead of raw JSON.</p>
            </div>
            <div className="adminInfoCard lightPanel">
              <p className="adminEyebrow">Uploads</p>
              <div className="adminTips">
                <p>Project images are uploaded from the table directly into `public/uploads`.</p>
                <p>The saved path is written back to the project row automatically.</p>
              </div>
            </div>
            <div className="adminInfoCard lightPanel">
              <p className="adminEyebrow">Status</p>
              <div className="adminStatusLarge">{status}</div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
