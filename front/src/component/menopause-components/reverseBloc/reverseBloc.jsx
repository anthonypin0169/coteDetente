import "./reverseBloc.scss"
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

export default function ReverseBloc ({ photo, title, text, paragraph, textBtn, reverse, linkPosition, bubbles }) {
    const link = (className) => <Link to="/menopause/contact" className={`${className} menopause-btn`}>{textBtn}</Link>
    const photoContainerRef = useRef()
    const photoRef = useRef()
    const bubblesRef = useRef()
    const [bubblesVisible, setBubblesVisible] = useState(false)

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
            /*Distance maximale : la partie cachée de chaque côté (l'image est plus haute que le conteneur, cf. SCSS)*/
            const margin = (img.offsetHeight - rect.height) / 2
            const shift = Math.min(1, Math.max(-1, progression)) * margin

            img.style.transform = `translateY(${shift}px)`
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
                {/*--order : rang d'apparition mélangé (i × 7 modulo le nombre de bulles), pour qu'elles
                n'apparaissent pas dans l'ordre de lecture*/}
                {bubbles && (
                    <ul className={`bloc--bubbles ${bubblesVisible ? "bloc--bubbles--visible" : ""}`} ref={bubblesRef}>
                        {bubbles.map((bubble, i) => (
                            <li key={bubble} className="bloc--bubbles--item" style={{ "--order": (i * 7) % bubbles.length }}>{bubble}</li>
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
