// Portfolio Data - Saathvik Kalepu
export const personalInfo = {
  name: "Saathvik Kalepu",
  title: "Full-Stack Developer & AI Engineer",
  tagline: "I design and build scalable web systems with modern frontend, backend, and AI pipelines.",
  email: "saathvikk202@gmail.com",
  phone: "+91 9908179816",
  location: "Hyderabad, India",
  resumeUrl: "My_Resume.pdf",
  socials: {
    github: "https://github.com/sunny18-max",
    linkedin: "https://www.linkedin.com/in/saathvik-kalepu-17041228b/",
    twitter: "https://x.com/home",
    instagram: "https://www.instagram.com/itzsunnyyy18?igsh=NzF1enA2cXd3dnNq",
    leetcode: "https://leetcode.com/u/Sunny550/"
  },
  leetcode: 'Sunny550'
};

export const aboutData = {
  bio: [
    "I'm a Full Stack Developer and AI Specialist passionate about building impactful digital solutions. My expertise spans from crafting beautiful frontend interfaces to architecting robust backend systems and integrating AI capabilities.",
    "Currently pursuing B.Tech in Computer Science at IIIT DM Kurnool, I've delivered 15+ projects with a focus on scalability, performance, and user experience. I thrive at the intersection of technology and design."
  ],
  highlights: [
    "Full-stack systems architecture",
    "AI-powered platform development",
    "Production-grade deployments",
    "15+ successful project deliveries"
  ]
};

