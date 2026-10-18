import { getSiteUrl, publicPages } from '../lib/seo';

export default function sitemap() {
  const siteUrl = getSiteUrl();
  return Object.keys(publicPages).map(path => ({ url: new URL(path, siteUrl).href }));
}
