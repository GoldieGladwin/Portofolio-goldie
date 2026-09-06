import {
  Briefcase,
  Coffee,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Terminal,
} from "lucide-react"


import {
  Code2,
  Database,
  Globe,
  Layout,
  Palette,
  Server,
  Smartphone,
} from "lucide-react"
import {
  FaDiscord,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6"


export const stats = [
  { label: "Years Experience", value: "1+" },
  { label: "Projects Completed", value: "4+" },
  { label: "Happy Clients", value: "2+" },
  { label: "Students Taught", value: "0" },
]

export const highlights = [
  { icon: MapPin, text: "Based in Pasuruan City" },
  { icon: Briefcase, text: "Open for freelance work" },
  { icon: GraduationCap, text: "RPL Student at SMKN 1 Kota Pasuruan" },
  {
    icon: Coffee,
    text: "Finding details that others sometimes overlook",
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
      { name: "React Native", icon: Smartphone },
      { name: "Vue.js", icon: Layout },
    ],
  },

  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: Server },
      { name: "Express.js", icon: Server },
      { name: "REST API", icon: Globe },
      { name: "MySQL", icon: Database },
      { name: "MongoDB", icon: Database },
    ],
  },

  {
    title: "Others",
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
    title: "Management Siswa",
    description:
      "Sistem management sekolah untuk menilai dan mengelola seluruh murid.",
    image: "/images/managemens.png",
    techStack: ["Next.js","Tailwind Css","Shadcn Ui","supabase"],
    demoUrl: "#",
    githubUrl: "#",
  },

  {
    title: "Management Magang",
    description:
      "Sistem management magang untuk anak SMK beserta guru dan DUDI.",
    image: "/images/managementm.png",
    techStack: ["Next.js","Tailwind Css","Shadcn Ui","supabase"],
    demoUrl: "#",
    githubUrl: "#",
  },

  {
    title: "My App",
    description:
      "Project frontend untuk mencoba dan mengeksplorasi berbagai fitur frontend menggunakan Next.js.",
    image: "/images/My app.png",
    techStack: ["Next.js","Tailwind Css","Shadcn Ui"],
    demoUrl: "#",
    githubUrl: "#",
  },

  {
    title: "Peminjaman Akun Game",
    description:
      "Website untuk melakukan peminjaman akun game.",
    image: "/images/pinjam.png",
    techStack: ["Next.js","Tailwind Css","Shadcn Ui","supabase"],
    demoUrl: "https://www.bagus-hidayat.my.id/",
    githubUrl: "#",
  },
];

export const userReviewData = [
  {
    id: 1,
    name: "a***l",
    profession: "Client",
    userImage: "/images/ADEL JKT48.jpg",
    review:
      "Membantu menyelesaikan kebutuhan project dengan baik dan sesuai dengan yang dibutuhkan.",
  },
  {
    id: 2,
    name: "Er**e",
    profession: "Client",
    userImage: "/images/Erine.jpg",
    review:
      "Pengerjaan project berjalan dengan baik dan hasilnya sesuai dengan kebutuhan.",
  },
  {
    id: 3,
    name: "Ol**e",
    profession: "Client",
    userImage: "/images/Oline Trainee JKT48.jpg",
    review:
      "Hasil project cukup rapi dan membantu menyelesaikan kebutuhan yang diperlukan.",
  },
  {
    id: 4,
    name: "k***y",
    profession: "Client",
    userImage: "/images/Kimmy JKT48.jpg",
    review:
      "Hasil project sesuai yang di minta dengan harga yang worth it",
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
    icon: Phone,
    label: "Phone",
    value: "081336540855",
    href: "tel:+6281336540855",
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

export const education = [
  {
    school: "SMKN 1 Kota Pasuruan",
    major: "Rekayasa Perangkat Lunak (RPL)",
    startYear: "2025",
    endYear: "Present",
  },
]

export const aboutMe = {
  name: "Goldie Gladwin",
  nickname: "Goldie",
  role: "Student & Full Stack Developer",
  location: "Pasuruan City",
  quote:
    "Zero is the beginning of everything! Nothing can begin unless it starts there!",
  description:
    "Saya adalah Goldie Gladwin, seorang siswa Rekayasa Perangkat Lunak yang memiliki ketertarikan pada dunia web development. Saya senang mempelajari teknologi baru, membangun berbagai project, dan mengeksplorasi bagaimana sebuah website dapat dibuat agar terlihat menarik sekaligus berfungsi dengan baik. Saya juga memiliki perhatian terhadap detail dan sering menemukan hal-hal kecil yang mungkin terlewat oleh orang lain. Saat ini saya terus mengembangkan kemampuan saya di bidang frontend maupun backend untuk menjadi seorang full stack developer.",
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
    href: "https://github.com/username-kamu",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/username-kamu",
  },
  {
    icon: FaXTwitter,
    label: "Twitter",
    href: "https://twitter.com/username-kamu",
  },
]
export const experiences = [
  {
    type: "work",
    title: "Web Developer",
    company: "Personal Projects",
    period: "2025 - Present",
    description:
      "Membangun berbagai project website untuk mengembangkan kemampuan dalam frontend dan backend development.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
    ],
  },

  {
    type: "project",
    title: "Management Siswa",
    company: "Personal Project",
    period: "2025",
    description:
      "Mengembangkan sistem management sekolah untuk membantu mengelola dan menilai data seluruh siswa.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Shadcn UI",
      "Supabase",
    ],
  },

  {
    type: "project",
    title: "Management Magang",
    company: "Personal Project",
    period: "2025",
    description:
      "Membangun sistem management magang untuk membantu pengelolaan siswa SMK, guru, dan DUDI.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Shadcn UI",
      "Supabase",
    ],
  },

  {
    type: "project",
    title: "Game Account Rental Platform",
    company: "Personal Project",
    period: "2025",
    description:
      "Mengembangkan website untuk melakukan peminjaman akun game dengan tampilan modern dan sistem yang mudah digunakan.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Shadcn UI",
      "Supabase",
    ],
  },

  {
    type: "education",
    title: "Software Engineering Student",
    company: "SMKN 1 Kota Pasuruan",
    period: "2025 - Present",
    description:
      "Mempelajari pengembangan perangkat lunak, website development, database, dan berbagai teknologi modern untuk membangun aplikasi.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
    ],
  },
]
