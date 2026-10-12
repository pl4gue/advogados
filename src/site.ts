export type TeamVariant = "portraits" | "list" | "groups";
export type SiteTemplateId = "editorial" | "mosaic" | "journal" | "community" | "campaign" | "premium";
export type Language = "pt" | "en";
export type ColorMode = "system" | "light" | "dark";

export interface ThemePalette {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  muted: string;
  primary: string;
  onPrimary: string;
  border: string;
  accent: string;
}

export interface SiteTheme {
  template: SiteTemplateId;
  showGallery: boolean;
  mode: ColorMode;
  palette: { light: ThemePalette; dark: ThemePalette };
}

export interface TeamMember {
  name: string;
  role: string;
  detail: string;
  initials: string;
  image?: { src: string; alt: string };
}

export interface TeamGroup {
  name: string;
  description: string;
  members: TeamMember[];
}

type TeamSection = {
  eyebrow: string;
  title: string;
} & (
  | { variant: "portraits" | "list"; members: TeamMember[]; groups?: TeamGroup[] }
  | { variant: "groups"; groups: TeamGroup[]; members?: TeamMember[] }
);
export type ContactVariant = "form" | "direct";

export interface SiteContent {
  organization: string;
  tagline: string;
  navigation: { about: string; work: string; people: string; contact: string };
  hero: { imageAlt: string; eyebrow: string; title: string; description: string; primaryCta: string; secondaryCta: string };
  introduction: { eyebrow: string; title: string; body: string; note: string };
  work: { eyebrow: string; title: string; items: { number: string; title: string; description: string }[] };
  impact: { eyebrow: string; title: string; body: string; metrics: { value: string; label: string }[] };
  team: TeamSection;
  contact: { variant: ContactVariant; eyebrow: string; title: string; body: string; email: string; phone: string; address: string };
}

export interface SiteConfig extends SiteContent {
  theme: SiteTheme;
  logo?: { src: string; alt: string };
  hero: SiteContent["hero"] & { imageSrc: string };
  translations: { en: SiteContent };
}

