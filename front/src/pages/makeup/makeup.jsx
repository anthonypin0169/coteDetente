import "./makeup.scss"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { apiFetch } from "@/utils/api"
import Modal from "@/component/modal/modal"

export default function Makeup() {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const token = useSelector((state) => state.auth.token)


    /* Récuperer le type de la page */
    const [type, setType] = useState([])
    const actualTypeId = type._id

    useEffect(() => {
        const loadTypes = async () => {
            try{
                const { data } = await apiFetch("/api/types")

                if(!data){
                    throw new Error("erreur lors de la récuperation des types")
                }
                const found = data.find((t) => t.route === "/maquillage")
                setType(found)

            }catch(error){
                (error.message)
            }
        }
        loadTypes()
    },[])


    /* Récuperer le sous-type correspondant */
    const [sousType, setSousType] = useState([])
    const actualSousTypeId = sousType._id

    useEffect(() => {
        if (!actualTypeId) return

        const loadSousTypes = async () => {
            try{
                const { data } = await apiFetch(`/api/sous-types/type/${actualTypeId}`)

                if (!data){
                    throw new Error("Erreur lors de la récuperation des sous types")
                }
                setSousType(data[0])

            }catch(error){
                (error.message)
            }
        }
        loadSousTypes()
    },[actualTypeId])


    /* Récuperer les groupes */
    const [groups, setGroups] = useState([])
    const actualGroupId = groups._id

    useEffect(() => {
        if (!actualSousTypeId) return

        const loadGroups = async () => {
            try{
                const { data } = await apiFetch(`/api/groups/sous-type/${actualSousTypeId}`)

                if (!data){
                    throw new Error("Erreur lors de la résuperation des groupes")
                }
                setGroups(data[0])
            }catch(error){
                (error.message)
            }
        }
        loadGroups()
    },[actualSousTypeId])


    /* Récuperer les prestations */
    const [presta, setPresta] = useState([])

    useEffect(() => {
        if (!actualGroupId) return

        const loadPrestations = async () => {
            try{
                const { data } = await apiFetch(`/api/prestations/group/${actualGroupId}`)

                if (!data){
                    throw new Error("Erreur lors de la récuperation des prestations")
                }

                setPresta(data)

            }catch(error){
                (error.message)
            }
        }
        loadPrestations()
    },[actualGroupId])


    /* Boite modale */
    const [modalIsOpen, setModalIsOpen] = useState(false)

    /* Ajouter une prestation */
    const [newNamePresta, setNewNamePresta] = useState("")
    const [newPricePresta, setNewPricePresta] = useState("")
    const [newPrestaDuration, setNewPrestaDuration] = useState("")
    const [isAddingPresta, setIsAddingPresta] = useState(false)

    const handleCreatePresta = async () => {
        const formData = new FormData()
        formData.append("name", newNamePresta)
        formData.append("price", newPricePresta)
        formData.append("duration", newPrestaDuration)
        formData.append("description", actualPrestaDescription)
        formData.append("group", actualGroupId)
        if (actualPrestaVideo) formData.append("video", actualPrestaVideo)

        try{
            const { ok, data : newPrestaUploaded } = await apiFetch("/api/prestations",{
                method : "POST",
                body: formData, 
                token
            })

            if(ok){
                setNewNamePresta("")
                setNewPricePresta("")
                setNewPrestaDuration("")
                setActualPrestaDescription("")
                setActualPrestaVideo(null)
                setPresta((prev)=>[...prev, newPrestaUploaded])
                setIsAddingPresta(false)
            }
        }catch(error){
            (error.message)
        }
    }

    /* Modifier une prestation */
    const [actualPrestaName, setActualPrestaName] = useState("")
    const [actualPrestaPrice, setActualPrestaPrice] = useState("")
    const [actualPrestaDuration, setActualPrestaDuration] = useState("")
    const [actualPrestaDescription, setActualPrestaDescription] = useState("")
    const [actualPrestaVideo, setActualPrestaVideo] = useState(null)    
    const [editingPrestaId, setEditingPrestaId] = useState("")

    const handleUpdatePresta = async (id) => {
        const formData = new FormData()
        formData.append("name", actualPrestaName)
        formData.append("price", actualPrestaPrice)
        formData.append("duration", actualPrestaDuration)
        formData.append("description", actualPrestaDescription)
        if (actualPrestaVideo) formData.append("video", actualPrestaVideo)

        try{
            const { ok, data : updatedPresta } = await apiFetch(`/api/prestations/${id}`,{
                method : "PUT",
                body : formData,
                token
            })
            if(ok){
                setActualPrestaVideo("")
                setPresta(prev => prev.map(p => p._id === updatedPresta._id ? updatedPresta : p))
            }

        }catch(error){
            (error.message)
        }                
    }

    /* Supprimer une prestation */

    const handleDeletePresta = async (id) => {
        try{
            const { ok } = await apiFetch(`/api/prestations/${id}`,{
                method : "DELETE",
                token
            })

            if(ok){
                setPresta(prev => prev.filter(p => p._id !== id))
            }

        }catch(error){
            (error.message)
        }            
    }


    return (
        <main className="makeup-main">
            {isAuthenticated &&
                <button className="btn" onClick={() => setModalIsOpen(true)}>Modifier</button>
            }

            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} variant="modify">
                <div className="prestation-vue">
                    {isAddingPresta ? 
                        <div className="prestation-vue__new-add">
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-name-adding">Entrer un nom</label>
                                <input className="cares-modal-inputs" type="text" id="presta-name-adding" value={newNamePresta} onChange={(e) => setNewNamePresta(e.target.value)}/>
                            </div>
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-price-adding">Entrer un prix</label>
                                <input className="cares-modal-inputs" type="text" id="presta-price-adding" value={newPricePresta} onChange={(e) => setNewPricePresta(e.target.value)}/>
                            </div>
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-time-adding">Entrer une durée (optionnel)</label>
                                <input className="cares-modal-inputs" type="text" id="presta-time-adding" value={newPrestaDuration} onChange={(e) => setNewPrestaDuration(e.target.value)}/>
                            </div>
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-description-adding">Entrer une description</label>
                                <input className="cares-modal-inputs" type="text" id="presta-description-adding" value={actualPrestaDescription} onChange={(e) => setActualPrestaDescription(e.target.value)}/>
                            </div>
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-video-adding">Choisir une vidéo</label>
                                <input className="cares-modal-inputs" type="file" id="presta-video-adding" onChange={(e) => setActualPrestaVideo(e.target.files[0])}/>
                            </div>
                            <div className="prestation-vue__new-add--btn-container">
                                <button className="btn" type="button" onClick={() => setIsAddingPresta(false)}>Retour</button>
                                <button className="btn" type="button" onClick={() => handleCreatePresta()}>Valider</button>
                            </div>
                        </div>
                    : 
                        <div className="prestation-vue__edit-and-add">
                        {presta.map((presta) => (
                            <div className="edit-and-add-container" key={presta._id}>
                                {editingPrestaId === presta._id ?
                                <div className="edit-and-add-container__edit-presta">
                                    <div id="makeup-inputs-container" className="edit-and-add-container__edit-presta--input-bloc">
                                        <input className="makeup-modal-inputs" id="presta-name" type="text" value={actualPrestaName} onChange={(e) => setActualPrestaName(e.target.value)}/>
                                        <input className="makeup-modal-inputs" id="presta-price" type="text" value={actualPrestaPrice} onChange={(e) => setActualPrestaPrice(e.target.value)}/>
                                        <input className="makeup-modal-inputs" id="presta-time" type="text" value={actualPrestaDuration} onChange={(e) => setActualPrestaDuration(e.target.value)}/>
                                        <input className="makeup-modal-inputs" id="presta-description" type="text" value={actualPrestaDescription} onChange={(e) => setActualPrestaDescription(e.target.value)}/>
                                    </div>
                                    <div className="modify-video-input-container">
                                        <label className="cares-modal-labels" htmlFor="presta-video-modify">Modifier la vidéo</label>
                                        <input className="cares-modal-inputs" type="file" id="presta-video-modify" onChange={(e) => setActualPrestaVideo(e.target.files[0])}/>
                                    </div>
                                    <div className="edit-and-add-container__edit-presta--btn-bloc">
                                        <button type="button" className="btn" onClick={() => setEditingPrestaId(null)}>Retour</button>
                                        <button type="button" className="btn" onClick={() => {handleUpdatePresta(presta._id); setEditingPrestaId(null)}}>Valider</button>
                                        <button type="button" className="btn" onClick={() => handleDeletePresta(presta._id)}>Supprimer la prestation</button>
                                    </div>
                                </div>
                                :
                                <div className="edit-and-add-container__add-presta">
                                    <div className="edit-and-add-container__add-presta--text-bloc">
                                        <p>{presta.name}</p>
                                        <p>{presta.price}</p>
                                        <p>{presta.duration}</p>
                                    </div>
                                    <button type="button" className="edit-and-add-container__add-presta--modify-btn btn" onClick={() => {setEditingPrestaId(presta._id) ; setActualPrestaName(presta.name) ; setActualPrestaPrice(presta.price) ; setActualPrestaDuration(presta.duration)}}>Modifier la prestation</button>
                                </div>
                                }
                            </div>
                        ))}
                            <div className="prestation-vue__edit-and-add--btn-container">   
                                <button className="btn" type="button" onClick={() => {setModalIsOpen(false); setActualPrestaDescription(""); setActualPrestaVideo(null)}}>Retour</button>
                                <button className="btn" type="button" onClick={() => {setIsAddingPresta(true); setActualPrestaDescription(""); setActualPrestaVideo(null)}}>Ajouter une prestation</button>
                            </div>        
                        </div>
                    }
                </div>
            </Modal>

            <section className="makup-list-section">
                {presta.map((p)=>(
                    <div key={p._id} className="makup-list-section__item" onMouseEnter={(e) => e.currentTarget.querySelector("video").play()} onMouseLeave={(e) => e.currentTarget.querySelector("video").pause()}>
                        <div className="makup-list-section__item--presta-bloc">
                            <div className="item-preview">
                                <div className="item-preview__name">
                                    {p.name}
                                </div>
                                <div className="item-preview__infos">
                                    <div className="item-preview__infos--price">
                                        {p.price}
                                    </div>
                                    <div className="item-preview__infos--duration">
                                        {p.duration}  
                                    </div>
                                </div>
                            </div>
                            <div className="item-description">
                                {p.description}
                            </div>
                        </div>
                        <div className="makup-list-section__item--video-container">
                            <video src={p.videoUrl} className="makup-presta-video" muted playsInline></video>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    )
}