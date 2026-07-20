import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConsultationBanner() {
  return (
    <section className="py-12 bg-[#ffe8e8] border-y border-[#ffcccc]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="text-center lg:text-left">
            <h2 className="font-heading text-2xl md:text-3xl font-black text-gray-800">
              Want to get a free<br className="hidden md:inline" /> consultation?
            </h2>
          </div>

          {/* Center Contact Stack */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            
            {/* Phone Badge */}
            <div className="flex items-center gap-3 bg-white/70 px-5 py-3 rounded-xl border border-[#ffb3b3]">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-sm shrink-0">
                <Phone className="h-5 w-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider leading-none mb-1">Call Us</span>
                <a href="tel:9897278615" className="text-lg font-black text-red-600 leading-none hover:underline">
                  98972 78615
                </a>
              </div>
            </div>

            {/* WhatsApp Badge */}
            <div className="flex items-center gap-3 bg-white/70 px-5 py-3 rounded-xl border border-[#ffb3b3]">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-sm shrink-0">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider leading-none mb-1">WhatsApp</span>
                <a href="https://wa.me/919315717679" target="_blank" rel="noopener noreferrer" className="text-lg font-black text-green-500 leading-none hover:underline">
                  93157 17679
                </a>
              </div>
            </div>

          </div>

          {/* Right Button */}
          <div>
            <Button className="bg-[#b30000] hover:bg-red-800 text-white font-bold px-8 py-6 rounded-xl text-base shadow-md uppercase tracking-wider transition-colors duration-300">
              Talk to our Counsellor
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
