import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Carrousel from "@/component/carrousel/carrousel"
import Modal from "@/component/modal/modal"
import PhotoInput from "@/component/photoInput/photoInput"
import PositionableTextEditor from "@/component/positionableTextEditor/positionableTextEditor"
import { apiFetch } from "@/utils/api"
import "./HeroCarrousel.scss"

const DEFAULT_TEXT_POSITIONS = {
    title: { x: 50, y: 40 },
    dates: { x: 50, y: 55 },
    description: { x: 50, y: 65 }
}

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
                const { data } = await apiFetch("/api/photos/category/carrousel-hero")

                if(!data){
                    throw new Error ("erreur dans la récuperation des photos")
                }

                setCarrouselHero(data)

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
            const { data } = await apiFetch("/api/photos", {
                method : "POST",
                body : formData,
                token
            })

            if(uploadCategory === "carrousel-hero"){
                setCarrouselHero(prev =>[...prev, data])
            } else {
                setCarrouselInstitut(prev =>[...prev, data])
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
            const { ok } = await apiFetch(`/api/photos/${id}`, {
                method : "DELETE",
                token
            })
            if(ok){
                setCarrouselHero(prev => prev.filter(photo => photo._id !== id))
                setCarrouselInstitut(prev => prev.filter(photo => photo._id !== id))
            }

        }catch(error){
            return(error.message)
        }
    }

    /* Modifier le texte/couleur/position d'une photo du héro carrousel */
    const [editingPhotoId, setEditingPhotoId] = useState(null)
    const [actualPhotoTitle, setActualPhotoTitle] = useState("")
    const [actualPhotoDates, setActualPhotoDates] = useState("")
    const [actualPhotoDescription, setActualPhotoDescription] = useState("")
    const [actualPhotoTextColor, setActualPhotoTextColor] = useState("white")
    const [actualPhotoPositions, setActualPhotoPositions] = useState(DEFAULT_TEXT_POSITIONS)

    const openTextEditor = (photo) => {
        setEditingPhotoId(photo._id)
        setActualPhotoTitle(photo.title || "")
        setActualPhotoDates(photo.dates || "")
        setActualPhotoDescription(photo.description || "")
        setActualPhotoTextColor(photo.textColor || "white")
        setActualPhotoPositions({
            title: photo.textPositions?.title || DEFAULT_TEXT_POSITIONS.title,
            dates: photo.textPositions?.dates || DEFAULT_TEXT_POSITIONS.dates,
            description: photo.textPositions?.description || DEFAULT_TEXT_POSITIONS.description
        })
        setModifyViewMode("editText")
    }

    const handleUpdatePhotoText = async (id) => {
        const formData = new FormData()
        formData.append("title", actualPhotoTitle)
        formData.append("dates", actualPhotoDates)
        formData.append("description", actualPhotoDescription)
        formData.append("textColor", actualPhotoTextColor)
        formData.append("textPositions", JSON.stringify(actualPhotoPositions))

        try{
            const { ok, data : updatedPhoto } = await apiFetch(`/api/photos/${id}`, {
                method : "PUT",
                body : formData,
                token
            })
            if(ok){
                setCarrouselHero(prev => prev.map(photo => photo._id === updatedPhoto._id ? updatedPhoto : photo))
                setEditingPhotoId(null)
                setModifyViewMode("list")
            }
        }catch(error){
            return(error.message)
        }
    }

    const heroSlides = carrouselHero.map((photo) => {
        const positions = {
            title: photo.textPositions?.title || DEFAULT_TEXT_POSITIONS.title,
            dates: photo.textPositions?.dates || DEFAULT_TEXT_POSITIONS.dates,
            description: photo.textPositions?.description || DEFAULT_TEXT_POSITIONS.description
        }
        return (
            <div className="hero-slide" key={photo._id}>
                <img src={photo.url} alt={photo.title || ""} className="hero-slide__img"/>
                {photo.title &&
                    <h2
                        className="hero-slide__text hero-slide__text--title"
                        style={{ left: `${positions.title.x}%`, top: `${positions.title.y}%`, color: photo.textColor === "black" ? "#000000" : "#ffffff" }}
                    >{photo.title}</h2>
                }
                {photo.dates &&
                    <p
                        className="hero-slide__text hero-slide__text--dates"
                        style={{ left: `${positions.dates.x}%`, top: `${positions.dates.y}%`, color: photo.textColor === "black" ? "#000000" : "#ffffff" }}
                    >{photo.dates}</p>
                }
                {photo.description &&
                    <p
                        className="hero-slide__text hero-slide__text--description"
                        style={{ left: `${positions.description.x}%`, top: `${positions.description.y}%`, color: photo.textColor === "black" ? "#000000" : "#ffffff" }}
                    >{photo.description}</p>
                }
            </div>
        )
    })

    return (
        <>
            <Carrousel slides={heroSlides} mode="auto" className="home__carrousel" id="home-top-carrousel"/>
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
                                    <button type="button" className="preview__edit-btn" onClick={() => openTextEditor(photo)}>Modifier le texte</button>
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
                : modifyViewMode === "editText" ?
                    <div className="modal__text-edit-vue">
                        <h2 className="modal__list-vue--h2">Positionner le texte sur la photo :</h2>
                        <PositionableTextEditor
                            imageUrl={carrouselHero.find(p => p._id === editingPhotoId)?.url}
                            elements={[
                                { key: "title", text: actualPhotoTitle },
                                { key: "dates", text: actualPhotoDates },
                                { key: "description", text: actualPhotoDescription }
                            ]}
                            positions={actualPhotoPositions}
                            onPositionsChange={setActualPhotoPositions}
                        />
                        <p className="modal__text-edit-vue--hint">Glisse les étiquettes directement sur l'aperçu pour les repositionner.</p>
                        <input type="text" placeholder="Titre" value={actualPhotoTitle} onChange={(e) => setActualPhotoTitle(e.target.value)}/>
                        <input type="text" placeholder="Dates" value={actualPhotoDates} onChange={(e) => setActualPhotoDates(e.target.value)}/>
                        <input type="text" placeholder="Description" value={actualPhotoDescription} onChange={(e) => setActualPhotoDescription(e.target.value)}/>
                        <div className="modal__text-edit-vue--color-choice">
                            <label>
                                <input type="radio" name="text-color" checked={actualPhotoTextColor === "white"} onChange={() => setActualPhotoTextColor("white")}/>
                                Texte blanc
                            </label>
                            <label>
                                <input type="radio" name="text-color" checked={actualPhotoTextColor === "black"} onChange={() => setActualPhotoTextColor("black")}/>
                                Texte noir
                            </label>
                        </div>
                        <div className="modal__text-edit-vue--btn-bloc">
                            <button className="btn" type="button" onClick={() => {setEditingPhotoId(null); setModifyViewMode("list")}}>Retour</button>
                            <button className="btn" type="button" onClick={() => handleUpdatePhotoText(editingPhotoId)}>Valider</button>
                        </div>
                    </div>
                    :
                    <div className="modal__upload-vue">
                        <PhotoInput onChange={setUploadFiles} className="modal__upload-vue--upload" />
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
