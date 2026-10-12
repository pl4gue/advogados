import { useEffect, useState, type CSSProperties } from "react";
import { LocaleContext } from "./localization";
import { getSiteContent, site, type ColorMode, type Language, type SiteTemplateId } from "./site";
import { SiteTemplateView, TemplateGallery } from "./SiteTemplates";
import "./styles.css";

export default function App() {
  const [systemDark, setSystemDark] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [modeOverride, setModeOverride] = useState<Exclude<ColorMode, "system"> | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<SiteTemplateId | null>(site.theme.showGallery ? null : site.theme.template);
  const [selectedTemplate, setSelectedTemplate] = useState<SiteTemplateId>(site.theme.template);
  const [language, setLanguage] = useState<Language>("pt");
  const content = getSiteContent(language);
  const mode = modeOverride ?? (site.theme.mode === "system" ? systemDark ? "dark" : "light" : site.theme.mode);
  const palette = site.theme.palette[mode];
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = `${content.organization} — ${content.tagline}`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = content.hero.description;
  }, [content.hero.description, content.organization, content.tagline, language]);
  const paletteStyle = {
    "--paper": palette.background,
    "--surface": palette.surface,
    "--surface-alt": palette.surfaceAlt,
    "--ink": palette.text,
    "--muted": palette.muted,
    "--green": palette.primary,
    "--on-primary": palette.onPrimary,
    "--line": palette.border,
    "--accent": palette.accent,
  } as CSSProperties;

  useEffect(() => {
    if (site.theme.mode !== "system") return;
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const syncMode = () => setSystemDark(preference.matches);
    syncMode();
    preference.addEventListener("change", syncMode);
    return () => preference.removeEventListener("change", syncMode);
  }, []);

  function toggleMode() {
    setModeOverride(mode === "dark" ? "light" : "dark");
  }

  function chooseTemplate(template: SiteTemplateId) {
    setSelectedTemplate(template);
    setActiveTemplate(null);
  }

  return (
    <LocaleContext.Provider value={{ language, setLanguage }}>
      <div className="app-shell" data-mode={mode} style={paletteStyle}>
      {activeTemplate ? (
        <SiteTemplateView
          template={activeTemplate}
          showControls={site.theme.showGallery}
          mode={mode}
          selected={selectedTemplate === activeTemplate}
          onToggleMode={toggleMode}
          onBack={() => setActiveTemplate(null)}
          onSelect={() => chooseTemplate(activeTemplate)}
        />
      ) : (
        <TemplateGallery
          mode={mode}
          selected={selectedTemplate}
          onToggleMode={toggleMode}
          onPreview={setActiveTemplate}
          onSelect={setSelectedTemplate}
        />
      )}
      </div>
    </LocaleContext.Provider>
  );
}
