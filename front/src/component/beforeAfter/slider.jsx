import "./slider.scss"
import { useState } from "react"

export default function Slider ({before, after}) {
    const [position, setPosition] = useState(50)
    /* Indication "Faites glisser" : affichée jusqu'au premier survol / toucher / focus */
    const [showHint, setShowHint] = useState(true)
    const hideHint = () => setShowHint(false)

    return(
         <div className={`img-container ${showHint ? "img-container--hint" : ""}`}>
            <img draggable={false} className="img-container__photo-av" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} src={before} alt="photo avant soin Wish-pro" />
            <img draggable={false} className="img-container__photo-ap" src={after} alt="photo apres soin Wish-pro" />
            <div className="img-container__line" style = {{ left:`${position}%`}}></div>
            <div className="img-container__hint" aria-hidden="true">
                <i className="fa-solid fa-arrows-left-right"></i>
                <span>Faites glisser</span>
            </div>
            <input type="range" min="0" max="100" className="img-container__input" aria-label="Comparer avant et après le soin" value={position} onChange={(e) => setPosition(e.target.value)} onPointerEnter={hideHint} onPointerDown={hideHint} onFocus={hideHint}/>
        </div>
    )
}
