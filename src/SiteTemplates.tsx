import { useState, type FormEvent } from "react";
import { site, type SiteTemplateId, type TeamGroup, type TeamMember } from "./site";

const templateOptions: { id: SiteTemplateId; name: string; promise: string; style: string; features: string[] }[] = [
  { id: "editorial", name: "Editorial", promise: "Confiança clássica, narrativa clara e presença institucional.", style: "Advocacia · Editorial", features: ["Hero fotográfico dividido", "Serviços em índice editorial", "Formulário de contato"] },
  { id: "mosaic", name: "Mosaico", promise: "Uma home compacta em blocos, útil para quem quer mostrar tudo de imediato.", style: "Estúdio · Bento grid", features: ["Painel modular", "Serviços expansíveis", "Acesso rápido a contatos"] },
  { id: "journal", name: "Revista de impacto", promise: "Uma narrativa longa para organizações, causas e projetos de mudança.", style: "Impacto · Magazine", features: ["Imagem de capa", "Indicadores em destaque", "Conteúdo em formato de reportagem"] },
  { id: "community", name: "Rede comunitária", promise: "Pessoas, áreas de atuação e formas de ajuda em primeiro plano.", style: "Comunidade · Diretório", features: ["Busca por integrantes", "Serviços em acordeão", "Navegação orientada a tarefas"] },
  { id: "campaign", name: "Campanha", promise: "Uma chamada forte e direta para mobilizar pessoas em torno de uma causa.", style: "Mobilização · Manifesto", features: ["Abertura em tela cheia", "Passos numerados", "Chamadas de ação recorrentes"] },
];

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

function ThemeToggle({ mode, onToggleMode }: ThemeControlProps) {
  const next = mode === "dark" ? "claro" : "escuro";
  return (
    <button className="theme-toggle" type="button" aria-label={`Ativar modo ${next}`} aria-pressed={mode === "dark"} onClick={onToggleMode}>
      <span aria-hidden="true">{mode === "dark" ? "☀" : "☾"}</span>
      <span>{mode === "dark" ? "Claro" : "Escuro"}</span>
    </button>
  );
}

function Brand({ href = "#top" }: { href?: string }) {
  return (
    <a className="brand" href={href} aria-label={`Início: ${site.organization}`}>
      {site.logo ? <img className="brand-logo" src={site.logo.src} alt={site.logo.alt} /> : <span className="brand-mark" aria-hidden="true">{site.organization.trim().charAt(0).toUpperCase()}</span>}
      <span>{site.organization}<small>{site.tagline}</small></span>
    </a>
  );
}

function SiteHeader({ variant, mode, onToggleMode }: ThemeControlProps & { variant: string }) {
  return (
    <header className={`site-header header--${variant}`}>
      <Brand />
      <nav aria-label="Navegação principal">
        <a href="#about">{site.navigation.about}</a>
        <a href="#work">{site.navigation.work}</a>
        <a href="#people">{site.navigation.people}</a>
        <a className="header-contact" href="#contact">{site.navigation.contact}<span aria-hidden="true"> ↗</span></a>
      </nav>
      <ThemeToggle mode={mode} onToggleMode={onToggleMode} />
    </header>
  );
}

function PreviewHeroText({ className = "" }: { className?: string }) {
  return (
    <div className={`hero-copy ${className}`}>
      <p className="eyebrow">{site.hero.eyebrow}</p>
      <h1 id="hero-title">{site.hero.title}</h1>
      <p className="hero-description">{site.hero.description}</p>
      <div className="hero-actions">
        <a className="button button--primary" href="#contact">{site.hero.primaryCta}<span aria-hidden="true"> ↗</span></a>
        <a className="hero-secondary" href="#work">{site.hero.secondaryCta}<span aria-hidden="true"> ↓</span></a>
      </div>
    </div>
  );
}

