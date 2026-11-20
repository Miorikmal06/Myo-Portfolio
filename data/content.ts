// ─────────────────────────────────────────────────────────────
//  All portfolio text lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  firstName: "Mior",
  lastName: "Ikmal",
  fullName: "Mior Muhammad Ikmal",
  handle: "mior_ikmal",
  role: "Web developer & big data student",
  location: "Lumut, Perak, Malaysia",
  status: "Open for freelance & internship",
  email: "miorikmal06@gmail.com",
  intro:
    "I build landing pages, websites and systems that see, sort and respond — from a kids' spelling game to an AI gate that reads number plates.",
  about:
    "Diploma in Computer Technology (Big Data) at TVETMARA Lumut. Most of what I know, I learned by shipping things real people use, then reading the data to make them better.",
  socials: {
    github: "https://github.com/Miorikmal06",
    linkedin:
      "https://www.linkedin.com/in/mior-muhmmad-ikmal-mior-darul-ridzuan-ab18b5381",
  },
};

/** Shown as an ML-style "model card" in the About section. */
export const modelCard = [
  { key: "Trained at", value: "TVETMARA Lumut, 2024 to 2027" },
  { key: "Accuracy (CGPA)", value: "3.84", highlight: true },
  { key: "Medals won", value: "6, including 2 international golds", highlight: true },
  { key: "Projects shipped", value: "4 live builds" },
  { key: "Certified by", value: "Cisco NetAcad: CCNA ×2, networking, data analytics" },
  { key: "Also runs on", value: "Robotics teaching at Jazro" },
];

export type Project = {
  id: string;
  title: string;
  kind: "IoT system" | "Landing page" | "Website" | "Web app";
  year: string;
  summary: string;
  detail: string;
  stack: string[];
  image: string;
  url?: string;
  badge?: string;
  confidence: number;
};

export const projects: Project[] = [
  {
    id: "nexguard",
    title: "NexGuard",
    kind: "IoT system",
    year: "2026",
    summary: "AI barrier gate that reads number plates and faces.",
    detail:
      "Built for Condominium Seri Hijau. YOLO spots the plate, OCR reads it, face recognition checks the driver, and the gate opens for residents only. Guards get Telegram alerts and a security dashboard with every event on record.",
    stack: ["Python", "Flask", "YOLO", "EasyOCR", "Supabase", "Raspberry Pi", "Telegram API"],
    image: "/work/nexguard.webp",
    badge: "Final year project, iDEA'26 bronze",
    confidence: 0.98,
  },
  {
    id: "jazro",
    title: "Jazro Kepala Batas",
    kind: "Landing page",
    year: "2026",
    summary: "Landing page for a kids' robotics and coding centre.",
    detail:
      "One page that turns parents into trial-class bookings: Malay and English toggle, class schedule, fees, location, and a WhatsApp button that is never more than a thumb away.",
    stack: ["Vite", "JavaScript", "CSS"],
    image: "/work/jazro.webp",
    url: "https://jazro-kepala-batas.vercel.app",
    confidence: 0.97,
  },
  {
    id: "bizhub",
    title: "BizHub TVETMARA",
    kind: "Website",
    year: "2026",
    summary: "Home for the student-run food stalls on campus.",
    detail:
      "Students browse stalls, menus and vendors in one place. Vendors are managed from an admin panel backed by Firebase, so listings stay current without touching code.",
    stack: ["JavaScript", "Firebase", "Firestore"],
    image: "/work/bizhub.webp",
    url: "https://bizhub-tvetmara.vercel.app",
    confidence: 0.96,
  },
  {
    id: "jom-eja",
    title: "Jom Eja!",
    kind: "Web app",
    year: "2026",
    summary: "Malay spelling games for young kids.",
    detail:
      "Spin the wheel, build words from syllables, match letters. Every word is voiced, so children who can't read yet can still play along.",
    stack: ["HTML", "CSS", "JavaScript", "Web Audio"],
    image: "/work/jom-eja.webp",
    url: "https://jom-eja.vercel.app",
    confidence: 0.95,
  },
];

