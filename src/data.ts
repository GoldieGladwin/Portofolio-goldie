import {
  Briefcase,
  Code2,
  Coffee,
  Database,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Palette,
  Server,
  Terminal,
} from "lucide-react"
import {
  FaDiscord,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6"
import {
  SiFigma,
  SiNextdotjs,
  SiSupabase,
  SiTailwindcss,
  SiUnity,
} from "react-icons/si"

// ==========================================
// CV / Resume File Location
// ==========================================
// File saved in: public/cv/
export const cvUrl = "/cv/Minimalis%20Profesional%20CV%20Surat%20Lamaran%20Kerja%20Resume.pdf"

export const stats = [
  { label: "Years of Experience", value: "1+" },
  { label: "Projects Completed", value: "4+" },
  { label: "Satisfied Clients", value: "2+" },
  { label: "Students Mentored", value: "0" },
]

export const highlights = [
  { icon: MapPin, text: "Based in Pasuruan City, Indonesia" },
  { icon: Briefcase, text: "Open for freelance opportunities" },
  { icon: GraduationCap, text: "Software Engineering Student at SMKN 1 Pasuruan" },
  {
    icon: Coffee,
    text: "Spotting subtle details that others often miss",
  },
]

export const favoriteActivities = [
  {
    id: 1,
    title: "Strategic Chess & Tactical Foresight",
    description:
      "Studying classic chess games, analyzing opening theory, and playing tactical matches. Chess is one of my favorite activities because every move demands foresight, patience, and composure under pressure. It mirrors software architecture: you must look several moves ahead, anticipate edge cases, and formulate structured strategies to overcome complex challenges.",
    image: "/images/chess.jpg",
    imageAlt: "Chessboard with chess tactics and strategy book",
  },
  {
    id: 2,
    title: "Late-Night Coding & Deep Focus",
    description:
      "Immersing myself in development sessions when the night is quiet and distractions fade away. This is my favorite state of mind because the stillness unlocks deep creative flow. It provides the uninterrupted focus needed to architect clean codebases, solve intricate programming bugs, and turn imaginative ideas into seamless, high-performance web applications.",
    image: "/images/coding.jpg",
    imageAlt: "Atmospheric multi-monitor coding setup in the dark",
  },
  {
    id: 3,
    title: "Reading Books & Expanding Perspectives",
    description:
      "Reading thought-provoking literature, technology insights, and personal development books. This is a favorite pastime because disconnecting from digital screens to dive into written wisdom broadens my perspective and cultivates critical thinking. It fuels lifelong curiosity, nurtures creative imagination, and brings clarity to how I approach life and engineering.",
    image: "/images/reading.jpg",
    imageAlt: "Stack of open books reflecting literature and self-growth",
  },
]

export const learningNow = [
  {
    id: 1,
    title: "Next.js",
    description: "Building production-grade, full-stack applications with server components and optimized routing.",
    icon: SiNextdotjs,
    iconClassName: "text-black dark:text-white",
  },
  {
    id: 2,
    title: "Tailwind CSS",
    description: "Crafting fluid, accessible, and responsive user interfaces with modern utility-first CSS.",
    icon: SiTailwindcss,
    iconClassName: "text-sky-400 dark:text-sky-300",
  },
  {
    id: 3,
    title: "Supabase",
    description: "Designing scalable PostgreSQL databases, row-level security, and authentication flows.",
    icon: SiSupabase,
    iconClassName: "text-[#3ECF8E]",
  },
  {
    id: 4,
    title: "Figma",
    description: "Mastering user experience principles, wireframing, and interactive design systems.",
    icon: SiFigma,
    iconClassName: "text-[#F24E1E] dark:text-[#FF7262]",
  },
  {
    id: 5,
    title: "Unity",
    description: "Exploring 2D/3D game mechanics, physics engines, and interactive logic scripting.",
    icon: SiUnity,
    iconClassName: "text-black dark:text-white",
  },
]

export const goals = [
  {
    id: 1,
    phase: "Near-term / 2026",
    title: "Graduate with Honors",
    description: "Successfully complete my Software Engineering studies at SMKN 1 Pasuruan with top academic and technical performance.",
    status: "In Progress",
  },
  {
    id: 2,
    phase: "Mid-term",
    title: "Software Engineering Career",
    description: "Secure an impactful position as a Software Engineer at an innovative, high-growth technology company.",
    status: "Upcoming",
  },
  {
    id: 3,
    phase: "Long-term",
    title: "Financial Independence",
    description: "Attain long-term financial freedom by building valuable software solutions and tech ventures.",
    status: "Upcoming",
  },
  {
    id: 4,
    phase: "Future Milestone",
    title: "Balanced & Purposeful Living",
    description: "Maintain a fulfilling lifestyle that harmonizes continuous learning, well-being, and creative passions.",
    status: "Upcoming",
  },
  {
    id: 5,
    phase: "Future Milestone",
    title: "Build a Loving Family",
    description: "Create a joyful, loving family and share life's milestones with cherished loved ones.",
    status: "Upcoming",
  },
]

export const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: Code2 },
      { name: "Next.js", icon: Globe },
      { name: "TypeScript", icon: Terminal },
      { name: "Tailwind CSS", icon: Palette },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: Server },
      { name: "REST API", icon: Globe },
      { name: "MySQL", icon: Database },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", icon: Code2 },
      { name: "GitHub", icon: Globe },
      { name: "Figma", icon: Palette },
      { name: "VS Code", icon: Terminal },
    ],
  },
]

