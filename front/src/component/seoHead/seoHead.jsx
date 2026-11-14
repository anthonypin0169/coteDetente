import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"

/*Adresse publique du site : sert aux URL absolues (canonique, partage sur les réseaux)*/
const SITE_URL = "https://www.institut-cote-detente.fr"
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

const LOCAL_BUSINESS_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Institut Côté Détente",
    "url": SITE_URL,
    "image": DEFAULT_IMAGE,
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

export default function SeoHead({ title, description, image, noindex }) {
    const { pathname } = useLocation()
    const fullTitle = title ? `${title} | Côté Détente` : "Côté Détente — Institut de bien-être à Saint-Denis-lès-Bourg"
    /*Canonique : toujours la même URL pour une page (sans paramètres ni / final), pour que
    Google ne compte pas plusieurs versions de la même page*/
    const url = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`
    const shareImage = image || DEFAULT_IMAGE

    return (
        <Helmet>
            <title>{fullTitle}</title>
            {(noindex || import.meta.env.VITE_NOINDEX === "true") && <meta name="robots" content="noindex, nofollow" />}
            {description && <meta name="description" content={description} />}
            {!noindex && <link rel="canonical" href={url} />}
            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="fr_FR" />
            <meta property="og:site_name" content="Côté Détente" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={shareImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <script type="application/ld+json">{JSON.stringify(LOCAL_BUSINESS_JSON_LD)}</script>
        </Helmet>
    )
}
