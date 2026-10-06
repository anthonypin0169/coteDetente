import "./slider.scss"
import { useState } from "react"

export default function Slider ({before, after}) {
    const [position, setPosition] = useState(50)

    return(
         <div className="img-container">
            <img draggable={false} className="img-container__photo-av" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} src={before} alt="photo avant soin Wish-pro" />
            <img draggable={false} className="img-container__photo-ap" src={after} alt="photo apres soin Wish-pro" />
            <div className="img-container__line" style = {{ left:`${position}%`}}></div>
            <input type="range" min="0" max="100" className="img-container__input" value={position} onChange={(e) => setPosition(e.target.value)}/>
        </div>
    )
}