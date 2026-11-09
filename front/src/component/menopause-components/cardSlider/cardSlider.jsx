import "./cardSlider.scss"
import { useEffect, useRef } from "react"

/*top : affiché au-dessus des cartes, children : en dessous. Les deux restent visibles pendant le défilement horizontal*/
export default function CardSlider ({ top, children }) {
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

        /*Formules 1 et 2 : au chargement et quand la fenêtre change de taille*/
        const handleResize = () => {
            distance = Math.max(0, rangee.scrollWidth - stickyZone.clientWidth)
            stickyTop = parseFloat(getComputedStyle(stickyZone).top)

            container.style.height = `${stickyZone.offsetHeight + distance}px`
            handleScroll()
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("scroll", handleScroll)
            cancelAnimationFrame(frame)
        }
    }, [])

    return(
        <div className="slider-container" ref={containerRef}>
            <div className="slider-container__sticky-zone" ref={stickyZoneRef}>
                {top}
                <div className="slider-container__sticky-zone--rangee" ref={rangeeRef}>
                    <div className="slider-card"></div>
                    <div className="slider-card"></div>
                    <div className="slider-card"></div>
                    <div className="slider-card"></div>
                    <div className="slider-card"></div>
                </div>
                {children}
            </div>
        </div>
    )
}