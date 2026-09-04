/**
 * Vidvamsa — Runtime Configuration
 * src/js/config.js
 *
 * Single source of truth for all runtime data.
 * Mirrors config/*.yml exactly so that when the
 * FastAPI backend is live, this module can be
 * replaced with a fetch() call to GET /api/v1/config.
 *
 * @module config
 */

/* ── Site ────────────────────────────────────── */
export const SITE = {
  company: {
    name:        "Vidvamsa",
    tagline:     "Engineering Tomorrow, Today",
    description: "We deliver end-to-end technology services powered by AI automation, driven by a world-class team of Designers, Architects, and Engineers.",
    founded:     2024,
    logoText:    "V",
  },
  contact: {
    email:    "hello@vidvamsa.tech",
    phone:    "+91-98765-43210",
    address:  "Bengaluru, Karnataka, India",
    linkedin: "https://linkedin.com/company/vidvamsa",
    twitter:  "https://twitter.com/vidvamsa",
    github:   "https://github.com/vidvamsa",
  },
  navigation: [
    { id: "home",    label: "Home",       icon: "home"       },
    { id: "services",label: "Services",   icon: "layers"     },
    { id: "support", label: "Support",    icon: "headphones" },
    { id: "contact", label: "Contact Us", icon: "mail"       },
  ],
  meta: {
    title:       "Vidvamsa | Technology Services & AI Automation",
    description: "Vidvamsa delivers technology consulting, AI automation and digital transformation solutions.",
    keywords:    ["Technology Services", "AI Automation", "Digital Transformation", "Software Engineering"],
    lang:        "en",
  },
  hero: {
    headline:       "Engineering Tomorrow,",
    headlineAccent: "Today",
    subtext:        "We combine deep technical expertise with AI-powered automation to accelerate your digital transformation journey.",
    ctaPrimary:  { label: "Explore Services", href: "#services" },
    ctaSecondary:{ label: "Contact Us",       href: "#contact"  },
  },
  stats: [
    { value: "50+",  label: "Projects Delivered" },
    { value: "3",    label: "Expert Disciplines"  },
    { value: "100%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Coverage"    },
  ],
  future: {
    apiBaseUrl:           "http://localhost:8000/api/v1",
    aiPlatformUrl:        "http://localhost:8001",
    enableDynamicConfig:  false,
  },
};

/* ── Services ────────────────────────────────── */
export const SERVICES = {
  items: [
    {
      id:          "tech-consulting",
      title:       "Technology Consulting",
      icon:        "cpu",
      short:       "Strategic technology advisory to modernise your stack.",
      description: "We assess your current landscape, identify bottlenecks and design a future-proof technology roadmap aligned with your business goals.",
      highlights:  ["Technology landscape assessment", "Roadmap & architecture design", "Vendor evaluation & selection", "Digital transformation strategy"],
      color:       "#0077CC",
      featured:    true,
    },
    {
      id:          "ai-automation",
      title:       "AI Automations",
      icon:        "zap",
      short:       "Intelligent automation to eliminate repetitive work at scale.",
      description: "We design and deploy AI-driven workflows — from NLP pipelines and computer-vision systems to full-scale LLM integrations — that replace manual processes and unlock new efficiency.",
      highlights:  ["LLM integration & fine-tuning", "NLP / document intelligence", "Robotic Process Automation (RPA)", "MLOps & model lifecycle management"],
      color:       "#00A8E8",
      featured:    true,
    },
    {
      id:          "cloud-architecture",
      title:       "Cloud Architecture",
      icon:        "cloud",
      short:       "Resilient, scalable cloud-native designs on AWS, GCP or Azure.",
      description: "Our architects design cloud-native infrastructures with security, scalability and cost-optimisation at the core.",
      highlights:  ["Multi-cloud & hybrid architecture", "Kubernetes & container orchestration", "IaC with Terraform / Pulumi", "FinOps & cost optimisation"],
      color:       "#1A3C6E",
      featured:    true,
    },
    {
      id:          "software-engineering",
      title:       "Custom Software Development",
      icon:        "code",
      short:       "Full-stack product engineering from MVP to enterprise scale.",
      description: "We build robust, maintainable software products — web applications, APIs, mobile apps — using modern engineering practices.",
      highlights:  ["Frontend (React / Vue / Angular)", "Backend (FastAPI / Node / Java)", "API design & integration", "DevSecOps & CI/CD pipelines"],
      color:       "#0077CC",
      featured:    false,
    },
    {
      id:          "data-engineering",
      title:       "Data Engineering & Analytics",
      icon:        "database",
      short:       "Turn raw data into reliable, actionable insights.",
      description: "We build end-to-end data platforms: ingestion pipelines, data warehouses, semantic layers, and self-serve BI.",
      highlights:  ["Data lakehouse architecture", "ETL / ELT pipelines", "dbt, Spark, Kafka, Airflow", "Real-time streaming analytics"],
      color:       "#00A8E8",
      featured:    false,
    },
    {
      id:          "digital-transformation",
      title:       "Digital Transformation",
      icon:        "refresh-cw",
      short:       "End-to-end modernisation of people, process and technology.",
      description: "We partner with organisations to reimagine their operating models — from legacy system modernisation to capability building.",
      highlights:  ["Legacy modernisation", "Process re-engineering", "Change management", "Capability building & training"],
      color:       "#1A3C6E",
      featured:    false,
    },
  ],
  process: [
    { step: 1, title: "Discover", description: "Deep-dive into your context, goals and constraints." },
    { step: 2, title: "Design",   description: "Craft an architecture and experience blueprint."     },
    { step: 3, title: "Build",    description: "Iterative delivery with weekly demos."               },
    { step: 4, title: "Evolve",   description: "Continuous improvement and scaled operations."       },
  ],
};

