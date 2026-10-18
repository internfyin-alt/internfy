import App from "../App";
import "../index.css";
import { getSiteUrl } from "../lib/seo";

export const metadata = {
  title: { default: "Internfy", template: "%s | Internfy" },
  description: "Internfy offers website development, digital services and practical IT training. Contact our team for service and internship enquiries.",
  ...(getSiteUrl() ? { metadataBase: new URL(getSiteUrl()) } : {}),
  icons: { icon: { url: "/favicon.52e407f41962.png", sizes: "48x48", type: "image/png" } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><div id="root"><App>{children}</App></div></body>
    </html>
  );
}
