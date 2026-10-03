import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TAJUL SHAHIN | Digital Marketing Expert & Web Developer",
  description: "Scaling Businesses With Data-Driven Marketing That Delivers Results. Over $1M+ ad spend managed with proven ROAS.",
  keywords: [
    "Tajul Shahin",
    "Digital Marketer Bangladesh",
    "Digital Marketing Expert",
    "Performance Marketing",
    "Meta Ads Specialist",
    "Google Ads Expert",
    "Conversion Rate Optimization",
    "Sales Funnel Expert",
    "Web Developer Dhaka"
  ],
  authors: [{ name: "Tajul Shahin" }],
  creator: "Tajul Shahin",
  publisher: "Tajul Shahin",
  metadataBase: new URL("https://tajulshahin.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "TAJUL SHAHIN | Digital Marketing Expert & Web Developer",
    description: "Scaling Businesses With Data-Driven Marketing That Delivers Results. Over $1M+ ad spend managed with proven ROAS.",
    images: [
      {
        url: "/images/tazul_shahin.png",
        width: 800,
        height: 1000,
        alt: "Tajul Shahin - Digital Marketing Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAJUL SHAHIN | Digital Marketing Expert & Web Developer",
    description: "Scaling Businesses With Data-Driven Marketing That Delivers Results.",
    images: ["/images/tazul_shahin.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tajul Shahin",
  jobTitle: "Digital Marketing Expert & Web Developer",
  description: "Scaling Businesses With Data-Driven Marketing That Delivers Results.",
  email: "tajulshahin96@gmail.com",
  telephone: "+8801629105607",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  knowsAbout: [
    "Digital Marketing",
    "Paid Advertising",
    "Meta Ads",
    "Google Ads",
    "Conversion Rate Optimization",
    "Sales Funnels",
    "Web Development"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`light scroll-smooth ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased text-slate-900 bg-slate-50 selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
