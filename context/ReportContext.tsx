
import React, { createContext, useContext, useState } from 'react';
import { ReportData } from '../types';

interface ReportContextType {
  currentReport: ReportData | null;
  setReport: (report: ReportData) => void;
  loadReport: (url: string) => ReportData | null;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  exportPDF: () => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

const EXPIRY_TIME = 30 * 24 * 60 * 60 * 1000; // 30 Days in milliseconds

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentReport, setCurrentReportState] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to generate a safe storage key from the URL - Version 4 to clear old cache
  const getStorageKey = (url: string) => `report_v4_${encodeURIComponent(url.trim())}`;

  // Set report to state and save to local storage
  const setReport = (report: ReportData) => {
    setCurrentReportState(report);
    try {
      const key = getStorageKey(report.url);
      localStorage.setItem(key, JSON.stringify(report));
      console.log(`Report saved to local storage with key: ${key}`);
    } catch (e) {
      console.error("Failed to save report to local storage", e);
    }
  };

  // Load report from local storage if it exists and hasn't expired
  const loadReport = (url: string): ReportData | null => {
    try {
      const key = getStorageKey(url);
      const stored = localStorage.getItem(key);
      
      if (stored) {
        const report = JSON.parse(stored) as ReportData;
        const now = Date.now();
        
        // Check if report is older than 30 days
        if (report.timestamp && (now - report.timestamp < EXPIRY_TIME)) {
          setCurrentReportState(report);
          console.log("Loaded valid report from local storage");
          return report;
        } else {
          // Report expired
          console.log("Report expired, removing from local storage");
          localStorage.removeItem(key);
        }
      }
    } catch (e) {
      console.error("Failed to load report from local storage", e);
    }
    return null;
  };

  const exportPDF = () => {
    const element = document.getElementById('full-report-print-container');
    if (element && (window as any).html2pdf && currentReport) {
      const opt = {
        margin: [0.5, 0.5],
        filename: `${currentReport.companyProfile.name.replace(/\s+/g, '_')}_Full_Report.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      (window as any).html2pdf().set(opt).from(element).save();
    } else {
        if(!(window as any).html2pdf) alert("PDF library not loaded.");
        else if(!currentReport) alert("No report to export.");
        else console.error("Could not find full report container.");
    }
  };

  return (
    <ReportContext.Provider value={{ currentReport, setReport, loadReport, isLoading, setIsLoading, exportPDF }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
};
