import { useRef, useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "./map.scss"

const redPointerIcon = L.divIcon({
    className: "map-red-pointer",
    html: `<svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 26 16 26s16-15 16-26c0-8.837-7.163-16-16-16z" fill="#e02424"/>
        <circle cx="16" cy="16" r="6" fill="#ffffff"/>
    </svg>`,
    iconSize: [32, 42],
    iconAnchor: [16, 42]
})

export default function Map() {

    const mapRef = useRef(null)
    useEffect(() => {
        const initialMap = L.map(mapRef.current).setView([46.200537, 5.192188], 16)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(initialMap)
        L.marker([46.200537, 5.192188], { icon: redPointerIcon }).addTo(initialMap)
        return () => initialMap.remove()
    },[])

    return (
        <div className="map-container">
            <h2>Pour nous retrouver</h2>
            <div ref={mapRef} className="map-container__img"></div>
            <h3 className="map-container__text">261 Rue de Schutterwald, 01000 Saint-Denis-lès-Bourg</h3>
        </div>
    )
}
