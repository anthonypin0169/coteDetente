import { useState, useEffect, lazy, Suspense } from "react"
import SeoHead from "@/component/seoHead/seoHead"
import HeroCarrousel from "./components/HeroCarrousel"
import HighlightCards from "./components/HighlightCards"
import CompanyProfile from "./components/CompanyProfile"
import StaffProfiles from "./components/StaffProfiles"
import CustomerReviews from "./components/CustomerReviews"
/*Carte chargée à part : Leaflet est lourd et n'est utile qu'en bas de l'accueil (sinon il
alourdit le JavaScript chargé par toutes les pages)*/
const Map = lazy(() => import("../../component/map/map"))
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
            <SeoHead
                title="Accueil"
                description="Institut de bien-être Côté Détente, à Saint-Denis-lès-Bourg près de Bourg-en-Bresse : soins du visage et du corps, épilation, maquillage, manucure et pédicure."
            />
            {/*Titre principal de la page pour Google et les lecteurs d'écran (masqué à l'écran : la bannière fait office de titre visuel)*/}
            <h1 className="sr-only">Côté Détente, institut de beauté et de bien-être à Saint-Denis-lès-Bourg</h1>
            <HeroCarrousel carrouselInstitut={carrouselInstitut} setCarrouselInstitut={setCarrouselInstitut} />
            <HighlightCards />
            <CompanyProfile carrouselInstitut={carrouselInstitut} />
            <StaffProfiles />
            <CustomerReviews />
            <Suspense fallback={null}>
                <Map />
            </Suspense>
        </main>
    )
}