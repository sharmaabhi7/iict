import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UniversitySearch() {
  const navigate = useNavigate();
  const [program, setProgram] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const handleSearch = () => {
    let tab = "all";
    if (program === "medicine") tab = "mbbs";
    else if (program === "engineering") tab = "study-abroad";

    const params = new URLSearchParams();
    if (country) {
      const formattedCountry = country.charAt(0).toUpperCase() + country.slice(1);
      params.append("search", formattedCountry);
    }
    if (tab !== "all") {
      params.append("tab", tab);
    }

    navigate(`/countries?${params.toString()}`);
  };

  return (
    <div className="relative z-30 -mt-16 container">
      <div className="bg-white rounded-2xl shadow-xl p-5 md:p-8 border border-gray-100">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Find University as per your choice</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select onValueChange={setProgram} value={program}>
            <SelectTrigger className="w-full h-12 bg-white border-gray-200">
              <SelectValue placeholder="Select Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medicine">Medicine</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setDegree} value={degree}>
            <SelectTrigger className="w-full h-12 bg-white border-gray-200">
              <SelectValue placeholder="Select Degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bachelors">Bachelors</SelectItem>
              <SelectItem value="masters">Masters</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setCountry} value={country}>
            <SelectTrigger className="w-full h-12 bg-white border-gray-200">
              <SelectValue placeholder="Select Dream Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="russia">Russia</SelectItem>
              <SelectItem value="georgia">Georgia</SelectItem>
              <SelectItem value="italy">Italy</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={handleSearch}
            className="w-full h-12 bg-white hover:bg-gray-50 text-red-600 border-2 border-red-600 font-bold text-lg flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
