import "./makeup.scss"
import "../cares/cares.scss"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { apiFetch } from "@/utils/api"
import Modal from "@/component/modal/modal"
import SeoHead from "@/component/seoHead/seoHead"
import Media from "@/component/media/media"

/* Carte d'une prestation, partagée par la liste maquillage et la liste soins du regard */
function PrestaCard({ p }) {
    return (
        <div className="makup-list-section__item" onMouseEnter={(e) => e.currentTarget.querySelector("video")?.play()} onMouseLeave={(e) => e.currentTarget.querySelector("video")?.pause()} onClick={(e) => {const video = e.currentTarget.querySelector("video"); if (video) video.paused ? video.play() : video.pause()}}>
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
                {(p.description || (p.extraInfos && p.extraInfos.length > 0)) &&
                    <div className="item-details">
                        {p.description &&
                            <p className="item-details__description">{p.description}</p>
                        }
                        {p.extraInfos && p.extraInfos.length > 0 &&
                            <div className="item-details__extra-infos">
                                {p.extraInfos.map((info, i) => (
                                    <div className="item-details__extra-infos--item" key={i}>
                                        {info.name && <p className="item-details__extra-infos--item--name">{info.name}</p>}
                                        <div className="item-details__extra-infos--item--infos">
                                            {info.duration && <p>{info.duration} :</p>}
                                            <p>{info.price}</p>
                                        </div>
                                        {info.description && <p className="item-details__extra-infos--item--description">{info.description}</p>}
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                }
            </div>
            {p.videoUrl &&
                <div className="makup-list-section__item--video-container">
                    <Media src={p.videoUrl} className="makup-presta-video" alt={p.name} videoProps={{ autoPlay: false, loop: false, preload: "metadata" }}/>
                </div>
            }
        </div>
    )
}

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
    const makeupGroup = groups.find((g) => g.role === "maquillage")
    const regardGroup = groups.find((g) => g.role === "regard")

    useEffect(() => {
        if (!actualSousTypeId) return

        const loadGroups = async () => {
            try{
                const { data } = await apiFetch(`/api/groups/sous-type/${actualSousTypeId}`)

                if (!data){
                    throw new Error("Erreur lors de la résuperation des groupes")
                }
                setGroups(data)
            }catch(error){
                (error.message)
            }
        }
        loadGroups()
    },[actualSousTypeId])


    /* Récuperer les prestations */
    const [presta, setPresta] = useState([])

    useEffect(() => {
        if (groups.length === 0) return

        const loadPrestations = async () => {
            try{
                const results = await Promise.all(groups.map((g) => apiFetch(`/api/prestations/group/${g._id}`)))

                if (results.some((r) => !r.data)){
                    throw new Error("Erreur lors de la récuperation des prestations")
                }

                setPresta(results.flatMap((r) => r.data))

            }catch(error){
                (error.message)
            }
        }
        loadPrestations()
    },[groups])


    const makeupPresta = presta.filter((p) => p.group === makeupGroup?._id)
    const regardPresta = presta.filter((p) => p.group === regardGroup?._id)

    /* Boite modale */
    const [modalIsOpen, setModalIsOpen] = useState(false)

    /* Ajouter une prestation */
    const [newNamePresta, setNewNamePresta] = useState("")
    const [newPricePresta, setNewPricePresta] = useState("")
    const [newPrestaDuration, setNewPrestaDuration] = useState("")
    const [isAddingPresta, setIsAddingPresta] = useState(false)
    const [newPrestaGroupId, setNewPrestaGroupId] = useState("")

    const handleCreatePresta = async () => {
        const formData = new FormData()
        formData.append("name", newNamePresta)
        formData.append("price", newPricePresta)
        formData.append("duration", newPrestaDuration)
        formData.append("description", actualPrestaDescription)
        formData.append("group", newPrestaGroupId || makeupGroup?._id)
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
    const [actualPrestaExtraInfos, setActualPrestaExtraInfos] = useState([])
    const [actualPrestaVideo, setActualPrestaVideo] = useState(null)
    const [editingPrestaId, setEditingPrestaId] = useState("")

    const handleAddExtraInfo = () => {
        setActualPrestaExtraInfos(prev => [...prev, { name: "", price: "", duration: "", description: "" }])
    }
    const handleExtraInfoChange = (index, field, value) => {
        setActualPrestaExtraInfos(prev => prev.map((info, i) => i === index ? { ...info, [field]: value } : info))
    }
    const handleRemoveExtraInfo = (index) => {
        setActualPrestaExtraInfos(prev => prev.filter((_, i) => i !== index))
    }

    const handleUpdatePresta = async (id) => {
        const formData = new FormData()
        formData.append("name", actualPrestaName)
        formData.append("price", actualPrestaPrice)
        formData.append("duration", actualPrestaDuration)
        formData.append("description", actualPrestaDescription)
        formData.append("extraInfos", JSON.stringify(actualPrestaExtraInfos))
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
            <SeoHead
                title="Maquillage"
                description="Maquillage jour, soirée ou mariée à l'institut Côté Détente, à Saint-Denis-lès-Bourg près de Bourg-en-Bresse."
            />
            {isAuthenticated &&
                <button className="btn" onClick={() => setModalIsOpen(true)}>Modifier</button>
            }
            <h1>Maquillages</h1>
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} variant="modify">
                <div className="prestation-vue">
                    {isAddingPresta ? 
                        <div className="prestation-vue__new-add">
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-group-adding">Catégorie</label>
                                <select className="cares-modal-inputs" id="presta-group-adding" value={newPrestaGroupId || makeupGroup?._id || ""} onChange={(e) => setNewPrestaGroupId(e.target.value)}>
                                    {groups.map((g) => <option key={g._id} value={g._id}>{g.name}</option>)}
                                </select>
                            </div>
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-name-adding">Entrer un nom</label>
                                <input className="cares-modal-inputs" type="text" id="presta-name-adding" placeholder="Nom" value={newNamePresta} onChange={(e) => setNewNamePresta(e.target.value)}/>
                            </div>
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-price-adding">Entrer un prix</label>
                                <input className="cares-modal-inputs" type="text" id="presta-price-adding" placeholder="Prix" value={newPricePresta} onChange={(e) => setNewPricePresta(e.target.value)}/>
                            </div>
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-time-adding">Entrer une durée (optionnel)</label>
                                <input className="cares-modal-inputs" type="text" id="presta-time-adding" placeholder="Durée" value={newPrestaDuration} onChange={(e) => setNewPrestaDuration(e.target.value)}/>
                            </div>
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-description-adding">Entrer une description</label>
                                <input className="cares-modal-inputs" type="text" id="presta-description-adding" placeholder="Description" value={actualPrestaDescription} onChange={(e) => setActualPrestaDescription(e.target.value)}/>
                            </div>
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-video-adding">Choisir une vidéo ou une photo</label>
                                <input className="cares-modal-inputs" type="file" accept="video/*,image/*" id="presta-video-adding" onChange={(e) => setActualPrestaVideo(e.target.files[0])}/>
                            </div>
                            <div className="prestation-vue__new-add--btn-container">
                                <button className="btn" type="button" onClick={() => setIsAddingPresta(false)}>Retour</button>
                                <button className="btn" type="button" onClick={() => handleCreatePresta()}>Valider</button>
                            </div>
                        </div>
                    : 
                        <div className="prestation-vue__edit-and-add">
                        {groups.map((g) => (
                            <div key={g._id}>
                            <h3 className="makup-modal-group-title">{g.name}</h3>
                        {presta.filter((p) => p.group === g._id).map((presta) => (
                            <div className="edit-and-add-container" key={presta._id}>
                                {editingPrestaId === presta._id ?
                                <div className="edit-and-add-container__edit-presta">
                                    <div id="makeup-inputs-container" className="edit-and-add-container__edit-presta--input-bloc">
                                        <input className="makeup-modal-inputs" id="presta-name" type="text" placeholder="Nom" value={actualPrestaName} onChange={(e) => setActualPrestaName(e.target.value)}/>
                                        <input className="makeup-modal-inputs" id="presta-price" type="text" placeholder="Prix" value={actualPrestaPrice} onChange={(e) => setActualPrestaPrice(e.target.value)}/>
                                        <input className="makeup-modal-inputs" id="presta-time" type="text" placeholder="Durée" value={actualPrestaDuration} onChange={(e) => setActualPrestaDuration(e.target.value)}/>
                                        <input className="makeup-modal-inputs" id="presta-description" type="text" placeholder="Description" value={actualPrestaDescription} onChange={(e) => setActualPrestaDescription(e.target.value)}/>
                                    </div>
                                    <div className="edit-and-add-container__edit-presta--extra-infos">
                                        {actualPrestaExtraInfos.map((info, index) => (
                                            <div className="edit-and-add-container__edit-presta--extra-infos--item" key={index}>
                                                <input className="makeup-modal-inputs" type="text" placeholder="Nom" value={info.name} onChange={(e) => handleExtraInfoChange(index, "name", e.target.value)}/>
                                                <input className="makeup-modal-inputs" type="text" placeholder="Prix" value={info.price} onChange={(e) => handleExtraInfoChange(index, "price", e.target.value)}/>
                                                <input className="makeup-modal-inputs" type="text" placeholder="Durée" value={info.duration} onChange={(e) => handleExtraInfoChange(index, "duration", e.target.value)}/>
                                                <input className="makeup-modal-inputs" type="text" placeholder="Description" value={info.description} onChange={(e) => handleExtraInfoChange(index, "description", e.target.value)}/>
                                                <button type="button" className="edit-and-add-container__edit-presta--extra-infos--remove-btn" onClick={() => handleRemoveExtraInfo(index)}>X</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button type="button" className="btn" onClick={() => handleAddExtraInfo()}>Ajouter des infos</button>
                                    <div className="modify-video-input-container">
                                        <label className="cares-modal-labels" htmlFor="presta-video-modify">Modifier la vidéo ou la photo</label>
                                        <input className="cares-modal-inputs" type="file" accept="video/*,image/*" id="presta-video-modify" onChange={(e) => setActualPrestaVideo(e.target.files[0])}/>
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
                                    <button type="button" className="edit-and-add-container__add-presta--modify-btn btn" onClick={() => {setEditingPrestaId(presta._id) ; setActualPrestaName(presta.name) ; setActualPrestaPrice(presta.price) ; setActualPrestaDuration(presta.duration) ; setActualPrestaDescription(presta.description || "") ; setActualPrestaExtraInfos(presta.extraInfos || [])}}>Modifier la prestation</button>
                                </div>
                                }
                            </div>
                        ))}
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
                {makeupPresta.map((p) => <PrestaCard key={p._id} p={p}/>)}
            </section>

            <h2 className="makup-section-title">Soins du regard</h2>
            <section className="makup-list-section makup-list-section--regard">
                {regardPresta.map((p) => <PrestaCard key={p._id} p={p}/>)}
            </section>
        </main>
    )
}