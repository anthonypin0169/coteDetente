import { useState, useEffect, useCallback } from "react"
import "./carrousel.scss"


export default function Carrousel({images = [], mode, className}) {
    
    const [currentIndex, setCurrentIndex] = useState(0)

    const next = useCallback(
        () => setCurrentIndex((prev)=>(prev+1) %images.length)
        ,[images.length]
    )

    const prev = useCallback(
        () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length),
        [images.length]
    )

    useEffect(()=>{
        if(mode !== "auto")return
        const interval = setInterval(next, 6000)
        return () => clearInterval(interval)
    }
    ,[currentIndex, mode, next]
    )

    return (    
        <div className={`carrousel ${className ?? ""}`}>
            <img src={images[currentIndex]} alt={`slide ${currentIndex}`} className="carrousel__image" />
            {mode === "manual" && (
                <>
                    <button className="carrousel__btn--prev" onClick={prev}>&#8249;</button>
                    <button className="carrousel__btn--next" onClick={next}>&#8250;</button>
                </>
            )}
        </div>
    )
}