function HeroImage({ className = "" }: { className?: string }) {
  return <figure className={`hero-media ${className}`}><img src={site.hero.imageSrc} alt={site.hero.imageAlt} /><figcaption>{site.hero.imageAlt}</figcaption></figure>;
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
  return (
    <section className="mosaic-hero" id="top" aria-labelledby="hero-title">
      <div className="mosaic-hero-copy"><PreviewHeroText /></div>
      <HeroImage className="mosaic-hero-image" />
      <a className="mosaic-hero-contact" href="#contact"><span>Fale com a equipe</span><b aria-hidden="true">↗</b></a>
    </section>
  );
}

function JournalHero() {
  return (
    <section className="journal-cover" id="top" aria-labelledby="hero-title">
      <p className="eyebrow">{site.hero.eyebrow}</p>
      <h1 id="hero-title">{site.hero.title}</h1>
      <div className="journal-cover-bottom"><p>{site.hero.description}</p><a className="text-link" href="#work">Ler sobre nossa atuação ↓</a></div>
      <HeroImage className="journal-cover-image" />
    </section>
  );
}

function CommunityHero() {
  return (
    <section className="community-hero" id="top" aria-labelledby="hero-title">
      <p className="eyebrow">{site.hero.eyebrow}</p>
      <h1 id="hero-title">{site.hero.title}</h1>
      <p className="hero-description">{site.hero.description}</p>
      <div className="hero-actions"><a className="button button--primary" href="#work">Encontre orientação <span aria-hidden="true">↓</span></a><a className="hero-secondary" href="#people">Conheça quem pode ajudar</a></div>
      <HeroImage className="community-hero-image" />
    </section>
  );
}

function CampaignHero() {
  return (
    <section className="campaign-hero" id="top" aria-labelledby="hero-title">
      <HeroImage className="campaign-hero-image" />
      <div className="campaign-hero-copy"><PreviewHeroText /><span className="campaign-ribbon">{site.organization} · {site.hero.eyebrow}</span></div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, number }: { eyebrow: string; title: string; number?: string }) {
  return <div className="section-heading"><p className="eyebrow">{number ? `${number} / ` : ""}{eyebrow}</p><h2>{title}</h2></div>;
}

function Introduction({ variant = "standard" }: { variant?: string }) {
  return (
    <section className={`intro intro--${variant}`} id="about">
      <SectionHeading eyebrow={site.introduction.eyebrow} title={site.introduction.title} number="01" />
      <div className="intro-body"><p>{site.introduction.body}</p><p className="intro-note">{site.introduction.note}</p></div>
    </section>
  );
}

function WorkSection({ layout = "cards" }: { layout?: "cards" | "rows" | "accordion" | "steps" }) {
  return (
    <section className={`work work--${layout}`} id="work">
      <SectionHeading eyebrow={site.work.eyebrow} title={site.work.title} number="02" />
      {layout === "accordion" ? (
        <div className="service-accordion">
          {site.work.items.map((item) => <details className="service-disclosure" key={item.number}>
            <summary><span className="service-number">{item.number}</span><strong>{item.title}</strong><span className="disclosure-icon" aria-hidden="true">＋</span></summary>
            <p>{item.description}</p>
          </details>)}
        </div>
      ) : (
        <div className={`work-grid work-grid--${layout}`}>
          {site.work.items.map((item) => <article className="work-card" key={item.number}>
            <span className="work-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {layout === "steps" && <a href="#contact" aria-label={`Converse sobre ${item.title}`}>Saber mais ↗</a>}
          </article>)}
        </div>
      )}
    </section>
  );
}

