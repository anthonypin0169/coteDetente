import { useState, useEffect, useCallback } from "react"
import googleLogo from "../../assets/images/google-logo.webp"
import "./carrousel.scss"

export default function Carrousel({images = [], reviews = [], slides = [], mode, className}) {


    const [currentIndex, setCurrentIndex] = useState(0)

    const items = slides.length > 0 ? slides : images.length > 0 ? images : reviews

       
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
                {slides.length > 0 ? (
                    <div className="carrousel__slide">{slides[currentIndex]}</div>
                ) : images.length > 0 ? (
                    <img
                        src={typeof images[currentIndex] === "string" ? images[currentIndex] : images[currentIndex]?.url}
                        srcSet={typeof images[currentIndex] === "string" ? undefined : images[currentIndex]?.srcSet}
                        sizes="100vw"
                        alt={typeof images[currentIndex] === "string" ? `slide ${currentIndex}` : (images[currentIndex]?.photoAlt || images[currentIndex]?.description || `slide ${currentIndex}`)}
                        className="carrousel__image"
                    />
                ) : (
                    reviews.map((review, i) => { 
                        
                        const position = 
                        i === currentIndex ? "center" :   
                        i === (currentIndex - 1 + items.length) % items.length ? "left" :
                        i === (currentIndex + 1) % items.length ? "right" : 
                        "hide"
                            
                        return ( 
                            <div className={`carrousel__review ${position}`} key={i}>
                                <div className="carrousel__review--name-group">
                                    <div className="carrousel-review-avatar">{review.name?.charAt(0)}</div>
                                    <h3 className="carrousel-review-name">{review.name}</h3>
                                    <img src={googleLogo} alt="Google" className="carrousel__review--google"/>
                                </div>

                                <div className="carrousel__review--text-group">
                                    <span className="carrousel-review-rating">
                                        {Array.from({length: review.rating}, (_, i) => (
                                        <i key={i} className="fa-solid fa-star"></i>))}
                                    </span>
                                    <p className="carrousel-review-text">{review.text}</p>
                                </div>
                            </div>
                        )}) 
                    )}
                {mode === "manual" && (
                    <>
                        <button type="button" aria-label="Image précédente" className="carrousel__btn--prev" onClick={prev}><i className="fa-solid fa-chevron-left"></i></button>
                        <button type="button" aria-label="Image suivante" className="carrousel__btn--next" onClick={next}><i className="fa-solid fa-chevron-right"></i></button>
                    </>
                )}
            </div>
        )
    
}