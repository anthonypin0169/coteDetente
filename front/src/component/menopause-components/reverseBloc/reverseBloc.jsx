import "./reverseBloc.scss"
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"

/*Agrandissement de la photo (même valeur que le scale du SCSS) : la marge cachée
de chaque côté (10 %) est la distance maximale du déplacement*/
const PHOTO_SCALE = 1.8

export default function ReverseBloc ({ photo, title, text, paragraph, textBtn, reverse, linkPosition }) {
    const link = (className) => <Link to="/menopause/contact" className={`${className} menopause-btn`}>{textBtn}</Link>
    const photoContainerRef = useRef()
    const photoRef = useRef()

    /*Défilement à contre-sens : quand le bloc monte dans l'écran, la photo descend dans son conteneur*/
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const container = photoContainerRef.current
        const img = photoRef.current
        let frame = null

        const update = () => {
            frame = null
            const rect = container.getBoundingClientRect()
            /*-1 : bloc en bas de l'écran, 0 : centré, 1 : en haut*/
            const progression = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / (window.innerHeight / 2 + rect.height / 2)
            const shift = Math.min(1, Math.max(-1, progression)) * rect.height * (PHOTO_SCALE - 1) / 2

            img.style.transform = `translateY(${shift}px) scale(${PHOTO_SCALE})`
        }

        const handleScroll = () => {
            if (frame === null) {
                frame = requestAnimationFrame(update)
            }
        }

        update()
        window.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("resize", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleScroll)
            cancelAnimationFrame(frame)
        }
    }, [])

    return(
        <div className={`bloc ${reverse ? "bloc--reverse" : ""}`}>
            <div className="bloc--photo-container" ref={photoContainerRef}>
                {linkPosition === "photo" && link("btn1")}
                <img className="bloc--photo-container--img" src={photo} alt="" ref={photoRef} />
            </div>
            <div className="bloc--text">
                {linkPosition === "text-top" && link("btn1")}
                {title && <h4>{title}</h4>}
                <p>{text}</p>
                <p>{paragraph}</p>
                {linkPosition === "text-bottom" && link("btn2")}
            </div>
        </div>
    )
}
