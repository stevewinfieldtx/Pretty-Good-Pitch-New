
import React from 'react';
import { useReport } from '../context/ReportContext';
import { Navigate, useParams } from 'react-router-dom';

const IndustryPageLayout: React.FC<{ index: number }> = ({ index }) => {
  const { currentReport, exportPDF } = useReport();

  if (!currentReport || !currentReport.industries[index]) {
    return <Navigate to="/" replace />;
  }

  const industry = currentReport.industries[index];

  return (
    <div className="max-w-7xl mx-auto p-8" id="report-content">
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">Reports</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">Solution Sales Report</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">Industries</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span className="text-gray-900 dark:text-white text-sm font-medium leading-normal">{industry.name}</span>
      </div>
      <div className="flex flex-wrap justify-between gap-3 mb-8 items-center" data-html2canvas-ignore="true">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-5xl">{industry.icon}</span>
          <div className="flex min-w-72 flex-col gap-1">
            <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">{industry.name}</p>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Deep dive into the industry and its key personas.</p>
          </div>
        </div>
        <button 
          onClick={exportPDF}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <span className="truncate">Export as PDF</span>
        </button>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 break-inside-avoid">
            <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-4">Solution Impact on {industry.name}</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {industry.impactText}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 break-inside-avoid">
            <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-4">Key Pain Points Addressed</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {industry.painPoints.map((pp, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-1">{pp.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">{pp.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{pp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 self-start break-inside-avoid">
          <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-1">Top 3 Job Titles to Target</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Key decision-makers and influencers in this vertical.</p>
          <div className="flex flex-col gap-4">
            {industry.jobTitles.map((job, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex-shrink-0 size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">badge</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">{job.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{job.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const IndustryDetailsPage: React.FC = () => {
  const { id } = useParams();
  const index = parseInt(id || '0', 10);
  return <IndustryPageLayout index={index} />;
};
