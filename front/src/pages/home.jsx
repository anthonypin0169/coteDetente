import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Carrousel from "@/component/carrousel"
import StaffProfile from "@/component/staffProfile"
import Modal from "../component/modal"
import NavLink from "../component/nav"
import planteCeltique1 from "../assets/images/planteCeltique1.png"
import portrait from "../assets/images/portrait.jpg"
import portrait1 from "../assets/images/portrait1.jpg"
import portrait2 from "../assets/images/portrait2.jpg"
import map from "../assets/images/map.png"
import "./home.scss"

export default function Home() {

    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)

    const [carrouselHero, setCarrouselHero] = useState([])
    const [carrouselInstitut, setCarrouselInstitut] = useState([])
    const [isModifyCarrouselOpen, setisModifyCarrouselOpen] = useState(false)
    const [modifyViewMode, setModifyViewMode] = useState("list")
    const [uploadCategory, setUploadCategory] = useState("")
    const [uploadDefinition, setUploadDefinition] = useState("")
    const [uploadFiles, setUploadFiles] = useState(null)

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
                
                setCarrouselHero(heroResponseJson) 
                setCarrouselInstitut(institutResponseJson)                

            }catch(error){
                return(error.message)
            }
        }
        loadImages()
    }, [])

    const [titleState, setTitleState] = useState("")
    const [paragraphState, setParagraphState] = useState([])

    const [editModalIsOpen,setEditModalIsOpen] = useState(false)
    const [editTitle, setEditTitle] = useState("")
    const [editParagraph, setEditParagraph] = useState("")

    useEffect (() => {
        const loadText = async () =>{
            try{
                const paragraphResponse = await fetch ("http://localhost:5000/api/content/company-profile")
                
                if(paragraphResponse.ok){
                    const paragraphResponseJson = await paragraphResponse.json()

                    if(!paragraphResponseJson){
                        throw new Error ("erreur dans la récuperation des textes")
                    }
                    
                    setTitleState(paragraphResponseJson.title)
                    setParagraphState(paragraphResponseJson.paragraphs)
                }

            }catch(error){
                    return(error.message)
            }
        }
        loadText()
    },[])

    const token = useSelector((state) => state.auth.token)

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append("image", uploadFiles)
        formData.append("description", uploadDefinition)
        formData.append("category", uploadCategory)

        try{
            const uploadForm = await fetch ("http://localhost:5000/api/photos",{
                method : "POST",
                body : formData,
                headers : { Authorization : `Bearer ${token}`}
            })
            const uploadFormJson = await uploadForm.json()

            if(uploadCategory === "carrousel-hero"){
                setCarrouselHero(prev =>[...prev, uploadFormJson])
            } else {
                setCarrouselInstitut(prev =>[...prev, uploadFormJson])
            }

            setModifyViewMode("list") 
            setUploadDefinition("") 
            setUploadFiles(null)
        }catch(error){
            return(error.message)
        }
    }

    const handleDelete = async (id) => {
        try{
            const deletePicture = await fetch (`http://localhost:5000/api/photos/${id}`, {
                method : "DELETE",
                headers : { Authorization : `Bearer ${token}`}
            })
            if(deletePicture.ok){
                setCarrouselHero(prev => prev.filter(photo => photo._id !== id))
                setCarrouselInstitut(prev => prev.filter(photo => photo._id !== id))
            }

        }catch(error){
            return(error.message)
        }
    }

    return (
        <main className="home">
            <Carrousel images={carrouselHero.map( p => p.url )} mode="auto" className="home__carrousel" />
            {isAuthenticated ? <button onClick={() => setisModifyCarrouselOpen(true)} className="home__modify-btn">Modifier</button> : null}

            <Modal isOpen={isModifyCarrouselOpen} onClose={() => setisModifyCarrouselOpen(false)} variant ="modify">
                {modifyViewMode === "list" ? 
                    <div className="modal__list-vue">

                        <h2 className="modal__list-vue--h2">Liste d'images du slider "Bannière" :</h2>
                        <div className="modal__list-vue--images-list">
                            {carrouselHero.map( photo => (
                                <div key={photo._id} className="preview">
                                    <img src={photo.url} alt={photo.description}  className="preview__img"/>
                                    <button onClick={ () => handleDelete(photo._id)} className="preview__btn">X</button>
                                </div>
                            ))}
                        </div>
                        <button onClick={ () => {setModifyViewMode("upload"); setUploadCategory("carrousel-hero")}} className="btn">Ajouter</button>        

                        <h2 className="modal__list-vue--h2">Liste d'images du slider "Institut" :</h2>
                        <div className="modal__list-vue--images-list">
                            {carrouselInstitut.map( photo => (
                                <div key={photo._id} className="preview">
                                    <img src={photo.url} alt={photo.description}  className="preview__img"/>
                                    <button onClick={ () => handleDelete(photo._id)} className="preview__btn">X</button>
                                </div>
                            ))}
                        </div>
                        <button onClick={ () => {setModifyViewMode("upload"); setUploadCategory("carrousel-institut")}} className="btn">Ajouter</button>
                    </div>
                    : 
                    <div className="modal__upload-vue">
                        <input onChange={(e) => setUploadFiles(e.target.files[0])} type="file" className="modal__upload-vue--upload" />
                        <input onChange={(e) => setUploadDefinition(e.target.value)} value={uploadDefinition} type="text" className="modal__upload-vue--alt" placeholder="Entrez une description :"/>
                        <div className="modal__upload-vue--btn">
                            <button onClick={() => setModifyViewMode("list")} className="btn">Retour</button>
                            <button onClick={() => handleUpload()} type="button" className="btn">Valider</button>
                        </div>
                    </div>
                }
            </Modal>

            <section className="home__services">
                <img src={planteCeltique1} alt="dessin de plante" className="home__services--img" />
                <NavLink text="Découvrez nos prestations" to="/prestations" className="home__services--link" /> 
            </section>

            <section className="home__company-profile">
                <h2 className="home__company-profile--h2" >{titleState}</h2>
                {isAuthenticated ? <button onClick={() => setEditModalIsOpen(true)} className="home__company-profile--btn btn">Modifier</button> : null}

                <div className="home__company-profile--content">     
                    {paragraphState.map((para, index) => (
                        <p key={index} className="group__company-text">{para}</p>
                    ))}
                    <Carrousel images={carrouselInstitut.map( p => p.url )} mode="auto" className="company-carrousel-container"/>
                </div>
            </section>

            <Modal isOpen={editModalIsOpen} onClose={() => setEditModalIsOpen(false)} variant ="modify">
                <div className="modal__edit-modal">
                    <div className="modal__edit-modal--bloc1">
                        <h2 className="edit-modal-title">Entrez un titre :</h2>
                        <input type="text" className="title-input"/>
                    </div>

                    <div className="modal__edit-modal--bloc2">
                        <h2 className="edit-modal-title">Ecrivez un texte :</h2>
                        <textarea className="textarea-paragraph"></textarea>
                    </div>

                    <div className="modal__edit-modal--btn">
                        <button onClick={() => setEditModalIsOpen(false)} className="btn">Retour</button>
                        <button type="button" className="btn">Valider</button>
                    </div>
                </div>
            </Modal>

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