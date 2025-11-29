
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import InputPage from './pages/InputPage';
import ReportOverviewPage from './pages/ReportOverviewPage';
import TargetIndustriesPage from './pages/TargetIndustriesPage';
import { IndustryDetailsPage } from './pages/IndustryPages';
import { TitlesPersonaPage } from './pages/PersonasPages';
import { ContentStrategyPage, TechnicalDeepDivePage, CompetitiveLandscapePage } from './pages/AnalysisPages';
import { CompanyProfilePage, UserProfilePage } from './pages/SettingsPages';
import ContentHubPage from './pages/ContentHubPage';
import LiveAssistantPage from './pages/LiveAssistantPage';
import MarketResearchPage from './pages/MarketResearchPage';
import { ReportProvider } from './context/ReportContext';

const App: React.FC = () => {
  return (
    <ReportProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<InputPage />} />
            <Route path="/overview" element={<ReportOverviewPage />} />
            <Route path="/industries" element={<TargetIndustriesPage />} />
            <Route path="/industries/:id" element={<IndustryDetailsPage />} />
            <Route path="/personas/title" element={<TitlesPersonaPage />} />
            <Route path="/content-strategy" element={<ContentStrategyPage />} />
            <Route path="/technical" element={<TechnicalDeepDivePage />} />
            <Route path="/competition" element={<CompetitiveLandscapePage />} />
            <Route path="/content-hub" element={<ContentHubPage />} />
            <Route path="/live-assistant" element={<LiveAssistantPage />} />
            <Route path="/market-research" element={<MarketResearchPage />} />
            <Route path="/company-profile" element={<CompanyProfilePage />} />
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ReportProvider>
  );
};

export default App;
