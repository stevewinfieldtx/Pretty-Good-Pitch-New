
import React from 'react';
import { useReport } from '../context/ReportContext';
import { Navigate } from 'react-router-dom';

export const ContentStrategyPage: React.FC = () => {
  const { currentReport, exportPDF } = useReport();

  if (!currentReport) {
    return <Navigate to="/" replace />;
  }

  const { overview, companyProfile } = currentReport;

  return (
    <div className="max-w-7xl mx-auto p-8" id="report-content">
      <div className="flex flex-wrap justify-between items-start gap-4 mb-8" data-html2canvas-ignore="true">
        <div className="flex flex-col gap-3 max-w-4xl">
          <p className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Content Strategy & Sales Enablement</p>
          <p className="text-[#616f89] dark:text-gray-400 text-base font-normal leading-normal">A comprehensive guide to leveraging content for {companyProfile.name}.</p>
        </div>
        <button 
          onClick={exportPDF}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-[#111318] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="truncate">Download Report</span>
        </button>
      </div>
      <div className="mb-8">
        <h2 className="text-[#111318] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">Key Differentiators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {overview.differentiators.map((diff, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 break-inside-avoid">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">{diff.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-[#111318] dark:text-white mb-2">{diff.title}</h3>
              <p className="text-[#616f89] dark:text-gray-400 text-sm">{diff.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-8 break-inside-avoid">
        <h2 className="text-[#111318] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">Ideal Customer Profile (ICP)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-base font-bold text-[#111318] dark:text-white mb-2">Company Size</h3>
            <p className="text-[#616f89] dark:text-gray-400 text-sm">{overview.idealCustomerProfile.size}</p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-base font-bold text-[#111318] dark:text-white mb-2">Industry Focus</h3>
            <p className="text-[#616f89] dark:text-gray-400 text-sm">{overview.idealCustomerProfile.industry}</p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-base font-bold text-[#111318] dark:text-white mb-2">Key Pain Points</h3>
            <p className="text-[#616f89] dark:text-gray-400 text-sm">{overview.idealCustomerProfile.painPoints}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TechnicalDeepDivePage: React.FC = () => {
  const { currentReport, exportPDF } = useReport();

  if (!currentReport) {
    return <Navigate to="/" replace />;
  }

  const { technical, companyProfile } = currentReport;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="report-content">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-6 py-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm mb-8">
        <div className="flex items-center gap-4 text-[#111318] dark:text-white">
          <div className="text-primary size-6 flex-shrink-0">
            <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.08V7.91c0-.45.54-.67.85-.35l4.29 4.08c.2.19.2.51 0 .71l-4.29 4.08c-.31.32-.85.09-.85-.36z"></path>
            </svg>
          </div>
          <h1 className="text-lg font-bold leading-tight tracking-[-0.015em]">Solution Technical Deep Dive: {companyProfile.name}</h1>
        </div>
        <button 
          onClick={exportPDF}
          data-html2canvas-ignore="true"
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined text-base">picture_as_pdf</span>
          <span className="truncate">Export as PDF</span>
        </button>
      </header>

      <div className="flex flex-col gap-8">
        {/* System Architecture */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 break-inside-avoid">
            <h2 className="text-[#111318] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">dns</span> System Architecture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-sm uppercase tracking-wide">Infrastructure Diagram</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{technical.architecture.diagramDescription}</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-sm uppercase tracking-wide">Data Flow</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{technical.architecture.dataFlow}</p>
                </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 text-sm uppercase tracking-wide">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                    {technical.architecture.infrastructure.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>

        {/* Security & Compliance */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 break-inside-avoid">
            <h2 className="text-[#111318] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">security</span> Security & Compliance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Compliance</h3>
                    <div className="flex flex-wrap gap-2">
                        {technical.security.compliance.map((c, i) => (
                            <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs font-bold">
                                {c}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Encryption</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">{technical.security.encryption}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Access Control</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">{technical.security.accessControl}</p>
                </div>
            </div>
        </section>

        {/* Deep Feature Breakdown */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 break-inside-avoid">
            <h2 className="text-[#111318] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">psychology</span> Deep Feature Analysis
            </h2>
            <div className="space-y-6">
                {technical.deepFeatures.map((feature, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                        <div className="md:col-span-3">
                            <h3 className="font-bold text-gray-900 dark:text-white text-base">{feature.title}</h3>
                        </div>
                        <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/20">
                                <p className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase mb-1">Technical Detail</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{feature.technicalDetail}</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-100 dark:border-green-900/20">
                                <p className="text-xs font-bold text-green-800 dark:text-green-300 uppercase mb-1">Business Value</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{feature.businessValue}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Implementation & Ecosystem */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 break-inside-avoid">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">rocket_launch</span> Implementation
                </h2>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Time to Value</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">{technical.implementation.timeToValue}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Requirements</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                            {technical.implementation.requirements.map((req, i) => <li key={i}>{req}</li>)}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">extension</span> Integration Ecosystem
                </h2>
                <div className="space-y-4">
                    {technical.integrations.categories.map((cat, i) => (
                        <div key={i}>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{cat.name}</p>
                            <div className="flex flex-wrap gap-2">
                                {cat.tools.map((tool, j) => (
                                    <span key={j} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic">{technical.integrations.apiCapabilities}</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export const CompetitiveLandscapePage: React.FC = () => {
  const { currentReport, exportPDF } = useReport();

  if (!currentReport) {
    return <Navigate to="/" replace />;
  }

  const { competition, companyProfile } = currentReport;

  // Determine competitor names for table headers
  let compAName = "Competitor A";
  let compBName = "Competitor B";
  const externalCompetitors = competition.competitors.filter(c => c.name !== "Us" && c.type !== "Category Leader");
  if (externalCompetitors.length > 0) compAName = externalCompetitors[0].name;
  if (externalCompetitors.length > 1) compBName = externalCompetitors[1].name;

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10" id="report-content">
      <div className="flex flex-wrap justify-between gap-4 items-start" data-html2canvas-ignore="true">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Competitive Landscape Overview</p>
          <p className="text-[#616f89] dark:text-gray-400 text-base font-normal leading-normal">An in-depth analysis of the competitive environment.</p>
        </div>
        <button 
          onClick={exportPDF}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg">download</span>
          <span className="truncate">Download Report</span>
        </button>
      </div>
      <div className="mt-10">
        <h2 className="text-[#111318] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Stated Competitive Position</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {competition.competitors.map((comp, idx) => (
            <div key={idx} className="flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm break-inside-avoid">
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-3xl">{comp.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-[#111318] dark:text-white">{comp.type}</h3>
              <p className="text-sm font-semibold mb-1">{comp.name === "Us" ? companyProfile.name : comp.name}</p>
              <p className="text-sm text-[#616f89] dark:text-gray-400">{comp.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-[#111318] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Competitive Differentiation Analysis</h2>
        <div className="mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden break-inside-avoid">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  <th className="p-4 w-1/4">Feature / Aspect</th>
                  <th className="p-4 text-center bg-primary/5 text-primary">{companyProfile.name}</th>
                  <th className="p-4 text-center">{compAName}</th>
                  <th className="p-4 text-center">{compBName}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-[#111318] dark:text-gray-200">
                {competition.differentiation.map((diff, idx) => (
                  <tr key={idx}>
                    <td className="p-4 font-semibold">{diff.feature}</td>
                    <td className="p-4 text-center text-sm text-[#616f89] dark:text-gray-400 font-medium bg-primary/5">{diff.us}</td>
                    <td className="p-4 text-center text-sm text-[#616f89] dark:text-gray-400">{diff.compA}</td>
                    <td className="p-4 text-center text-sm text-[#616f89] dark:text-gray-400">{diff.compB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
