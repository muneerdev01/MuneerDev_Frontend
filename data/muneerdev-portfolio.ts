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
    id: 'fhir-stream-pipeline',
    name: 'FHIRStream: Real-Time Clinical Ingestion Engine',
    category: 'Healthcare & Informatics',
    description: 'A distributed event pipeline processing HL7/FHIR clinical observation streams with real-time anomaly detection and HIPAA audit logging.',
    tags: ['FHIR R4', 'HL7', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    liveDemo: 'https://demo.muneerdev.com/fhirstream',
    githubUrl: 'https://github.com/muneerdev/fhirstream-pipeline',
  },
  {
    id: 'medisearch-rag',
    name: 'MediSearch: Grounded Clinical Intelligence Agent',
    category: 'AI & Machine Learning',
    description: 'Retrieval-augmented clinical reasoning agent citing PubMed indexed literature with hallucination prevention filters and verified references.',
    tags: ['Next.js 15', 'React 19', 'Vector DB', 'RAG', 'Python', 'TailwindCSS'],
    liveDemo: 'https://demo.muneerdev.com/medisearch',
    githubUrl: 'https://github.com/muneerdev/medisearch-agent',
  },
  {
    id: 'cloudpulse-telemetry',
    name: 'CloudPulse: Distributed Microservice Telemetry',
    category: 'Cloud & Infrastructure',
    description: 'Real-time telemetry and health aggregation service monitoring Render-hosted worker instances with sub-second WebSocket updates.',
    tags: ['Next.js 15', 'Render', 'WebSockets', 'Tailwind CSS v4', 'Redis'],
    liveDemo: 'https://demo.muneerdev.com/cloudpulse',
    githubUrl: 'https://github.com/muneerdev/cloudpulse-telemetry',
  },
  {
    id: 'smart-on-fhir-portal',
    name: 'EHR Connected Patient Portal',
    category: 'Healthcare & Informatics',
    description: 'SMART on FHIR patient-facing dashboard integrating directly with Cerner and Epic sandbox environments with biometric logging.',
    tags: ['SMART on FHIR', 'OAuth2', 'React 19', 'TypeScript', 'HL7'],
    liveDemo: 'https://demo.muneerdev.com/ehr-portal',
    githubUrl: 'https://github.com/muneerdev/ehr-patient-portal',
  },
];
