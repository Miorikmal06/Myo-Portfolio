// ─────────────────────────────────────────────────────────────
//  All portfolio text lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  firstName: "Mior",
  lastName: "Ikmal",
  fullName: "Mior Muhammad Ikmal",
  role: "Web Developer & Big Data Student",
  location: "Lumut, Perak — Malaysia",
  status: "Open to freelance & internship",
  intro:
    "I build landing pages, websites and web systems that people actually use — and I study data to understand how they use them.",
  about: [
    "I'm a Diploma in Computer Technology (Big Data) student at TVETMARA Lumut, holding a 3.84 CGPA.",
    "Most of what I know, I learned by shipping. A spelling game for kids. A food-stall directory for my campus. A booking system for our gym. An AI gate that reads number plates and faces.",
    "I like work that sits between code and real people — and I take it from first sketch to a live link.",
  ],
  socials: {
    github: "https://github.com/Miorikmal06",
    linkedin:
      "https://www.linkedin.com/in/mior-muhmmad-ikmal-mior-darul-ridzuan-ab18b5381",
  },
};

export const stats = [
  { value: 3.84, decimals: 2, label: "Current CGPA" },
  { value: 6, decimals: 0, label: "Innovation medals" },
  { value: 2, decimals: 0, label: "International golds" },
  { value: 5, decimals: 0, label: "Projects shipped" },
];

export type Project = {
  id: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  stack: string[];
  image?: string;
  url?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    id: "nexguard",
    title: "NexGuard",
    kind: "IoT System",
    year: "2026",
    summary:
      "Smart barrier gate for Condominium Seri Hijau. Reads number plates and faces, opens for residents, alerts guards on Telegram.",
    stack: ["Python", "Flask", "YOLO", "EasyOCR", "Supabase", "Raspberry Pi"],
    image: "/work/nexguard.webp",
    note: "Final Year Project · iDEA'26 Bronze",
  },
  {
    id: "jazro",
    title: "Jazro Kepala Batas",
    kind: "Landing Page",
    year: "2026",
    summary:
      "Landing page for a kids' robotics & coding centre. BM / EN toggle, class schedule, fees and free-trial booking on WhatsApp.",
    stack: ["Vite", "JavaScript", "CSS"],
    image: "/work/jazro.webp",
    url: "https://jazro-kepala-batas.vercel.app",
  },
  {
    id: "bizhub",
    title: "BizHub TVETMARA",
    kind: "Website",
    year: "2026",
    summary:
      "Digital home for student-run food stalls on campus. Vendors, menus and an admin panel to keep listings fresh.",
    stack: ["JavaScript", "Firebase", "Firestore"],
    image: "/work/bizhub.webp",
    url: "https://bizhub-tvetmara.vercel.app",
  },
  {
    id: "jom-eja",
    title: "Jom Eja!",
    kind: "Web App",
    year: "2026",
    summary:
      "Malay spelling games for young kids — spin-the-wheel, syllable builder and letter matching, with voice audio.",
    stack: ["HTML", "CSS", "JavaScript", "Web Audio"],
    image: "/work/jom-eja.webp",
    url: "https://jom-eja.vercel.app",
  },
  {
    id: "gym",
    title: "Gym Booking System",
    kind: "Web System",
    year: "2024",
    summary:
      "Booking system for the TVETMARA Lumut gym. Student and admin login, online slots, automatic cap to stop overbooking.",
    stack: ["PHP", "MySQL", "HTML", "CSS"],
    note: "Campus system",
  },
];

export const services = [
  {
    title: "Landing Pages",
    body: "One page, one job: get the visitor to book, buy or message. Fast, mobile-first, with animation that serves the story.",
    proof: "Jazro Kepala Batas",
  },
  {
    title: "Websites",
    body: "Multi-page sites for small businesses and communities, with content you can update without calling me.",
    proof: "BizHub TVETMARA",
  },
  {
    title: "Web Systems",
    body: "Login, roles, bookings, records and admin dashboards — built on PHP, Flask or Firebase with a real database behind it.",
    proof: "Gym Booking · NexGuard",
  },
  {
    title: "Data Dashboards",
    body: "Clean the spreadsheet, find the story, show it in Power BI or Python so the numbers make a decision easier.",
    proof: "Power BI · Pandas",
  },
  {
    title: "IoT & Computer Vision",
    body: "Raspberry Pi, sensors and cameras wired to YOLO, OCR and face recognition, reporting to the cloud and Telegram.",
    proof: "NexGuard",
  },
];

export const stack = [
  "Python",
  "JavaScript",
  "HTML",
  "CSS",
  "PHP",
  "SQL",
  "MySQL",
  "Flask",
  "Firebase",
  "Supabase",
  "Power BI",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "YOLO",
  "OpenCV",
  "Raspberry Pi",
  "Git",
  "Cisco CCNA",
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
    year: "2019 — 23",
    title: "SPM — 6A 1B 1D",
    place: "SMK Datuk Haji Ahmad Badawi",
    detail: "Finished secondary school and picked computing as the next road.",
  },
  {
    year: "2024",
    title: "Diploma in Computer Technology (Big Data)",
    place: "TVETMARA Lumut",
    detail: "Started the diploma. Current CGPA 3.84. Graduating 2027.",
  },
  {
    year: "2024",
    title: "Gym Booking System",
    place: "TVETMARA Lumut",
    detail: "First full web system: logins, roles and slot control in PHP & MySQL.",
  },
  {
    year: "Part-time",
    title: "Robotics Tutor",
    place: "Jazro, Kepala Batas",
    detail: "Taught kids STEM through robot building and coding classes.",
  },
  {
    year: "2025",
    title: "iDRIVE '25 — Gold Medal",
    place: "International Development, Research & Innovation Exhibition",
    detail: "Gold for SentiQ-21. Also Bronze at the KEDA Innovation Competition.",
    medal: "gold",
  },
  {
    year: "2025",
    title: "WorldSkills 2025",
    place: "UTeM",
    detail: "Competed at WorldSkills, plus the ASTI Feynman Challenge.",
  },
  {
    year: "2026",
    title: "INTELLIGENT'26 — Gold Medal",
    place: "International Innovation & Invention Challenge",
    detail: "Gold for Sistem Kehadiran Zero Costing. Silver at New Generation World Innovation Challenges.",
    medal: "gold",
  },
  {
    year: "2026",
    title: "NexGuard — iDEA'26 Bronze",
    place: "Final Year Project",
    detail: "AI barrier gate with plate & face recognition for Condominium Seri Hijau.",
    medal: "bronze",
  },
];

export const awards = [
  { medal: "gold", event: "iDRIVE '25", project: "SentiQ-21" },
  { medal: "gold", event: "INTELLIGENT'26", project: "Sistem Kehadiran Zero Costing" },
  { medal: "silver", event: "New Generation World Innovation", project: "Sistem Kehadiran Zero Costing" },
  { medal: "silver", event: "Innovation Competition — ICT", project: "ICT Category" },
  { medal: "bronze", event: "iDEA'26", project: "NexGuard" },
  { medal: "bronze", event: "KEDA Innovation", project: "SentiQ-21" },
] as const;

export const certifications = [
  "CCNA: Switching, Routing & Wireless Essentials — Cisco",
  "CCNA: Enterprise Networking, Security & Automation — Cisco",
  "Network Fundamentals — Cisco",
  "Data Analytics Essentials — Cisco",
];
