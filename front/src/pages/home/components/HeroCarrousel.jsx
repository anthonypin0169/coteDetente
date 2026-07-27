import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Carrousel from "@/component/carrousel/carrousel"
import Modal from "@/component/modal/modal"
import "./HeroCarrousel.scss"

export default function HeroCarrousel({ carrouselInstitut, setCarrouselInstitut }) {

    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
    const token = useSelector((state) => state.auth.token)

    const [carrouselHero, setCarrouselHero] = useState([])
    const [isModifyCarrouselOpen, setisModifyCarrouselOpen] = useState(false)
    const [modifyViewMode, setModifyViewMode] = useState("list")
    const [uploadCategory, setUploadCategory] = useState("")
    const [uploadDefinition, setUploadDefinition] = useState("")
    const [uploadFiles, setUploadFiles] = useState(null)

    useEffect( () => {
        const loadHeroImages = async () => {
            try{
                const heroResponse = await fetch ("/api/photos/category/carrousel-hero")
                const heroResponseJson = await heroResponse.json()

                if(!heroResponseJson){
                    throw new Error ("erreur dans la récuperation des photos")
                }

                setCarrouselHero(heroResponseJson)

            }catch(error){
                return(error.message)
            }
        }
        loadHeroImages()
    }, [])

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append("image", uploadFiles)
        formData.append("description", uploadDefinition)
        formData.append("category", uploadCategory)

        try{
            const uploadForm = await fetch ("/api/photos",{
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
            const deletePicture = await fetch (`/api/photos/${id}`, {
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
        <>
            <Carrousel images={carrouselHero.map( p => p.url )} mode="auto" className="home__carrousel" />
            {isAuthenticated ? <button onClick={() => setisModifyCarrouselOpen(true)} className="home__modify-btn btn">Modifier</button> : null}

            <Modal isOpen={isModifyCarrouselOpen} onClose={() => setisModifyCarrouselOpen(false)} variant ="modify">
                {modifyViewMode === "list" ?
                    <div className="modal__list-vue">

                        <h2 className="modal__list-vue--h2">Liste d'images du slider "Bannière" :</h2>
                        <div className="modal__list-vue--images-list">
                            {carrouselHero.map( photo => (
                                <div key={photo._id} className="preview">
                                    <img src={photo.url} alt={photo.description}  className="preview__img"/>
                                    <button onClick={() => handleDelete(photo._id)} className="preview__btn">X</button>
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
        </>
    )
}
