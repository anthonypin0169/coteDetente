import NavLink from "../nav/nav"
import Logo from "../logo/logo"
import OpeningHours from "../openingHours/openingHours"
import instagramLogo from "../../assets/images/instagram-logo.png"
import facebookLogo from "../../assets/images/facebook-logo.png"
import "./footer.scss"

export default function Footer() {
    return (
        <footer className="footer">
            <OpeningHours />
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