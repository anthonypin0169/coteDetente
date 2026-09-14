import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import NavLink from "../nav/nav"
import Logo from "../logo/logo"
import institutLogo from "../../assets/images/testLogo2.webp"
import instagramLogo from "../../assets/images/instagram-logo.webp"
import facebookLogo from "../../assets/images/facebook-logo.webp"
import { apiFetch } from "@/utils/api"
import "./footer.scss"

export default function Footer() {

    /* Recherche de prestations */
    const [searchablePrestations, setSearchablePrestations] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        const loadSearchablePrestations = async () => {
            try{
                const { data } = await apiFetch("/api/prestations/searchable")
                if(data) setSearchablePrestations(data)
            }catch(error){
                (error.message)
            }
        }
        loadSearchablePrestations()
    },[])

    const searchResults = query.trim() === ""
        ? []
        : searchablePrestations.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))

    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="footer__top--info">
                    <Logo src={institutLogo} alt={"Logo Coté détente"} className="footer__institut-icon" width={622} height={401}/>
                    <a href="tel:+33474246114" className="footer-tel-link">04 74 24 61 14</a>
                    <p>261 Rue de Schutterwald, 01000 Saint-Denis-lès-Bourg</p>
                    <h4 className="footer-content-container-title">Nos horaires :</h4>
                    <ul className="footer-content-container-list">
                        <li className="content-container-li"><span>Lundi</span><span>13h30-17h30 (onglerie)</span></li>
                        <li className="content-container-li"><span>Mardi au Vendredi</span><span>9h-19h</span></li>
                        <li className="content-container-li"><span>Samedi</span><span>8h30-15h30</span></li>
                        <li className="content-container-li"><span>Dimanche</span><span>Fermé</span></li>
                    </ul>
                </div>

                <div className="footer__top--nav">
                    <h4 className="footer__top--nav__title">Navigation</h4>
                    <NavLink text="Accueil" to="/" className="footer-navlink footer-nav-links"/>
                    <NavLink text="Prestations" to="/prestations" className="footer-navlink footer-nav-links"/>
                    <NavLink text="Évènements" to="/evenements" className="footer-navlink footer-nav-links"/>
                    <NavLink text="Contactez nous" to="/contact" className="footer-navlink footer-nav-links"/>
                </div>

                <div className="footer__top--search">
                    <NavLink text="Carte cadeau" to="/carte-cadeau" className="footer-navlink"/>
                    <h4>Rechercher une prestation</h4>
                    <input type="text" placeholder="Rechercher une prestation..." className="footer__top--search__input" value={query} onChange={(e) => setQuery(e.target.value)}/>
                    {query.trim() !== "" &&
                        <div className="footer__top--search__results-wrapper">
                            <div className="footer__top--search__results">
                                {searchResults.length === 0 ? (
                                    <p>Aucune prestation trouvée</p>
                                ) : (
                                    <ul>
                                        {searchResults.map((presta) => (
                                            <li key={presta._id}>
                                                <Link to={presta.route} onClick={() => setQuery("")}>{presta.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="footer__bottom">
                <div className="social-links-container">
                    <a
                    href="https://www.instagram.com/institutcotedetente_/"
                    target="blank"
                    rel="noopener noreferrer"
                    className="social-links-container__instagram">
                        <Logo src={instagramLogo} alt={"Logo Instagram"} className="social-links-container__instagram--icon"/>
                        <p>Rejoignez nous sur Instagram</p>
                    </a>
                    <a
                    href="https://www.facebook.com/institut.cotedetente01/"
                    target="blank"
                    rel="noopener noreferrer"
                    className="social-links-container__facebook">
                        <Logo src={facebookLogo} alt={"Logo Facebook"} className="social-links-container__facebook--icon"/>
                        <p>Rejoignez nous sur Facebook</p>
                    </a>
                </div>

                <div className="footer__bottom--legal">
                    <NavLink text="Mentions légales" to="/mentions" className="footer-navlink legal-links"/>
                    <NavLink text="Conditions générales de ventes" to="/conditions" className="footer-navlink legal-links"/>
                    <p>Politique de confidentialité</p>
                </div>
            </div>
        </footer>
    )
}
