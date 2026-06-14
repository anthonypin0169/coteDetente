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
            </div>
                <div className="footer__links">
                    <NavLink text="Contactez nous" to="/contact" className="footer__links--contact"/>
                    <NavLink text="Mentions légales" to="/mentions" className="footer__links--mentions"/>
                    <NavLink text="Conditions générales de ventes" to="/conditions"     className="footer__links--conditions"/>
                </div>
                <div className="footer__follows">
                    <div className="footer__follows--instagram">
                        <Logo src={instagramLogo} alt={"Logo Instagram"} className="instagram-icon"/>
                        <p>Rejoignez nous sur Instagram</p>
                    </div>                        
                    <div className="footer__follows--facebook">
                        <Logo src={facebookLogo} alt={"Logo Facebook"} className="facebook-icon"/>
                        <p>Rejoignez nous sur Facebook</p>
                    </div>        
                </div>
            
        </footer>
    )
}