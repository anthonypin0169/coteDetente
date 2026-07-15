import { useState, useEffect, useCallback } from "react"
import "./carrousel.scss"

export default function Carrousel({images = [], reviews = [], mode, className}) {
    
    
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const items = images.length > 0 ?  images : reviews
    
       
    const next = useCallback(
        () => { 
            if (items.length === 0) return
            setCurrentIndex((prev)=>(prev+1) %items.length)
        },[items.length]
    )
        
    const prev = useCallback(
        () => { 
            if (items.length === 0) return
            setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
        },[items.length]
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
                {images.length > 0 ? (
                    <img src={images[currentIndex]} alt={`slide ${currentIndex}`} className="carrousel__image" />
                ) : (
                    <div className="carrousel__review">
                        <h3 className="carrousel__review--title">{reviews[currentIndex]?.title}</h3>
                        <p className="carrousel__review--text">{reviews[currentIndex]?.text}</p>
                    </div>
                )}
                {mode === "manual" && (
                    <>
                        <button className="carrousel__btn--prev" onClick={prev}>&#8249;</button>
                        <button className="carrousel__btn--next" onClick={next}>&#8250;</button>
                    </>
                )}
            </div>
        )
    
}