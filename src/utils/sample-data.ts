import { CVData } from '../types/cv.types';

export const getSampleCVData = (): CVData => ({
  personal: {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/sarahjohnson',
    location: 'San Francisco, CA',
    summary: 'Results-driven Senior Software Engineer with 8+ years of experience building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers. Specialized in React, TypeScript, and cloud architecture.',
  },
  education: [
    {
      id: '1',
      school: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      dates: { from: '2013-09', to: '2015-06' },
      gpa: '3.9',
    },
    {
      id: '2',
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Software Engineering',
      dates: { from: '2009-09', to: '2013-05' },
      gpa: '3.8',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      dates: { from: '2020-03', to: 'Present' },
      responsibilities: 'Lead development of customer-facing web applications using React and TypeScript. Architect scalable solutions for high-traffic platforms. Mentor team of 5 junior developers.',
      achievements: 'Reduced page load time by 60% through optimization. Implemented CI/CD pipeline reducing deployment time by 75%. Led migration to microservices architecture serving 2M+ users.',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      dates: { from: '2017-01', to: '2020-02' },
      responsibilities: 'Developed and maintained full-stack features for SaaS platform. Collaborated with design team to implement responsive UI components. Participated in code reviews and sprint planning.',
      achievements: 'Built real-time notification system handling 100K+ events/day. Improved API response time by 45%. Contributed to 3 successful product launches.',
    },
    {
      id: '3',
      company: 'Digital Agency Co.',
      position: 'Junior Developer',
      dates: { from: '2015-07', to: '2016-12' },
      responsibilities: 'Developed client websites using React and Node.js. Fixed bugs and implemented new features based on client feedback. Maintained documentation and coding standards.',
      achievements: 'Delivered 15+ client projects on time. Implemented automated testing reducing QA time by 30%.',
    },
  ],
  skills: [
    { id: '1', name: 'TypeScript', level: 'expert' },
    { id: '2', name: 'React', level: 'expert' },
    { id: '3', name: 'Node.js', level: 'advanced' },
    { id: '4', name: 'AWS', level: 'advanced' },
    { id: '5', name: 'Docker', level: 'advanced' },
    { id: '6', name: 'GraphQL', level: 'intermediate' },
    { id: '7', name: 'Python', level: 'intermediate' },
    { id: '8', name: 'Kubernetes', level: 'intermediate' },
  ],
  projects: [
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Built a full-featured e-commerce platform with cart, checkout, and payment processing. Implemented admin dashboard for inventory management.',
      technologies: 'React, TypeScript, Node.js, PostgreSQL, Stripe',
      url: 'github.com/sarahjohnson/ecommerce',
    },
    {
      id: '2',
      name: 'Real-Time Analytics Dashboard',
      description: 'Created a real-time analytics dashboard for monitoring application metrics and user behavior. Features include custom charts and alert system.',
      technologies: 'React, D3.js, WebSocket, Redis, MongoDB',
      url: 'github.com/sarahjohnson/analytics',
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022-08',
      url: 'aws.amazon.com/certification',
    },
    {
      id: '2',
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2021-05',
    },
  ],
  languages: [
    { id: '1', name: 'English', level: 'Native' },
    { id: '2', name: 'Spanish', level: 'Professional' },
    { id: '3', name: 'Mandarin', level: 'Basic' },
  ],
  hobbies: [
    { id: '1', name: 'Open Source Contributions' },
    { id: '2', name: 'Tech Blogging' },
    { id: '3', name: 'Rock Climbing' },
  ],
});
