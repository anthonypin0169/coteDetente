import { useEffect, useState, useRef } from "react"
import "./reveal.scss"

/*ready : à passer à false tant que le contenu n'est pas chargé (sinon le bloc vide, tout petit,
est déjà à l'écran au chargement et "apparaît" avant d'avoir son contenu).
stagger : le bloc reste affiché et ce sont ses éléments .reveal__item qui apparaissent
l'un après l'autre (rang donné par la variable CSS --i sur chaque élément)*/
export default function Reveal({ children, className = "", slide = false, stagger = false, ready = true }) {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!ready) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.2 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [ready])

    return (
        <div ref={ref} className={`reveal ${slide ? "reveal--slide" : ""} ${stagger ? "reveal--stagger" : ""} ${isVisible ? "reveal--visible" : ""} ${className}`}>
            {children}
        </div>
    )
}