function ImpactSection({ layout = "panel" }: { layout?: "panel" | "strip" | "story" }) {
  return (
    <section className={`impact impact--${layout}`}>
      <div className="impact-copy"><SectionHeading eyebrow={site.impact.eyebrow} title={site.impact.title} number="03" /><p>{site.impact.body}</p></div>
      <div className="metrics">
        {site.impact.metrics.map((metric) => <div className="metric" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
      </div>
    </section>
  );
}

function getTeamGroups(): TeamGroup[] {
  return site.team.variant === "groups" ? site.team.groups : [{ name: site.team.title, description: "", members: site.team.members }];
}

function MemberCard({ member, index = 0, compact = false }: { member: TeamMember; index?: number; compact?: boolean }) {
  return (
    <article className={`member-card${compact ? " member-card--compact" : ""}`}>
      <div className={`member-image member-image--${(index % 3) + 1}`}>
        {member.image ? <img src={member.image.src} alt={member.image.alt} /> : <span role="img" aria-label={`Iniciais de ${member.name}`}>{member.initials}</span>}
      </div>
      <div className="member-copy"><h3>{member.name}</h3><p className="member-role">{member.role}</p><p className="member-detail">{member.detail}</p></div>
    </article>
  );
}

function TeamSection({ layout = "cards" }: { layout?: "cards" | "rows" | "grouped" }) {
  const groups = getTeamGroups();
  return (
    <section className={`team team--${layout}`} id="people">
      <SectionHeading eyebrow={site.team.eyebrow} title={site.team.title} number="04" />
      <div className="team-groups">
        {groups.map((group, groupIndex) => <section className="team-group" key={`${group.name}-${groupIndex}`} aria-label={group.name}>
          {groups.length > 1 && <header className="team-group-heading"><h3>{group.name}</h3>{group.description && <p>{group.description}</p>}</header>}
          <div className={`member-list member-list--${layout}`}>
            {group.members.map((member, index) => layout === "rows" ? (
              <article className="member-row" key={`${member.name}-${index}`}><span className="member-row-number">{String(index + 1).padStart(2, "0")}</span><span className="member-row-initials" aria-hidden="true">{member.initials}</span><h3>{member.name}</h3><span>{member.role}</span><span>{member.detail}</span></article>
            ) : <MemberCard key={`${member.name}-${index}`} member={member} index={index} compact={layout === "grouped"} />)}
          </div>
        </section>)}
      </div>
    </section>
  );
}

function SearchableTeam() {
  const [query, setQuery] = useState("");
  const members = getTeamGroups().flatMap((group) => group.members.map((member) => ({ ...member, group: group.name })));
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const filtered = members.filter((member) => `${member.name} ${member.role} ${member.detail} ${member.group}`.toLocaleLowerCase("pt-BR").includes(normalizedQuery));

  return (
    <section className="team team--directory" id="people">
      <SectionHeading eyebrow={site.team.eyebrow} title={site.team.title} number="04" />
      <label className="directory-search-label" htmlFor="team-search">Busque por pessoa, equipe ou área de atuação</label>
      <input id="team-search" className="directory-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: direitos fundamentais" />
      <p className="directory-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "integrante encontrado" : "integrantes encontrados"}</p>
      <div className="directory-results">
        {filtered.map((member, index) => <article className="directory-row" key={`${member.group}-${member.name}-${index}`}>
          <MemberCard member={member} index={index} compact />
          <span className="directory-group">{member.group}</span>
        </article>)}
        {filtered.length === 0 && <p className="directory-empty">Nenhum integrante corresponde à busca. Tente outro termo.</p>}
      </div>
    </section>
  );
}

function ContactForm() {
  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const target = new URL(`mailto:${site.contact.email}?subject=${encodeURIComponent(`Contato pelo site: ${String(data.get("name") ?? "").trim()}`)}&body=${encodeURIComponent(`Nome: ${String(data.get("name") ?? "").trim()}\nE-mail: ${String(data.get("email") ?? "").trim()}\n\n${String(data.get("message") ?? "").trim()}`)}`);
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
      <label htmlFor="inquiry-name">Seu nome</label><input id="inquiry-name" name="name" autoComplete="name" required />
      <label htmlFor="inquiry-email">Seu e-mail</label><input id="inquiry-email" name="email" type="email" autoComplete="email" required />
      <label htmlFor="inquiry-message">Como podemos ajudar?</label><textarea id="inquiry-message" name="message" rows={4} required />
      <button className="button button--primary" type="submit">Preparar e-mail ↗</button>
      <p className="form-note">O envio abre um rascunho no seu aplicativo de e-mail. O site não envia nem armazena mensagens.</p>
    </form>
  );
}

function ContactSection({ layout = "split" }: { layout?: "split" | "banner" | "compact" }) {
  return (
    <section className={`contact contact--${layout}`} id="contact">
      <div className="contact-copy"><SectionHeading eyebrow={site.contact.eyebrow} title={site.contact.title} number="05" /><p>{site.contact.body}</p>
        <address>{site.contact.address}</address>
        <div className="contact-links"><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a><a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}>{site.contact.phone}</a></div>
      </div>
      {site.contact.variant === "form" ? <ContactForm /> : <div className="contact-direct"><span>Prefere falar diretamente?</span><a className="button button--primary" href={`mailto:${site.contact.email}`}>Escreva para nossa equipe ↗</a></div>}
    </section>
  );
}

