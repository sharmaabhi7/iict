import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ContentProvider } from "./contexts/ContentContext";

import MaintenancePage from "./pages/MaintenancePage.tsx";
import NotFound from "./pages/NotFound.tsx";
const IndexPage = lazy(() => import("./pages/Index.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.tsx"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage.tsx"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage.tsx"));
const GalleryPage = lazy(() => import("./pages/GalleryPage.tsx"));
const BlogPage = lazy(() => import("./pages/BlogPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const StudyAbroadPage = lazy(() => import("./pages/StudyAbroadPage.tsx"));
const MBBSAbroadPage = lazy(() => import("./pages/MBBSAbroadPage.tsx"));
const CPLTrainingPage = lazy(() => import("./pages/CPLTrainingPage.tsx"));
const N8nTrainingPage = lazy(() => import("./pages/N8nTrainingPage.tsx"));
const CountryDetailPage = lazy(() => import("./pages/CountryDetailPage.tsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.tsx"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <ContentProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/study-abroad" element={<StudyAbroadPage />} />
                <Route path="/mbbs-abroad" element={<MBBSAbroadPage />} />
                <Route path="/cpl-training" element={<CPLTrainingPage />} />
                <Route path="/n8n-training" element={<N8nTrainingPage />} />
                <Route path="/countries/:countryId" element={<CountryDetailPage />} />
                <Route path="/countries" element={<CountryDetailPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ContentProvider>
  </HelmetProvider>
);

export default App;
