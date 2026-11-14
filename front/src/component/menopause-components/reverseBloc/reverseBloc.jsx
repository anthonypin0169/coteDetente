import "./reverseBloc.scss"
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import useParallax from "@/utils/useParallax"

/*photoSrcSet (facultatif) : versions de la photo par largeur, le navigateur prend la plus petite
qui suffit (l'image fait ~110 % de la largeur de l'écran en mobile et ~80 % en desktop, cf. parallax)*/
export default function ReverseBloc ({ photo, photoSrcSet, title, text, paragraph, textBtn, reverse, linkPosition, bubbles, className }) {
    const link = (className) => <Link to="/menopause/contact" className={`${className} menopause-btn`}>{textBtn}</Link>
    const photoContainerRef = useRef()
    const photoRef = useRef()
    const bubblesRef = useRef()
    const [bubblesVisible, setBubblesVisible] = useState(false)
    /*Rang d'apparition de chaque bulle, mélangé au hasard (Fisher-Yates) une seule fois au montage*/
    const [bubblesOrder] = useState(() => {
        const order = (bubbles ?? []).map((_, i) => i)
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]]
        }
        return order
    })

    /*Bulles : l'apparition se lance une seule fois, quand la liste arrive à l'écran*/
    useEffect(() => {
        const list = bubblesRef.current
        if (!list) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setBubblesVisible(true)
                observer.disconnect()
            }
        }, { threshold: 0.3 })

        observer.observe(list)
        return () => observer.disconnect()
    }, [])

    /*Défilement à contre-sens : quand le bloc monte dans l'écran, la photo descend dans son conteneur*/
    useParallax(photoContainerRef, photoRef)

    return(
        <div className={`bloc ${reverse ? "bloc--reverse" : ""} ${className ?? ""}`}>
            <div className="bloc__photo-container" ref={photoContainerRef}>
                {linkPosition === "photo" && link("btn1")}
                <img className="bloc__photo" src={photo} srcSet={photoSrcSet} sizes={photoSrcSet ? "(min-width: 768px) 80vw, 110vw" : undefined} alt="" ref={photoRef} loading="lazy" decoding="async" />
            </div>
            <div className="bloc__text">
                {linkPosition === "text-top" && link("btn1")}
                {/*--order : rang d'apparition mélangé (cf. bubblesOrder), pour qu'elles
                n'apparaissent pas dans l'ordre de lecture*/}
                {bubbles && (
                    <ul className={`bloc__bubbles ${bubblesVisible ? "bloc__bubbles--visible" : ""}`} ref={bubblesRef}>
                        {bubbles.map((bubble, i) => (
                            <li key={bubble} className="bloc__bubble" style={{ "--order": bubblesOrder[i] }}>{bubble}</li>
                        ))}
                    </ul>
                )}
                {title && <h4>{title}</h4>}
                <p>{text}</p>
                {paragraph && <p>{paragraph}</p>}
                {linkPosition === "text-bottom" && link("btn2")}
            </div>
        </div>
    )
}
