// ─────────────────────────────────────────────────────────────
//  All portfolio text lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  firstName: "Mior",
  lastName: "Ikmal",
  fullName: "Mior Muhammad Ikmal",
  role: "Web developer and big data student",
  school: "TVETMARA",
  email: "miorikmal06@gmail.com",
  intro:
    "I design and build landing pages, websites and web systems, and I use data to make them work better for the people using them.",
  about:
    "I study Computer Technology (Big Data) at TVETMARA. Most of what I know, I learned by shipping things real people use: a spelling game for kids, a food-stall directory for my campus, a landing page for a robotics academy, and an AI gate that reads number plates.",
  socials: {
    github: "https://github.com/Miorikmal06",
    linkedin:
      "https://www.linkedin.com/in/mior-muhmmad-ikmal-mior-darul-ridzuan-ab18b5381",
  },
};

export const facts = [
  { value: "3.84", label: "Current CGPA" },
  { value: "6", label: "Innovation medals" },
  { value: "2", label: "International golds" },
  { value: "4", label: "Live projects" },
];

/**
 * Where the face sits in /public/me.png, as percentages of the image box.
 * If the portrait is replaced, adjust these so the accessories line up.
 */
export const face = {
  eyes: { x: 54, y: 14.3 },     // midpoint between the eyes
  top: { x: 55, y: 3.5 },       // top of the head
  mouth: { x: 50.5, y: 21.6 },  // centre of the mouth
  neck: { x: 47, y: 33 },       // collar / tie knot
  width: 36,                    // face width
};

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
};

export const projects: Project[] = [
  {
    id: "nexguard",
    title: "NexGuard",
    kind: "IoT system",
    year: "2026",
    summary: "AI barrier gate that reads number plates and faces.",
    detail:
      "Built for Condominium Seri Hijau. YOLO finds the plate, OCR reads it, face recognition checks the driver, and the gate opens for residents only. Guards get Telegram alerts and a dashboard with every event on record.",
    stack: ["Python", "Flask", "YOLO", "EasyOCR", "Supabase", "Raspberry Pi", "Telegram API"],
    image: "/work/nexguard.webp",
    badge: "Final year project, iDEA'26 bronze",
  },
  {
    id: "jazro",
    title: "Jazro Kepala Batas",
    kind: "Landing page",
    year: "2026",
    summary: "Landing page for a kids' robotics and coding academy.",
    detail:
      "One page that turns parents into trial-class bookings: Malay and English toggle, class schedule, fees, location, and a WhatsApp button that is never far from your thumb.",
    stack: ["Vite", "JavaScript", "CSS"],
    image: "/work/jazro.webp",
    url: "https://jazro-kepala-batas.vercel.app",
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
  },
];

export type Experience = {
  role: string;
  org: string;
  place: string;
  period: string;
  summary: string;
  points: string[];
  photos: { src: string; alt: string }[];
};

export const experience: Experience[] = [
  {
    role: "Robotics tutor",
    org: "Jazro Academy",
    place: "Kepala Batas",
    period: "Part-time",
    summary:
      "Taught robotics and coding classes for children, from first robot builds to programming them to move.",
    points: [
      "Led hands-on classes where kids assemble real robots and code them with block-based tools.",
      "Explained STEM ideas in simple language and kept young students engaged through play.",
      "Ran school programmes such as Robocamp at SK Syed Ibrahim and SEBARU EXSTEM at SK Kampong Baru.",
    ],
    // Photos live in /public/experience/. Add or remove entries freely.
    photos: [],
  },
];

/** Hovering or tapping a service lights up the tools it uses. */
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
    place: "TVETMARA",
    detail: "Started the diploma. Current CGPA 3.84, graduating 2027.",
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
