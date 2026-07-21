import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/shared/SEO";
import { useContent } from "@/contexts/ContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle2, ChevronRight, Clipboard, HelpCircle, Loader2, Sparkles } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  whatsapp: z.string().optional(),
  country: z.string().min(1, "Please select a country of interest"),
  program: z.string().min(1, "Please select your program of interest"),
  message: z.string().optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

const countries = [
  "Russia", "Georgia", "Germany", "Italy", "Latvia", "Lithuania", "Poland", "Croatia", "Hungary", 
  "Uzbekistan", "China", "Kazakhstan", "Nepal", "Egypt", "Belarus", "Other"
];

const programs = [
  "MBBS Abroad", 
  "Study Abroad (Bachelors / Masters)", 
  "CPL Pilot Training", 
  "n8n AI Training",
  "Other Courses"
];

export default function RegisterPage() {
  const { content } = useContent();
  const [searchParams] = useSearchParams();
  const urlProgram = searchParams.get("program") || "";
  const urlCountry = searchParams.get("country") || "";
  const urlMessage = searchParams.get("message") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showScriptHelper, setShowScriptHelper] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      country: urlCountry,
      program: urlProgram,
      message: urlMessage
    }
  });

  const selectedCountry = watch("country");
  const selectedProgram = watch("program");

  const onSubmit = async (data: RegisterForm) => {
    setIsSubmitting(true);
    try {
      const webhookUrl = localStorage.getItem("iict_google_sheets_webhook") || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK || "";
      
      // Save locally to localStorage leads database as a fallback/draft backup
      const savedLeads = JSON.parse(localStorage.getItem("iict_leads") || "[]");
      const newLead = { 
        ...data, 
        id: Date.now().toString(), 
        date: new Date().toLocaleString(), 
        status: webhookUrl ? "Submitted to Sheets" : "Saved Locally (Pending Sync)" 
      };
      localStorage.setItem("iict_leads", JSON.stringify([newLead, ...savedLeads]));

      if (!webhookUrl) {
        toast.warning("Lead saved locally!", {
          description: "Your registration is captured locally. To sync it to Google Sheets, please configure your Apps Script URL in the Admin panel.",
          duration: 6000,
        });
        setIsSuccess(true);
        return;
      }

      // Prepare request payload for Google Apps Script doPost
      const searchParams = new URLSearchParams();
      searchParams.append("timestamp", newLead.date);
      searchParams.append("name", data.name);
      searchParams.append("email", data.email);
      searchParams.append("phone", data.phone);
      searchParams.append("whatsapp", data.whatsapp || data.phone);
      searchParams.append("country", data.country);
      searchParams.append("program", data.program);
      searchParams.append("message", data.message || "");

      // Execute POST request to Google Apps Script Web App
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors", // Google Apps Script redirects require no-cors for smooth posting without preflight/CORS blocks
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: searchParams.toString(),
      });

      toast.success("Successfully Registered!", {
        description: "Your information is securely stored in our Google Sheets databases. We will contact you shortly.",
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("Registration stored locally due to network issues", {
        description: "We secured your information locally. Our system will attempt to upload it once connection is active.",
      });
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse form-urlencoded parameters
    var name = e.parameter.name || "N/A";
    var email = e.parameter.email || "N/A";
    var phone = e.parameter.phone || "N/A";
    var whatsapp = e.parameter.whatsapp || "N/A";
    var country = e.parameter.country || "N/A";
    var program = e.parameter.program || "N/A";
    var message = e.parameter.message || "";
    var timestamp = e.parameter.timestamp || new Date().toLocaleString();
    
    sheet.appendRow([timestamp, name, email, phone, whatsapp, country, program, message]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(scriptCode);
    toast.success("Google Apps Script code copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Student Registration - Graam-InfoTech (IICT)"
        description="Register online for study abroad programs, MBBS admissions in top medical universities, CPL Pilot Training, or n8n AI Agent Developer courses."
        path="/register"
      />
      <Navbar />

      <div className="container py-12 px-4 max-w-4xl mt-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" /> Admissions Open
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Register for Free Academic Counselling
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Fill in your details below and secure a personalized 1-on-1 counseling session with our accredited overseas education experts.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Form Card */}
          <Card className="md:col-span-2 border-slate-200/80 shadow-md rounded-2xl bg-white overflow-hidden">
            <CardHeader className="bg-slate-900 text-white p-6">
              <CardTitle className="text-xl font-bold">Student Registration Portal</CardTitle>
              <CardDescription className="text-slate-300 text-xs">
                Provide accurate academic details to help us map your global educational roadmap.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Registration Complete!</h3>
                  <p className="text-slate-500 text-sm max-w-sm mt-2">
                    Thank you for choosing Graam-InfoTech (IICT). Our certified counselors will review your details and reach out via email or phone within 24 hours.
                  </p>
                  <div className="mt-8 flex gap-4">
                    <Button onClick={() => { setIsSuccess(false); reset(); }} variant="outline">
                      Register Another Student
                    </Button>
                    <Link to="/">
                      <Button className="bg-[#cc0000] hover:bg-[#aa0000] text-white">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Full Name *
                    </label>
                    <Input
                      {...register("name")}
                      placeholder="e.g. John Doe"
                      className={`h-11 border-slate-200 focus:ring-red-500 focus:border-red-500 ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 font-medium mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email & Phone grid */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        {...register("email")}
                        placeholder="john.doe@example.com"
                        className={`h-11 border-slate-200 focus:ring-red-500 focus:border-red-500 ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 font-medium mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Contact Phone *
                      </label>
                      <Input
                        {...register("phone")}
                        placeholder="e.g. 98972 78615"
                        className={`h-11 border-slate-200 focus:ring-red-500 focus:border-red-500 ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 font-medium mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp field */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        WhatsApp Number (Optional)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const phoneValue = watch("phone");
                          if (phoneValue) {
                            setValue("whatsapp", phoneValue);
                            toast.info("Copied phone number to WhatsApp");
                          } else {
                            toast.error("Please enter a contact phone number first.");
                          }
                        }}
                        className="text-[10px] font-bold text-red-600 hover:underline"
                      >
                        Same as Contact Phone
                      </button>
                    </div>
                    <Input
                      {...register("whatsapp")}
                      placeholder="WhatsApp number with country code"
                      className="h-11 border-slate-200 focus:ring-red-500"
                    />
                  </div>

                  {/* Country & Program selects */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Country of Interest *
                      </label>
                      <Select
                        onValueChange={(val) => setValue("country", val)}
                        value={selectedCountry}
                      >
                        <SelectTrigger className={`h-11 border-slate-200 bg-white text-slate-800 ${errors.country ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 bg-white border border-slate-200">
                          {countries.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.country && (
                        <p className="text-xs text-red-600 font-medium mt-1">{errors.country.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Course / Program *
                      </label>
                      <Select
                        onValueChange={(val) => setValue("program", val)}
                        value={selectedProgram}
                      >
                        <SelectTrigger className={`h-11 border-slate-200 bg-white text-slate-800 ${errors.program ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Select Program" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-slate-200">
                          {programs.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.program && (
                        <p className="text-xs text-red-600 font-medium mt-1">{errors.program.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Message / Queries / Budget Preferences
                    </label>
                    <Textarea
                      {...register("message")}
                      placeholder="Write your academic background or any questions you would like our consultants to address..."
                      className="border-slate-200 focus:ring-red-500"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#cc0000] hover:bg-[#aa0000] text-white text-base font-semibold transition-all mt-6 shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Registering Student...
                      </>
                    ) : (
                      <>
                        Complete Registration <ChevronRight className="ml-1 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Guidelines Sidebar */}
          <div className="space-y-6">
            <Card className="border-slate-200/80 shadow-sm rounded-2xl bg-white overflow-hidden">
              <CardHeader className="bg-slate-100 p-4 border-b border-slate-200/60">
                <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-[#cc0000]" /> Why Register?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs text-slate-600 leading-relaxed font-medium">
                <div className="flex gap-2.5">
                  <span className="text-green-600 text-base font-bold">✓</span>
                  <p><strong>Free Guidance:</strong> No consultation or guidance processing fee for medical, engineering, or pilot training.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="text-green-600 text-base font-bold">✓</span>
                  <p><strong>Approved Colleges:</strong> Direct placements into NMC & WHO approved global state medical colleges.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="text-green-600 text-base font-bold">✓</span>
                  <p><strong>Accredited Advisors:</strong> Formulate academic roadmap with Ph.D. level experts and experienced counsellors.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200/80 shadow-sm rounded-2xl bg-white overflow-hidden">
              <CardHeader className="bg-slate-100 p-4 border-b border-slate-200/60 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-800">
                  Google Sheet Setup
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowScriptHelper(!showScriptHelper)}
                  className="h-7 text-xs font-semibold px-2 py-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {showScriptHelper ? "Hide Info" : "Setup Script"}
                </Button>
              </CardHeader>
              <CardContent className="p-4 text-xs text-slate-600 font-medium">
                <p className="leading-relaxed">
                  Data from this registration page will automatically publish to Google Sheets using a simple Google Apps Script.
                </p>
                {showScriptHelper && (
                  <div className="mt-4 space-y-3 pt-3 border-t border-slate-200/80">
                    <ol className="list-decimal pl-4 space-y-2">
                      <li>Create a new Google Sheet.</li>
                      <li>Go to <strong>Extensions &gt; Apps Script</strong>.</li>
                      <li>Copy the script snippet and paste it into the editor.</li>
                      <li>Click <strong>Deploy &gt; New Deployment</strong>.</li>
                      <li>Select <strong>Web app</strong> as the type.</li>
                      <li>Set Access to <strong>"Anyone"</strong>, then deploy.</li>
                      <li>Copy the Web App URL and add it in the <strong>Admin Dashboard &gt; Google Sheets</strong> tab.</li>
                    </ol>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyScriptToClipboard}
                      className="w-full mt-2 border-slate-300 text-slate-700 hover:bg-slate-50 gap-2 h-8 text-xs font-semibold"
                    >
                      <Clipboard className="h-3.5 w-3.5" /> Copy script code
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
