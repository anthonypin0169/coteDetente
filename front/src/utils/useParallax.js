import { useEffect } from "react"

/*Défilement à contre-sens : quand le conteneur monte dans l'écran, l'image descend dedans.
L'image doit être plus haute que son conteneur (en absolute, cf. .bloc__photo) :
la partie cachée en haut et en bas est la distance parcourue*/
export default function useParallax (containerRef, imgRef) {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const container = containerRef.current
        const img = imgRef.current
        let frame = null

        const update = () => {
            frame = null
            const rect = container.getBoundingClientRect()
            /*-1 : conteneur en bas de l'écran, 0 : centré, 1 : en haut*/
            const progression = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / (window.innerHeight / 2 + rect.height / 2)
            /*Distance maximale : la plus petite des parties cachées (en haut / en bas),
            pour qu'une image décalée (top différent de -(height - 100%) / 2) ne laisse jamais de vide*/
            const hiddenTop = -img.offsetTop
            const margin = Math.max(0, Math.min(hiddenTop, img.offsetHeight - rect.height - hiddenTop))
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
    }, [containerRef, imgRef])
}
