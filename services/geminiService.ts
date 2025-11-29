
import { GoogleGenAI } from "@google/genai";
import { ReportData } from "../types";

const SYSTEM_PROMPT = `
You are an expert Sales Intelligence AI with the skills of a Senior Solutions Architect and a Competitive Intelligence Analyst.
Your goal is to conduct a deep analysis of a solution based on its URL and generate a structured sales report.

Perform the following research steps using Google Search:
1.  **Foundation Discovery**: Identify company name, product name, core value prop, and target audience.
2.  **Deep Technical Due Diligence**: Look for "Developer Documentation", "API Docs", "Security Whitepapers", "Architecture Diagrams", and "Integration pages". Find out *how* it works, not just what it does.
3.  **Extended Research**: Look for reviews (G2, Capterra), competitors, case studies.
4.  **Synthesis**: Combine this into a structured report.

**CRITICAL OUTPUT INSTRUCTIONS:**
You MUST return the result as a VALID JSON string. Do not include markdown code blocks (like \`\`\`json). Just the raw JSON string.
The JSON must strictly match this structure:

{
  "companyProfile": {
    "name": "String",
    "summary": "String (2-3 sentences)"
  },
  "overview": {
    "solutionOverview": "String (Detailed paragraph)",
    "idealCustomerProfile": {
      "size": "String",
      "industry": "String",
      "painPoints": "String"
    },
    "differentiators": [
      { "icon": "star", "title": "String", "desc": "String" },
      { "icon": "shield", "title": "String", "desc": "String" },
      { "icon": "bolt", "title": "String", "desc": "String" }
    ]
  },
  "industries": [
    {
      "name": "String",
      "matchScore": 95,
      "icon": "apartment",
      "slug": "industry-slug",
      "impactText": "String",
      "painPoints": [
        { "icon": "warning", "title": "String", "desc": "String" },
        { "icon": "error", "title": "String", "desc": "String" },
        { "icon": "schedule", "title": "String", "desc": "String" },
        { "icon": "trending_down", "title": "String", "desc": "String" }
      ],
      "jobTitles": [
        { "title": "String", "desc": "String" },
        { "title": "String", "desc": "String" },
        { "title": "String", "desc": "String" }
      ]
    }
    // Provide exactly 5 industries
  ],
  "personas": {
    "roles": [],
    "titles": [
        { 
            "title": "Specific Job Title", 
            "type": "Decision Maker", 
            "roleClass": "text-primary",
            "painPoints": ["String", "String", "String"],
            "objections": ["String", "String", "String"],
            "responses": ["String", "String", "String"]
        }
        // Add 4-5 key titles
    ]
  },
  "competition": {
    "competitors": [
        { "name": "Competitor A", "type": "Acknowledged", "description": "String", "icon": "groups" },
        { "name": "Competitor B", "type": "Claimed Advantage", "description": "String", "icon": "rocket_launch" },
        { "name": "Us", "type": "Category Leader", "description": "String", "icon": "emoji_events" }
    ],
    "differentiation": [
        { "feature": "Pricing", "us": "String", "compA": "String", "compB": "String" },
        { "feature": "Ease of Use", "us": "String", "compA": "String", "compB": "String" },
        { "feature": "Support", "us": "String", "compA": "String", "compB": "String" }
    ]
  },
  "technical": {
    "architecture": {
        "diagramDescription": "String (Description of the system architecture e.g. Cloud-native microservices)",
        "dataFlow": "String (How data moves through the system)",
        "infrastructure": ["String", "String"]
    },
    "security": {
        "compliance": ["String", "String"],
        "encryption": "String",
        "accessControl": "String"
    },
    "scalability": "String",
    "integrations": {
        "categories": [
            { "name": "CRM", "tools": ["Salesforce", "HubSpot"] },
            { "name": "Security", "tools": ["Okta", "Auth0"] }
        ],
        "apiCapabilities": "String"
    },
    "implementation": {
        "timeToValue": "String",
        "requirements": ["String", "String"]
    },
    "deepFeatures": [
        { "title": "Feature 1", "technicalDetail": "How it works technically", "businessValue": "Why it matters" },
        { "title": "Feature 2", "technicalDetail": "How it works technically", "businessValue": "Why it matters" }
    ]
  },
  "contentStrategy": {
    "contentMix": []
  }
}
`;

export const generateReport = async (url: string, marketSize?: string): Promise<ReportData | null> => {
  if (!process.env.API_KEY) {
    console.error("API Key not found");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `${SYSTEM_PROMPT}\n\nTarget Solution URL: ${url}\nTarget Market Size: ${marketSize || "General"}`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    const text = response.text;
    if (!text) throw new Error("No response from AI");

    // Clean up potential markdown formatting
    const jsonString = text.replace(/```json\n|\n```/g, "").trim();
    
    try {
        const data = JSON.parse(jsonString);
        
        // Add metadata
        const fullReport: ReportData = {
            id: Date.now().toString(),
            url,
            marketSize,
            timestamp: Date.now(),
            companyProfile: { ...data.companyProfile, logoUrl: "" },
            overview: data.overview,
            industries: data.industries,
            personas: data.personas,
            competition: data.competition,
            technical: data.technical,
            contentStrategy: { contentMix: [] }
        };
        
        return fullReport;
    } catch (e) {
        console.error("JSON Parse Error", e);
        console.log("Raw Text:", text);
        throw new Error("Failed to parse AI response");
    }

  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
};
