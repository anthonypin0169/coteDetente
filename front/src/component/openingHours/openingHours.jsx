import "./openingHours.scss"

export default function OpeningHours() {
    return (
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
    )
}
