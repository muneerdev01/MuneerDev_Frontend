export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  bullets?: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  description: string;
  tags?: string[];
  liveDemo?: string;
  githubUrl?: string;
}

export const MUNEERDEV_SERVICES: ServiceItem[] = [
  {
    id: 'fullstack-architecture',
    name: 'Full-Stack Architecture & Systems Engineering',
    description: 'Design and implementation of high-throughput, low-latency web platforms using Next.js 15, React 19, and decoupled microservices.',
    bullets: [
      'Next.js 15 App Router & React Server Components adoption',
      'Distributed Node.js/Go backend microservices on Render',
      'Database modeling, connection pooling & caching with Redis',
      'CI/CD pipelines with automated testing and zero-downtime deploys',
    ],
  },
  {
    id: 'clinical-informatics',
    name: 'Healthcare Informatics & HL7/FHIR Engineering',
    description: 'HIPAA-compliant software architectures, electronic health record (EHR) interoperability, and SMART on FHIR application development.',
    bullets: [
      'HL7 v2 to FHIR R4 real-time clinical data transformation',
      'SMART on FHIR launch flows & EHR embedded app integration',
      'End-to-end HIPAA compliance, audit logging & encryption',
      'De-identification pipelines for clinical research datasets',
    ],
  },
  {
    id: 'ai-reasoning-agents',
    name: 'Deterministic AI Reasoning & Clinical RAG',
    description: 'Enterprise AI agents, retrieval-augmented generation (RAG) with vector databases, and deterministic guardrails for high-stakes domains.',
    bullets: [
      'Hybrid semantic search & vector embeddings architecture',
      'Deterministic output verification & citation grounding',
      'Multi-agent workflow orchestration & tool calling',
      'Latency profiling and streaming response interfaces',
    ],
  },
];

