import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Carrousel from "@/component/carrousel"
import StaffProfile from "@/component/staffProfile"
import NavLink from "../component/nav"
import planteCeltique1 from "../assets/images/planteCeltique1.png"
import portrait from "../assets/images/portrait.jpg"
import portrait1 from "../assets/images/portrait1.jpg"
import portrait2 from "../assets/images/portrait2.jpg"
import map from "../assets/images/map.png"
import "./home.scss"

export default function Home() {

    const [carrouselHero, setCarrouselHero] = useState([])
    const [carrouselInstitut, setSarrouselInstitut] = useState([])

    useEffect( () => {
        const loadImages = async () => {
            try{
                const heroResponse = await fetch ("http://localhost:5000/api/photos/category/carrousel-hero")
                const heroResponseJson = await heroResponse.json()
                           

                const institutResponse = await fetch ("http://localhost:5000/api/photos/category/carrousel-institut")
                const institutResponseJson = await institutResponse.json()
                
                if(!institutResponseJson || !heroResponseJson){
                    throw new Error ("erreur dans la récuperation des photos")
                }
                
                setCarrouselHero(heroResponseJson.map( i => i.url )) 
                setSarrouselInstitut(institutResponseJson.map( i => i.url ))                

            }catch(error){
                return(error.message)
            }
        }
        loadImages()
    }, [])

    return (
        <main className="home">
            <Carrousel images={carrouselHero} mode="auto" className="home__carrousel" />
            
            <section className="home__services">
                <img src={planteCeltique1} alt="dessin de plante" className="home__services--img" />
                <NavLink text="Découvrez nos prestations" to="/prestations" className="home__services--link" /> 
            </section>

            <section className="home__company-profile">
                <h2 className="home__company-profile--h2">L'institut</h2>
                <div className="home__company-profile--content">
                    <Carrousel images={carrouselInstitut} mode="auto" className="company-carrousel-container"/>
                    <div className="group">
                        <p className="group__company-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores adipisci explicabo delectus obcaecati exercitationem libero, pariatur corrupti error perspiciatis molestiae illo quidem corporis fugiat dicta! Quasi obcaecati perferendis esse incidunt, quae cum totam eius officia, optio non at, doloribus amet commodi molestias molestiae nulla! Fuga facere asperiores omnis nihil. Quam omnis voluptatibus minus voluptatum nam adipisci veritatis animi dolores dicta, fugiat laudantium quod corrupti qui in totam saepe dolor rerum, voluptates ea nisi nesciunt consequuntur quidem vitae? Voluptatibus, non explicabo perspiciatis illo quaerat iure! Non architecto laudantium repellat nulla, odit suscipit iste deleniti, ratione vel unde illo aperiam rerum? Autem excepturi maxime cumque odio cum magnam, obcaecati, dolorum molestias, porro veritatis voluptatem voluptates officiis? Et, consectetur, dignissimos fugit perferendis, possimus fugiat animi iure nisi rerum natus dolorum quod ad repellendus nihil voluptatem vitae. Nesciunt pariatur soluta ea illum mollitia optio rem architecto ipsam, necessitatibus, sint illo obcaecati dignissimos possimus ipsum.</p><br></br>
                        <p className="group__company-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores adipisci explicabo delectus obcaecati exercitationem libero, pariatur corrupti error perspiciatis molestiae illo quidem corporis fugiat dicta! Quasi obcaecati perferendis esse incidunt, quae cum totam eius officia, optio non at, doloribus amet commodi molestias molestiae nulla! Fuga facere asperiores omnis nihil. Quam omnis voluptatibus minus voluptatum nam adipisci veritatis animi dolores dicta, fugiat laudantium quod corrupti qui in totam saepe dolor rerum, voluptates ea nisi nesciunt consequuntur quidem vitae? Voluptatibus, non explicabo perspiciatis illo quaerat iure! Non architecto laudantium repellat nulla, odit suscipit iste deleniti, ratione vel unde illo aperiam rerum? Autem excepturi maxime cumque odio cum magnam, obcaecati, dolorum molestias, porro veritatis voluptatem voluptates officiis? Et, consectetur, dignissimos fugit perferendis, possimus fugiat animi iure nisi rerum natus dolorum quod ad repellendus nihil voluptatem vitae. Nesciunt pariatur soluta ea illum mollitia optio rem architecto ipsam, necessitatibus, sint illo obcaecati dignissimos possimus ipsum.</p>
                    </div>
                </div>
            </section>

            <section className="home__staff-profile">
                <StaffProfile src={portrait} title={"Charleen,"} speciality={"responsable de l'institut"} text= {"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores adipisci explicabo delectus obcaecati exercitationem libero"} className="home__staff-profile" />
                <StaffProfile src={portrait1} title={"Sophie,"} speciality={"protésiste ongulaire"} text= {"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores adipisci explicabo delectus obcaecati exercitationem libero"} className="home__staff-profile" />
                <StaffProfile src={portrait2} title={"Margot,"} speciality={"masseuse individuelle"} text= {"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores adipisci explicabo delectus obcaecati exercitationem libero"} className="home__staff-profile" />
            </section>

            <section className="home__customers-review">
                <div>
                    <h2>Pour nous retrouver</h2>
                    <img src={map} alt="carte" className="home__customers-review--map" />
                    <h3 className="home__customers-review--text">261 Rue de Schutterwald, 01000 Saint-Denis-lès-Bourg</h3>
                </div>
                <div>
                    <h2>Nos avis clients</h2>
                    <Carrousel mode={"manual"} reviews = {[
                        {title: "Fany D.", text: "Pas de mot pour dire combien c'était parfait. L'équipe au petit soin, le massage exactement ce qu'il me fallait, les produits avec une odeur de dingue et de super qualité. Merci à mes collègues (en or), ça fait partie des cadeaux dont je me souviendrais longtemps, et merci à l'équipe de côté détente."},
                        {title: "Aurélie B.", text: "Merci à sabine et à toute son équipe pour leurs professionnalismes et leurs suivis. Grâce à elles j’ai réussi à perdre une dizaine de kilos avant mon mariage avec un programme adapté, ps: merci aussi pour votre touche esthétique.. (beautés des mains avec gel, beauté des pieds avec semi permanent et soin du visage pour le jour J) Je recommande ++++++"},
                        {title: "Julie R.", text: "Institut très agréable, accueil toujours chaleureux. Les personnes sont disponibles, professionnelles, à l'écoute. Je recommande vivement leurs prestations."},
                        {title: "Michelle B.", text: "Je fréquente cet Institut depuis de nombreuses années pour différentes prestations : les filles sont sympas, sérieuses. Jamais déçue, je recommande cet établissement"},
                        {title: "Julie S.", text: "Une equipe aux petits soins. Discrètes, professionnelles et de bons conseils. Je recommande cet institut que ce soit pour l épilation, les soins ou les ongles"},
                        {title: "Isabelle M.", text: "Ça fait 12 ans que je viens chez Côté Détente. Service personnalisé, Toujours le sourire. C'est un plaisir de venir pour un résultat toujours impeccable"},
                        {title: "Murielle C.", text: "Je me suis vu offrir un soin du visage Decleor pour mon anniversaire; un moment de pure détente, l'esthéticienne très professionnelle, douce, à l'écoute de mes souhaits, des messages de relaxation délivrés durant le soin aidant au lâcher prise....Très bien!. Les produits utilisés très onctueux, des senteurs agréables. Le cadre agréable lui aussi et reposant. Une belle découverte."},
                        {title: "Charlène B.", text: "Encore un grand merci à l'institut. Une heure de massage, un pur moment de détente qui m'a fait énormément de bien. Merci à l'esthéticienne qui a été au petit soin et respectueuse des demandes. Je recommande !"},
                        {title: "Sarah A.", text: "Équipe très professionnelle, un institut où l’on est très bien accueillie et conseillée! Les gammes de produits utilisées sont de grande qualité, un savoir faire unique. Merci à Sabine et à ses collaboratrices !"}
                    ]}  className="home__customers-review--carrousel" />
                </div>
            </section>
        </main>
    )
}