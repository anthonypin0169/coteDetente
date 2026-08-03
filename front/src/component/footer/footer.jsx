import NavLink from "../nav/nav"
import Logo from "../logo/logo"
import institutLogo from "../../assets/images/testLogo2.png"
import instagramLogo from "../../assets/images/instagram-logo.png"
import facebookLogo from "../../assets/images/facebook-logo.png"
import "./footer.scss"

export default function Footer() {

    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="footer__top--info">
                    <Logo src={institutLogo} alt={"Logo Coté détente"} className="footer__institut-icon"/>
                    <p>Numéro de téléphone</p>
                    <p>261 Rue de Schutterwald, 01000 Saint-Denis-lès-Bourg</p>
                    <h4 className="footer-content-container-title">Nos horaires :</h4>
                    <li className="content-container-li"><span>Du Mardi au Samedi</span><span>09:00-19:00</span></li>
                    <li className="content-container-li"><span>Lundi et Dimanche</span><span>Fermé</span></li>
                </div>

                <div className="footer__top--nav">
                    <h4>Navigation</h4>
                    <NavLink text="Accueil" to="/" className="footer-navlink"/>
                    <NavLink text="Prestations" to="/prestations" className="footer-navlink"/>
                    <NavLink text="Évènements" to="/evenements" className="footer-navlink"/>
                    <NavLink text="Contactez nous" to="/contact" className="footer-navlink"/>
                </div>

                <div className="footer__top--search">
                    <NavLink text="Carte cadeau" to="/carte-cadeau" className="footer-navlink"/>
                    <h4>Rechercher une prestation</h4>
                    <input type="text" placeholder="Rechercher une prestation..." className="footer__top--search__input"/>
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
                    <NavLink text="Mentions légales" to="/mentions" className="footer-navlink"/>
                    <NavLink text="Conditions générales de ventes" to="/conditions" className="footer-navlink"/>
                    <p>Politique de confidentialité</p>
                </div>
            </div>
        </footer>
    )
}
