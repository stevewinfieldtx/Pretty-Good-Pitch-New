
import React from 'react';
import { useReport } from '../context/ReportContext';
import { Navigate, useNavigate } from 'react-router-dom';

const ReportOverviewPage: React.FC = () => {
  const { currentReport, exportPDF } = useReport();
  const navigate = useNavigate();

  if (!currentReport) {
    return <Navigate to="/" replace />;
  }

  const { overview, companyProfile } = currentReport;

  return (
    <div className="max-w-7xl mx-auto p-8" id="report-content">
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">Reports</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">{companyProfile.name || 'Solution'} Sales Report</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span className="text-gray-900 dark:text-white text-sm font-medium leading-normal">Overview</span>
      </div>
      <div className="flex flex-wrap justify-between gap-3 mb-8 items-center" data-html2canvas-ignore="true">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Report Overview</p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">High-level summary of the sales intelligence report for {companyProfile.name}.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/technical')}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-gray-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="truncate">View Capabilities</span>
          </button>
          <button 
            onClick={exportPDF}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90"
          >
            <span className="truncate">Export as PDF</span>
          </button>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-4">Solution Overview</h2>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">{overview.solutionOverview}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-4">Ideal Customer Profile</h2>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
            The ideal customer typically matches the following profile characteristics based on our analysis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Company Size</h3>
              <p className="text-gray-600 dark:text-gray-300">{overview.idealCustomerProfile.size}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Industry</h3>
              <p className="text-gray-600 dark:text-gray-300">{overview.idealCustomerProfile.industry}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Pain Points</h3>
              <p className="text-gray-600 dark:text-gray-300">{overview.idealCustomerProfile.painPoints}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-4">Key Differentiators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {overview.differentiators.map((diff, idx) => (
              <div key={idx}>
                <h3 className="text-gray-900 dark:text-white text-base font-bold leading-normal mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">{diff.icon}</span> {diff.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportOverviewPage;
