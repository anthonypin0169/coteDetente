import { Link } from "react-router-dom"
import SeoHead from "@/component/seoHead/seoHead"
import "./notFound.scss"

export default function NotFound() {
    return (
        <main className="not-found">
            <SeoHead title="Page introuvable" noindex />
            <p className="not-found__code">404</p>
            <h1 className="not-found__title">Page introuvable</h1>
            <p className="not-found__text">La page que vous cherchez n'existe pas ou plus.</p>
            <Link to="/" className="btn">Retour à l'accueil</Link>
        </main>
    )
}
