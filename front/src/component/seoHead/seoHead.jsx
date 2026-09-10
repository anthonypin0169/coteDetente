import { Helmet } from "react-helmet-async"

const LOCAL_BUSINESS_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Institut Côté Détente",
    "telephone": "+33474246114",
    "email": "cotedetente.24@orange.fr",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "261 rue Schutterwald",
        "postalCode": "01000",
        "addressLocality": "Saint-Denis-lès-Bourg",
        "addressCountry": "FR"
    },
    "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "13:30", "closes": "17:30" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "09:00", "closes": "19:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:30", "closes": "15:30" }
    ]
}

export default function SeoHead({ title, description, image }) {
    const fullTitle = title ? `${title} | Côté Détente` : "Côté Détente — Institut de bien-être à Saint-Denis-lès-Bourg"

    return (
        <Helmet>
            <title>{fullTitle}</title>
            {description && <meta name="description" content={description} />}
            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="fr_FR" />
            {image && <meta property="og:image" content={image} />}
            <script type="application/ld+json">{JSON.stringify(LOCAL_BUSINESS_JSON_LD)}</script>
        </Helmet>
    )
}
