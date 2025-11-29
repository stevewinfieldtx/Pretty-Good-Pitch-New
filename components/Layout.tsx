
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useReport } from '../context/ReportContext';
import FullReport from './FullReport';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { currentReport } = useReport();

  const isIndustryActive = location.pathname.startsWith('/industries');

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navLinkClass = (isActive: boolean) => 
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors overflow-hidden ${
      isActive 
        ? 'bg-primary/10 text-primary' 
        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
    }`;

  return (
    <div className="flex flex-row min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hidden Full Report Container for PDF Generation */}
      {/* We use height: 0 and overflow: hidden to hide it from view, but keep it in the DOM flow so html2canvas can capture it. 
          Off-screen positioning (left: -10000px) causes blank PDFs with some renderers. */}
      <div style={{ height: 0, overflow: 'hidden' }}>
        <div id="full-report-print-container" style={{ width: '1100px', backgroundColor: 'white' }}>
          {currentReport && <FullReport data={currentReport} />}
        </div>
      </div>

      {/* Sidebar */}
      <aside 
        className={`${
          collapsed ? 'w-20' : 'w-64'
        } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-shrink-0 flex flex-col justify-between h-screen sticky top-0 transition-all duration-300 ease-in-out z-20`}
      >
        <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
          {/* Header */}
          <div className={`flex gap-3 items-center px-2 mb-2 ${collapsed ? 'justify-center' : ''}`}>
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 flex-shrink-0" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCAitZLPxp7xYLVigCtl0ugkzs5MOlB3YQrRvx_RyiABN_r_DeuQ3uR5gAJYKNONKs0kpCurTiavl203uB3WVUKChXqk1xh23CJeLP_dbcW-BKkCSUA-GU9_LQ8GyLalXCWzj2bU2MH3bddF9Ah-gGTwsYWiQor8yhgxclxVVkWaFxlR_exGDGuSL5xWfvLdp3OzX0VFbifE0b2c10HpRimU-YfKt5UPXaZtofMI2tHM_zOlv30AaNpn2yhlE4k0NcA-CqlFzHsw3s")' }}
            ></div>
            {!collapsed && (
              <div className="flex flex-col overflow-hidden">
                <h1 className="text-gray-900 dark:text-white text-base font-medium leading-normal truncate">Sales Intel</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal truncate">Reporting Tool</p>
              </div>
            )}
          </div>

          <button 
            onClick={toggleSidebar}
            className="absolute -right-3 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 z-50 text-gray-500"
          >
            <span className="material-symbols-outlined text-sm">{collapsed ? 'chevron_right' : 'chevron_left'}</span>
          </button>

          <div className="flex flex-col gap-1">
            {!collapsed && <p className="px-3 text-xs font-bold uppercase text-gray-400 dark:text-gray-500 mb-2 mt-2 truncate">Solution</p>}
            
            <NavLink to="/" className={({ isActive }) => navLinkClass(isActive)} title="New Report">
              <span className="material-symbols-outlined text-base flex-shrink-0">add_circle</span>
              {!collapsed && <p className="text-sm font-medium leading-normal truncate">New Report</p>}
            </NavLink>

            <NavLink to="/overview" className={({ isActive }) => navLinkClass(isActive)} title="Overview">
              <span className={`material-symbols-outlined text-base flex-shrink-0 ${location.pathname === '/overview' ? 'fill' : ''}`}>grid_view</span>
              {!collapsed && <p className="text-sm font-medium leading-normal truncate">Overview</p>}
            </NavLink>

            <div className="flex flex-col">
              <NavLink to="/industries" className={({ isActive }) => navLinkClass(isActive && location.pathname === '/industries')} title="Target Industries">
                <span className={`material-symbols-outlined text-base flex-shrink-0 ${isIndustryActive ? 'text-primary fill' : ''}`}>apartment</span>
                {!collapsed && <p className={`text-sm font-medium leading-normal truncate ${isIndustryActive ? 'text-primary font-bold' : ''}`}>Target Industries</p>}
              </NavLink>
              
              {isIndustryActive && !collapsed && currentReport && (
                <div className="pl-7 mt-1 flex flex-col gap-1 border-l border-gray-200 dark:border-gray-700 ml-5">
                   {currentReport.industries.map((industry, index) => (
                     <NavLink 
                        key={index}
                        to={`/industries/${index}`} 
                        className={({ isActive }) => `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors truncate ${isActive ? 'text-primary bg-primary/5' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                        title={industry.name}
                     >
                       {industry.name}
                     </NavLink>
                   ))}
                </div>
              )}
            </div>

            <NavLink to="/personas/title" className={({ isActive }) => navLinkClass(isActive)} title="Personas by Title">
              <span className={`material-symbols-outlined text-base flex-shrink-0 ${location.pathname.includes('title') ? 'fill' : ''}`}>badge</span>
              {!collapsed && <p className="text-sm font-medium leading-normal truncate">Personas by Title</p>}
            </NavLink>
            <NavLink to="/content-strategy" className={({ isActive }) => navLinkClass(isActive)} title="Content Strategy">
              <span className={`material-symbols-outlined text-base flex-shrink-0 ${location.pathname === '/content-strategy' ? 'fill' : ''}`}>description</span>
              {!collapsed && <p className="text-sm font-medium leading-normal truncate">Content Strategy</p>}
            </NavLink>
            <NavLink to="/technical" className={({ isActive }) => navLinkClass(isActive)} title="Technical Deep Dive">
              <span className={`material-symbols-outlined text-base flex-shrink-0 ${location.pathname === '/technical' ? 'fill' : ''}`}>code</span>
              {!collapsed && <p className="text-sm font-medium leading-normal truncate">Technical Deep Dive</p>}
            </NavLink>
            <NavLink to="/competition" className={({ isActive }) => navLinkClass(isActive)} title="Competition">
              <span className={`material-symbols-outlined text-base flex-shrink-0 ${location.pathname === '/competition' ? 'fill' : ''}`}>emoji_events</span>
              {!collapsed && <p className="text-sm font-medium leading-normal truncate">Competition</p>}
            </NavLink>
          </div>

          <div className="flex flex-col gap-1 mt-4">
            {!collapsed && <p className="px-3 text-xs font-bold uppercase text-gray-400 dark:text-gray-500 mb-2 truncate">Intelligence</p>}
            <NavLink to="/live-assistant" className={({ isActive }) => navLinkClass(isActive)} title="Live Assistant">
              <span className="material-symbols-outlined text-base flex-shrink-0 text-red-500">graphic_eq</span>
              {!collapsed && <p className="text-sm font-medium leading-normal truncate">Live Assistant</p>}
            </NavLink>
            <NavLink to="/market-research" className={({ isActive }) => navLinkClass(isActive)} title="Market Research">
              <span className="material-symbols-outlined text-base flex-shrink-0 text-blue-500">search_check</span>
              {!collapsed && <p className="text-sm font-medium leading-normal truncate">Market Research</p>}
            </NavLink>
            <NavLink to="/content-hub" className={({ isActive }) => navLinkClass(isActive)} title="Content Hub">
              <span className="material-symbols-outlined text-base flex-shrink-0 text-green-500">perm_media</span>
              {!collapsed && <p className="text-sm font-medium leading-normal truncate">Content Hub</p>}
            </NavLink>
          </div>

          <div className="flex flex-col gap-1 mt-4">
            {!collapsed && <p className="px-3 text-xs font-bold uppercase text-gray-400 dark:text-gray-500 mb-2 truncate">Profile</p>}
            <NavLink to="/company-profile" className={({ isActive }) => navLinkClass(isActive)} title="Company Profile">
              <span className={`material-symbols-outlined text-base flex-shrink-0 ${location.pathname === '/company-profile' ? 'fill' : ''}`}>corporate_fare</span>
              {!collapsed && <p className="text-sm font-medium leading-normal truncate">Company Profile</p>}
            </NavLink>
            <NavLink to="/user-profile" className={({ isActive }) => navLinkClass(isActive)} title="User Profile">
              <span className={`material-symbols-outlined text-base flex-shrink-0 ${location.pathname === '/user-profile' ? 'fill' : ''}`}>person</span>
              {!collapsed && <p className="text-sm font-medium leading-normal truncate">User Profile</p>}
            </NavLink>
          </div>
        </div>

        <div className="flex flex-col gap-1 p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer overflow-hidden" title="Settings">
            <span className="material-symbols-outlined text-base flex-shrink-0">settings</span>
            {!collapsed && <p className="text-sm font-medium leading-normal truncate">Settings</p>}
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer overflow-hidden" title="Help">
            <span className="material-symbols-outlined text-base flex-shrink-0">help</span>
            {!collapsed && <p className="text-sm font-medium leading-normal truncate">Help</p>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
