import { useEffect } from 'react';

export const SEOHead = ({ 
  title = "LARA Smiles | Premium Dental Care, Invisalign® & Dental Implants",
  description = "Creating confident smiles with advanced dental care, Invisalign®, dental implants, and personalized smile transformations across South India.",
  path = "",
  image = "/src/assets/images/LaraSmile/hero-smile.jpg"
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to update/create meta tags
    const updateMeta = (selector, attrName, attrVal, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Description & Canonical
    updateMeta('meta[name="description"]', 'name', 'description', description);
    
    const url = `https://larasmiles.com${path}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Open Graph
    updateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'LARA Smiles');
    updateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[property="og:url"]', 'property', 'og:url', url);
    updateMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    updateMeta('meta[property="og:image"]', 'property', 'og:image', image);

    // Twitter Cards
    updateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);

    // JSON-LD Schemas
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

    let scriptDental = document.querySelector('#schema-dental');
    if (!scriptDental) {
      scriptDental = document.createElement('script');
      scriptDental.id = 'schema-dental';
      scriptDental.type = 'application/ld+json';
      document.head.appendChild(scriptDental);
    }
    scriptDental.textContent = JSON.stringify(dentalClinicSchema);

    let scriptBreadcrumb = document.querySelector('#schema-breadcrumb');
    if (!scriptBreadcrumb) {
      scriptBreadcrumb = document.createElement('script');
      scriptBreadcrumb.id = 'schema-breadcrumb';
      scriptBreadcrumb.type = 'application/ld+json';
      document.head.appendChild(scriptBreadcrumb);
    }
    scriptBreadcrumb.textContent = JSON.stringify(breadcrumbSchema);

  }, [title, description, path, image]);

  return null;
};