/** Hovering a capability lights up the tools it uses. */
export const capabilities = [
  {
    title: "Landing pages",
    body: "One page, one job: get the visitor to book, buy or message.",
    tools: ["HTML", "CSS", "JavaScript", "Vite", "GSAP"],
  },
  {
    title: "Websites",
    body: "Multi-page sites that owners can update without calling me.",
    tools: ["JavaScript", "Firebase", "Next.js", "React"],
  },
  {
    title: "Web systems",
    body: "Logins, roles, records and admin dashboards on a real database.",
    tools: ["PHP", "MySQL", "Flask", "Supabase", "Firebase", "SQL"],
  },
  {
    title: "Data dashboards",
    body: "Clean the spreadsheet, find the story, show it so it drives a decision.",
    tools: ["Power BI", "Python", "Pandas", "NumPy", "Matplotlib", "Excel", "SQL"],
  },
  {
    title: "IoT and computer vision",
    body: "Cameras and sensors wired to models that detect, read and recognise.",
    tools: ["Raspberry Pi", "YOLO", "OpenCV", "EasyOCR", "Python", "Telegram API"],
  },
];

export const allTools = [
  "HTML", "CSS", "JavaScript", "React", "Next.js", "Vite", "GSAP",
  "PHP", "Flask", "Python", "SQL", "MySQL", "Supabase", "Firebase",
  "Power BI", "Pandas", "NumPy", "Matplotlib", "Excel",
  "YOLO", "OpenCV", "EasyOCR", "Raspberry Pi", "Telegram API", "Git",
];

export type Milestone = {
  year: string;
  title: string;
  place: string;
  detail: string;
  medal?: "gold" | "silver" | "bronze";
};

export const journey: Milestone[] = [
  {
    year: "2023",
    title: "SPM, 6A 1B 1D",
    place: "SMK Datuk Haji Ahmad Badawi",
    detail: "Finished secondary school and picked computing as the next road.",
  },
  {
    year: "2024",
    title: "Diploma in Computer Technology (Big Data)",
    place: "TVETMARA Lumut",
    detail: "Started the diploma. Current CGPA 3.84, graduating 2027.",
  },
  {
    year: "Part-time",
    title: "Robotics tutor",
    place: "Jazro, Kepala Batas",
    detail: "Taught kids STEM through robot building and coding classes.",
  },
  {
    year: "2025",
    title: "iDRIVE '25 gold medal",
    place: "International Development, Research & Innovation Exhibition",
    detail: "Gold for SentiQ-21, plus bronze at the KEDA Innovation Competition.",
    medal: "gold",
  },
  {
    year: "2025",
    title: "WorldSkills 2025",
    place: "UTeM",
    detail: "Competed at WorldSkills and the ASTI Feynman Challenge.",
  },
  {
    year: "2026",
    title: "INTELLIGENT'26 gold medal",
    place: "International Innovation & Invention Challenge",
    detail: "Gold for Sistem Kehadiran Zero Costing, silver at New Generation World Innovation Challenges.",
    medal: "gold",
  },
  {
    year: "2026",
    title: "NexGuard, iDEA'26 bronze",
    place: "Final year project",
    detail: "AI barrier gate with plate and face recognition for Condominium Seri Hijau.",
    medal: "bronze",
  },
];

export const awards = [
  { medal: "gold", event: "iDRIVE '25", project: "SentiQ-21" },
  { medal: "gold", event: "INTELLIGENT'26", project: "Sistem Kehadiran Zero Costing" },
  { medal: "silver", event: "New Generation World Innovation", project: "Sistem Kehadiran Zero Costing" },
  { medal: "silver", event: "Innovation Competition, ICT category", project: "ICT category" },
  { medal: "bronze", event: "iDEA'26", project: "NexGuard" },
  { medal: "bronze", event: "KEDA Innovation", project: "SentiQ-21" },
] as const;

export const certifications = [
  { name: "CCNA: Switching, Routing & Wireless Essentials", by: "Cisco" },
  { name: "CCNA: Enterprise Networking, Security & Automation", by: "Cisco" },
  { name: "Network Fundamentals", by: "Cisco" },
  { name: "Data Analytics Essentials", by: "Cisco" },
];
