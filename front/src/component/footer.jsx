import NavLink from "./nav"
import Logo from "./logo"
import instagramLogo from "../assets/images/instagram-logo.png"
import facebookLogo from "../assets/images/facebook-logo.png"
import "./footer.scss"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <h4 className="footer-container__h4">Horaires :</h4>
                <div className="footer-container__planning">
                    <li className="footer-container__planning--li"><span>Lundi</span><span>Fermé</span></li>
                    <li className="footer-container__planning--li"><span>Mardi</span><span>09:00-19:00</span></li>
                    <li className="footer-container__planning--li"><span>Mercredi</span><span>09:00-19:00</span></li>
                    <li className="footer-container__planning--li"><span>Jeudi</span><span>09:00-19:00</span></li>
                    <li className="footer-container__planning--li"><span>Vendredi</span><span>09:00-19:00</span></li>
                    <li className="footer-container__planning--li"><span>Samedi</span><span>09:00-19:00</span></li>
                    <li className="footer-container__planning--li"><span>Dimanche</span><span>Fermé</span></li>
                </div>
                <div className="footer-container__links">
                    <NavLink text="Contactez nous" to="/contact" className="footer-container__links--contact"/>
                    <NavLink text="Mentions légales" to="/mentions" className="footer-container__links--mentions"/>
                    <NavLink text="Conditions générales de ventes" to="/conditions"     className="footer-container__links--conditions"/>
                </div>
                <div className="footer-container__follows">
                    <Logo src={instagramLogo} alt={"Logo Instagram"} className="footer-container__follows--instagram"/>
                    <Logo src={facebookLogo} alt={"Logo Facebook"} className="footer-container__follows--facebook"/>
                </div>
            </div>
        </footer>
    )
}