export const MUNEERDEV_PROJECTS: ProjectItem[] = [
  {
    id: 'clinicaflow-intake-engine',
    name: 'ClinicaFlow Intake Engine',
    category: 'Healthcare & Informatics',
    description:
      'Clinical intake and patient triage system built with FastAPI and Pydantic. It parses intake data, flags critical vital-sign anomalies (blood pressure, SpO2, heart rate, temperature) and assigns real-time clinical risk categories.',
    tags: ['FastAPI', 'Pydantic', 'Python', 'React', 'Vercel'],
    liveDemo: 'https://clinica-flow-intake-engine.vercel.app/',
    githubUrl: 'https://github.com/muneerdev01/ClinicaFlow-Intake-Engine',
  },
  {
    id: 'agenticflow-b2b-intelligence',
    name: 'AgenticFlow: Autonomous B2B Intelligence Pipeline',
    category: 'AI & Automation',
    description:
      'AI agent pipeline that researches a business lead, verifies the company, scores lead quality and drafts a personalised proposal, with a human approving the final action.',
    tags: ['LangGraph', 'AI Agents', 'FastAPI', 'React', 'Vercel'],
    liveDemo: 'https://agenticflow-autonomous-b2-b-intelli.vercel.app/',
    githubUrl: 'https://github.com/muneerdev01/-AGENTICFLOW-AUTONOMOUS-B2B-INTELLIGENCE-PIPELINE',
  },
  {
    id: 'executive-sales-analytics-dashboard',
    name: 'Executive Sales Analytics Dashboard',
    category: 'Data Analytics & BI',
    description:
      'Sales dashboard with automated data cleaning, executive KPIs (revenue, profit, margin, return rate), year-over-year growth and interactive filters by date, region and segment.',
    tags: ['Streamlit', 'Plotly', 'Pandas', 'Python'],
    liveDemo: 'https://executive-sales-analytics-dashboard.streamlit.app/',
    githubUrl: 'https://github.com/muneerdev01/-Executive-Sales-Analytics-Dashboard-',
  },
  {
    id: 'chronic-kidney-disease-dashboard',
    name: 'Chronic Kidney Disease Clinical Analytics',
    category: 'Healthcare & Informatics',
    description:
      'Interactive dashboard for CKD patient data: prevalence, risk tiers, stage distribution, GFR and creatinine analysis, and the impact of diabetes and hypertension.',
    tags: ['Streamlit', 'Plotly', 'Pandas', 'Healthcare'],
    liveDemo: 'https://chronic-kidney-disease-v1.streamlit.app/',
    githubUrl: 'https://github.com/muneerdev01/Chronic-Kidney-Disease',
  },
  {
    id: 'breast-cancer-diagnostic',
    name: 'Enhanced Breast Cancer Diagnostic System',
    category: 'Healthcare & Informatics',
    description:
      '12-phase dataset engineering pipeline with a Streamlit app for breast cancer risk assessment, covering data quality, feature engineering, class imbalance and model explainability.',
    tags: ['Streamlit', 'scikit-learn', 'Machine Learning', 'Healthcare'],
    liveDemo: 'https://enhanced-breast-cancer-diagnostic-dataset.streamlit.app/',
    githubUrl: 'https://github.com/muneerdev01/Enhanced-Breast-Cancer-Diagnostic-Dataset',
  },
  {
    id: 'medical-insurance-payout',
    name: 'Medical Insurance Payout Analysis',
    category: 'Healthcare & Informatics',
    description:
      'Business-intelligence analysis of 1,338 insurance records with predictive modelling, ten visualisations and an interactive dashboard with real-time filters.',
    tags: ['Streamlit', 'scikit-learn', 'Plotly', 'BI'],
    liveDemo: 'https://medical-insurance-payout.streamlit.app/',
    githubUrl: 'https://github.com/muneerdev01/Medical-Insurance-Payout',
  },
  {
    id: 'hr-analytics-dashboard',
    name: 'HR Analytics Dashboard',
    category: 'Data Analytics & BI',
    description:
      'Workforce dashboard built on the IBM HR attrition dataset (1,470+ records) to monitor performance, attrition and hiring trends for workforce planning.',
    tags: ['Streamlit', 'Plotly', 'scikit-learn', 'Python'],
    liveDemo: 'https://hr-analytics-dashboard-v1.streamlit.app/',
    githubUrl: 'https://github.com/muneerdev01/HR-Analytics-Dashboard',
  },
  {
    id: 'telco-churn-analytics',
    name: 'Telco Customer Churn Analytics',
    category: 'Data Analytics & BI',
    description:
      'Machine learning project that predicts telecom customer churn using preprocessing, exploratory analysis and supervised models, with an interactive Streamlit app.',
    tags: ['Streamlit', 'scikit-learn', 'Machine Learning', 'Python'],
    liveDemo: 'https://telco-churn-analytics-v1.streamlit.app/',
    githubUrl: 'https://github.com/muneerdev01/Telco-Churn-Analytics',
  },
  {
    id: 'restaurant-customer-analytics',
    name: 'Restaurant Customer Analytics',
    category: 'Data Analytics & BI',
    description:
      'Analytics pipeline for restaurant customer data with automated quality audits, K-Means customer segmentation, predictive modelling and sales and profitability trends.',
    tags: ['Streamlit', 'K-Means', 'scikit-learn', 'Python'],
    liveDemo: 'https://muneer-restaurantcustomerdataset.streamlit.app/',
    githubUrl: 'https://github.com/muneerdev01/Muneer-Restaurant_Customer_Dataset',
  },
  {
    id: 'pakistani-universities-eda',
    name: 'Top 20 Pakistani Universities EDA',
    category: 'Data Analytics & BI',
    description:
      'Exploratory analysis of the leading Pakistani universities: city hubs, public versus private sector, research impact and student-faculty ratios.',
    tags: ['Streamlit', 'Pandas', 'Seaborn', 'EDA'],
    liveDemo: 'https://top-20-pakistani-universities-eda.streamlit.app/',
    githubUrl: 'https://github.com/muneerdev01/Top-20-Pakistani-Universities-EDA',
  },
];

