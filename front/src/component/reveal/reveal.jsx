import { useEffect, useState, useRef } from "react"
import "./reveal.scss"

export default function Reveal({ children, className = "", slide = false }) {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
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
    }, [])

    return (
        <div ref={ref} className={`reveal ${slide ? "reveal--slide" : ""} ${isVisible ? "reveal--visible" : ""} ${className}`}>
            {children}
        </div>
    )
}
