import { MessageCircle, ArrowUp } from "lucide-react";

export function FloatingActions() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Side Banner */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <div className="bg-[#004080] text-white py-4 px-2 rounded-l-md shadow-lg cursor-pointer hover:bg-[#003060] transition-colors" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <span className="text-sm font-semibold tracking-wider">MBBS Admissions 26-27</span>
        </div>
      </div>

      {/* Bottom Right Actions */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Live Counselling Chat Banner */}
        <div className="hidden md:flex bg-green-600 text-white px-4 py-2 rounded-full shadow-lg items-center gap-2 cursor-pointer hover:bg-green-700 transition-colors">
          <span className="text-sm font-semibold">Live Counselling - Chat Now</span>
        </div>
        
        {/* Chat Icon */}
        <button className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center">
          <MessageCircle className="h-6 w-6" />
        </button>

        {/* Scroll to Top */}
        <button 
          onClick={scrollToTop}
          className="bg-[#ffcc00] text-black p-3 rounded-full shadow-lg hover:bg-[#e6b800] transition-colors flex items-center justify-center"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}