// Personalize all identity, copy, contact details, and supported layouts here.
export const site: SiteConfig = {
  organization: "Advocacia",
    logo: { src: "/images/logo.png", alt: ""},
  tagline: "Orientação segura para um futuro mais justo.",
  theme: {
    // Escolha um modelo: "editorial" | "mosaic" | "journal" | "community" | "campaign" | "premium".
    template: "editorial",
    showGallery: true,
    mode: "system",
    palette: {
      light: {
        background: "#f7f5ef",
        surface: "#fffdf8",
        surfaceAlt: "#ecebe3",
        text: "#202c27",
        muted: "#68716b",
        primary: "#34594b",
        onPrimary: "#ffffff",
        border: "#d9d8ce",
        accent: "#bb7048",
      },
      dark: {
        background: "#141b18",
        surface: "#1d2722",
        surfaceAlt: "#232f29",
        text: "#f1f3ee",
        muted: "#b2beb5",
        primary: "#9bc3a9",
        onPrimary: "#132018",
        border: "#3c4a41",
        accent: "#efb486",
      },
    },
  },
  navigation: { about: "Como atuamos", work: "Áreas de atuação", people: "Nossa equipe", contact: "Contato" },
  hero: {
    imageSrc: "/images/hero-community.svg",
    imageAlt: "Ilustração panorâmica de pessoas reunidas em uma praça com árvores e edifícios cívicos.",
    eyebrow: "Escuta atenta. Atuação com propósito.",
    title: "Ao seu lado nos momentos que mais importam.",
    description: "Apoiamos pessoas e comunidades diante de decisões importantes, com orientação clara, cuidado genuíno e compromisso com mudanças duradouras.",
    primaryCta: "Converse com nossa equipe",
    secondaryCta: "Conheça nossa atuação",
  },
  introduction: {
    eyebrow: "Pessoas em primeiro lugar",
    title: "Uma boa orientação começa pela escuta.",
    body: "As questões que chegam até nós raramente são simples. Por isso, entendemos cada contexto, explicamos os caminhos possíveis e seguimos ao seu lado em cada etapa.",
    note: "Estratégia cuidadosa. Respostas honestas. Parceria de verdade.",
  },
  work: {
    eyebrow: "Nossa atuação",
    title: "Conhecimento técnico com olhar humano.",
    items: [
      { number: "01", title: "Direitos fundamentais", description: "Defesa da dignidade e da igualdade nos espaços em que as pessoas vivem, trabalham e aprendem." },
      { number: "02", title: "Advocacia comunitária", description: "Apoio a comunidades para que se organizem, sejam ouvidas e participem das decisões que as afetam." },
      { number: "03", title: "Litigância de interesse público", description: "Atuação estratégica no Judiciário quando a construção de mudanças exige medidas judiciais." },
      { number: "04", title: "Assessoria estratégica", description: "Orientação clara para organizações que trabalham por um futuro mais justo e resiliente." },
    ],
  },
  impact: {
    eyebrow: "Atuação na prática",
    title: "Avançar é construir em conjunto.",
    body: "Unimos rigor jurídico à convicção de que as pessoas mais próximas de cada questão devem participar das soluções. Assim, conquistas individuais podem abrir caminho para mudanças duradouras.",
    metrics: [
      { value: "18", label: "anos de atuação" },
      { value: "240+", label: "casos acompanhados" },
      { value: "12", label: "parcerias comunitárias" },
    ],
  },
  team: {
    variant: "portraits",
    eyebrow: "Ao seu lado",
    title: "Uma equipe presente em cada etapa.",
        members: [
          { name: "Maya Chen", role: "Sócia-fundadora", detail: "Direitos fundamentais", initials: "MC" },
          { name: "Amara Okafor", role: "Advogada sênior", detail: "Litigância de interesse público", initials: "AO" },
          { name: "Jordan Ellis", role: "Sócio", detail: "Advocacia comunitária", initials: "JE" },
        ],
    groups: [
      {
        name: "Direitos fundamentais e litígios",
        description: "Atuação jurídica e contenciosa para defender direitos e construir mudanças duradouras.",
        members: [
          { name: "Maya Chen", role: "Sócia-fundadora", detail: "Direitos fundamentais", initials: "MC" },
          { name: "Amara Okafor", role: "Advogada sênior", detail: "Litigância de interesse público", initials: "AO" },
        ],
      },
      {
        name: "Advocacia comunitária",
        description: "Parceria próxima com comunidades e organizações em todas as etapas da atuação.",
        members: [
          { name: "Jordan Ellis", role: "Sócio", detail: "Advocacia comunitária", initials: "JE" },
        ],
      },
    ],
  },
  contact: {
    variant: "form",
    eyebrow: "Vamos conversar",
    title: "Conte um pouco sobre o que você precisa.",
    body: "Uma primeira conversa ajuda a entender sua necessidade e avaliar se somos a equipe certa para apoiar você.",
    email: "viniciuslucianocardoso@gmail.com",
    phone: "+55 (48) 99854-2393",
    address: "Rua das Palmeiras, 218, cj. 404\nSão Paulo — SP, 01310-100",
  },
  translations: {
    en: {
      organization: "Law Office",
      tagline: "Trusted guidance for a fairer future.",
      navigation: { about: "How we work", work: "Practice areas", people: "Our team", contact: "Contact" },
      hero: {
        imageAlt: "Panoramic illustration of people gathered in a plaza with trees and civic buildings.",
        eyebrow: "Attentive listening. Purposeful advocacy.",
        title: "By your side when it matters most.",
        description: "We support people and communities through important decisions with clear guidance, genuine care, and a commitment to lasting change.",
        primaryCta: "Talk with our team",
        secondaryCta: "Explore our work",
      },
      introduction: {
        eyebrow: "People first",
        title: "Good guidance begins with listening.",
        body: "The issues people bring to us are rarely simple. We take time to understand each situation, explain the available paths, and stand by your side at every step.",
        note: "Thoughtful strategy. Honest answers. A true partnership.",
      },
      work: {
        eyebrow: "Our work",
        title: "Legal expertise with a human perspective.",
        items: [
          { number: "01", title: "Fundamental rights", description: "Defending dignity and equality where people live, work, and learn." },
          { number: "02", title: "Community advocacy", description: "Helping communities organize, be heard, and take part in decisions that affect them." },
          { number: "03", title: "Public-interest litigation", description: "Strategic court action when lasting change requires legal measures." },
          { number: "04", title: "Strategic counsel", description: "Clear guidance for organizations working toward a fairer, more resilient future." },
        ],
      },
      impact: {
        eyebrow: "Our work in action",
        title: "Progress is built together.",
        body: "We pair legal rigor with the belief that people closest to an issue should help shape its solutions. That way, individual wins can open the door to lasting change.",
        metrics: [
          { value: "18", label: "years of practice" },
          { value: "240+", label: "cases supported" },
          { value: "12", label: "community partnerships" },
        ],
      },
      team: {
        variant: "portraits",
        eyebrow: "By your side",
        title: "A team with you at every step.",
        members: [
          { name: "Maya Chen", role: "Founding partner", detail: "Fundamental rights", initials: "MC" },
          { name: "Amara Okafor", role: "Senior attorney", detail: "Public-interest litigation", initials: "AO" },
          { name: "Jordan Ellis", role: "Partner", detail: "Community advocacy", initials: "JE" },
        ],
        groups: [
          {
            name: "Fundamental rights and litigation",
            description: "Legal and litigation support to defend rights and build lasting change.",
            members: [
              { name: "Maya Chen", role: "Founding partner", detail: "Fundamental rights", initials: "MC" },
              { name: "Amara Okafor", role: "Senior attorney", detail: "Public-interest litigation", initials: "AO" },
            ],
          },
          {
            name: "Community advocacy",
            description: "Close partnerships with communities and organizations through every step of the work.",
            members: [
              { name: "Jordan Ellis", role: "Partner", detail: "Community advocacy", initials: "JE" },
            ],
          },
        ],
      },
      contact: {
        variant: "form",
        eyebrow: "Let's talk",
        title: "Tell us a little about what you need.",
        body: "A first conversation helps us understand your needs and decide whether we're the right team to support you.",
        email: "viniciuslucianocardoso@gmail.com",
        phone: "+55 (48) 99854-2393",
        address: "Rua das Palmeiras, 218, cj. 404\nSão Paulo — SP, 01310-100",
      },
    },
  },
};

export function getSiteContent(language: Language): SiteContent {
  return language === "en" ? site.translations.en : site;
}
