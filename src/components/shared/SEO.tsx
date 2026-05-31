import { Helmet } from "react-helmet-async";
import { useContent } from "@/contexts/ContentContext";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  schema?: Record<string, any> | Record<string, any>[];
  keywords?: string;
}

export function SEO({
  title,
  description,
  path = "",
  image,
  type = "website",
  schema,
  keywords,
}: SEOProps) {
  const { content } = useContent();
  
  const siteName = content.global.siteName;
  const baseUrl = "https://iict-india.org";
  const defaultImage = content.global.logoUrl || "https://iict-india.org/src/assets/iict-logo.jpeg";
  const seoImage = image || defaultImage;
  const seoKeywords = keywords || content.global.keywords;
  
  // Format canonical URL correctly
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}${cleanPath === "/" ? "" : cleanPath}`;

  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seoImage} />

      {/* Structured Schema Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
