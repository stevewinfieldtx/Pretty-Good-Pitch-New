
import React from 'react';
import { ReportData } from '../types';

interface FullReportProps {
  data: ReportData;
}

const FullReport: React.FC<FullReportProps> = ({ data }) => {
  const { overview, industries, personas, competition, technical, companyProfile } = data;

  // Determine competitor names for table headers
  let compAName = "Competitor A";
  let compBName = "Competitor B";
  
  // Try to find the names from the competitors array, skipping "Us" or "Category Leader" if possible
  const externalCompetitors = competition.competitors.filter(c => c.name !== "Us" && c.type !== "Category Leader");
  
  if (externalCompetitors.length > 0) compAName = externalCompetitors[0].name;
  if (externalCompetitors.length > 1) compBName = externalCompetitors[1].name;

  return (
    <div className="w-[1100px] bg-white text-slate-900 p-12 space-y-12 font-sans">
       {/* Cover Page */}
       <div className="min-h-[1000px] flex flex-col justify-center items-center text-center" style={{ pageBreakAfter: 'always' }}>
          <div className="mb-12 flex justify-center">
             <div className="bg-primary/10 p-8 rounded-3xl">
                <span className="material-symbols-outlined text-[120px] text-primary">analytics</span>
             </div>
          </div>
          <h1 className="text-6xl font-extrabold mb-6 tracking-tight text-gray-900">{companyProfile.name}</h1>
          <h2 className="text-3xl font-light text-gray-600 mb-16">Sales Intelligence Report</h2>
          <div className="mt-auto mb-20 text-gray-500 font-medium">
            <p className="text-lg">Generated on {new Date().toLocaleDateString()}</p>
            <p className="mt-2 text-sm text-gray-400">Powered by Sales Intel</p>
          </div>
       </div>

       {/* Executive Summary */}
       <div style={{ pageBreakAfter: 'always' }}>
          <h1 className="text-3xl font-bold mb-8 border-b-2 border-gray-100 pb-4 text-primary">Executive Summary</h1>
          <div className="space-y-8">
             <section>
                <h2 className="text-xl font-bold mb-3 text-gray-800">Solution Overview</h2>
                <p className="text-gray-700 leading-relaxed text-justify">{overview.solutionOverview}</p>
             </section>
             
             <section className="grid grid-cols-3 gap-6">
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                   <h3 className="font-bold mb-2 text-gray-900">Company Size</h3>
                   <p className="text-sm text-gray-700">{overview.idealCustomerProfile.size}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                   <h3 className="font-bold mb-2 text-gray-900">Industry</h3>
                   <p className="text-sm text-gray-700">{overview.idealCustomerProfile.industry}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                   <h3 className="font-bold mb-2 text-gray-900">Key Pain Points</h3>
                   <p className="text-sm text-gray-700">{overview.idealCustomerProfile.painPoints}</p>
                </div>
             </section>

             <section>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Key Differentiators</h2>
                <div className="grid grid-cols-3 gap-6">
                   {overview.differentiators.map((diff, i) => (
                      <div key={i} className="p-5 border border-gray-200 rounded-xl shadow-sm">
                         <div className="flex items-center gap-2 mb-3 text-primary">
                            <span className="material-symbols-outlined text-2xl">{diff.icon}</span>
                            <span className="font-bold text-lg">{diff.title}</span>
                         </div>
                         <p className="text-sm text-gray-600 leading-relaxed">{diff.desc}</p>
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>

       {/* Industries */}
       <div style={{ pageBreakAfter: 'always' }}>
          <h1 className="text-3xl font-bold mb-8 border-b-2 border-gray-100 pb-4 text-primary">Target Industries</h1>
          <div className="space-y-12">
             {industries.map((ind, i) => (
                <div key={i} className="mb-12" style={{ pageBreakInside: 'avoid' }}>
                   <div className="flex items-center gap-6 mb-6">
                      <div className="p-4 bg-primary/5 rounded-2xl">
                        <span className="material-symbols-outlined text-5xl text-primary">{ind.icon}</span>
                      </div>
                      <div>
                         <h2 className="text-2xl font-bold text-gray-900">{ind.name}</h2>
                         <p className="text-base font-medium text-gray-500 mt-1">Match Score: <span className="text-primary">{ind.matchScore}%</span></p>
                      </div>
                   </div>
                   <div className="grid grid-cols-3 gap-8">
                      <div className="col-span-2 space-y-6">
                         <div>
                            <h3 className="font-bold mb-2 text-lg text-gray-800">Solution Impact</h3>
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line text-justify">{ind.impactText}</p>
                         </div>
                         
                         <div>
                            <h3 className="font-bold mb-3 text-lg text-gray-800">Pain Points Addressed</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {ind.painPoints.map((pp, idx) => (
                                <div key={idx} className="flex gap-3 items-start p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">{pp.icon}</span>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">{pp.title}</p>
                                        <p className="text-xs text-gray-600 mt-1">{pp.desc}</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                         </div>
                      </div>
                      <div className="col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-100 h-fit">
                         <h3 className="font-bold mb-4 text-lg text-gray-800">Key Titles</h3>
                         <div className="space-y-5">
                            {ind.jobTitles.map((job, idx) => (
                               <div key={idx} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                                  <p className="font-bold text-sm text-primary mb-1">{job.title}</p>
                                  <p className="text-xs text-gray-600 leading-snug">{job.desc}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* Personas */}
       <div style={{ pageBreakAfter: 'always' }}>
          <h1 className="text-3xl font-bold mb-8 border-b-2 border-gray-100 pb-4 text-primary">Buyer Personas</h1>
          
          <h2 className="text-2xl font-bold mb-6 text-gray-800">By Job Title</h2>
          <div className="space-y-6">
             {personas.titles.map((title, i) => (
                <div key={i} className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm" style={{ pageBreakInside: 'avoid' }}>
                   <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900">{title.title}</h3>
                      <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-lg uppercase tracking-wider">{title.type}</span>
                   </div>
                   <div className="grid grid-cols-3 gap-6 text-sm">
                      <div>
                         <p className="font-bold mb-3 flex items-center gap-2 text-red-600 uppercase text-xs tracking-wider">
                            <span className="material-symbols-outlined text-base">warning</span> Pain Points
                         </p>
                         <ul className="list-disc list-outside ml-4 space-y-2 text-gray-700">
                            {title.painPoints.map((p, idx) => <li key={idx}>{p}</li>)}
                         </ul>
                      </div>
                      <div>
                         <p className="font-bold mb-3 flex items-center gap-2 text-amber-600 uppercase text-xs tracking-wider">
                            <span className="material-symbols-outlined text-base">block</span> Objections
                         </p>
                         <ul className="list-disc list-outside ml-4 space-y-2 text-gray-700">
                            {title.objections.map((o, idx) => <li key={idx}>{o}</li>)}
                         </ul>
                      </div>
                      <div>
                         <p className="font-bold mb-3 flex items-center gap-2 text-green-600 uppercase text-xs tracking-wider">
                            <span className="material-symbols-outlined text-base">check_circle</span> Responses
                         </p>
                         <ul className="list-disc list-outside ml-4 space-y-2 text-gray-700">
                            {title.responses.map((r, idx) => <li key={idx}>{r}</li>)}
                         </ul>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* Technical & Competition */}
       <div style={{ pageBreakAfter: 'avoid' }}>
          <h1 className="text-3xl font-bold mb-8 border-b-2 border-gray-100 pb-4 text-primary">Deep Dive Analysis</h1>
          
          {/* New Technical Section */}
          <div className="mb-12" style={{ pageBreakInside: 'avoid' }}>
             <h2 className="text-2xl font-bold mb-6 text-gray-800">Technical Architecture</h2>
             
             <div className="bg-slate-50 rounded-xl border border-slate-100 p-6 mb-6">
                <div className="grid grid-cols-2 gap-8 mb-6">
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase">Architecture</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{technical.architecture.diagramDescription}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase">Data Flow</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{technical.architecture.dataFlow}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {technical.architecture.infrastructure.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 font-medium">{tech}</span>
                    ))}
                </div>
             </div>

             <h3 className="text-xl font-bold mb-4 text-gray-800">Security & Integration</h3>
             <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-200 rounded-xl p-5">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">security</span> Security
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li><strong>Compliance:</strong> {technical.security.compliance.join(", ")}</li>
                        <li><strong>Encryption:</strong> {technical.security.encryption}</li>
                    </ul>
                </div>
                <div className="border border-gray-200 rounded-xl p-5">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">extension</span> Integrations
                    </h4>
                    <div className="space-y-2">
                        {technical.integrations.categories.map((cat, i) => (
                            <div key={i} className="text-sm">
                                <span className="font-semibold text-gray-900">{cat.name}: </span>
                                <span className="text-gray-700">{cat.tools.join(", ")}</span>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
          </div>

          <div style={{ pageBreakInside: 'avoid' }}>
             <h2 className="text-2xl font-bold mb-6 text-gray-800">Stated Competitive Position</h2>
             <div className="mt-6 grid grid-cols-3 gap-6 mb-12">
               {competition.competitors.map((comp, idx) => (
                  <div key={idx} className="flex flex-col gap-4 p-5 rounded-xl border border-gray-200 shadow-sm">
                     <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-2xl">{comp.icon}</span>
                     </div>
                     <h3 className="text-base font-bold text-gray-800">{comp.type}</h3>
                     <p className="text-sm font-semibold mb-1 text-gray-700">{comp.name === "Us" ? companyProfile.name : comp.name}</p>
                     <p className="text-xs text-gray-500 leading-snug">{comp.description}</p>
                  </div>
               ))}
             </div>

             <h2 className="text-2xl font-bold mb-6 text-gray-800">Competitive Differentiation</h2>
             <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
                <table className="w-full text-sm text-left">
                   <thead className="bg-gray-50 text-gray-900 font-bold">
                      <tr>
                         <th className="p-4 border-b border-gray-200">Feature / Aspect</th>
                         <th className="p-4 border-b border-gray-200 bg-primary/5 text-primary">{companyProfile.name}</th>
                         <th className="p-4 border-b border-gray-200 text-gray-600">{compAName}</th>
                         <th className="p-4 border-b border-gray-200 text-gray-600">{compBName}</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {competition.differentiation.map((diff, i) => (
                         <tr key={i} className="hover:bg-gray-50/50">
                            <td className="p-4 font-semibold text-gray-800 border-r border-gray-100">{diff.feature}</td>
                            <td className="p-4 border-r border-gray-100 text-green-700 font-bold bg-primary/5">{diff.us}</td>
                            <td className="p-4 border-r border-gray-100 text-gray-500">{diff.compA}</td>
                            <td className="p-4 text-gray-500">{diff.compB}</td>
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

export default FullReport;
