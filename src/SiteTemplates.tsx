import { useState, type SyntheticEvent } from "react";
import { useLocale, useMessages, useSiteContent } from "./localization";
import { site, type Language, type SiteContent, type SiteTemplateId, type TeamGroup, type TeamMember } from "./site";

type TemplateOption = { id: SiteTemplateId; name: string; promise: string; style: string; features: string[] };

const templateOptions: Record<Language, TemplateOption[]> = {
  pt: [
    { id: "editorial", name: "Editorial", promise: "Confiança clássica, narrativa clara e presença institucional.", style: "Advocacia · Editorial", features: ["Hero fotográfico dividido", "Serviços em índice editorial", "Formulário de contato"] },
    { id: "mosaic", name: "Mosaico", promise: "Uma home compacta em blocos, útil para quem quer mostrar tudo de imediato.", style: "Estúdio · Bento grid", features: ["Painel modular", "Serviços expansíveis", "Acesso rápido a contatos"] },
    { id: "journal", name: "Revista de impacto", promise: "Uma narrativa longa para organizações, causas e projetos de mudança.", style: "Impacto · Magazine", features: ["Imagem de capa", "Indicadores em destaque", "Conteúdo em formato de reportagem"] },
    { id: "community", name: "Rede comunitária", promise: "Pessoas, áreas de atuação e formas de ajuda em primeiro plano.", style: "Comunidade · Diretório", features: ["Busca por integrantes", "Serviços em acordeão", "Navegação orientada a tarefas"] },
    { id: "campaign", name: "Campanha", promise: "Uma chamada forte e direta para mobilizar pessoas em torno de uma causa.", style: "Mobilização · Manifesto", features: ["Abertura em tela cheia", "Passos numerados", "Chamadas de ação recorrentes"] },
    { id: "premium", name: "Premium", promise: "Uma presença cinematográfica, elegante e orientada à confiança.", style: "Institucional · Premium", features: ["Hero imersivo com chamadas claras", "Atuação apresentada em etapas", "Equipe e impacto em destaque"] },
  ],
  en: [
    { id: "editorial", name: "Editorial", promise: "Classic trust, clear storytelling, and an established presence.", style: "Legal · Editorial", features: ["Split-photo hero", "Editorial service index", "Contact form"] },
    { id: "mosaic", name: "Mosaic", promise: "A compact, block-based homepage that brings everything together.", style: "Studio · Bento grid", features: ["Modular overview", "Expandable services", "Quick contact links"] },
    { id: "journal", name: "Impact Journal", promise: "A long-form story for organizations, causes, and lasting change.", style: "Impact · Magazine", features: ["Cover image", "Featured metrics", "Editorial storytelling"] },
    { id: "community", name: "Community Network", promise: "People, practice areas, and ways to get help take center stage.", style: "Community · Directory", features: ["Team search", "Accordion services", "Task-focused navigation"] },
    { id: "campaign", name: "Campaign", promise: "A direct, compelling call to bring people together around a cause.", style: "Mobilization · Manifesto", features: ["Full-screen opening", "Numbered steps", "Repeated calls to action"] },
    { id: "premium", name: "Premium", promise: "A cinematic, elegant presence built on trust.", style: "Institutional · Premium", features: ["Immersive hero with clear calls to action", "Services presented in steps", "Featured team and impact"] },
  ],
};

interface ThemeControlProps {
  mode: "light" | "dark";
  onToggleMode: () => void;
}

interface PreviewProps extends ThemeControlProps {
  template: SiteTemplateId;
  showControls: boolean;
  selected: boolean;
  onBack: () => void;
  onSelect: () => void;
}

