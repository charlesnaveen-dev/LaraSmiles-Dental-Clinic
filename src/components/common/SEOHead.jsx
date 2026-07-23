import React from 'react';

export const SEOHead = ({ 
  title = "LARA Smiles | Premium Dental Care, Invisalign® & Dental Implants",
  description = "Creating confident smiles with advanced dental care, Invisalign®, dental implants, and personalized smile transformations across South India.",
  path = "",
  image = "/src/assets/images/LaraSmile/hero-smile.jpg"
}) => {
  const url = `https://larasmiles.com${path}`;

  // Structured Data Schema for LocalBusiness / DentalClinic
  const dentalClinicSchema = {
    "@context": "https://schema.org",
    "@type": "DentalClinic",
    "name": "LARA Smiles Dental Clinic",
    "image": "https://larasmiles.com/logo.png",
    "@id": "https://larasmiles.com",
    "url": "https://larasmiles.com",
    "telephone": "+91 93849 59626",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Old Bus Stand, Mangalam Road",
      "addressLocality": "Tiruppur",
      "addressRegion": "TN",
      "postalCode": "641604",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 11.108524,
      "longitude": 77.341147
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "sameAs": [
      "https://facebook.com/larasmiles",
      "https://instagram.com/larasmiles",
      "https://youtube.com/larasmiles"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://larasmiles.com"
      },
      ...(path ? [{
        "@type": "ListItem",
        "position": 2,
        "name": path.replace('/', '').charAt(0).toUpperCase() + path.slice(2),
        "item": url
      }] : [])
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content="LARA Smiles" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(dentalClinicSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};
