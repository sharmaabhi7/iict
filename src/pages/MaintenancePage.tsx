import React from "react";
import logo from "../assets/iict-logo.jpeg";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container max-w-2xl px-4 text-center animate-fade-up">
        {/* Logo Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative p-2 bg-white rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 mb-4">
            <img 
              src={logo} 
              alt="IICT Logo" 
              className="h-24 md:h-32 w-auto object-contain rounded-xl"
            />
          </div>
          <p className="text-sm md:text-base font-medium text-muted-foreground italic">
            Building trust and credibility in education since 1996 <br>
            </br>
            Connect with us Now on Website : www.gieducationoverseas.com
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground tracking-tight">
            Under <span className="text-primary">Maintenance</span>
          </h1>
          
          <div className="h-1.5 w-24 bg-primary/20 rounded-full mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-primary rounded-full animate-[shimmer_2s_infinite_linear]" style={{
              backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              backgroundSize: '200% 100%'
            }} />
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            We're currently updating our website to provide you with a better experience. 
            We'll be back online shortly!
          </p>

          {/* Social / Contact Links (Optional but looks good) */}
          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
              <p className="text-sm font-medium text-muted-foreground">Email us at</p>
              <p className="text-primary font-semibold">graam.iict@gmail.com </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
              <p className="text-sm font-medium text-muted-foreground">Follow us</p>
              <p className="text-primary font-semibold">@gieducationoverseas</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-16 text-sm text-muted-foreground font-medium uppercase tracking-widest opacity-60">
          Coming Soon • 2026 IICT
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}} />
    </div>
  );
};

export default MaintenancePage;
