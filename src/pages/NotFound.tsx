import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/shared/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO 
        title="404 Page Not Found"
        description="The page you are looking for does not exist on Graam-InfoTech website."
      />
      {/* Navigation Header */}
      <Navbar />

      {/* Main Error Content */}
      <main className="flex-1 flex items-center justify-center py-16 md:py-24 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col items-center gap-6"
          >
            {/* Warning Icon with Red Circle */}
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shadow-sm shrink-0">
              <AlertCircle className="h-8 w-8" />
            </div>

            {/* Error Code & Message */}
            <div className="flex flex-col gap-2">
              <div className="self-center bg-[#ffcc00] text-black text-[10px] font-black uppercase px-3 py-1 rounded-sm tracking-widest leading-none">
                Error Code: 404
              </div>
              <h1 className="font-heading text-3xl font-black text-gray-900 leading-tight">
                Oops! Page Not Found
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed font-semibold max-w-md mt-1">
                The page you are looking for at <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-red-600 font-mono">{location.pathname}</code> might have been removed, had its name changed, or is temporarily unavailable.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2">
              <Button asChild className="bg-[#b30000] hover:bg-red-800 text-white font-bold py-5 px-6 rounded-xl text-sm shadow-sm transition-colors uppercase tracking-wider">
                <Link to="/">Go Back Home</Link>
              </Button>
              <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold py-5 px-6 rounded-xl text-sm transition-colors uppercase tracking-wider">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer & Floating Actions */}
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default NotFound;
