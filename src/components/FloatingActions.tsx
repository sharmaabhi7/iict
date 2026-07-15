import { useState, useEffect, useRef } from "react";
import { MessageCircle, ArrowUp, X, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ChatMessage {
  sender: "bot" | "user";
  text: string;
}

export function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0: Name, 1: Email, 2: Phone, 3: Interest, 4: Question, 5: Finished
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "bot", text: "👋 Hello! Welcome to Graam-InfoTech (IICT) Counselling. I am your academic bot assistant." },
    { sender: "bot", text: "To help connect you with our accredited counsellors, let's start with your name. What is your full name?" }
  ]);
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    question: ""
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Listen for global open chat events
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-live-chat", handleOpenChat);
    return () => {
      window.removeEventListener("open-live-chat", handleOpenChat);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitChatLead = async (data: typeof leadData) => {
    try {
      const webhookUrl = localStorage.getItem("iict_google_sheets_webhook") || "";
      
      // Save local backup lead
      const savedLeads = JSON.parse(localStorage.getItem("iict_leads") || "[]");
      const newLead = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        whatsapp: data.phone,
        country: "N/A",
        program: "Live Chat Counseling",
        message: `Q: ${data.question} | Interest: ${data.interest}`,
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        status: webhookUrl ? "Submitted to Sheets" : "Saved Locally (Pending Sync)"
      };
      localStorage.setItem("iict_leads", JSON.stringify([newLead, ...savedLeads]));

      if (webhookUrl) {
        const searchParams = new URLSearchParams();
        searchParams.append("timestamp", newLead.date);
        searchParams.append("name", newLead.name);
        searchParams.append("email", newLead.email);
        searchParams.append("phone", newLead.phone);
        searchParams.append("whatsapp", newLead.whatsapp);
        searchParams.append("country", newLead.country);
        searchParams.append("program", newLead.program);
        searchParams.append("message", newLead.message);

        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: searchParams.toString(),
        });
      }

      setMessages(prev => [
        ...prev.filter(m => m.text !== "Connecting and saving your request..."),
        { 
          sender: "bot", 
          text: `🎉 Thank you, ${data.name}! Your request has been securely saved to our Google Sheet. A certified counselor will text or call you on ${data.phone} in a few minutes.` 
        }
      ]);
    } catch (error) {
      console.error("Error submitting chat lead:", error);
      setMessages(prev => [
        ...prev.filter(m => m.text !== "Connecting and saving your request..."),
        { 
          sender: "bot", 
          text: `👍 Got it! Your request is captured. We'll reach out to you shortly.` 
        }
      ]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;

    // Clear input
    setChatInput("");

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text }]);

    // Conversational flow machine
    if (step === 0) {
      setLeadData(prev => ({ ...prev, name: text }));
      setStep(1);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: `Nice to meet you, ${text}! What is your email address so we can send you free brochures?` }
        ]);
      }, 600);
    } else if (step === 1) {
      if (!text.includes("@") || !text.includes(".")) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { sender: "bot", text: "Hmm, that email address doesn't look quite right. Could you type a valid email?" }
          ]);
        }, 600);
        return;
      }
      setLeadData(prev => ({ ...prev, email: text }));
      setStep(2);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: "Got it. And what is your contact phone number (preferably with WhatsApp support)?" }
        ]);
      }, 600);
    } else if (step === 2) {
      if (text.length < 8) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { sender: "bot", text: "Please enter a valid phone number so we can reach you." }
          ]);
        }, 600);
        return;
      }
      setLeadData(prev => ({ ...prev, phone: text }));
      setStep(3);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: "Great. Which program or country are you most interested in? (e.g. MBBS in Russia, CPL Pilot Training, Germany...)" }
        ]);
      }, 600);
    } else if (step === 3) {
      setLeadData(prev => ({ ...prev, interest: text }));
      setStep(4);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: "Lastly, please enter your primary question or query for our overseas counselling team." }
        ]);
      }, 600);
    } else if (step === 4) {
      const finalLead = { ...leadData, question: text };
      setLeadData(finalLead);
      setStep(5);
      
      // Delay showing "connecting" status to look natural
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: "Connecting and saving your request..." }
        ]);
        submitChatLead(finalLead);
      }, 600);
    }
  };

  return (
    <>
      {/* Side Banner */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <div 
          onClick={() => setIsOpen(true)}
          className="bg-[#004080] text-white py-4 px-2 rounded-l-md shadow-lg cursor-pointer hover:bg-[#003060] transition-colors" 
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          <span className="text-sm font-semibold tracking-wider">MBBS Admissions 26-27</span>
        </div>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed right-6 bottom-24 z-50 w-[340px] sm:w-[380px] h-[480px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden font-sans text-slate-800"
          >
            {/* Chat Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold text-sm relative">
                  🎓
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-slate-900 rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wide">Graam-InfoTech Counselling</h4>
                  <p className="text-[10px] text-green-400 font-medium">Online Advisor</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      m.sender === "user" 
                        ? "bg-green-600 text-white rounded-tr-none shadow-sm font-medium" 
                        : "bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm font-medium"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            {step < 5 ? (
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                <input
                  type={step === 1 ? "email" : step === 2 ? "tel" : "text"}
                  placeholder={
                    step === 0 ? "Type your name..." :
                    step === 1 ? "Type your email..." :
                    step === 2 ? "Type your phone number..." :
                    step === 3 ? "e.g. MBBS in Russia, Germany..." :
                    "Type your question here..."
                  }
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-green-600 focus:bg-white transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center shadow"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <div className="p-4 bg-white border-t border-slate-100 text-center">
                <Button 
                  size="sm"
                  onClick={() => {
                    setStep(0);
                    setMessages([
                      { sender: "bot", text: "👋 Hello! Welcome back. I am your academic bot assistant." },
                      { sender: "bot", text: "To help connect you with our accredited counsellors, let's start with your name. What is your full name?" }
                    ]);
                    setLeadData({ name: "", email: "", phone: "", interest: "", question: "" });
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 h-8"
                >
                  Start New Session
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Right Actions */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Live Counselling Chat Banner */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex bg-green-600 text-white px-4 py-2 rounded-full shadow-lg items-center gap-2 cursor-pointer hover:bg-green-700 transition-colors"
        >
          <span className="text-sm font-semibold">Live Counselling - Chat Now</span>
        </div>
        
        {/* Chat Icon */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
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