export const skillsData = {
  frontend: [
    { name: "JavaScript", icon: "javascript" },
    { name: "HTML5", icon: "html5" },
    { name: "CSS3", icon: "css3" },
    { name: "React", icon: "react" },
    { name: "Redux", icon: "redux" },
    { name: "Next.js", icon: "nextjs" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "Framer Motion", icon: "framer" },
    { name: "Vite", icon: "vite" }
  ],
  backend: [
    { name: "Node.js", icon: "nodejs" },
    { name: "Python", icon: "python" },
    { name: "REST APIs", icon: "rest" },
    { name: "FastAPI", icon: "fastapi" },
    { name: "Express", icon: "express" },
    { name: "GraphQL", icon: "graphql" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Redis", icon: "redis" }
  ],
  aiml: [
    { name: "TensorFlow", icon: "tensorflow" },
    { name: "PyTorch", icon: "pytorch" },
    { name: "Scikit-learn", icon: "scikitlearn" },
    { name: "Pandas", icon: "pandas" },
    { name: "NumPy", icon: "numpy" },
    { name: "OpenAI API", icon: "openai" },
    { name: "Hugging Face", icon: "huggingface" },
    { name: "NLP", icon: "nlp" },
    { name: "Computer Vision", icon: "cv" }
  ],
  tools: [
    { name: "MongoDB", icon: "mongodb" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "Docker", icon: "docker" },
    { name: "Kubernetes", icon: "kubernetes" },
    { name: "AWS", icon: "aws" },
    { name: "Linux", icon: "linux" },
    { name: "GitHub Actions", icon: "githubactions" },
    { name: "Postman", icon: "postman" },
    { name: "Vercel", icon: "vercel" }
  ]
};

export const projectsData = [
  {
    id: 1,
    title: "Crowdfunding Platform",
    category: "web",
    description: "Modern crowdfunding web app for creating and backing projects with live progress tracking and payment integrations.",
    image: "https://imgs.search.brave.com/DGSnrSea-sjRv7p1JXR27Zjv7AUrpfh4aYGcBgwNqw0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9leHBsb3Jpbmct/aW1wYWN0LWNyb3dk/ZnVuZGluZy1tb2Rl/cm4tYnVzaW5lc3Mt/dmVudHVyZXMtaW5u/b3ZhdGlvbnNfMTEz/ODA1OS0xMDIzNy5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw/JnE9ODA",
    tags: ["JavaScript", "Stripe", "Realtime"],
    github: "https://github.com/sunny18-max/Crowdfunding-Platform",
    demo: "https://crowdfunding-snowy-two.vercel.app/",
    badge: "Featured",
    impact: "Creator-first funding flows"
  },
  {
    id: 2,
    title: "MoodSync – Music Recommender",
    category: "ai",
    description: "AI-powered music recommender that suggests personalized playlists based on mood detection and listening behavior.",
    image: "https://imgs.search.brave.com/_8j8OSqkfCdgNNbFsWFVYyKFbMig6UkV2czPBvN3vMs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ1/MTc3NjM2Mi9waG90/by9taWNyb3Bob25l/LWluLWEtcHJvZmVz/c2lvbmFsLXJlY29y/ZGluZy1vci1yYWRp/by1zdHVkaW8uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXJf/bUFoOUVMRUFnaVRi/cWh4UjdsMnM3Si1s/SnliRkVtNEN3ZXlk/ZzNiVWc9",
    tags: ["Python", "ML", "NLP"],
    github: "https://github.com/sunny18-max/MoodSync-Personalized-Music-Recommender",
    demo: "#",
    badge: "AI",
    impact: "Smart playlist personalization"
  },
  {
    id: 3,
    title: "Serenity – Mental Wellness Platform",
    category: "web",
    description: "Full-stack mental wellness platform with mood tracking, guided exercises, and community features designed for user retention.",
    image: "https://imgs.search.brave.com/MOTskYwIO0EqZ9ngPGtD54l1Q3u7SKx8llD9zYBE_gk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ha20t/aW1nLWEtaW4udG9z/c2h1Yi5jb20vaW5k/aWF0b2RheS9pbWFn/ZXMvc3RvcnkvMjAy/MTAxL0NhcHR1cmVf/MTlfMTIwMHg3Njgu/cG5nP3NpemU9Njkw/OjM4OA",
    tags: ["TypeScript", "React", "PWA"],
    github: "https://github.com/sunny18-max/Serenity-Mental-Wellness-Platform",
    demo: "https://serenity-plum-gamma.vercel.app/",
    badge: "Health Tech",
    impact: "200+ active users"
  },
  {
    id: 4,
    title: "TaskVise – Task Management",
    category: "web",
    description: "Company task management system for assigning, tracking, and organizing work with a focus on clarity and collaboration.",
    image: "https://imgs.search.brave.com/eeBdNiHqSs0KurqM-lclZGVdShqAo77mDW8WsxDJGvI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvMjEy/MTg1MTk2L3N0b2Nr/LXBob3RvLXByb2pl/Y3QtbWFuYWdlci13/b3JraW5nLXVwZGF0/ZS10YXNrcy1taWxl/c3RvbmVzLXByb2dy/ZXNzLXBsYW5uaW5n/LWdhbnR0LWNoYXJ0",
    tags: ["TypeScript", "Node.js", "Postgres"],
    github: "https://github.com/sunny18-max/TaskVise-Company-Task-Manging-System",
    demo: "https://taskvise-8sjj.vercel.app/",
    badge: "Productivity",
    impact: "Team efficiency improvements"
  },
  {
    id: 5,
    title: "Unicounsel Frontend",
    category: "web",
    description: "TypeScript-based frontend with modular UI patterns and responsive design for the Unicounsel platform.",
    image: "https://imgs.search.brave.com/vyuD542c99UkAj6XkYJNRvs3K6eTXsGsorLZuZZyIcY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM3/MjYxNTA4NS9waG90/by90ZWVuYWdlLWJv/eS1kaXNjdXNzZXMt/c29tZXRoaW5nLWR1/cmluZy1zdXBwb3J0/LWdyb3VwLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz13WVZp/ZGs4UmRTdklUQUZH/Rnhfd0xHa3RjVHI0/UHpLRHV2amxodkxo/czZJPQ",
    tags: ["TypeScript", "React", "Design Systems"],
    github: "https://github.com/sunny18-max/Unicounsel-frontend",
    demo: "https://unicounsel.vercel.app/",
    badge: "Client Work",
    impact: "Reusable components and patterns"
  },
  {
    id: 6,
    title: "Saathvik Portfolio Webpage",
    category: "web",
    description: "The visually immersive personal portfolio showcasing my design direction, projects, and creative experiments.",
    image: "https://imgs.search.brave.com/FOdUR-ejL2nnZzpvVdHc7acyLJMgZvNx5wHs0fN_LtY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtY3NlLmNhbnZh/LmNvbS9ibG9iLzEz/Nzc1NzkvbG9uZy1m/b3JtX3BvcnRmb2xp/by13ZWJzaXRlX2hl/cm9fbW9iaWxlLnBu/Zw",
    tags: ["JavaScript", "Three.js", "Framer"],
    github: "https://github.com/sunny18-max/Saathvik-Portfolio-Webpage",
    demo: "https://sunny-portfolio-inky.vercel.app/",
    badge: "Portfolio",
    impact: "Brand & Personal Website"
  }
];

export const experienceData = [
  {
    id: 1,
    type: "work",
    title: "Freelance Full Stack Developer",
    organization: "Self-Employed | Remote",
    period: "Present",
    description: "Developing custom web applications and AI solutions for diverse clients with modern tech stacks.",
    achievements: [
      "Delivered 15+ projects with 100% client satisfaction",
      "Integrated AI features in 8 projects",
      "Reduced client operational costs by 30% on average"
    ]
  },
  {
    id: 2,
    type: "internship",
    title: "Software Engineering Intern (AI & Full Stack)",
    organization: "aimaster.live",
    period: "6 Months",
    description: "Completed a 6-month industry internship focused on AI-driven applications and production-ready full-stack systems.",
    achievements: [
      "Led a development team during internship to successfully deliver a hands-on, real-time production project.",
      "Implemented role-based dashboards and multi-step assessments",
      "Integrated AI features for personalized user experiences"
    ]
  },
  {
    id: 3,
    type: "education",
    title: "B.Tech in Computer Science & Engineering",
    organization: "IIIT Design & Manufacturing Kurnool",
    period: "2023 - 2027",
    description: "Specializing in Artificial Intelligence and Web Technologies. Active participant in hackathons and coding competitions.",
    achievements: [
      "GPA: 8.2/10",
      "Active in hackathons & coding competitions"
    ]
  }
];

export const achievementsData = [
  { title: 'Led a Development Team', description: 'Led a development team during internship to successfully deliver a hands-on, real-time production project.' },
  { title: 'GitHub Campus Expert', description: 'Recognized for technical community leadership.' },
  { title: 'LeetCode Problem Solving', description: 'Solved 150+ problems on LeetCode.' },
  { title: 'Hackathons & Workshops', description: 'Participated in multiple hackathons, coding contests, and AI-focused workshops.' }
];
