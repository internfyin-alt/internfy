// The owner confirmed this preferred public origin. SITE_URL can override it.
// Never publish localhost or an inferred domain as a canonical URL.
export function getSiteUrl() {
  const value = process.env.SITE_URL?.trim() || 'https://internfy.in';
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password ||
      url.pathname !== '/' || url.search || url.hash ||
      ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
    throw new Error('SITE_URL must be the public website origin, without a path, query, or credentials.');
  }
  return url.origin;
}

export const publicPages = {
  '/': {
    title: 'Internship Enquiries in Patna, Bihar',
    description: 'Looking for an internship in Patna, Bihar? Contact Internfy about internship opportunities, IT training and web development. Share your details with our team.',
  },
  '/training': {
    title: 'IT Training, React & Full Stack Development',
    description: 'Explore Internfy training in frontend development, React, full stack development, UI/UX and backend development, with projects and interview preparation.',
  },
  '/about': {
    title: 'About Internfy',
    description: 'Learn about Internfy, our team and our approach to building websites, web applications and digital solutions for businesses.',
  },
  '/services': {
    title: 'Website Development & Digital Services',
    description: 'Explore Internfy website development and digital services. See our work and discuss the right solution for your business.',
  },
  '/contact': {
    title: 'Contact Internfy for Internship Enquiries in Patna',
    description: 'Contact Internfy about internship opportunities in Patna, Bihar, IT training and website development. Discuss your goals with our team.',
  },
  '/career': {
    title: 'Careers & Job Opportunities',
    description: 'Explore career opportunities at Internfy, review job requirements and learn about joining our development team.',
  },
  '/staffing': {
    title: 'IT Staffing & Recruitment Services',
    description: 'Find IT staffing and recruitment support from Internfy. Connect with our team to discuss your hiring requirements.',
  },
  '/webservice': {
    title: 'Website & Web Application Development',
    description: 'Build a responsive business website or web application with Internfy. Explore our web development services and discuss your project.',
  },
  '/backendservice': {
    title: 'Backend Development Services',
    description: 'Explore Internfy backend development services for web applications, databases and server-side business functionality.',
  },
  '/apiservice': {
    title: 'API Development & Integration Services',
    description: 'Connect your applications with Internfy API development and integration services. Discuss your application and integration requirements.',
  },
  '/cloudservice': {
    title: 'Cloud Services & Solutions',
    description: 'Explore cloud services from Internfy and discuss infrastructure, deployment and cloud solutions for your business.',
  },
};

export function pageMetadata(path) {
  const { title, description } = publicPages[path];
  const siteUrl = getSiteUrl();
  const url = siteUrl ? new URL(path, siteUrl).href : undefined;
  return {
    title: { absolute: `${title} | Internfy` },
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title: `${title} | Internfy`, description, siteName: 'Internfy',
      type: 'website', locale: 'en_IN', ...(url ? { url } : {}),
    },
    twitter: { card: 'summary', title: `${title} | Internfy`, description },
  };
}