/* ── Team ────────────────────────────────────── */
export const TEAM = {
  disciplines: [
    {
      id:          "designers",
      title:       "Designers",
      icon:        "pen-tool",
      tagline:     "Crafting experiences that delight",
      description: "Our UX/UI Designers combine aesthetics with empathy — conducting user research, building prototypes, and delivering pixel-perfect interfaces that drive adoption.",
      skills:      ["User Research & Personas", "Wireframing & Prototyping", "UI Design Systems", "Accessibility (WCAG 2.2)", "Design Ops"],
      tools:       ["Figma", "FigJam", "Adobe XD", "Storybook"],
      color:       "#00A8E8",
    },
    {
      id:          "architects",
      title:       "Architects",
      icon:        "layers",
      tagline:     "Building foundations that scale",
      description: "Our Solution and Cloud Architects design systems with resilience and longevity in mind — guiding technology choices, defining integration patterns and ensuring security by design.",
      skills:      ["Enterprise Architecture", "Cloud-Native Design", "API & Integration Strategy", "Security Architecture", "Performance Engineering"],
      tools:       ["AWS / GCP / Azure", "Terraform", "Kubernetes", "draw.io / Miro"],
      color:       "#1A3C6E",
    },
    {
      id:          "engineers",
      title:       "Engineers",
      icon:        "terminal",
      tagline:     "Turning blueprints into reality",
      description: "Our full-stack Engineers bring designs and architectures to life with clean, tested, maintainable code — across frontend, backend, data and AI workloads.",
      skills:      ["Full-Stack Development", "AI / ML Engineering", "Data Pipelines", "DevSecOps", "Performance Optimisation"],
      tools:       ["Python / FastAPI", "React / TypeScript", "Docker / Kubernetes", "GitHub Actions"],
      color:       "#0077CC",
    },
  ],
  values: [
    { icon: "target",       title: "Outcome-Driven",         text: "We measure success by your results, not our activity."           },
    { icon: "shield",       title: "Quality First",           text: "We embed quality from inception — not as an afterthought."       },
    { icon: "users",        title: "Collaborative",           text: "We work as an extension of your team, not a black box."          },
    { icon: "trending-up",  title: "Continuously Improving",  text: "We bring learning, experimentation and growth to every engagement."},
  ],
};

/* ── Contact & Support ───────────────────────── */
export const CONTACT = {
  support: {
    sla: { critical: "2 hours", high: "8 hours", medium: "24 hours", low: "72 hours" },
    channels: [
      { type: "email",  label: "Email Support",                 value: "support@vidvamsa.tech",      available: "24/7"                      },
      { type: "phone",  label: "Phone",                         value: "+91-98765-43210",             available: "Mon–Fri, 09:00–18:00 IST"  },
      { type: "slack",  label: "Slack (Enterprise clients)",    value: "vidvamsa-support.slack.com",  available: "24/7"                      },
    ],
  },
  faq: [
    { id: "faq-1", question: "What industries do you serve?",               answer: "We serve clients across BFSI, Healthcare, Retail, Manufacturing, EdTech and SaaS — essentially any organisation with complex technology or data challenges." },
    { id: "faq-2", question: "How quickly can you onboard?",                answer: "Typically within 1–2 weeks for project-based engagements and 3–5 days for staff augmentation. We maintain a ready bench of qualified talent."              },
    { id: "faq-3", question: "Do you offer fixed-price projects?",           answer: "Yes — for well-scoped projects with clear requirements. We also offer Time & Material and dedicated team models."                                           },
    { id: "faq-4", question: "What does your AI automation practice cover?", answer: "From intelligent document processing and chatbots to full LLM pipelines, computer vision, and custom ML model development and deployment."                   },
    { id: "faq-5", question: "Do you provide post-deployment support?",      answer: "Yes — we offer ongoing managed services, SLA-backed support, proactive monitoring, and continuous evolution packages tailored to your needs."               },
    { id: "faq-6", question: "Can you work with our existing teams?",        answer: "Absolutely. We routinely embed within client teams, complement existing capabilities, and transfer knowledge at every stage."                               },
  ],
  form: {
    fields: [
      { id: "name",    label: "Full Name",        type: "text",     required: true,  placeholder: "Jane Smith"         },
      { id: "email",   label: "Work Email",       type: "email",    required: true,  placeholder: "jane@company.com"   },
      { id: "company", label: "Company",          type: "text",     required: false, placeholder: "Acme Corp"          },
      {
        id: "service", label: "Service Interest", type: "select",   required: false,
        options: ["Technology Consulting", "AI Automations", "Cloud Architecture", "Custom Software Development", "Data Engineering & Analytics", "Digital Transformation", "Other"],
      },
      { id: "message", label: "Message",          type: "textarea", required: true,  placeholder: "Tell us about your project or challenge..." },
    ],
    submitLabel:    "Send Message",
    successMessage: "Thank you! We'll be in touch within one business day.",
    apiEndpoint:    "/api/v1/contact",
  },
};
