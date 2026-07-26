import "./openingHours.scss"

export default function OpeningHours() {
    return (
        <div className="footer-container">
            <h4 className="footer-container__h4">Horaires :</h4>
            <div className="footer-container__planning">
                <li className="footer-container__planning--li"><span>Du Mardi au Samedi</span><span>09:00-19:00</span></li>
                <li className="footer-container__planning--li"><span>Lundi et Dimanche</span><span>Fermé</span></li>
                
            </div>
        </div>
    )
}
