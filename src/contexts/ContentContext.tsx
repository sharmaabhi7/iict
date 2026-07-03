import React, { createContext, useContext, useState, useEffect } from "react";
import defaultContent from "../data/siteContent.json";

export interface GlobalSettings {
  siteName: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  keywords: string;
}

export interface HeroSettings {
  title: string;
  subtitle: string;
  description: string;
}

export interface PageContent {
  title: string;
  description: string;
  schemaDescription?: string;
}

export interface SiteContent {
  global: GlobalSettings;
  hero: HeroSettings;
  pages: {
    index: PageContent;
    about: PageContent;
    blog: PageContent;
    cplTraining: PageContent;
    caseStudies: PageContent;
    contact: PageContent;
    gallery: PageContent;
    mbbsAbroad: PageContent;
    services: PageContent;
    studyAbroad: PageContent;
    testimonials: PageContent;
    n8nTraining: PageContent;
  };
}

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  resetContent: () => void;
  isDraft: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "iict_site_content_override";

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent as SiteContent);
  const [isDraft, setIsDraft] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep merge or validate could be added here, but simple overwrite is fine for our controlled schema
        setContent(parsed);
        setIsDraft(true);
      } catch (e) {
        console.error("Error loading cached site content", e);
      }
    }
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));
    setIsDraft(true);
  };

  const resetContent = () => {
    setContent(defaultContent as SiteContent);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setIsDraft(false);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isDraft }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
