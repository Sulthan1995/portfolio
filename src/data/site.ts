export const site = {
  name: 'Sulthan Mubarak',
  title: 'Full Stack Developer',
  heroRoles: ['Full Stack Developer'] as const,
  tagline:
    'Dedicated full-stack developer with strong skills in Laravel, Vue.js, and AWS. Self-driven and committed to continuous learning, I build scalable applications with clean architecture, strong performance, and user-focused UX.',
  availability: 'Available for new projects',
  location: 'Malappuram, Kerala (Open to Global Remote)',
  skills: [
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'Laravel', category: 'Backend' },
    { name: 'Python', category: 'Language' },
    { name: 'JavaScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Git', category: 'Tools' },
    { name: 'Vite', category: 'Tools' },
    { name: 'HTML', category: 'Frontend' },
    { name: 'CSS', category: 'Frontend' },
    { name: 'Figma', category: 'Design' },
    { name: 'Cursor', category: 'Tools' },
    { name: 'Codex', category: 'Tools' },
    { name: 'Windsurf', category: 'Tools' },
    { name: 'AWS', category: 'Cloud' },
  ],
  experience: [
    {
      role: 'Laravel Developer',
      period: 'APR 14 2024 — PRESENT',
      company: 'Beegains Technology Solutions LLP · Malappuram, Kerala, India · Full-time',
      summary:
        'Building and maintaining Laravel-based applications, APIs, and integrations. Focus on clean architecture, performance, and reliable delivery for client projects.',
      stack: ['Laravel', 'Vue.js', 'HTML', 'CSS', 'PHP', 'MySQL'],
    },
    {
      role: 'Software Engineer',
      period: 'MAY 2023 — APR 2024',
      company: 'ALTOS Technologies · Kochi, Kerala, India · Full-time · Remote',
      summary:
        'Delivered features and fixes across web applications, working with databases, UI frameworks, and backend integrations in a remote team environment.',
      stack: ['Bootstrap', 'Database', 'MySQL', 'HTML', 'CSS', 'Git', 'Python'],
    },
    {
      role: 'Linux System Administrator',
      period: 'JAN 2019 — MAR 2020',
      company: 'Zynux · Kozhikode, Kerala, India · Internship',
      summary:
        'Internship focused on Linux server administration and support. RHCSA-certified; worked with package management, system troubleshooting, and day-to-day ops tasks.',
      stack: [
        'RPM',
        'Troubleshooting',
        'Linux',
        'RHCSA',
        'Bash',
        'SSH',
        'systemd',
        'Networking',
        'Shell scripting',
        'Servers',
        'Security',
        'yum',
        'dnf',
      ],
    },
  ],
  currentRoleStart: '2024-04-14',
  projects: [
    {
      name: 'IDMS',
      description:
        "For Internal purpose for AM MOTORS Streamline operations at AM Motors, India's premier Maruti Suzuki dealer, with this internal-use website. Manage the entire vehicle lifecycle—from booking to delivery—exclusively for AM Motors staff. Efficiently track vehicle orders, coordinate accessory additions, and handle payment details for Maruti Suzuki cars across all ammotors branches. Designed for seamless internal workflows, this website ensures precision and speed in delivering top-notch service. (For AM Motors employees only, not for customer use.)",
      stack: ['Laravel', 'Vue.js', 'MySQL'],
      link: 'https://sos.ammotors.in/',
    },
    {
      name: 'IDMS AM WINGS',
      description:
        "For Internal purpose for AM WINGS Streamline operations at AM WINGS, India's premier HONDA dealer, with this internal-use website. Manage the entire vehicle lifecycle—from booking to delivery—exclusively for AM Wings staff. Efficiently track vehicle orders, coordinate accessory additions, and handle payment details for Honda bikes across all AM Wings branches. Designed for seamless internal workflows, this website ensures precision and speed in delivering top-notch service. (For AM Wings employees only, not for customer use.)",
      stack: ['Laravel', 'Vue.js', 'MySQL'],
      link: 'https://idms.amwingshonda.com/',
    },
    {
      name: 'Portfolio',
      description:
        'A personal site built with Vue 3 and Vite — fast, semantic, and easy to extend.',
      stack: ['Vue 3', 'Vite', 'TypeScript'],
      link: '#',
    },
  ],
  social: {
    email: 'sulthanmubarak22@gmail.com',
    github: 'https://github.com/sulthanmubarakkp',
    linkedin: 'https://www.linkedin.com/in/sulthanmubarakkp',
    x: 'https://x.com/',
    instagram: 'https://instagram.com/',
  },
}

export type SiteData = typeof site
