
import React from 'react';
import { useReport } from '../context/ReportContext';
import { Navigate } from 'react-router-dom';

export const TitlesPersonaPage: React.FC = () => {
  const { currentReport, exportPDF } = useReport();

  if (!currentReport) {
    return <Navigate to="/" replace />;
  }

  const { titles } = currentReport.personas;

  return (
    <div className="max-w-7xl mx-auto p-8" id="report-content">
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">Reports</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">Solution Sales Report</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span className="text-gray-900 dark:text-white text-sm font-medium leading-normal">Personas</span>
      </div>
      <div className="flex flex-wrap justify-between gap-3 mb-8 items-center" data-html2canvas-ignore="true">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Buyer Title Personas</p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Guidance on how to approach and engage with key job titles.</p>
        </div>
        <button 
          onClick={exportPDF}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <span className="truncate">Export as PDF</span>
        </button>
      </div>
      <div className="space-y-4">
        {titles.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden break-inside-avoid">
            <details className="group" open>
              <summary className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors list-none flex justify-between items-center">
                <div className="flex flex-col">
                  <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">{item.title}</h2>
                  <p className={`text-sm font-semibold leading-normal mt-1 ${item.roleClass}`}>{item.type}</p>
                </div>
                <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  <div>
                    <h3 className="text-gray-900 dark:text-white text-base font-bold leading-normal mb-2">Pain Points</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                      {item.painPoints.map((pt, i) => <li key={i}>{pt}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white text-base font-bold leading-normal mb-2">Common Objections</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                      {item.objections.map((obj, i) => <li key={i}>{obj}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white text-base font-bold leading-normal mb-2">Effective Responses</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                      {item.responses.map((res, i) => <li key={i}>{res}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};
