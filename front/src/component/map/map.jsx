import { useRef, useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "./map.scss"

export default function Map() {

    const mapRef = useRef(null)
    useEffect(() => {
        const initialMap = L.map(mapRef.current).setView([46.200537, 5.192188], 16)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(initialMap)
        L.marker([46.200537, 5.192188]).addTo(initialMap)
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
