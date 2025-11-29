
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useReport } from '../context/ReportContext';

const TargetIndustriesPage: React.FC = () => {
  const { currentReport, exportPDF } = useReport();

  if (!currentReport) {
    return <Navigate to="/" replace />;
  }

  const { industries } = currentReport;

  return (
    <div className="max-w-7xl mx-auto p-8" id="report-content">
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">Reports</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">Solution Sales Report</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span className="text-gray-900 dark:text-white text-sm font-medium leading-normal">Target Industries</span>
      </div>
      <div className="flex flex-wrap justify-between gap-3 mb-8 items-center" data-html2canvas-ignore="true">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Target Industries</p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Detailed analysis of top industries for the solution.</p>
        </div>
        <button 
          onClick={exportPDF}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <span className="truncate">Export as PDF</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((industry, index) => (
          <Link to={`/industries/${index}`} key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col hover:border-primary transition-colors cursor-pointer break-inside-avoid">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">{industry.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Match Score: {industry.matchScore}%</p>
              </div>
              <span className="material-symbols-outlined text-primary text-3xl">{industry.icon}</span>
            </div>
            <div className="flex-grow">
              <h3 className="text-gray-800 dark:text-gray-200 text-base font-bold leading-normal mb-2">Solution Impact</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-4">{industry.impactText}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TargetIndustriesPage;
