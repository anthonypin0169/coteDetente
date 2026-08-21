import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { apiFetch } from "@/utils/api"
import Modal from "@/component/modal/modal"
import PhotoInput from "@/component/photoInput/photoInput"
import "./epilation.scss"

export default function Epilation() {

    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
    const token = useSelector((state) => state.auth.token)

    /* Récuperer le type de la page */
    const [pageType, setPageType] = useState([])
    const actualTypeId = pageType._id

    useEffect(() =>{
        const loadTypes = async () => {
    
            try{
                const { data } = await apiFetch("/api/types")
    
                    if(!data){
                        throw new Error ("erreur dans la récuperation des types")
                    }

                    const found = data.find((type) => (
                        type.route === "/epilation" 
                    ))
    
                    setPageType(found)
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

                if(!data){
                    throw new Error ("Erreur lors de la récuperation des sous-types")
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

    useEffect(() => {
        if (!actualSousTypeId) return

        const loadGroups = async () => {

            try{
                const { data } = await apiFetch(`/api/groups/sous-type/${actualSousTypeId}`)

                if(!data){
                    throw new Error ("Erreur lors de la récuperation des groupes")
                }

                setGroups(data)

            }catch(error){
                (error.message)
            }
        }
        loadGroups()
    },[actualSousTypeId])    


    /* Récuperer les prestations */
    const [prestations, setPrestations] = useState([])

    useEffect(() => {
        const loadPrestations = async () => {
            try{
                const { data } = await apiFetch("/api/prestations")

                if(!data){
                    throw new Error ("erreur dans la récuperation des groupes")
                }
                setPrestations(data)

            }catch(error){
                (error.message)
            }
        }
        loadPrestations()
    },[groups])


    /* Boite modale */
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalVue, setModalVue] = useState("media")

    /* Vue 1 */
    const [newSousTypePhoto, setNewSousTypePhoto] = useState()
    const [newSousTypeVideo, setNewSousTypeVideo] = useState()

    const handleCreateMedia = async () => {

        const formData = new FormData()
        if(newSousTypePhoto){
            formData.append("photo", newSousTypePhoto)
        }
        if(newSousTypeVideo){
            formData.append("video", newSousTypeVideo)
        }

        try{
            const { ok, data } = await apiFetch(`/api/sous-types/${actualSousTypeId}`, {
                method : "PUT",
                body : formData,
                token
            })
            if(ok){
                setSousType(data)
            }
        }catch(error){
            (error.message)
        }
    }

    /* Vue 2 */
    
    /* Modifier un groupe */
    const [editingGroupId, setEditingGroupId] = useState(null)
    const [actualGroupName, setActualGroupName] = useState("")
    const [actualGroupDescription, setActualGroupDescription] = useState("")
    const [actualGroupPhoto, setActualGroupPhoto] = useState(null)

    const handleUpdateGroup = async (id) => {

        const formData = new FormData()
        formData.append("name", actualGroupName)
        formData.append("description", actualGroupDescription)
        if (actualGroupPhoto) formData.append("photo", actualGroupPhoto)

        try{
            const { ok, data: updatedGroup } = await apiFetch(`/api/groups/${id}`, {
                method : "PUT",
                body : formData,
                token
            })

            if (ok){
                setGroups(prev => prev.map(g => g._id === updatedGroup._id ? updatedGroup : g))
                setActualGroupPhoto(null)
            }

        }catch(error){
            (error.message)
        }
    }

    /* Vue 3 */
    const [selectedGroupId, setSelectedGroupId] = useState("")
    const [editingPrestaId, setEditingPrestaId] = useState(null)
    const [actualPrestaName, setActualPrestaName] = useState("")
    const [actualPrestaPrice, setActualPrestaPrice] = useState("")
    const [actualPrestaDuration, setActualPrestaDuration] = useState("")

    /* Ajouter, modifier et supprimer une prestation */
    const [newNamePresta, setNewNamePresta] = useState("")
    const [newPrestaDuration, setNewPrestaDuration] = useState("")
    const [newPricePresta, setNewPricePresta] = useState("")
    const [isAddingPresta, setIsAddingPresta] = useState(false)

    const handleCreatePresta = async () => {

        try{
            const { ok, data: newPrestaUploaded } = await apiFetch("/api/prestations", {
                method : "POST",
                body : {
                    name : newNamePresta,
                    price : newPricePresta,
                    duration : newPrestaDuration,
                    group : selectedGroupId,
                },
                token
            })

            if (ok){
                setNewNamePresta("")
                setNewPrestaDuration("")
                setNewPricePresta("")
                setPrestations(prev => [...prev, newPrestaUploaded])
                setIsAddingPresta(false)
            }

        }catch(error){
            (error.message)
        }
    }

    const handleUpdatePresta = async (id) => {

        try{
            const { ok, data: updatedPresta } = await apiFetch(`/api/prestations/${id}`, {
                method: "PUT",
                body: {
                    name: actualPrestaName,
                    price: actualPrestaPrice,
                    duration: actualPrestaDuration
                },
                token
            })
            if(ok){
                setPrestations(prev => prev.map(p => p._id === updatedPresta._id ? updatedPresta : p))
            }
        }catch(error){
            (error.message)
        }
    }

    const handleDeletePresta = async (id) => {

        try{
            const { ok } = await apiFetch(`/api/prestations/${id}`, {
                method : "DELETE",
                token
            })

            if (ok){
                setPrestations(prev => prev.filter(g => g._id !== id))
            }
        }catch(error){
            (error.message)
        }
    }

    /* Retrouver chaque groupe par son rôle */
    const prestaGroup = groups.find(g => g.role === "presta")
    const forfaitGroup = groups.find(g => g.role === "forfait")
    const bronzageGroup = groups.find(g => g.role === "bronzage")



    return (
        <main>
            <h1>Épilations et bronzages</h1>
            {isAuthenticated &&
                <button className="btn" onClick={() => setModalIsOpen(true)}>Modifier</button>
            }

            <section className="epilation-section">
                <div className="epilation-section__presta-bloc">
                    {prestations.filter(p => p.group === prestaGroup?._id).map((presta) => (
                        <div key={presta._id} className="epilation-section__presta-bloc--item">
                            <p className="item-title">{presta.name}</p>
                            <div className="item-text">
                                <p className="item-text__price">{presta.price}</p>
                                <p className="item-text__duration">{presta.duration}</p>
                            </div>
                        </div>                        
                    ))}
                </div>
                <div className="epilation-section__package-bloc">
                    {prestations.filter(f => f.group === forfaitGroup?._id).map((presta) => (
                        <div key={presta._id} className="epilation-section__package-bloc--item">
                            <p className="item-title">{presta.name}</p>
                            <div className="item-text">
                                <p className="item-text__price">{presta.price}</p>
                                <p className="item-text__duration">{presta.duration}</p>
                            </div>
                        </div>   
                    ))}
                </div>
                <div className="epilation-section__image-bloc">
                    <img src={sousType.photoUrl} alt="" className="epilation-section__image-bloc--photo"/>
                </div>
            </section>

            <section className="tanning-section">
                <div className="tanning-section__presta-bloc">
                    {prestations.filter(f => f.group === bronzageGroup?._id).map((presta) => (
                        <div key={presta._id} className="tanning-section__presta-bloc--item">
                            <p className="item-title">{presta.name}</p>
                            <div className="item-text">
                                <p className="item-text__price">{presta.price}</p>
                                <p className="item-text__duration">{presta.duration}</p>
                            </div>
                        </div>   
                    ))}
                </div>
                <div className="tanning-section__video-bloc">
                    <video src={sousType.videoUrl} autoPlay muted loop playsInline></video>
                </div>
            </section>

            <Modal isOpen={modalIsOpen} onClose={() => {setModalIsOpen(false) ; setModalVue("media")}} variant="modify">
                
            {modalVue === "media" ?
            /* Vue 1 */   
                <div>
                    <div>
                        <label htmlFor="">Ajouter ou modifier une photo</label>
                        <PhotoInput onChange={setNewSousTypePhoto}/>
                        <label htmlFor="">Ajouter ou modifier une Video</label>
                        <input type="file" onChange={(e) => setNewSousTypeVideo(e.target.files[0])}/>
                    </div>
                    <div>
                        <button type="button" onClick={() => {handleCreateMedia(); setModalVue("groups")}}>Valider</button>
                        <button type="button" onClick={() => setModalVue("groups")}>Étape suivante</button>
                    </div>
                </div>
            /* Vue 2 */   
            : modalVue === "groups" ?
                <div className="group-vue">
                    {
                        <div className="group-vue__edit">
                            {groups.map((group) => (
                                <div className="edit-list" key={group._id}>
                                    {editingGroupId === group._id ?
                                        <div className="edit-list__edit">
                                            <div className="edit-list__item">
                                                <label className="cares-modal-labels" htmlFor="title-edit">Modifier le nom du groupe</label>
                                                <input className="cares-modal-inputs" type="text" id="title-edit" value={actualGroupName} onChange={(e) => setActualGroupName(e.target.value)}/>
                                            </div>
                                            <div className="edit-list__item">
                                                <label className="cares-modal-labels" htmlFor="description-edit">Modifier la description</label>
                                                <input className="cares-modal-inputs" type="text" id="description-edit" value={actualGroupDescription} onChange={(e) => setActualGroupDescription(e.target.value)}/>
                                            </div>
                                            <div className="edit-list__item">
                                                <label className="cares-modal-labels" htmlFor="photo-edit">Modifier la photo</label>
                                                <PhotoInput id="photo-edit" className="group-vue__photo-input" onChange={setActualGroupPhoto}/>
                                            </div>
                                            <div className="edit-list__btn-bloc">
                                                <button type="button" className="btn" onClick={() => setEditingGroupId(null)}>Retour</button>
                                                <button type="button" className="btn" onClick={() => {handleUpdateGroup(group._id) ; setEditingGroupId(null)}}>Valider</button>
                                            </div>
                                        </div>
                                    :
                                        <div className="edit-list__neutral">
                                            <p className="edit-list__neutral--name">{group.name}</p>
                                            <p className="edit-list__neutral--description">{group.description}</p>
                                            <div className="edit-list__btn-bloc">
                                                <button type="button" className="suppr-and-modify-btn btn" onClick={() => {setEditingGroupId(group._id) ; setActualGroupName(group.name) ; setActualGroupDescription(group.description)}}>Modifier</button>
                                                <button type="button" onClick={() => {setModalVue("prestations") ; setSelectedGroupId(group._id)}} className="suppr-and-modify-btn btn">Modifier les prestations</button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))}
                            <div className="edit-btn-bloc">
                                <button type="button" onClick={() => setModalVue("media")} className="edit-btn-bloc__back-btn btn">Retour</button>
                            </div>
                        </div>
                    }
                </div>
            /* Vue 3 */    
            : 
                <div className="prestation-vue">
                    {isAddingPresta ? 
                        <div className="prestation-vue__new-add">
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-name-adding">Entrer un nom / descriptif</label>
                                <input className="cares-modal-inputs" type="text" id="presta-name-adding" value={newNamePresta} onChange={(e) => setNewNamePresta(e.target.value)}/>
                            </div>
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-price-adding">Entrer un prix</label>
                                <input className="cares-modal-inputs" type="text" id="presta-price-adding" value={newPricePresta} onChange={(e) => setNewPricePresta(e.target.value)}/>
                            </div>
                            <div className="prestation-vue__new-add--input-bloc">
                                <label className="cares-modal-labels" htmlFor="presta-time-adding">Entrer une durée</label>
                                <input className="cares-modal-inputs" type="text" id="presta-time-adding" value={newPrestaDuration} onChange={(e) => setNewPrestaDuration(e.target.value)}/>
                            </div>
                            <div className="prestation-vue__new-add--btn-container">
                                <button className="btn" type="button" onClick={() => setIsAddingPresta(false)}>Retour</button>
                                <button className="btn" type="button" onClick={() => handleCreatePresta()}>Valider</button>
                            </div>
                        </div>
                    : 
                        <div className="prestation-vue__edit-and-add">
                        {prestations.filter(p => p.group === selectedGroupId).map((presta) => (
                            <div className="edit-and-add-container" key={presta._id}>
                                {editingPrestaId === presta._id ?
                                <div className="edit-and-add-container__edit-presta">
                                    <div className="edit-and-add-container__edit-presta--input-bloc">
                                        <input className="cares-modal-inputs" id="presta-name" type="text" value={actualPrestaName} onChange={(e) => setActualPrestaName(e.target.value)}/>
                                        <input className="cares-modal-inputs" id="presta-price" type="text" value={actualPrestaPrice} onChange={(e) => setActualPrestaPrice(e.target.value)}/>
                                        <input className="cares-modal-inputs" id="presta-time" type="text" value={actualPrestaDuration} onChange={(e) => setActualPrestaDuration(e.target.value)}/>
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
                                <button className="btn" type="button" onClick={() => setModalVue("groups")}>Retour</button>
                                <button className="btn" type="button" onClick={() => setIsAddingPresta(true)}>Ajouter une prestation</button>
                            </div>        
                        </div>
                    }
                </div>
            }
            </Modal>
        </main>
    )
}