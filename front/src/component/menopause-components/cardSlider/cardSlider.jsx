import "./cardSlider.scss"
import { useEffect, useRef } from "react"

/*top : affiché au-dessus des cartes, children : en dessous. Les deux restent visibles pendant le défilement horizontal*/
export default function CardSlider ({ top, children, cardData }) {
    const containerRef = useRef()
    const stickyZoneRef = useRef()
    const rangeeRef = useRef()

    /*Les refs ne sont remplies qu'après l'affichage : les calculs se font donc dans le useEffect*/
    useEffect(() => {
        const container = containerRef.current
        const stickyZone = stickyZoneRef.current
        const rangee = rangeeRef.current
        let distance = 0
        let stickyTop = 0
        let target = 0
        let current = 0
        let frame = null

        /*Glisse : à chaque image, la rangée parcourt 20 % de l'écart qui reste.
        La boucle s'arrête dès que la rangée est arrivée, et reprend au prochain scroll*/
        const animate = () => {
            current += (target - current) * 0.2

            if (Math.abs(target - current) < 0.5) {
                current = target
                frame = null
            } else {
                frame = requestAnimationFrame(animate)
            }
            rangee.style.transform = `translateX(${current}px)`
        }

        /*Formules 3 et 4 : à chaque scroll, on ne met à jour que la position visée*/
        const handleScroll = () => {
            /*Compté à partir du moment où la zone se fige sous le header*/
            const scroll = stickyTop - container.getBoundingClientRect().top
            const progression = distance > 0 ? Math.min(1, Math.max(0, scroll / distance)) : 0

            target = -progression * distance
            if (frame === null) {
                frame = requestAnimationFrame(animate)
            }
        }

        /*Formules 1 et 2 : dès que la rangée ou la zone figée change de taille
        (chargement, fenêtre redimensionnée, CSS rechargé après une sauvegarde)*/
        const handleResize = () => {
            distance = Math.max(0, rangee.scrollWidth - stickyZone.clientWidth)
            stickyTop = parseFloat(getComputedStyle(stickyZone).top)

            container.style.height = `${stickyZone.offsetHeight + distance}px`
            handleScroll()
        }

        const observer = new ResizeObserver(handleResize)
        observer.observe(rangee)
        observer.observe(stickyZone)
        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            observer.disconnect()
            window.removeEventListener("scroll", handleScroll)
            cancelAnimationFrame(frame)
        }
    }, [])

    return(
        <div className="slider-container" ref={containerRef}>
            <div className="slider-container__sticky-zone" ref={stickyZoneRef}>
                {top}
                <div className="slider-container__sticky-zone--rangee" ref={rangeeRef}>
                    {cardData.map((card)=>(
                        <button type="button" key={card.id} className="slider-card">
                            <img className="slider-card__img" src={card.img.src} alt={card.img.alt} loading="lazy" decoding="async" />
                            <div className="slider-card__content">
                                <div className="slider-card__content--title-container">
                                    <h3 className="slider-card__content--title-container--h3">{card.title}</h3>
                                </div>
                                <p className="slider-card__content--text">{card.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
                {children}
            </div>
        </div>
    )
}