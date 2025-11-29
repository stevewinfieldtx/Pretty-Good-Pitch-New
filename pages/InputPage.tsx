
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReport } from '../context/ReportContext';
import { generateReport } from '../services/geminiService';

const InputPage: React.FC = () => {
  const navigate = useNavigate();
  const { loadReport, setReport, setIsLoading, isLoading } = useReport();
  
  const [url, setUrl] = useState('');
  const [marketSize, setMarketSize] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!url) {
      setError("Please enter a Solution URL.");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      // 1. Check for existing report in local storage (Cache Hit)
      const existingReport = loadReport(url);
      
      if (existingReport) {
        console.log("Using cached report");
        navigate('/overview');
        return;
      }

      // 2. Generate new report via Gemini (Cache Miss)
      console.log("Generating new report for:", url);
      const newReport = await generateReport(url, marketSize);
      
      if (newReport) {
        // 3. Save to Context & Local Storage
        setReport(newReport);
        navigate('/overview');
      } else {
        setError("Failed to generate report. Please try again.");
      }

    } catch (err: any) {
      console.error("Generation Error:", err);
      setError("An error occurred while generating the analysis. Please check your API Key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-full p-8 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-black/50 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-6"></div>
          <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">Analyzing Solution & Market Data</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">This usually takes about 30-60 seconds...</p>
        </div>
      )}

      <div className="w-full max-w-[960px] flex flex-col gap-8">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Generate Your Report</p>
            <p className="text-[#616f89] dark:text-gray-400 text-base font-normal leading-normal">
              Enter a solution URL to get started and refine with optional details for a more targeted analysis.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Solution URL*</p>
            <input 
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] dark:placeholder-gray-500 p-[15px] text-base font-normal leading-normal transition-all" 
              placeholder="https://example.com/product/solution-name"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
          <div className="border-t border-gray-200 dark:border-gray-700"></div>
          <h3 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pt-2">Refine Your Report (Optional)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Market Size</p>
              <select 
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#616f89] dark:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] p-[15px] text-base font-normal leading-normal appearance-none transition-all"
                value={marketSize}
                onChange={(e) => setMarketSize(e.target.value)}
              >
                <option disabled value="">e.g., SMB, Mid-Market, Enterprise</option>
                <option value="smb">SMB</option>
                <option value="mid-market">Mid-Market</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </label>
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Industry</p>
              <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] dark:placeholder-gray-500 p-[15px] text-base font-normal leading-normal transition-all" placeholder="e.g., Healthcare, SaaS, Finance" />
            </label>
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Persona / Title</p>
              <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] dark:placeholder-gray-500 p-[15px] text-base font-normal leading-normal transition-all" placeholder="e.g., CTO, VP of Marketing" />
            </label>
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Target Customer</p>
              <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] dark:placeholder-gray-500 p-[15px] text-base font-normal leading-normal transition-all" placeholder="e.g., Acme Corporation" />
            </label>
            <label className="flex flex-col min-w-40 flex-1 col-span-1 md:col-span-2">
              <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Individual</p>
              <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] dark:placeholder-gray-500 p-[15px] text-base font-normal leading-normal transition-all" placeholder="e.g., Jane Doe or LinkedIn URL" />
            </label>
          </div>

          <div className="flex justify-between items-center pt-4">
            {error && <p className="text-red-500 text-sm font-medium animate-pulse">{error}</p>}
            <button 
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary h-12 px-6 text-white text-base font-bold leading-normal tracking-wide disabled:bg-primary/50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors ml-auto shadow-md hover:shadow-lg"
            >
              <span>{isLoading ? 'Generating Analysis...' : 'Generate Report'}</span>
              {!isLoading && <span className="material-symbols-outlined">arrow_forward</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
