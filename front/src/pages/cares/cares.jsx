import "./cares.scss"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Modal from "@/component/modal/modal"
import { apiFetch } from "@/utils/api"

export default function Cares() {

    const { sousTypeSlug } = useParams()
    const token = useSelector((state) => state.auth.token)


    /* Récuperer les sous types, mettre à jour sur le sous type actuel et modifier son titre */
    const [allSousTypes, setAllSousTypes] = useState([])
    const [currentSousType, setCurrentSousType] = useState("")
    const [actualSousTypeName,setActualSousTypeName] = useState("")

    useEffect(()=>{
        const loadSousTypes = async () => {
            try {
                const { data } = await apiFetch("/api/sous-types")

                if(!data){
                    throw new Error ("erreur dans la récuperation des sous-types")
                }
                const found = data.find(sousType => sousType.route === `/soins/${sousTypeSlug}`)
                setCurrentSousType(found)
                setAllSousTypes(data)

            }catch(error){
                (error.message)
            }
        }
        loadSousTypes()
    },[sousTypeSlug])


    /* Modifier le nom d'un sous-type et n'en cibler qu'un seul */
    const handleUpdateSousType = async (id) => {
        
        const formData = new FormData()
        formData.append("name", actualSousTypeName)

        try{
            const { ok, data: updatedTitle } = await apiFetch(`/api/sous-types/${id}`, {
                method : "PUT",
                body : formData,
                token
            })

            if (ok){
                setActualSousTypeName(updatedTitle.name)
                setAllSousTypes(prev => prev.map(t => t._id === updatedTitle._id ? updatedTitle : t))

            }

        }catch(error){
                (error.message)
            }
    }
    

    /* Récuperer les groupes d'un sous-type */
    const [groups, setGroups] = useState([])

    useEffect(()=>{
        if (!currentSousType) return
        const loadGroup = async () => {
            try{
                const { data } = await apiFetch(`/api/groups/sous-type/${currentSousType._id}`)

                if(!data){
                    throw new Error ("erreur dans la récuperation des groupes")
                }
                setGroups(data)

            }catch(error){
                (error.message)
            }
        }
        loadGroup()
    },[currentSousType])


    /* Récuperer toutes les prestations */
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
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalVue, setModalVue] = useState("sousTypes")
    const [selectedSousTypeId, setSelectedSousTypeId] = useState("")
    const [modalGroups, setModalGroups] = useState([])
    const [editingSousTypeId, setEditingSousTypeId] = useState(null)

    useEffect(() => {
        if (!selectedSousTypeId) return

        const loadSelectedSousType = async () => {
            try{
                const { data } = await apiFetch(`/api/groups/sous-type/${selectedSousTypeId}`)

                if(!data){
                    throw new Error ("erreur dans la récuperation du sous-type")
                }
                setModalGroups(data)

            }catch(error){
                (error.message)
            }
        }
        loadSelectedSousType()
    },[selectedSousTypeId])


    /* Vue 2 */
    /* Ajouter et supprimer un groupe */
    const [newNameGroup, setNewNameGroup] = useState("")
    const [newDescriptionGroup, setNewDescriptionGroup] = useState("")
    const [newPhotoGroup, setNewPhotoGroup] = useState(null)
    const [isAddingGroup, setIsAddingGroup] = useState(false)

    /* Ajout */
    const handleCreateGroup = async () => {

        const formData = new FormData()
        formData.append("name", newNameGroup)
        formData.append("description", newDescriptionGroup)
        formData.append("photo", newPhotoGroup)
        formData.append("sousType", selectedSousTypeId)

        try{
            const { ok, data: newGroupUploaded } = await apiFetch("/api/groups", {
                method : "POST",
                body : formData,
                token
            })

            if (ok){
                setNewNameGroup("")
                setNewDescriptionGroup("")
                setNewPhotoGroup(null)
                setModalGroups(prev => [...prev, newGroupUploaded])
                setIsAddingGroup(false)
            }

        }catch(error){
            (error.message)
        }
    }

    /* Suppr */
    const handleDeleteGroup = async (id) => {
        
        try{
            const { ok } = await apiFetch(`/api/groups/${id}`, {
            method : "DELETE",
            token
        })

        if (ok){
            setModalGroups(prev => prev.filter(g => g._id !== id))
            setGroups(prev => prev.filter(g => g._id !== id))

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


    /* Ajouter et supprimer une prestation */
    const [newNamePresta, setNewNamePresta] = useState("")
    const [newPrestaDuration, setNewPrestaDuration] = useState("")
    const [newPricePresta, setNewPricePresta] = useState("")
    const [isAddingPresta, setIsAddingPresta] = useState(false)

    /* Ajout */
    const handleCreatePresta = async () => {

        const formData = new FormData()
        formData.append("name", newNamePresta)
        formData.append("price", newPricePresta)
        formData.append("duration", newPrestaDuration)
        formData.append("group", selectedGroupId)

        try{
            const { ok, data: newPrestaUploaded } = await apiFetch("/api/prestations", {
                method : "POST",
                body : formData,
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

    /* Suppr */
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


    return (
        <main className="cares">
         <h1 className="cares__title">Découvrez nos soins</h1>

            <section className="cares__section">
                {isAuthenticated &&
                    <button type="button" onClick={() => setModalIsOpen(true)} className="btn">Modifier</button>
                }
                {groups.map((bloc, i) => (
                    <div className="cares__section--type" key={bloc._id}>
                        <div className="presenting">
                            <h3>{bloc.name}</h3>
                            <h4>{bloc.description}</h4>
                        </div>
                        <div className={`content-bloc ${i % 2 === 0 ? "content-bloc--reverse" : ""}`}>
                            <div className="prestation-list-container">
                                {prestations.filter(p => p.group === bloc._id).map(presta => (
                                    <div className="content-bloc__prestations" key={presta._id}>
                                        <div className="content-bloc__prestations--text">
                                            <p>{presta.name}</p>
                                            <div className="content-bloc__prestations--text--infos">
                                                <p>{presta.price}</p>
                                                <p>{presta.duration}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>   
                            <img src={bloc.photoUrl} alt="" className="content-bloc__img"/>
                        </div>
                    </div>
                ))}
            </section>

            <Modal isOpen={modalIsOpen} onClose={() => {setModalIsOpen(false) ; setModalVue("sousTypes")}} variant="modify" >
                {modalVue === "sousTypes" ?
                /* Vue 1 */
                    <div className="sous-types-vue">
                        {allSousTypes.map((type)=>(
                            <div className="sous-types-vue__full-container" key={type._id}>
                                {editingSousTypeId === type._id ?
                                    <div className="sous-types-edit-container">
                                        <label className="sous-types-edit-container__title-label" htmlFor="sous-type-title">Choisir un titre :</label>
                                        <input className="sous-types-edit-container__title-input" id="sous-type-title" type="text" value={actualSousTypeName} onChange={(e)=> setActualSousTypeName(e.target.value)}/>
                                        <div className="sous-types-edit-container__btn-bloc">
                                            <button className="sous-types-edit-container__btn-bloc--back-btn btn" type="button" onClick={() => setEditingSousTypeId(null)}>Retour</button>
                                            <button className="sous-types-edit-container__btn-bloc--ok-btn btn" type="button" onClick={() => {handleUpdateSousType(type._id) ; setEditingSousTypeId(null)}}>Valider le titre</button>
                                            <button className="sous-types-edit-container__btn-bloc--modifiy-btn btn" type="button" onClick={() => {setModalVue("groups"); setSelectedSousTypeId(type._id)}}>Modifier le contenu</button>
                                        </div>
                                    </div>
                                :
                                    <div className="sous-types-neutral-container">
                                        <h2 className="sous-types-neutral-container--title">{type.name}</h2>
                                        <div className="sous-types-neutral-container__btn-bloc">
                                            <button className="sous-types-neutral-container__btn-bloc--title-modify-btn btn" type="button" onClick={() => {setEditingSousTypeId(type._id) ; setActualSousTypeName(type.name)}}>Modifier le titre</button>
                                            <button className="sous-types-neutral-container__btn-bloc--content-modify-btn btn" type="button" onClick={() => {setModalVue("groups"); setSelectedSousTypeId(type._id)}}>Modifier le contenu</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                
                    </div>
                /* Vue 2 */    
                : modalVue === "groups" ?
                    <div className="group-vue">
                        {isAddingGroup ?
                            <div className="group-vue__add">
                                <div className="group-vue__add--bloc">
                                    <label className="cares-modal-labels" htmlFor="title-adding">Entrer un nom</label>
                                    <input className="cares-modal-inputs" type="text" id="title-adding" value={newNameGroup} onChange={(e) => setNewNameGroup(e.target.value)}/>
                                </div>
                                <div className="group-vue__add--bloc">
                                    <label className="cares-modal-labels" htmlFor="description-adding">Entrer une description</label>
                                    <input className="cares-modal-inputs" type="text" id="description-adding" value={newDescriptionGroup} onChange={(e) => setNewDescriptionGroup(e.target.value)}/>
                                </div>
                                <div className="group-vue__add--bloc">
                                    <label className="cares-modal-labels" htmlFor="photo-adding">Selectionner une photo</label>
                                    <input className="cares-modal-photo-input" type="file" id="photo-adding" onChange={(e) => setNewPhotoGroup(e.target.files[0])}/>
                                </div>
                                <div className="group-vue__add--btn-bloc">
                                    <button className="btn" type="button" onClick={() => setIsAddingGroup(false)}>Retour</button>
                                    <button className="btn" type="button" onClick={() => handleCreateGroup()}>Valider</button>
                                </div>
                            </div>
                        :
                            <div className="group-vue__edit">
                                {modalGroups.map((group) => (
                                    <div className="edit-list" key={group._id}>
                                        <div className="edit-list__item">
                                            <label className="cares-modal-labels" htmlFor="title-edit">Modifier le nom du groupe</label>
                                            <input className="cares-modal-inputs" type="text" id="title-edit"/>
                                        </div>
                                        <div className="edit-list__item">
                                            <label className="cares-modal-labels" htmlFor="description-edit">Modifier la description</label>
                                            <input className="cares-modal-inputs" type="text" id="description-edit"/>
                                        </div>
                                        <div className="edit-list__item">
                                            <label className="cares-modal-labels" htmlFor="photo-edit">Modifier la photo</label>
                                            <input className="cares-modal-photo-input" type="file" id="photo-edit"/>
                                        </div>
                                        <div className="edit-list__btn-bloc">
                                            <button type="button" className="suppr-and-modify-btn btn" onClick={() => handleDeleteGroup(group._id)}>Supprimer ce groupe</button>
                                            <button type="button" onClick={() => {setModalVue("prestations") ; setSelectedGroupId(group._id)}} className="suppr-and-modify-btn btn">Modifier les prestations</button>
                                        </div>
                                    </div>
                                ))}
                                <div className="edit-btn-bloc">
                                    <button type="button" onClick={() => setModalVue("sousTypes")} className="edit-btn-bloc__back-btn btn">Retour</button>
                                    <button type="button" className="edit-btn-bloc__add-btn btn" onClick={() => setIsAddingGroup(true)}>Ajouter un groupe</button>
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