function resolveAsset(path: string): string {
  if (/^https:\/\//i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function ThemeToggle({ mode, onToggleMode }: ThemeControlProps) {
  const t = useMessages();
  const label = mode === "dark" ? t.themeLight : t.themeDark;
  return (
    <button className="theme-toggle" type="button" aria-label={label} title={label} aria-pressed={mode === "dark"} onClick={onToggleMode}>
      <span aria-hidden="true">{mode === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}

function LanguageToggle() {
  const { language, setLanguage } = useLocale();
  const t = useMessages();
  const next = language === "pt" ? "en" : "pt";
  const label = language === "pt" ? t.switchToEnglish : t.switchToPortuguese;
  return <button className="language-toggle" type="button" lang={next === "pt" ? "pt-BR" : "en"} aria-label={label} title={label} onClick={() => setLanguage(next)}>{next.toUpperCase()}</button>;
}

function Brand({ href = "#top" }: { href?: string }) {
  const content = useSiteContent();
  const t = useMessages();
  return (
    <a className="brand" href={href} aria-label={t.home(content.organization)}>
      {site.logo ? <img className="brand-logo" src={resolveAsset(site.logo.src)} alt={site.logo.alt} referrerPolicy="no-referrer" /> : <span className="brand-mark" aria-hidden="true">{content.organization.trim().charAt(0).toUpperCase()}</span>}
      <span>{content.organization}<small>{content.tagline}</small></span>
    </a>
  );
}

function SiteHeader({ variant, mode, onToggleMode }: ThemeControlProps & { variant: string }) {
  const content = useSiteContent();
  const t = useMessages();
  return (
    <header className={`site-header header--${variant}`}>
      <Brand />
      <nav aria-label={t.mainNavigation}>
        <a href="#about">{content.navigation.about}</a>
        <a href="#work">{content.navigation.work}</a>
        <a href="#people">{content.navigation.people}</a>
        <a className="header-contact" href="#contact">{content.navigation.contact}<span aria-hidden="true"> ↗</span></a>
      </nav>
      <div className="site-controls"><LanguageToggle /><ThemeToggle mode={mode} onToggleMode={onToggleMode} /></div>
    </header>
  );
}

function PreviewHeroText({ className = "" }: { className?: string }) {
  const content = useSiteContent();
  return (
    <div className={`hero-copy ${className}`}>
      <p className="eyebrow">{content.hero.eyebrow}</p>
      <h1 id="hero-title">{content.hero.title}</h1>
      <p className="hero-description">{content.hero.description}</p>
      <div className="hero-actions">
        <a className="button button--primary" href="#contact">{content.hero.primaryCta}<span aria-hidden="true"> ↗</span></a>
        <a className="hero-secondary" href="#work">{content.hero.secondaryCta}<span aria-hidden="true"> ↓</span></a>
      </div>
    </div>
  );
}

function HeroImage({ className = "" }: { className?: string }) {
  const content = useSiteContent();
  return <figure className={`hero-media ${className}`}><img src={resolveAsset(site.hero.imageSrc)} alt={content.hero.imageAlt} fetchPriority="high" decoding="async" referrerPolicy="no-referrer" /><figcaption>{content.hero.imageAlt}</figcaption></figure>;
}

function EditorialHero() {
  return (
    <section className="hero hero-editorial" id="top" aria-labelledby="hero-title">
      <PreviewHeroText />
      <HeroImage />
    </section>
  );
}

function MosaicHero() {
  const t = useMessages();
  return (
    <section className="mosaic-hero" id="top" aria-labelledby="hero-title">
      <div className="mosaic-hero-copy"><PreviewHeroText /></div>
      <HeroImage className="mosaic-hero-image" />
      <a className="mosaic-hero-contact" href="#contact"><span>{t.mosaicContact}</span><b aria-hidden="true">↗</b></a>
    </section>
  );
}

function JournalHero() {
  const content = useSiteContent();
  const t = useMessages();
  return (
    <section className="journal-cover" id="top" aria-labelledby="hero-title">
      <p className="eyebrow">{content.hero.eyebrow}</p>
      <h1 id="hero-title">{content.hero.title}</h1>
      <div className="journal-cover-bottom"><p>{content.hero.description}</p><a className="text-link" href="#work">{t.journalReadWork} ↓</a></div>
      <HeroImage className="journal-cover-image" />
    </section>
  );
}

function CommunityHero() {
  const content = useSiteContent();
  const t = useMessages();
  return (
    <section className="community-hero" id="top" aria-labelledby="hero-title">
      <p className="eyebrow">{content.hero.eyebrow}</p>
      <h1 id="hero-title">{content.hero.title}</h1>
      <p className="hero-description">{content.hero.description}</p>
      <div className="hero-actions"><a className="button button--primary" href="#work">{t.communityFindGuidance} <span aria-hidden="true">↓</span></a><a className="hero-secondary" href="#people">{t.communityMeetTeam}</a></div>
      <HeroImage className="community-hero-image" />
    </section>
  );
}

function CampaignHero() {
  const content = useSiteContent();
  return (
    <section className="campaign-hero" id="top" aria-labelledby="hero-title">
      <HeroImage className="campaign-hero-image" />
      <div className="campaign-hero-copy"><PreviewHeroText /><span className="campaign-ribbon">{content.organization} · {content.hero.eyebrow}</span></div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, number }: { eyebrow: string; title: string; number?: string }) {
  return <div className="section-heading"><p className="eyebrow">{number ? `${number} / ` : ""}{eyebrow}</p><h2>{title}</h2></div>;
}

function Introduction({ variant = "standard" }: { variant?: string }) {
  const content = useSiteContent();
  return (
    <section className={`intro intro--${variant}`} id="about">
      <SectionHeading eyebrow={content.introduction.eyebrow} title={content.introduction.title} number="01" />
      <div className="intro-body"><p>{content.introduction.body}</p><p className="intro-note">{content.introduction.note}</p></div>
    </section>
  );
}

function WorkSection({ layout = "cards" }: { layout?: "cards" | "rows" | "accordion" | "steps" }) {
  const content = useSiteContent();
  const t = useMessages();
  return (
    <section className={`work work--${layout}`} id="work">
      <SectionHeading eyebrow={content.work.eyebrow} title={content.work.title} number="02" />
      {layout === "accordion" ? (
        <div className="service-accordion">
          {content.work.items.map((item) => <details className="service-disclosure" key={item.number}>
            <summary><span className="service-number">{item.number}</span><strong>{item.title}</strong><span className="disclosure-icon" aria-hidden="true">＋</span></summary>
            <p>{item.description}</p>
          </details>)}
        </div>
      ) : (
        <div className={`work-grid work-grid--${layout}`}>
          {content.work.items.map((item) => <article className="work-card" key={item.number}>
            <span className="work-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {layout === "steps" && <a href="#contact" aria-label={t.workContact(item.title)}>{t.workLearnMore} ↗</a>}
          </article>)}
        </div>
      )}
    </section>
  );
}

function ImpactSection({ layout = "panel" }: { layout?: "panel" | "strip" | "story" }) {
  const content = useSiteContent();
  return (
    <section className={`impact impact--${layout}`}>
      <div className="impact-copy"><SectionHeading eyebrow={content.impact.eyebrow} title={content.impact.title} number="03" /><p>{content.impact.body}</p></div>
      <div className="metrics">
        {content.impact.metrics.map((metric) => <div className="metric" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
      </div>
    </section>
  );
}

function getTeamGroups(team: SiteContent["team"]): TeamGroup[] {
  return team.variant === "groups" ? team.groups : [{ name: team.title, description: "", members: team.members }];
}

function matchesTeamMember(member: TeamMember, groupName: string, normalizedQuery: string, locale: string): boolean {
  return !normalizedQuery || `${member.name} ${member.role} ${member.detail} ${groupName}`.toLocaleLowerCase(locale).includes(normalizedQuery);
}

function filterTeamGroups(groups: TeamGroup[], normalizedQuery: string, locale: string): TeamGroup[] {
  return groups
    .map((group) => ({ ...group, members: group.members.filter((member) => matchesTeamMember(member, group.name, normalizedQuery, locale)) }))
    .filter((group) => group.members.length > 0);
}

function MemberCard({ member, index = 0, compact = false }: { member: TeamMember; index?: number; compact?: boolean }) {
  const t = useMessages();
  return (
    <article className={`member-card${compact ? " member-card--compact" : ""}`}>
      <div className={`member-image member-image--${(index % 3) + 1}`}>
        {member.image ? <img src={resolveAsset(member.image.src)} alt={member.image.alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" /> : <span role="img" aria-label={t.initialsFor(member.name)}>{member.initials}</span>}
      </div>
      <div className="member-copy"><h3>{member.name}</h3><p className="member-role">{member.role}</p><p className="member-detail">{member.detail}</p></div>
    </article>
  );
}

function TeamSearchField({ query, onQueryChange, resultCount }: { query: string; onQueryChange: (query: string) => void; resultCount: number }) {
  const t = useMessages();
  return (
    <>
      <label className="directory-search-label" htmlFor="team-search">{t.teamSearchLabel}</label>
      <input id="team-search" className="directory-search" type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={t.teamSearchPlaceholder} />
      <p className="directory-count" aria-live="polite">{t.teamResultCount(resultCount)}</p>
    </>
  );
}

function TeamSection({ layout = "cards" }: { layout?: "cards" | "rows" | "grouped" }) {
  const [query, setQuery] = useState("");
  const { language } = useLocale();
  const content = useSiteContent();
  const t = useMessages();
  const groups = getTeamGroups(content.team);
  const normalizedQuery = query.trim().toLocaleLowerCase(language === "pt" ? "pt-BR" : "en");
  const filteredGroups = filterTeamGroups(groups, normalizedQuery, language === "pt" ? "pt-BR" : "en");
  const resultCount = filteredGroups.reduce((total, group) => total + group.members.length, 0);
  return (
    <section className={`team team--${layout}`} id="people">
      <SectionHeading eyebrow={content.team.eyebrow} title={content.team.title} number="04" />
      <TeamSearchField query={query} onQueryChange={setQuery} resultCount={resultCount} />
      {filteredGroups.length === 0 ? <p className="directory-empty" role="status">{t.teamNoResults}</p> : (
        <div className="team-groups">
          {filteredGroups.map((group, groupIndex) => <section className="team-group" key={`${group.name}-${groupIndex}`} aria-label={group.name}>
            {groups.length > 1 && <header className="team-group-heading"><h3>{group.name}</h3>{group.description && <p>{group.description}</p>}</header>}
            <div className={`member-list member-list--${layout}`}>
              {group.members.map((member, index) => layout === "rows" ? (
                <article className="member-row" key={`${member.name}-${index}`}><span className="member-row-number">{String(index + 1).padStart(2, "0")}</span><span className="member-row-initials" aria-hidden="true">{member.initials}</span><h3>{member.name}</h3><span>{member.role}</span><span>{member.detail}</span></article>
              ) : <MemberCard key={`${member.name}-${index}`} member={member} index={index} compact={layout === "grouped"} />)}
            </div>
          </section>)}
        </div>
      )}
    </section>
  );
}

function SearchableTeam() {
  const [query, setQuery] = useState("");
  const { language } = useLocale();
  const content = useSiteContent();
  const t = useMessages();
  const normalizedQuery = query.trim().toLocaleLowerCase(language === "pt" ? "pt-BR" : "en");
  const filtered = getTeamGroups(content.team).flatMap((group) => group.members.flatMap((member) =>
    matchesTeamMember(member, group.name, normalizedQuery, language === "pt" ? "pt-BR" : "en") ? [{ ...member, group: group.name }] : []));

  return (
    <section className="team team--directory" id="people">
      <SectionHeading eyebrow={content.team.eyebrow} title={content.team.title} number="04" />
      <TeamSearchField query={query} onQueryChange={setQuery} resultCount={filtered.length} />
      <div className="directory-results">
        {filtered.map((member, index) => <article className="directory-row" key={`${member.group}-${member.name}-${index}`}>
          <MemberCard member={member} index={index} compact />
          <span className="directory-group">{member.group}</span>
        </article>)}
        {filtered.length === 0 && <p className="directory-empty">{t.teamNoResults}</p>}
      </div>
    </section>
  );
}

function ContactForm() {
  const content = useSiteContent();
  const t = useMessages();
  function submitInquiry(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const target = new URL(`mailto:${content.contact.email}?subject=${encodeURIComponent(`${t.emailSubject}: ${String(data.get("name") ?? "").trim()}`)}&body=${encodeURIComponent(`${t.contactName}: ${String(data.get("name") ?? "").trim()}\n${t.contactEmail}: ${String(data.get("email") ?? "").trim()}\n\n${String(data.get("message") ?? "").trim()}`)}`);
      if (target.protocol !== "mailto:") return;
      const link = document.createElement("a");
      link.href = target.href;
      link.click();
    } catch {
      return;
    }
  }

  return (
    <form className="contact-form" onSubmit={submitInquiry}>
      <label htmlFor="inquiry-name">{t.contactName}</label><input id="inquiry-name" name="name" autoComplete="name" required />
      <label htmlFor="inquiry-email">{t.contactEmail}</label><input id="inquiry-email" name="email" type="email" autoComplete="email" required />
      <label htmlFor="inquiry-message">{t.contactMessage}</label><textarea id="inquiry-message" name="message" rows={4} required />
      <button className="button button--primary" type="submit">{t.prepareEmail} ↗</button>
      <p className="form-note">{t.emailNote}</p>
    </form>
  );
}

function ContactSection({ layout = "split" }: { layout?: "split" | "banner" | "compact" }) {
  const content = useSiteContent();
  const t = useMessages();
  return (
    <section className={`contact contact--${layout}`} id="contact">
      <div className="contact-copy"><SectionHeading eyebrow={content.contact.eyebrow} title={content.contact.title} number="05" /><p>{content.contact.body}</p>
        <address>{content.contact.address}</address>
        <div className="contact-links"><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a><a href={`tel:${content.contact.phone.replace(/[^+\d]/g, "")}`}>{content.contact.phone}</a></div>
      </div>
      {content.contact.variant === "form" ? <ContactForm /> : <div className="contact-direct"><span>{t.directContact}</span><a className="button button--primary" href={`mailto:${content.contact.email}`}>{t.writeToTeam} ↗</a></div>}
    </section>
  );
}

function SiteFooter({ variant }: { variant: string }) {
  const content = useSiteContent();
  const t = useMessages();
  return <footer className={`site-footer footer--${variant}`}><Brand /><span>© {new Date().getFullYear()} {content.organization}. {t.rightsReserved}</span><a href="#top">{t.backToTop} ↑</a></footer>;
}

function EditorialSite({ mode, onToggleMode }: ThemeControlProps) {
  return <div className="client-site site--editorial">
    <SiteHeader variant="editorial" mode={mode} onToggleMode={onToggleMode} />
    <main id="main"><EditorialHero /><Introduction /><WorkSection layout="rows" /><ImpactSection /><TeamSection layout="cards" /><ContactSection /><SiteFooter variant="editorial" /></main>
  </div>;
}

function MosaicSite({ mode, onToggleMode }: ThemeControlProps) {
  return <div className="client-site site--mosaic">
    <SiteHeader variant="mosaic" mode={mode} onToggleMode={onToggleMode} />
    <main id="main" className="mosaic-main">
      <MosaicHero />
      <div className="mosaic-overview"><Introduction variant="mosaic" /><ImpactSection layout="strip" /></div>
      <WorkSection layout="accordion" />
      <div className="mosaic-bottom"><TeamSection layout="grouped" /><ContactSection layout="compact" /></div>
      <SiteFooter variant="mosaic" />
    </main>
  </div>;
}

function JournalSite({ mode, onToggleMode }: ThemeControlProps) {
  return <div className="client-site site--journal">
    <SiteHeader variant="journal" mode={mode} onToggleMode={onToggleMode} />
    <main id="main" className="journal-main">
      <JournalHero />
      <ImpactSection layout="story" />
      <Introduction variant="journal" />
      <WorkSection layout="rows" />
      <TeamSection layout="rows" />
      <ContactSection layout="banner" />
      <SiteFooter variant="journal" />
    </main>
  </div>;
}

function CommunitySite({ mode, onToggleMode }: ThemeControlProps) {
  return <div className="client-site site--community">
    <SiteHeader variant="community" mode={mode} onToggleMode={onToggleMode} />
    <main id="main" className="community-main">
      <CommunityHero />
      <SearchableTeam />
      <WorkSection layout="accordion" />
      <ImpactSection layout="strip" />
      <Introduction variant="community" />
      <ContactSection />
      <SiteFooter variant="community" />
    </main>
  </div>;
}

function CampaignSite({ mode, onToggleMode }: ThemeControlProps) {
  return <div className="client-site site--campaign">
    <SiteHeader variant="campaign" mode={mode} onToggleMode={onToggleMode} />
    <main id="main" className="campaign-main">
      <CampaignHero />
      <Introduction variant="campaign" />
      <WorkSection layout="steps" />
      <ImpactSection layout="panel" />
      <TeamSection layout="rows" />
      <ContactSection layout="banner" />
      <SiteFooter variant="campaign" />
    </main>
  </div>;
}

function PremiumSite({ mode, onToggleMode }: ThemeControlProps) {
  const t = useMessages();
  return <div className="client-site site--premium">
    <SiteHeader variant="premium" mode={mode} onToggleMode={onToggleMode} />
    <main id="main">
      <section className="premium-hero" id="top" aria-labelledby="hero-title">
        <HeroImage className="premium-hero-media" />
        <div className="premium-hero-content"><PreviewHeroText /></div>
        <a className="premium-scroll-link" href="#about">{t.premiumApproach} <span aria-hidden="true">↓</span></a>
      </section>
      <Introduction variant="premium" />
      <WorkSection layout="steps" />
      <ImpactSection layout="strip" />
      <TeamSection layout="cards" />
      <ContactSection layout="banner" />
      <SiteFooter variant="premium" />
    </main>
  </div>;
}

export function SiteTemplateView({ template, showControls, mode, onToggleMode, onBack, onSelect, selected }: PreviewProps) {
  const { language } = useLocale();
  const t = useMessages();
  const options = templateOptions[language];
  const templateName = options.find((option) => option.id === template)?.name ?? t.modelFallback;
  const SelectedSite = {
    editorial: EditorialSite,
    mosaic: MosaicSite,
    journal: JournalSite,
    community: CommunitySite,
    campaign: CampaignSite,
    premium: PremiumSite,
  }[template];

  return (
    <div className="preview-screen">
      {showControls ? <>
        <a className="skip-link" href="#main">{t.skipToContent}</a>
        <section className="preview-toolbar" aria-label={t.previewControls}>
          <button className="back-button" type="button" onClick={onBack}>← {t.backToModels}</button>
          <p>{t.previewLabel} · <strong>{templateName}</strong></p>
          <button className="choose-button" type="button" aria-pressed={selected} onClick={onSelect}>{selected ? `✓ ${t.selectedInCatalog}` : t.chooseTemplate}</button>
        </section>
      </> : <a className="skip-link" href="#main">{t.skipToContent}</a>}
      <SelectedSite mode={mode} onToggleMode={onToggleMode} />
    </div>
  );
}

function GalleryPreview({ id }: { id: SiteTemplateId }) {
  return <div className={`gallery-preview gallery-preview--${id}`} aria-hidden="true">
    <span className="mini-topbar"><i /><i /><i /></span>
    <span className="mini-layout"><i /><i /><i /><i /></span>
    <span className="mini-media" />
    <span className="mini-copy"><i /><i /><i /></span>
  </div>;
}

export function TemplateGallery({ mode, onToggleMode, selected, onPreview, onSelect }: ThemeControlProps & {
  selected: SiteTemplateId;
  onPreview: (template: SiteTemplateId) => void;
  onSelect: (template: SiteTemplateId) => void;
}) {
  const { language } = useLocale();
  const t = useMessages();
  const options = templateOptions[language];
  const selectedName = options.find((option) => option.id === selected)?.name ?? selected;
  return (
    <>
    <a className="skip-link" href="#main">{t.skipToContent}</a>
    <main className="template-gallery" id="main">
      <header className="gallery-header"><Brand href="#gallery-title" /><div className="site-controls"><LanguageToggle /><ThemeToggle mode={mode} onToggleMode={onToggleMode} /></div></header>
      <section className="gallery-intro" aria-labelledby="gallery-title">
        <p className="eyebrow">{t.galleryEyebrow(options.length)}</p>
        <h1 id="gallery-title">{t.galleryTitle}</h1>
        <p>{t.galleryDescription}</p>
      </section>
      <p className="selection-status" aria-live="polite">{t.selectionStatus(selectedName)}</p>
      <section className="template-grid" aria-label={t.availableModels}>
        {options.map((option, index) => <article className={`template-card${selected === option.id ? " template-card--selected" : ""}`} key={option.id}>
          <GalleryPreview id={option.id} />
          <div className="template-card-copy">
            <p className="template-style">{String(index + 1).padStart(2, "0")} · {option.style}</p>
            <h2>{option.name}</h2>
            <p>{option.promise}</p>
            <ul>{option.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <div className="template-card-actions">
              <button className="button button--primary" type="button" onClick={() => onPreview(option.id)}>{t.viewFullSite} ↗</button>
              <button className="select-link" type="button" aria-pressed={selected === option.id} onClick={() => onSelect(option.id)}>{selected === option.id ? `✓ ${t.chosen}` : t.choose}</button>
            </div>
          </div>
        </article>)}
      </section>
      <footer className="gallery-footer"><p>{t.galleryFooter(selected)}</p></footer>
    </main>
    </>
  );
}
