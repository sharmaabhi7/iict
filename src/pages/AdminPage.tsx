import React, { useState, useEffect } from "react";
import { useContent, SiteContent } from "../contexts/ContentContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Save, 
  RefreshCw, 
  Github, 
  Globe, 
  LayoutGrid, 
  Phone, 
  Mail, 
  MapPin, 
  Key, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Sparkles,
  Link,
  Lock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

export default function AdminPage() {
  const { content, updateContent, resetContent, isDraft } = useContent();
  const [formState, setFormState] = useState<SiteContent | null>(null);

  // GitHub Auth States
  const [ghToken, setGhToken] = useState("");
  const [ghRepo, setGhRepo] = useState("sharmaabhi7/iict");
  const [ghBranch, setGhBranch] = useState("main");
  const [ghCommitMsg, setGhCommitMsg] = useState("chore: update website content via admin panel");
  
  // Publishing States
  const [isPublishing, setIsPublishing] = useState(false);
  const [pubStatus, setPubStatus] = useState<{ type: "success" | "error" | "info" | null; msg: string }>({ type: null, msg: "" });

  useEffect(() => {
    if (content) {
      setFormState(JSON.parse(JSON.stringify(content))); // Deep copy
    }
  }, [content]);

  // Load GitHub settings from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("iict_gh_token") || "";
    const savedRepo = localStorage.getItem("iict_gh_repo") || "sharmaabhi7/iict";
    const savedBranch = localStorage.getItem("iict_gh_branch") || "main";
    
    setGhToken(savedToken);
    setGhRepo(savedRepo);
    setGhBranch(savedBranch);
  }, []);

  // Google Sheets integration States
  const [sheetsWebhook, setSheetsWebhook] = useState("");
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);

  // Load Google Sheets / Leads settings on mount
  useEffect(() => {
    const savedWebhook = localStorage.getItem("iict_google_sheets_webhook") || "";
    setSheetsWebhook(savedWebhook);
    
    const savedLeads = JSON.parse(localStorage.getItem("iict_leads") || "[]");
    setLeads(savedLeads);
  }, []);

  const handleSaveSheetsWebhook = () => {
    localStorage.setItem("iict_google_sheets_webhook", sheetsWebhook.trim());
    toast.success("Google Sheets Webhook URL saved successfully!");
  };

  const handleTestWebhook = async () => {
    if (!sheetsWebhook.trim()) {
      toast.error("Please enter a Google Sheets Webhook URL first.");
      return;
    }
    setIsTestingWebhook(true);
    try {
      const searchParams = new URLSearchParams();
      searchParams.append("timestamp", new Date().toLocaleString());
      searchParams.append("name", "Test Lead (Admin Panel)");
      searchParams.append("email", "test@iict-india.org");
      searchParams.append("phone", "+91 99999 99999");
      searchParams.append("whatsapp", "+91 99999 99999");
      searchParams.append("country", "Italy (Test)");
      searchParams.append("program", "MBBS Abroad (Test)");
      searchParams.append("message", "This is a test submission from the Admin panel to check integration.");

      await fetch(sheetsWebhook.trim(), {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: searchParams.toString(),
      });
      
      toast.success("Test request sent! Check your Google Sheet to verify the new row.", {
        duration: 5000,
      });
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to execute test request: " + (err.message || "Unknown error"));
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const handleDownloadLeads = () => {
    const jsonString = JSON.stringify(leads, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "captured_leads.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Leads JSON downloaded!");
  };

  const handleClearLeads = () => {
    if (window.confirm("Are you sure you want to permanently delete all locally captured registration leads? This action cannot be undone.")) {
      localStorage.removeItem("iict_leads");
      setLeads([]);
      toast.info("Local leads database cleared.");
    }
  };

  if (!formState) return null;

  const handleGlobalChange = (key: keyof typeof formState.global, value: string) => {
    setFormState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        global: {
          ...prev.global,
          [key]: value
        }
      };
    });
  };

  const handleHeroChange = (key: keyof typeof formState.hero, value: string) => {
    setFormState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        hero: {
          ...prev.hero,
          [key]: value
        }
      };
    });
  };

  const handlePageSEOChange = (pageKey: keyof typeof formState.pages, key: "title" | "description" | "schemaDescription", value: string) => {
    setFormState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        pages: {
          ...prev.pages,
          [pageKey]: {
            ...prev.pages[pageKey],
            [key]: value
          }
        }
      };
    });
  };

  const handleSaveLocal = () => {
    updateContent(formState);
    toast.success("Preview Draft saved locally! The entire site is now showing these edits on your device.");
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to revert all changes to the site's default code configurations? This will clear your local draft.")) {
      resetContent();
      toast.info("Reverted website configurations to code defaults.");
    }
  };

  // GitHub Publish logic
  const handlePublishToGithub = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanToken = ghToken.trim();
    const cleanRepo = ghRepo.trim();
    const cleanBranch = ghBranch.trim();

    if (!cleanToken) {
      toast.error("Please provide a GitHub Personal Access Token to publish.");
      return;
    }

    // Save configuration settings
    localStorage.setItem("iict_gh_token", cleanToken);
    localStorage.setItem("iict_gh_repo", cleanRepo);
    localStorage.setItem("iict_gh_branch", cleanBranch);

    setIsPublishing(true);
    setPubStatus({ type: "info", msg: "Connecting to GitHub..." });

    const filePath = "src/data/siteContent.json";
    const contentUrl = `https://api.github.com/repos/${cleanRepo}/contents/${filePath}`;

    try {
      // Step 1: Fetch current file to get the SHA
      setPubStatus({ type: "info", msg: "Fetching current file metadata from repository..." });
      
      const getRes = await fetch(`${contentUrl}?ref=${cleanBranch}`, {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          Accept: "application/vnd.github.v3+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      let sha = "";
      if (getRes.status === 200) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      } else if (getRes.status === 401 || getRes.status === 403) {
        throw new Error("Authentication failed. Please verify your Personal Access Token is valid and has not expired.");
      } else if (getRes.status !== 404) {
        throw new Error(`Failed to fetch file metadata. Status: ${getRes.status} (Check your repository name and branch)`);
      }

      // Step 2: Safe Base64 Encoding
      setPubStatus({ type: "info", msg: "Encoding content configuration..." });
      const jsonString = JSON.stringify(formState, null, 2);
      const utf8Bytes = new TextEncoder().encode(jsonString);
      const base64Content = btoa(String.fromCharCode(...utf8Bytes));

      // Step 3: Put file (Commit)
      setPubStatus({ type: "info", msg: "Pushing commit directly to GitHub repository..." });
      
      const payload: any = {
        message: ghCommitMsg.trim(),
        content: base64Content,
        branch: cleanBranch,
      };

      if (sha) {
        payload.sha = sha;
      }

      const putRes = await fetch(contentUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify(payload),
      });

      if (!putRes.ok) {
        let errorMessage = `Git commit failed. Status: ${putRes.status}`;
        try {
          const errorData = await putRes.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseErr) {
          // Ignore parse errors
        }

        if (putRes.status === 404) {
          throw new Error(
            "Repository/file path not found, or token lacks write permission. " +
            "Please ensure your token has the 'repo' scope (classic PAT) or " +
            "'Contents: Read and write' permission (fine-grained PAT), " +
            "and that the repository name and branch are spelled correctly."
          );
        } else if (putRes.status === 403 || putRes.status === 401) {
          throw new Error(`Access forbidden or unauthorized: ${errorMessage}`);
        } else {
          throw new Error(errorMessage);
        }
      }

      setPubStatus({
        type: "success",
        msg: `Successfully published to GitHub! The file ${filePath} has been updated in the ${cleanBranch} branch. Your VPS deployment process will sync the changes shortly.`
      });
      toast.success("Changes published globally to your GitHub repository!");
    } catch (err: any) {
      console.error(err);
      setPubStatus({
        type: "error",
        msg: err.message || "An unexpected error occurred during publishing. Please verify your token and repo details."
      });
      toast.error("Global publish failed.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDownloadJSON = () => {
    const jsonString = JSON.stringify(formState, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "siteContent.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("siteContent.json downloaded! You can copy this file into your VPS project files under src/data/ to update manually.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      {/* Main Admin UI */}
      <div className="container py-12 px-4 max-w-7xl">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm tracking-widest uppercase mb-1">
              <Sparkles className="h-4 w-4" /> Admin Console
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Website Content Management
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Edit SEO metadata, descriptions, contact variables, and Hero content without a backend.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {isDraft && (
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900"
              >
                <RefreshCw className="h-4 w-4 mr-2" /> Reset Draft
              </Button>
            )}
            <Button 
              onClick={handleSaveLocal}
              className="bg-teal-600 hover:bg-teal-500 text-white font-semibold"
            >
              <Save className="h-4 w-4 mr-2" /> Save Local Preview
            </Button>
          </div>
        </div>

        {/* Info Banner for Local Overrides */}
        {isDraft && (
          <Alert className="bg-teal-950/40 border-teal-800 text-teal-200 mb-8 rounded-xl shadow-lg">
            <CheckCircle2 className="h-5 w-5 text-teal-400" />
            <AlertTitle className="font-bold text-teal-300">Active Preview Mode</AlertTitle>
            <AlertDescription className="text-xs">
              You are currently viewing a <strong>local preview</strong> of your changes. These changes are saved in your browser's LocalStorage and visible only to you on this device. To apply these changes globally for all visitors, go to the <strong>Publish Sync</strong> tab.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800/80 p-1 rounded-xl w-full grid grid-cols-2 md:flex md:w-auto overflow-x-auto gap-1">
            <TabsTrigger value="general" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-slate-400 font-semibold rounded-lg px-4">
              <LayoutGrid className="h-4 w-4 mr-2" /> General
            </TabsTrigger>
            <TabsTrigger value="hero" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-slate-400 font-semibold rounded-lg px-4">
              <Sparkles className="h-4 w-4 mr-2" /> Hero Section
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-slate-400 font-semibold rounded-lg px-4">
              <Globe className="h-4 w-4 mr-2" /> SEO Pages
            </TabsTrigger>
            <TabsTrigger value="sheets" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-slate-400 font-semibold rounded-lg px-4">
              <FileText className="h-4 w-4 mr-2" /> Google Sheets
            </TabsTrigger>
            <TabsTrigger value="publish" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-slate-400 font-semibold rounded-lg px-4">
              <Github className="h-4 w-4 mr-2" /> Publish Sync
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: GENERAL SETTINGS */}
          <TabsContent value="general" className="outline-none space-y-6">
            <Card className="bg-slate-900/60 border-slate-800 shadow-xl backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                  <LayoutGrid className="h-5 w-5 text-teal-400" /> Global Configurations
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Change general details that affect the entire website layout, telephone calls, address, and SEO default image.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      Website Name
                    </label>
                    <Input 
                      value={formState.global.siteName}
                      onChange={(e) => handleGlobalChange("siteName", e.target.value)}
                      className="bg-slate-950 border-slate-800 text-slate-100 focus:border-teal-500 focus:ring-teal-500 rounded-lg h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      Logo URL / Image Link
                    </label>
                    <Input 
                      value={formState.global.logoUrl}
                      onChange={(e) => handleGlobalChange("logoUrl", e.target.value)}
                      className="bg-slate-950 border-slate-800 text-slate-100 focus:border-teal-500 focus:ring-teal-500 rounded-lg h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-teal-500" /> Admissions Email
                    </label>
                    <Input 
                      value={formState.global.contactEmail}
                      onChange={(e) => handleGlobalChange("contactEmail", e.target.value)}
                      className="bg-slate-950 border-slate-800 text-slate-100 focus:border-teal-500 focus:ring-teal-500 rounded-lg h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-teal-500" /> Phone Number (e.g. +91-XXXXX XXXXX)
                    </label>
                    <Input 
                      value={formState.global.contactPhone}
                      onChange={(e) => handleGlobalChange("contactPhone", e.target.value)}
                      className="bg-slate-950 border-slate-800 text-slate-100 focus:border-teal-500 focus:ring-teal-500 rounded-lg h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    SEO Keywords (Comma Separated)
                  </label>
                  <Textarea 
                    value={formState.global.keywords}
                    onChange={(e) => handleGlobalChange("keywords", e.target.value)}
                    className="bg-slate-950 border-slate-800 text-slate-100 focus:border-teal-500 focus:ring-teal-500 rounded-lg"
                    rows={3}
                  />
                </div>

                <div className="border-t border-slate-800/80 pt-6">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-teal-500" /> Office Address Schema Coordinates
                  </h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 font-semibold">City (addressLocality)</label>
                      <Input 
                        value={formState.global.addressLocality}
                        onChange={(e) => handleGlobalChange("addressLocality", e.target.value)}
                        className="bg-slate-950 border-slate-800 text-slate-100 rounded-lg h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 font-semibold">State / Region (addressRegion)</label>
                      <Input 
                        value={formState.global.addressRegion}
                        onChange={(e) => handleGlobalChange("addressRegion", e.target.value)}
                        className="bg-slate-950 border-slate-800 text-slate-100 rounded-lg h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 font-semibold">Country Code (addressCountry)</label>
                      <Input 
                        value={formState.global.addressCountry}
                        onChange={(e) => handleGlobalChange("addressCountry", e.target.value)}
                        className="bg-slate-950 border-slate-800 text-slate-100 rounded-lg h-11"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: HERO SECTION */}
          <TabsContent value="hero" className="outline-none space-y-6">
            <Card className="bg-slate-900/60 border-slate-800 shadow-xl backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                  <Sparkles className="h-5 w-5 text-teal-400" /> Homepage Hero Copy
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Modify the main header texts that load on the front screen. Wrap words in brackets e.g. <code className="bg-slate-950 px-1.5 py-0.5 rounded text-teal-400 font-bold border border-slate-800">[text]</code> to highlight them in green.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Main Hero Title Heading
                  </label>
                  <Input 
                    value={formState.hero.title}
                    onChange={(e) => handleHeroChange("title", e.target.value)}
                    className="bg-slate-950 border-slate-800 text-slate-100 focus:border-teal-500 focus:ring-teal-500 rounded-lg h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Hero Subtitle (supports <code className="text-teal-400">[highlight]</code> brackets)
                  </label>
                  <Input 
                    value={formState.hero.subtitle}
                    onChange={(e) => handleHeroChange("subtitle", e.target.value)}
                    className="bg-slate-950 border-slate-800 text-slate-100 focus:border-teal-500 focus:ring-teal-500 rounded-lg h-11"
                  />
                  <p className="text-[10px] text-slate-500 italic mt-0.5">
                    Example: "Same as [Indian Budget]" will render "Same as" in dark and "Indian Budget" in custom theme green.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Short Description / Program Category List
                  </label>
                  <Input 
                    value={formState.hero.description}
                    onChange={(e) => handleHeroChange("description", e.target.value)}
                    className="bg-slate-950 border-slate-800 text-slate-100 focus:border-teal-500 focus:ring-teal-500 rounded-lg h-11"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: PAGES SEO METADATA */}
          <TabsContent value="seo" className="outline-none space-y-6">
            <Card className="bg-slate-900/60 border-slate-800 shadow-xl backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                  <Globe className="h-5 w-5 text-teal-400" /> SEO Metadata & Pages copy
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Select a page to customize its browser title, search engine meta description, and schema details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <Tabs defaultValue="index" className="w-full flex flex-col md:flex-row gap-6">
                  {/* Vertical Page Selector */}
                  <TabsList className="bg-slate-950 border border-slate-800 p-1.5 rounded-xl flex flex-col items-start gap-1 w-full md:w-56 shrink-0 h-auto self-start">
                    <TabsTrigger value="index" className="w-full justify-start rounded-lg text-xs font-bold py-2 px-3 text-slate-400 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                      Home Page (Index)
                    </TabsTrigger>
                    <TabsTrigger value="about" className="w-full justify-start rounded-lg text-xs font-bold py-2 px-3 text-slate-400 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                      About Us
                    </TabsTrigger>
                    <TabsTrigger value="studyAbroad" className="w-full justify-start rounded-lg text-xs font-bold py-2 px-3 text-slate-400 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                      Study Abroad
                    </TabsTrigger>
                    <TabsTrigger value="mbbsAbroad" className="w-full justify-start rounded-lg text-xs font-bold py-2 px-3 text-slate-400 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                      MBBS Abroad
                    </TabsTrigger>
                    <TabsTrigger value="cplTraining" className="w-full justify-start rounded-lg text-xs font-bold py-2 px-3 text-slate-400 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                      CPL Training
                    </TabsTrigger>
                    <TabsTrigger value="blog" className="w-full justify-start rounded-lg text-xs font-bold py-2 px-3 text-slate-400 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                      Blog
                    </TabsTrigger>
                    <TabsTrigger value="caseStudies" className="w-full justify-start rounded-lg text-xs font-bold py-2 px-3 text-slate-400 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                      Case Studies
                    </TabsTrigger>
                    <TabsTrigger value="testimonials" className="w-full justify-start rounded-lg text-xs font-bold py-2 px-3 text-slate-400 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                      Testimonials
                    </TabsTrigger>
                    <TabsTrigger value="contact" className="w-full justify-start rounded-lg text-xs font-bold py-2 px-3 text-slate-400 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                      Contact
                    </TabsTrigger>
                    <TabsTrigger value="gallery" className="w-full justify-start rounded-lg text-xs font-bold py-2 px-3 text-slate-400 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                      Gallery
                    </TabsTrigger>
                  </TabsList>

                  {/* Page forms map */}
                  <div className="flex-grow space-y-6">
                    {(Object.keys(formState.pages) as Array<keyof typeof formState.pages>).map((pageKey) => (
                      <TabsContent key={pageKey} value={pageKey} className="outline-none space-y-4">
                        <div className="bg-slate-950/40 p-4 border border-slate-800/60 rounded-xl mb-4">
                          <span className="text-[10px] font-black uppercase text-teal-400 tracking-wider">Page Key</span>
                          <h4 className="text-sm font-bold text-white uppercase">{pageKey} PAGE</h4>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            SEO Page Title
                          </label>
                          <Input 
                            value={formState.pages[pageKey].title}
                            onChange={(e) => handlePageSEOChange(pageKey, "title", e.target.value)}
                            className="bg-slate-950 border-slate-800 text-slate-100 rounded-lg h-11"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            SEO Meta Description (Recommended under 160 chars)
                          </label>
                          <Textarea 
                            value={formState.pages[pageKey].description}
                            onChange={(e) => handlePageSEOChange(pageKey, "description", e.target.value)}
                            className="bg-slate-950 border-slate-800 text-slate-100 rounded-lg"
                            rows={4}
                          />
                          <p className="text-[10px] text-slate-500 text-right">
                            {formState.pages[pageKey].description.length} characters
                          </p>
                        </div>

                        {"schemaDescription" in formState.pages[pageKey] && (
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              Schema Markup Description
                            </label>
                            <Textarea 
                              value={(formState.pages[pageKey] as any).schemaDescription || ""}
                              onChange={(e) => handlePageSEOChange(pageKey, "schemaDescription", e.target.value)}
                              className="bg-slate-950 border-slate-800 text-slate-100 rounded-lg"
                              rows={3}
                            />
                          </div>
                        )}
                      </TabsContent>
                    ))}
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: PUBLISH / GITHUB SYNC */}
          <TabsContent value="publish" className="outline-none space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              
              {/* GitHub Credentials Form */}
              <Card className="bg-slate-900/60 border-slate-800 shadow-xl backdrop-blur-sm rounded-2xl lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                    <Github className="h-5 w-5 text-teal-400" /> Push Commit to GitHub
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">
                    Commit the updated config file (<code className="text-teal-400">siteContent.json</code>) directly to your project repository on GitHub. This will trigger your VPS deploy hook or automatic rebuild.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePublishToGithub} className="space-y-5">
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5 text-slate-500" /> GitHub Personal Access Token (Classic or Fine-grained)
                      </label>
                      <Input 
                        type="password"
                        placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxx"
                        value={ghToken}
                        onChange={(e) => setGhToken(e.target.value)}
                        className="bg-slate-950 border-slate-800 text-slate-100 rounded-lg h-11"
                        required
                      />
                      <p className="text-[10px] text-slate-500">
                        Create a token with <code className="bg-slate-950 px-1 py-0.5 rounded">repo</code> permissions on GitHub. It is saved only in your local browser storage.
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Link className="h-3.5 w-3.5 text-slate-500" /> Repository Name (owner/repo)
                        </label>
                        <Input 
                          placeholder="sharmaabhi7/iict"
                          value={ghRepo}
                          onChange={(e) => setGhRepo(e.target.value)}
                          className="bg-slate-950 border-slate-800 text-slate-100 rounded-lg h-11"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Branch Name
                        </label>
                        <Input 
                          placeholder="main"
                          value={ghBranch}
                          onChange={(e) => setGhBranch(e.target.value)}
                          className="bg-slate-950 border-slate-800 text-slate-100 rounded-lg h-11"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Commit Message
                      </label>
                      <Input 
                        value={ghCommitMsg}
                        onChange={(e) => setGhCommitMsg(e.target.value)}
                        className="bg-slate-950 border-slate-800 text-slate-100 rounded-lg h-11"
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        disabled={isPublishing}
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold h-11 rounded-lg transition-all"
                      >
                        {isPublishing ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Publishing...
                          </>
                        ) : (
                          <>
                            <Github className="h-4 w-4 mr-2" /> Publish to Repository
                          </>
                        )}
                      </Button>
                    </div>
                  </form>

                  {pubStatus.type && (
                    <div className="mt-6">
                      <Alert className={`rounded-xl shadow-md border ${
                        pubStatus.type === "success" 
                          ? "bg-emerald-950/40 border-emerald-900 text-emerald-200" 
                          : pubStatus.type === "error" 
                          ? "bg-rose-950/40 border-rose-900 text-rose-200" 
                          : "bg-slate-950/80 border-slate-800 text-slate-300"
                      }`}>
                        {pubStatus.type === "success" ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : pubStatus.type === "error" ? (
                          <AlertCircle className="h-5 w-5 text-rose-400" />
                        ) : (
                          <RefreshCw className="h-5 w-5 text-teal-400 animate-spin" />
                        )}
                        <AlertTitle className="font-bold">
                          {pubStatus.type === "success" ? "Push Succeeded" : pubStatus.type === "error" ? "Push Failed" : "Syncing..."}
                        </AlertTitle>
                        <AlertDescription className="text-xs mt-1">
                          {pubStatus.msg}
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Side Info Cards */}
              <div className="space-y-6">
                <Card className="bg-slate-900/60 border-slate-800 shadow-xl backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-md font-bold text-white flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-teal-400" /> Manual Sync Export
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      If you're hosting locally or want to edit files directly on your VPS without API access.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Download the updated file structure and manually paste it into your workspace at:
                      <code className="block bg-slate-950 p-2 rounded border border-slate-800 text-teal-400 text-[10px] mt-2 font-mono select-all">
                        src/data/siteContent.json
                      </code>
                    </p>
                    <Button 
                      onClick={handleDownloadJSON}
                      variant="outline" 
                      className="w-full border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white"
                    >
                      Download siteContent.json
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/60 border-slate-800 shadow-xl backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-md font-bold text-white flex items-center gap-1.5">
                      <Globe className="h-4 w-4 text-teal-400" /> VPS Sync Setup Idea
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-slate-400 space-y-3 leading-relaxed">
                    <p>
                      To hook up this Admin Sync to your VPS automatically:
                    </p>
                    <ol className="list-decimal pl-4 space-y-1.5">
                      <li>Use a tool like GitHub Webhooks, or set up a Cron Job on your VPS server.</li>
                      <li>
                        A simple script like:
                        <pre className="bg-slate-950 p-2 rounded text-[10px] text-teal-400 font-mono mt-1 border border-slate-800 block select-all">
                          cd /path/to/website && git pull && npm run build
                        </pre>
                        running every 5-10 minutes is perfect for static file updates.
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </div>

            </div>
          </TabsContent>

          {/* TAB 5: GOOGLE SHEETS & LEADS DATABASE */}
          <TabsContent value="sheets" className="outline-none space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                
                {/* Webhook Configuration Card */}
                <Card className="bg-slate-900/60 border-slate-800 shadow-xl backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                      <FileText className="h-5 w-5 text-teal-400" /> Google Sheets Lead Integration
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      Hook up the /register page form directly to Google Sheets using a Google Apps Script deployment URL.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        Apps Script Web App Webhook URL
                      </label>
                      <div className="flex gap-3">
                        <Input 
                          placeholder="https://script.google.com/macros/s/.../exec"
                          value={sheetsWebhook}
                          onChange={(e) => setSheetsWebhook(e.target.value)}
                          className="bg-slate-950 border-slate-800 text-slate-100 focus:border-teal-500 focus:ring-teal-500 rounded-lg h-11 flex-1 font-mono text-xs text-white"
                        />
                        <Button 
                          onClick={handleSaveSheetsWebhook}
                          className="bg-teal-600 hover:bg-teal-500 text-white font-semibold h-11 px-5"
                        >
                          Save URL
                        </Button>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Must be a deployment URL ending in <code className="text-teal-400 font-mono">/exec</code>. Make sure the deployment configuration in Google Sheets allows access to "Anyone" (so the public browser form can post data).
                      </p>
                    </div>

                    <div className="border-t border-slate-800/80 pt-6 flex gap-4 items-center">
                      <Button
                        onClick={handleTestWebhook}
                        disabled={isTestingWebhook || !sheetsWebhook}
                        className="bg-blue-600 hover:bg-blue-500 text-white h-10 px-4 font-semibold text-xs rounded-lg gap-2"
                      >
                        {isTestingWebhook ? "Sending Test..." : "Send Test Lead Row"}
                      </Button>
                      <span className="text-xs text-slate-400">
                        {sheetsWebhook ? "Ready to test configuration." : "Enter a Webhook URL to enable testing."}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Local Leads Captured Database */}
                <Card className="bg-slate-900/60 border-slate-800 shadow-xl backdrop-blur-sm rounded-2xl">
                  <CardHeader className="flex flex-row justify-between items-center border-b border-slate-800/60 pb-5">
                    <div>
                      <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                        Captured Registrations ({leads.length})
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-xs mt-1">
                        View leads captured on this browser. A local copy is always saved here as a safety backup.
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {leads.length > 0 && (
                        <>
                          <Button 
                            onClick={handleDownloadLeads}
                            variant="outline" 
                            size="sm"
                            className="border-slate-850 hover:bg-slate-900 text-xs font-semibold text-slate-350 hover:text-white"
                          >
                            Download JSON
                          </Button>
                          <Button 
                            onClick={handleClearLeads}
                            variant="destructive" 
                            size="sm"
                            className="bg-red-955/40 border border-red-800/60 hover:bg-red-900 text-red-300 text-xs font-semibold"
                          >
                            Clear Database
                          </Button>
                        </>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {leads.length === 0 ? (
                      <div className="text-center py-10 text-slate-500 text-sm">
                        No registrations have been captured on this device yet.
                      </div>
                    ) : (
                      <div className="overflow-x-auto max-h-[400px] overflow-y-auto scrollbar-thin">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                              <th className="py-2 px-3">Date</th>
                              <th className="py-2 px-3">Name</th>
                              <th className="py-2 px-3">Contact</th>
                              <th className="py-2 px-3">Country / Program</th>
                              <th className="py-2 px-3">Sync Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                            {leads.map((l: any) => (
                              <tr key={l.id} className="hover:bg-slate-900/30">
                                <td className="py-3 px-3 whitespace-nowrap text-[10px] text-slate-500">{l.date}</td>
                                <td className="py-3 px-3 font-semibold text-white">{l.name}</td>
                                <td className="py-3 px-3">
                                  <div>{l.phone}</div>
                                  <div className="text-[10px] text-slate-500">Email: {l.email}</div>
                                </td>
                                <td className="py-3 px-3">
                                  <div>{l.country}</div>
                                  <div className="text-[10px] text-teal-400">{l.program}</div>
                                </td>
                                <td className="py-3 px-3">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${l.status?.includes("Submitted") ? "bg-green-950/80 border border-green-800 text-green-300" : "bg-yellow-950/80 border border-yellow-800 text-yellow-300"}`}>
                                    {l.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Apps Script Help Info Box */}
              <div className="space-y-6">
                <Card className="bg-slate-900/60 border-slate-800 shadow-xl backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-md font-bold text-white flex items-center gap-1.5">
                      How to setup Google Apps Script
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-slate-400 space-y-4 leading-relaxed font-medium">
                    <p>
                      Follow these steps to deploy a lightweight webhook connector that adds rows to your sheet:
                    </p>
                    <ol className="list-decimal pl-4 space-y-2">
                      <li>Create a new spreadsheet on Google Sheets.</li>
                      <li>Name the sheet columns in Row 1: <strong className="text-slate-300">Timestamp, Name, Email, Phone, WhatsApp, Country, Program, Message</strong>.</li>
                      <li>Go to the main menu and click on <strong>Extensions &gt; Apps Script</strong>.</li>
                      <li>Delete any existing boilerplates inside the editor and paste the Google Apps Script code snippet.</li>
                      <li>Click the <strong>Save</strong> disk icon.</li>
                      <li>Click <strong>Deploy &gt; New Deployment</strong>.</li>
                      <li>Click the gear icon and choose <strong>Web app</strong>.</li>
                      <li>Under "Execute as", select <strong>"Me"</strong>.</li>
                      <li>Under "Who has access", select <strong>"Anyone"</strong> (this allows public browser form submissions to execute the sheet script).</li>
                      <li>Click <strong>Deploy</strong>. Authorize scopes if prompted.</li>
                      <li>Copy the generated <strong>Web App URL</strong> and paste it in the webhook input.</li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

      </div>
      <Footer />
    </div>
  );
}
