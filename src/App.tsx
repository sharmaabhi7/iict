import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage.tsx"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage.tsx"));
const GalleryPage = lazy(() => import("./pages/GalleryPage.tsx"));
const BlogPage = lazy(() => import("./pages/BlogPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const StudyAbroadPage = lazy(() => import("./pages/StudyAbroadPage.tsx"));
const MBBSAbroadPage = lazy(() => import("./pages/MBBSAbroadPage.tsx"));
const CPLTrainingPage = lazy(() => import("./pages/CPLTrainingPage.tsx"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/study-abroad" element={<StudyAbroadPage />} />
            <Route path="/mbbs-abroad" element={<MBBSAbroadPage />} />
            <Route path="/cpl-training" element={<CPLTrainingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
