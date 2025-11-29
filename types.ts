
export interface Industry {
  name: string;
  matchScore: number;
  icon: string;
  impactText: string;
  painPoints: { icon: string; title: string; desc: string }[];
  jobTitles: { title: string; desc: string }[];
  slug: string;
}

export interface PersonaRole {
  title: string;
  desc: string;
  icon: string;
  power: string;
  powerColor: string;
  func: string;
  common: string;
}

export interface PersonaTitle {
  title: string;
  type: string;
  roleClass: string;
  painPoints: string[];
  objections: string[];
  responses: string[];
}

export interface Competitor {
  name: string;
  type: string; // "Acknowledged", "Advantage", "Leadership"
  description: string;
  icon: string;
}

export interface TechnicalFeature {
  title: string;
  technicalDetail: string;
  businessValue: string;
}

export interface TechnicalAnalysis {
  architecture: {
    diagramDescription: string;
    dataFlow: string;
    infrastructure: string[];
  };
  security: {
    compliance: string[];
    encryption: string;
    accessControl: string;
  };
  scalability: string;
  integrations: {
    categories: { name: string; tools: string[] }[];
    apiCapabilities: string;
  };
  implementation: {
    timeToValue: string;
    requirements: string[];
  };
  deepFeatures: TechnicalFeature[];
}

export interface ReportData {
  id: string;
  url: string;
  marketSize?: string;
  timestamp: number;
  
  companyProfile: {
    name: string;
    logoUrl: string; // Placeholder or fetched
    summary: string;
  };

  overview: {
    solutionOverview: string;
    idealCustomerProfile: {
      size: string;
      industry: string;
      painPoints: string;
    };
    differentiators: { icon: string; title: string; desc: string }[];
  };

  industries: Industry[];

  personas: {
    roles: PersonaRole[];
    titles: PersonaTitle[];
  };

  competition: {
    competitors: Competitor[];
    differentiation: { feature: string; us: string; compA: string; compB: string }[];
  };
  
  technical: TechnicalAnalysis;

  contentStrategy: {
    contentMix: { type: string; percentage: number }[];
  };
}
