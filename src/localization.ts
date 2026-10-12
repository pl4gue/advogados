import { createContext, useContext } from "react";
import { getSiteContent, type Language } from "./site";

interface LocaleContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LocaleContext = createContext<LocaleContextValue>({
  language: "pt",
  setLanguage: () => {},
});

export const messages = {
  pt: {
    switchToEnglish: "Mudar idioma para inglês",
    switchToPortuguese: "Mudar idioma para português",
    skipToContent: "Pular para o conteúdo principal",
    themeLight: "Ativar modo claro",
    themeDark: "Ativar modo escuro",
    home: (name: string) => `Início: ${name}`,
    mainNavigation: "Navegação principal",
    mosaicContact: "Fale com a equipe",
    journalReadWork: "Leia sobre nossa atuação",
    communityFindGuidance: "Encontre orientação",
    communityMeetTeam: "Conheça quem pode ajudar",
    workContact: (title: string) => `Converse sobre ${title}`,
    workLearnMore: "Saber mais",
    teamSearchLabel: "Busque por pessoa, equipe ou área de atuação",
    teamSearchPlaceholder: "Ex.: direitos fundamentais",
    teamResultCount: (count: number) => `${count} ${count === 1 ? "integrante encontrado" : "integrantes encontrados"}`,
    teamNoResults: "Nenhum integrante corresponde à busca. Tente outro termo.",
    initialsFor: (name: string) => `Iniciais de ${name}`,
    contactName: "Seu nome",
    contactEmail: "Seu e-mail",
    contactMessage: "Como podemos ajudar?",
    prepareEmail: "Preparar e-mail",
    emailNote: "O envio abre um rascunho no seu aplicativo de e-mail. O site não envia nem armazena mensagens.",
    emailSubject: "Contato pelo site",
    directContact: "Prefere falar diretamente?",
    writeToTeam: "Escreva para nossa equipe",
    rightsReserved: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
    premiumApproach: "Conheça nossa abordagem",
    previewControls: "Controles da pré-visualização",
    backToModels: "Todos os modelos",
    previewLabel: "Pré-visualização",
    selectedInCatalog: "Selecionado no catálogo",
    chooseTemplate: "Escolher este modelo",
    choose: "Escolher",
    chosen: "Escolhido",
    modelFallback: "Modelo",
    galleryEyebrow: (count: number) => `Catálogo de modelos · ${count} direções visuais`,
    galleryTitle: "Um bom site começa com a estrutura certa.",
    galleryDescription: "Compare experiências completas — da organização das informações às ferramentas de contato — e escolha o ponto de partida para cada cliente.",
    selectionStatus: (name: string) => `Modelo escolhido: ${name}. A escolha nesta galeria é temporária.`,
    availableModels: "Modelos disponíveis",
    viewFullSite: "Ver site completo",
    galleryFooter: (selected: string) => `Personalize os modelos em src/site.ts. Para publicar o escolhido, defina theme.template: "${selected}" e theme.showGallery: false; a galeria é apenas para comparar e selecionar.`,
  },
  en: {
    switchToEnglish: "Switch language to English",
    switchToPortuguese: "Switch language to Portuguese",
    skipToContent: "Skip to main content",
    themeLight: "Switch to light mode",
    themeDark: "Switch to dark mode",
    home: (name: string) => `Home: ${name}`,
    mainNavigation: "Main navigation",
    mosaicContact: "Talk to our team",
    journalReadWork: "Read about our work",
    communityFindGuidance: "Find guidance",
    communityMeetTeam: "Meet the people who can help",
    workContact: (title: string) => `Ask about ${title}`,
    workLearnMore: "Learn more",
    teamSearchLabel: "Search by person, team, or practice area",
    teamSearchPlaceholder: "E.g. fundamental rights",
    teamResultCount: (count: number) => `${count} ${count === 1 ? "team member found" : "team members found"}`,
    teamNoResults: "No team members match your search. Try another term.",
    initialsFor: (name: string) => `Initials for ${name}`,
    contactName: "Your name",
    contactEmail: "Your email",
    contactMessage: "How can we help?",
    prepareEmail: "Prepare email",
    emailNote: "This opens a draft in your email app. The site does not send or store messages.",
    emailSubject: "Website inquiry",
    directContact: "Prefer to speak directly?",
    writeToTeam: "Email our team",
    rightsReserved: "All rights reserved.",
    backToTop: "Back to top",
    premiumApproach: "Discover our approach",
    previewControls: "Preview controls",
    backToModels: "All templates",
    previewLabel: "Preview",
    selectedInCatalog: "Selected in catalog",
    chooseTemplate: "Choose this template",
    choose: "Choose",
    chosen: "Selected",
    modelFallback: "Template",
    galleryEyebrow: (count: number) => `Template catalog · ${count} visual directions`,
    galleryTitle: "A great website starts with the right structure.",
    galleryDescription: "Compare complete experiences—from information architecture to contact tools—and choose a starting point for each client.",
    selectionStatus: (name: string) => `Selected template: ${name}. This gallery selection is temporary.`,
    availableModels: "Available templates",
    viewFullSite: "View full site",
    galleryFooter: (selected: string) => `Customize templates in src/site.ts. To publish the selected one, set theme.template: "${selected}" and theme.showGallery: false; use the gallery only to compare and select.`,
  },
} satisfies Record<Language, Record<string, unknown>>;

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}

export function useMessages() {
  const { language } = useLocale();
  return messages[language];
}

export function useSiteContent() {
  const { language } = useLocale();
  return getSiteContent(language);
}