function SiteFooter({ variant }: { variant: string }) {
  return <footer className={`site-footer footer--${variant}`}><Brand /><span>© {new Date().getFullYear()} {site.organization}. Todos os direitos reservados.</span><a href="#top">Voltar ao topo ↑</a></footer>;
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

export function SiteTemplateView({ template, showControls, mode, onToggleMode, onBack, onSelect, selected }: PreviewProps) {
  const templateName = templateOptions.find((option) => option.id === template)?.name ?? "Modelo";
  const SelectedSite = {
    editorial: EditorialSite,
    mosaic: MosaicSite,
    journal: JournalSite,
    community: CommunitySite,
    campaign: CampaignSite,
  }[template];

  return (
    <div className="preview-screen">
      {showControls ? <>
        <a className="skip-link" href="#main">Pular para o conteúdo</a>
        <section className="preview-toolbar" aria-label="Controles da pré-visualização">
          <button className="back-button" type="button" onClick={onBack}>← Todos os modelos</button>
          <p>Pré-visualização · <strong>{templateName}</strong></p>
          <button className="choose-button" type="button" aria-pressed={selected} onClick={onSelect}>{selected ? "Selecionado no catálogo ✓" : "Escolher este modelo"}</button>
        </section>
      </> : <a className="skip-link" href="#main">Pular para o conteúdo</a>}
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
  const selectedName = templateOptions.find((option) => option.id === selected)?.name ?? selected;
  return (
    <>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <main className="template-gallery" id="main">
      <header className="gallery-header"><Brand href="#gallery-title" /><ThemeToggle mode={mode} onToggleMode={onToggleMode} /></header>
      <section className="gallery-intro" aria-labelledby="gallery-title">
        <p className="eyebrow">Catálogo de modelos · {templateOptions.length} direções visuais</p>
        <h1 id="gallery-title">Um bom site começa com a estrutura certa.</h1>
        <p>Compare experiências completas — da organização das informações às ferramentas de contato — e escolha o ponto de partida para cada cliente.</p>
      </section>
      <p className="selection-status" aria-live="polite">Modelo escolhido: <strong>{selectedName}</strong>. A escolha nesta galeria é temporária.</p>
      <section className="template-grid" aria-label="Modelos disponíveis">
        {templateOptions.map((option, index) => <article className={`template-card${selected === option.id ? " template-card--selected" : ""}`} key={option.id}>
          <GalleryPreview id={option.id} />
          <div className="template-card-copy">
            <p className="template-style">{String(index + 1).padStart(2, "0")} · {option.style}</p>
            <h2>{option.name}</h2>
            <p>{option.promise}</p>
            <ul>{option.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <div className="template-card-actions">
              <button className="button button--primary" type="button" onClick={() => onPreview(option.id)}>Ver site completo ↗</button>
              <button className="select-link" type="button" aria-pressed={selected === option.id} onClick={() => onSelect(option.id)}>{selected === option.id ? "Escolhido ✓" : "Escolher"}</button>
            </div>
          </div>
        </article>)}
      </section>
      <footer className="gallery-footer"><p>Personalize os modelos em <code>src/site.ts</code>. Para publicar o escolhido, defina <code>theme.template: "{selected}"</code> e <code>theme.showGallery: false</code>; a galeria é apenas para comparar e selecionar.</p></footer>
    </main>
    </>
  );
}