export const projects = [
  {
    id: "1",
    slug: "management-siswa",
    title: "Student Management System",
    category: "Full Stack Academic Platform",
    kategori: "Web",
    role: "Full Stack Developer",
    description:
      "A comprehensive school administration platform to record, manage, and evaluate student academic progress seamlessly.",
    longDescription:
      "Engineered to solve administrative bottlenecks in vocational high schools, this system automates student record management, grading cycles, and attendance logging. Built with Next.js App Router and Supabase PostgreSQL, it features role-based access control ensuring confidential student evaluations are kept secure while giving teachers and admins instant analytical overviews.",
    keyFeatures: [
      "Role-based authentication & permissions for teachers and administrators",
      "Automated academic grading calculator and historical report archives",
      "Real-time student attendance logging and exportable summary tables",
      "High-performance PostgreSQL database powered by Supabase with Row Level Security",
    ],
    image: "/images/managemens.png",
    techStack: ["Next.js", "Tailwind CSS", "Shadcn UI", "Supabase"],
    githubUrl: "https://github.com/GoldieGladwin",
    demoUrl: "",
  },
  {
    id: "2",
    slug: "management-magang",
    title: "Internship Management System",
    category: "Vocational & Enterprise Portal",
    kategori: "Web",
    role: "System Architect & Developer",
    description:
      "An integrated coordination platform connecting vocational students, faculty advisors, and industry partners (DUDI).",
    longDescription:
      "Designed specifically for vocational high schools (SMK), this application bridges the communication gap during mandatory industrial internship programs. It allows students to submit daily digital logbooks, gives mentor teachers a verification portal, and enables corporate supervisors (DUDI) to submit performance assessments directly into the system.",
    keyFeatures: [
      "Tripartite dashboard tailored for students, teacher mentors, and industry supervisors",
      "Daily activity logbook submissions with digital approval workflows",
      "Live internship placement tracking and company directory mapping",
      "Integrated rubric-based performance scoring and automated completion certificates",
    ],
    image: "/images/managementm.png",
    techStack: ["Next.js", "Tailwind CSS", "Shadcn UI", "Supabase"],
    githubUrl: "https://github.com/GoldieGladwin",
    demoUrl: "",
  },
  {
    id: "3",
    slug: "my-app",
    title: "Developer Workspace & Playground",
    category: "Frontend UI/UX Lab",
    kategori: "Mobile",
    role: "Frontend Engineer",
    description:
      "An interactive frontend experimentation platform built to test modern React architectures, custom hooks, and dynamic components.",
    longDescription:
      "A personal developer sandbox created to explore cutting-edge web trends and performance optimizations. This project serves as an active testbed for crafting accessible UI primitives, experimenting with modern animation libraries, refining state synchronization patterns, and benchmarking Next.js Server Components against Client Components.",
    keyFeatures: [
      "Extensive custom component library utilizing Tailwind CSS and Radix UI primitives",
      "Fluid theme toggling with smooth transitions and system preference detection",
      "Experimental state management prototypes and custom React hook recipes",
      "Fully responsive design patterns tested across diverse screen viewports and devices",
    ],
    image: "/images/My app.png",
    techStack: ["Next.js", "Tailwind CSS", "Shadcn UI"],
    githubUrl: "https://github.com/GoldieGladwin",
    demoUrl: "",
  },
  {
    id: "4",
    slug: "peminjaman-akun-game",
    title: "Game Account Rental Platform",
    category: "E-Commerce & Digital Rental Platform",
    kategori: "IoT",
    role: "Full Stack Developer",
    description:
      "A feature-rich web portal for secure, automated game account rentals with an intuitive user interface and real-time management.",
    longDescription:
      "A complete digital rental marketplace tailored for gaming enthusiasts who want to test premium game accounts affordably. The platform handles game catalog indexing, time-slot reservation schedules, and credentials delivery. Focused on delivering a visually striking dark-mode gaming aesthetic paired with airtight security.",
    keyFeatures: [
      "Dynamic catalog browsing categorized by genre, popularity, and rental tiers",
      "Automated time-slot booking engine with real-time availability counters",
      "Secure credential distribution and session expiration warnings",
      "Mobile-optimized, sleek gaming-centric interface with dark mode and micro-interactions",
    ],
    image: "/images/pinjam.png",
    techStack: ["Next.js", "Tailwind CSS", "Shadcn UI", "Supabase"],
    githubUrl: "https://github.com/GoldieGladwin",
    demoUrl: "",
  },
]


