import { useRef, useEffect } from "react"
import NavLink from "../nav/nav"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import Logo from "../logo/logo"
import institutLogo from "../../assets/images/testLogo2.png"
import instagramLogo from "../../assets/images/instagram-logo.png"
import facebookLogo from "../../assets/images/facebook-logo.png"
import "./footer.scss"

export default function Footer() {

    const mapRef = useRef(null)
    useEffect(() => {
        const initialMap = L.map(mapRef.current).setView([46.200537, 5.192188], 16)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(initialMap)
        L.marker([46.200537, 5.192188]).addTo(initialMap)
        return () => initialMap.remove()
    },[])

    return (
        <footer className="footer">
            <Logo src={institutLogo} alt={"Logo Coté détente"} className="footer__institut-icon"/>

            <div className="footer__map-container">
                <h2>Pour nous retrouver</h2>
                <div ref={mapRef} className="footer__map-container--img"></div>
                <h3 className="footer__map-container--text">261 Rue de Schutterwald, 01000 Saint-Denis-lès-Bourg</h3>
            </div>

            <div className="footer__content-container">
                <div className="footer__content-container--planning">
                    <h4 className="footer-content-container-title">Nos horaires :</h4>
                    <li className="content-container-li"><span>Du Mardi au Samedi</span><span>09:00-19:00</span></li>
                    <li className="content-container-li"><span>Lundi et Dimanche</span><span>Fermé</span></li>
                </div>

                <div className="footer__content-container--links">
                    <h4 className="footer__links--h4">Liens utiles :</h4>
                    <NavLink text="Accueil" to="#home-top-carrousel" className="footer-navlink"/>
                    <NavLink text="Contactez nous" to="/contact" className="footer-navlink"/>
                    <NavLink text="Mentions légales" to="/mentions" className="footer-navlink"/>
                    <NavLink text="Conditions générales de ventes" to="/conditions"      className="footer-navlink"/>
                    <a 
                    href="https://www.instagram.com/institutcotedetente_/" 
                    target="blank"
                    rel="noopener noreferrer"
                    className="instagram-container">
                        <Logo src={instagramLogo} alt={"Logo Instagram"} className="instagram-container__icon"/>
                        <p>Rejoignez nous sur Instagram</p>
                    </a>
                    <a 
                    href="https://www.facebook.com/institut.cotedetente01/"
                    target="blank" 
                    rel="noopener noreferrer"
                    className="facebook-container">
                        <Logo src={facebookLogo} alt={"Logo Facebook"} className="facebook-container__icon"/>
                        <p>Rejoignez nous sur Facebook</p>
                    </a>        
                </div>
            </div>
            
               
        </footer>
    )
}