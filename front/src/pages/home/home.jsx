import { useState, useEffect } from "react"
import HeroCarrousel from "./components/HeroCarrousel"
import HighlightCards from "./components/HighlightCards"
import CompanyProfile from "./components/CompanyProfile"
import StaffProfiles from "./components/StaffProfiles"
import CustomerReviews from "./components/CustomerReviews"
import Map from "../../component/map/map"
import { apiFetch } from "@/utils/api"
import "./home.scss"

export default function Home() {

    // carrouselInstitut est partagé entre HeroCarrousel (gestion/upload/suppression
    // des photos) et CompanyProfile (affichage) : il reste ici, au plus proche
    // ancêtre commun des deux, pour que les deux restent synchronisés.
    const [carrouselInstitut, setCarrouselInstitut] = useState([])

    useEffect(() => {
        const loadInstitutImages = async () => {
            try{
                const { data } = await apiFetch("/api/photos/category/carrousel-institut")

                if(!data){
                    throw new Error ("erreur dans la récuperation des photos")
                }

                setCarrouselInstitut(data)

            }catch(error){
                return(error.message)
            }
        }
        loadInstitutImages()
    }, [])

    return (
        <main className="home">
            <HeroCarrousel carrouselInstitut={carrouselInstitut} setCarrouselInstitut={setCarrouselInstitut} />
            <HighlightCards />
            <CompanyProfile carrouselInstitut={carrouselInstitut} />
            <StaffProfiles />
            <CustomerReviews />
            <Map />
        </main>
    )
}