export const userReviewData = [
  {
    id: 1,
    name: "a***l",
    profession: "Client",
    userImage: "/images/ADEL JKT48.jpg",
    review:
      "Delivered our project requirements with exceptional quality, quick turnaround, and keen attention to detail.",
  },
  {
    id: 2,
    name: "Er**e",
    profession: "Client",
    userImage: "/images/Erine.jpg",
    review:
      "The collaboration was seamless and the final implementation exceeded our expectations. Truly dependable!",
  },
  {
    id: 3,
    name: "Ol**e",
    profession: "Client",
    userImage: "/images/Oline Trainee JKT48.jpg",
    review:
      "Very neat codebase and responsive design. Helped solve our operational workflow efficiently.",
  },
  {
    id: 4,
    name: "k***y",
    profession: "Client",
    userImage: "/images/Kimmy JKT48.jpg",
    review:
      "Delivered precisely what was requested on schedule with great communication and tremendous value.",
  },
]

export const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "goldiegladwin77@gmail.com",
    href: "mailto:goldiegladwin77@gmail.com",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "Goldiegladwin",
    href: "https://instagram.com/Goldiegladwin",
  },
  {
    icon: FaDiscord,
    label: "Discord",
    value: "goldieglad",
    href: "https://discord.com/users/1178605890031591516",
  },
]


export const aboutMe = {
  name: "Goldie Gladwin",
  nickname: "Goldie",
  role: "Software Engineering Student & Full Stack Developer",
  location: "Pasuruan City, Indonesia",
  cvUrl: cvUrl,
  quote:
    "Zero is the beginning of everything! Nothing can begin unless it starts there!",
  description:
    "I am Goldie Gladwin, a Software Engineering student deeply enthusiastic about web development. I love exploring modern technologies, engineering resilient digital applications, and building user interfaces that are both aesthetically refined and seamless to navigate. With a high attention to detail, I often spot subtle nuances that others overlook. Currently, I am expanding my skills across both frontend and backend architectures to become a high-caliber full-stack developer.",
}

export const socialLinks = [
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "Goldiegladwin",
    href: "https://instagram.com/Goldiegladwin",
  },
  {
    icon: FaDiscord,
    label: "Discord",
    value: "goldieglad",
    href: "https://discord.com/users/1178605890031591516",
  },
]

export const footerSocialLinks = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/GoldieGladwin",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/goldiegladwin",
  },
  {
    icon: FaXTwitter,
    label: "Twitter",
    href: "https://twitter.com/goldiegladwin",
  },
]
