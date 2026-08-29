import "./event.scss"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Modal from "@/component/modal/modal"
import PhotoInput from "@/component/photoInput/photoInput"
import { apiFetch } from "@/utils/api"

export default function Event() {

    const token = useSelector((state) => state.auth.token)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    /* Charger les évenements */

    const [events, setEvents] = useState([])
    const currentEvent = events.find((event) => event.isCurrent)
    const pastEvents = events.filter((event) => !event.isCurrent)

    useEffect(() => {
        const loadEvents = async () => {
            try{
                const { data } = await apiFetch("/api/events")

                if(!data){
                    throw new Error("Erreur lors de la récuperation des évènements")
                }

                setEvents(data)

            }catch(error){
                (error.message)
            }
        }
        loadEvents()
    },[])


    /* Boite modale */
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalVue, setModalVue] = useState("list")

    /* Ajouter un évènement complet (devient le nouvel évènement actuel) */
    const [newTitle, setNewTitle] = useState("")
    const [newStartDate, setNewStartDate] = useState("")
    const [newEndDate, setNewEndDate] = useState("")
    const [newEmployeeName, setNewEmployeeName] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newRecapDescription, setNewRecapDescription] = useState("")
    const [newPhoto, setNewPhoto] = useState(null)
    const [newSecondPhoto, setNewSecondPhoto] = useState(null)
    const [newThirdPhoto, setNewThirdPhoto] = useState(null)
    const [pendingInstagramEventId, setPendingInstagramEventId] = useState(null)

    const handleCreateCurrentEvent = async () => {
        const formData = new FormData()
        formData.append("title", newTitle)
        formData.append("startDate", newStartDate)
        formData.append("endDate", newEndDate)
        formData.append("employeeName", newEmployeeName)
        formData.append("description", newDescription)
        formData.append("recapDescription", newRecapDescription)
        formData.append("isCurrent", "true")
        if (newPhoto) formData.append("photo", newPhoto)
        if (newSecondPhoto) formData.append("secondPhoto", newSecondPhoto)
        if (newThirdPhoto) formData.append("thirdPhoto", newThirdPhoto)

        try{
            const { ok, data : newEventUploaded } = await apiFetch("/api/events",{
                method : "POST",
                body: formData,
                token
            })

            if(ok){
                setNewTitle("")
                setNewStartDate("")
                setNewEndDate("")
                setNewEmployeeName("")
                setNewDescription("")
                setNewRecapDescription("")
                setNewPhoto(null)
                setNewSecondPhoto(null)
                setNewThirdPhoto(null)
                setEvents((prev)=> prev.map((event) => ({ ...event, isCurrent: false })).concat(newEventUploaded))
                setPendingInstagramEventId(newEventUploaded._id)
                setModalVue("confirmInstagram")
            }
        }catch(error){
            (error.message)
        }
    }

    const handlePublishInstagram = async () => {
        try{
            await apiFetch(`/api/events/${pendingInstagramEventId}/publish-instagram`,{
                method : "POST",
                token
            })
        }catch(error){
            (error.message)
        }finally{
            setPendingInstagramEventId(null)
            setModalVue("list")
        }
    }

    /* Ajouter rapidement un ancien évènement (ne touche pas à l'évènement actuel) */
    const [lightTitle, setLightTitle] = useState("")
    const [lightRecapDescription, setLightRecapDescription] = useState("")
    const [lightPhoto, setLightPhoto] = useState(null)

    const handleCreatePastEvent = async () => {
        const formData = new FormData()
        formData.append("title", lightTitle)
        formData.append("recapDescription", lightRecapDescription)
        formData.append("isCurrent", "false")
        if (lightPhoto) formData.append("photo", lightPhoto)

        try{
            const { ok, data : newEventUploaded } = await apiFetch("/api/events",{
                method : "POST",
                body: formData,
                token
            })

            if(ok){
                setLightTitle("")
                setLightRecapDescription("")
                setLightPhoto(null)
                setEvents((prev)=>[...prev, newEventUploaded])
                setModalVue("list")
            }
        }catch(error){
            (error.message)
        }
    }


    /* Modifier l'évènement actuel */
    const [actualTitle, setActualTitle] = useState("")
    const [actualStartDate, setActualStartDate] = useState("")
    const [actualEndDate, setActualEndDate] = useState("")
    const [actualEployeeName, setActualEployeeName] = useState("")
    const [actualDescription, setActualDescription] = useState("")
    const [actualRecapDescription, setActualRecapDescription] = useState("")
    const [actualPhoto, setActualPhoto] = useState(null)
    const [actualSecondPhoto, setActualSecondPhoto] = useState(null)
    const [actualThirdPhoto, setActualThirdPhoto] = useState(null)
    const [editingEventId, setEditingEventId] = useState(null)

    const handleUpdateEvent = async (id) => {
        const formData = new FormData()
        formData.append("title", actualTitle)
        formData.append("startDate", actualStartDate)
        formData.append("endDate", actualEndDate)
        formData.append("employeeName", actualEployeeName)
        formData.append("description", actualDescription)
        formData.append("recapDescription", actualRecapDescription)
        if (actualPhoto) formData.append("photo", actualPhoto)
        if (actualSecondPhoto) formData.append("secondPhoto", actualSecondPhoto)
        if (actualThirdPhoto) formData.append("thirdPhoto", actualThirdPhoto)

        try{
            const { ok, data : updatedEvent } = await apiFetch(`/api/events/${id}`,{
                method : "PUT",
                body : formData,
                token
            })
            if(ok){
                setActualTitle("")
                setActualStartDate("")
                setActualEndDate("")
                setActualEployeeName("")
                setActualDescription("")
                setActualRecapDescription("")
                setActualPhoto(null)
                setActualSecondPhoto(null)
                setActualThirdPhoto(null)
                setEditingEventId(null)
                setEvents(prev => prev.map(e => e._id === updatedEvent._id ? updatedEvent : e))
                setModalVue("list")
            }

        }catch(error){
            (error.message)
        }
    }


    /* Supprimer un évènement */

    const handleDeleteEvent = async (id) => {
        try{
            const { ok, data : deleteResult } = await apiFetch(`/api/events/${id}`,{
                method : "DELETE",
                token
            })

            if(ok){
                setEvents(prev => {
                    const remaining = prev.filter(e => e._id !== id)
                    if (!deleteResult?.promotedEvent) return remaining
                    return remaining.map(e => e._id === deleteResult.promotedEvent._id ? deleteResult.promotedEvent : e)
                })
            }

        }catch(error){
            (error.message)
        }
    }



    return (
        <main className="main-event">
            {isAuthenticated &&
                <button type="button" className="btn" onClick={() => {setModalIsOpen(true) ; setModalVue("list")}}>Modifier</button>
            }
            <section className="first-section">
                <img className="first-section__photo1" src={currentEvent?.photoUrl} alt="" />
                <img className="first-section__photo2" src={currentEvent?.secondPhotoUrl} alt="" />
                <img className="first-section__photo3" src={currentEvent?.thirdPhotoUrl} alt="" />
                <div className="first-section__infos-container">
                    <div className="first-section__infos-container--title">{currentEvent?.title}</div>
                    <div className="first-section__infos-container--dates">
                        <span>{currentEvent?.startDate}</span>
                        <span>{currentEvent?.endDate}</span>
                    </div>
                </div>
                <div className="first-section__text-container">
                    <div className="first-section__text-container--name">{currentEvent?.employeeName}</div>
                    <div className="first-section__text-container--description">{currentEvent?.description}</div>
                </div>
            </section>
            <section className="second-section">
                <div className="second-section__event-list-container">
                    {pastEvents.map((event) => (
                        <div key={event._id} className="item">
                            <div className="item__bloc">
                                <img className="item__bloc--photo" src={event.photoUrl} alt="" />
                                <div className="item__bloc--description">{event.recapDescription}</div>
                            </div>
                            <div className="item__title">{event.title}</div>
                        </div>
                    ))}
                </div>
            </section>

            <Modal isOpen={modalIsOpen} onClose={() =>setModalIsOpen(false)} variant="modify">
                    {modalVue === "list" ?
                    <div className="modal-vue-list">
                        <div className="modal-vue-list__photo-container">
                            <img src={currentEvent?.photoUrl} alt=""  className="modal-vue-list__photo-container--photo"/>
                        </div>
                        <div className="modal-vue-list__btn-container">
                            <button type="button" className="modal-vue-list__btn-container--btn btn" onClick={() => {setModalVue("edit"); setEditingEventId(currentEvent._id); setActualTitle(currentEvent.title); setActualStartDate(currentEvent.startDate); setActualEndDate(currentEvent.endDate); setActualEployeeName(currentEvent.employeeName); setActualDescription(currentEvent.description); setActualRecapDescription(currentEvent.recapDescription)}}>Modifier</button>
                            <button type="button" className="modal-vue-list__btn-container--btn btn" onClick={() => setModalVue("addCurrent")}>Ajouter</button>
                            <button type="button" className="modal-vue-list__btn-container--btn btn" onClick={() => handleDeleteEvent(currentEvent?._id)}>Supprimer</button>
                        </div>
                        <div className="modal-vue-list__list-container">
                            {pastEvents.map((event) => (
                                <div key={event._id} className="preview-event">
                                        <img className="preview-event__photo" src={event.photoUrl} alt="" />
                                        <button type="button" className="preview-event__btn" onClick={() => handleDeleteEvent(event._id)}>X</button>
                                        <div className="preview-event__title">{event.title}</div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="modal-vue-list__add-btn btn" onClick={() => setModalVue("addPast")}>Ajouter</button>
                    </div>
                    :modalVue === "edit" ?
                        <div className="modal-vue-edit">
                            <div className="modal-vue-edit__first-bloc">
                                <label htmlFor="event-title" className="cares-modal-labels">Modifier le titre</label>
                                <input type="text" id="event-title" className="cares-modal-input" value={actualTitle} onChange={(e) => setActualTitle(e.target.value)}/>
                                <label htmlFor="event-start-date" className="cares-modal-labels">Modifier la date de départ </label>
                                <input type="text" id="event-start-date" className="cares-modal-input" value={actualStartDate} onChange={(e) => setActualStartDate(e.target.value)}/>
                                <label htmlFor="event-end-date" className="cares-modal-labels">Modifier la date de fin </label>
                                <input type="text" id="event-end-date" className="cares-modal-input" value={actualEndDate} onChange={(e) => setActualEndDate(e.target.value)}/>
                            </div>
                            <div className="modal-vue-edit__second-bloc">
                                <label htmlFor="event-employee-name" className="cares-modal-labels">Modifier le nom de l'employé</label>
                                <input type="text" id="event-employee-name" className="cares-modal-input" value={actualEployeeName} onChange={(e) => setActualEployeeName(e.target.value)}/>
                                <label htmlFor="event-description" className="cares-modal-labels">Modifier la description </label>
                                <input type="text" id="event-description" className="cares-modal-input" value={actualDescription} onChange={(e) => setActualDescription(e.target.value)}/>
                                <label htmlFor="event-recap-description" className="cares-modal-labels">Modifier le texte récap (liste)</label>
                                <input type="text" id="event-recap-description" className="cares-modal-input" value={actualRecapDescription} onChange={(e) => setActualRecapDescription(e.target.value)}/>
                                <label htmlFor="event-photo" className="cares-modal-labels">Modifier la photo </label>
                                <PhotoInput id="event-photo" className="cares-modal-input" onChange={setActualPhoto}/>
                                <label htmlFor="event-second-photo" className="cares-modal-labels">Modifier la 2e photo </label>
                                <PhotoInput id="event-second-photo" className="cares-modal-input" onChange={setActualSecondPhoto}/>
                                <label htmlFor="event-third-photo" className="cares-modal-labels">Modifier la 3e photo </label>
                                <PhotoInput id="event-third-photo" className="cares-modal-input" onChange={setActualThirdPhoto}/>
                                <div className="modal-vue-edit__second-bloc--btn-container">
                                    <button type="button" onClick={() => setModalVue("list")}>Retour</button>
                                    <button type="button" onClick={() => handleUpdateEvent(editingEventId)}>Valider</button>
                                </div>
                            </div>
                        </div>
                    :modalVue === "addCurrent" ?
                        <div className="modal-vue-add">
                            <div className="modal-vue-add__input-container">
                                <label htmlFor="add-current-title" className="cares-modal-labels">Entrer un titre</label>
                                <input type="text" id="add-current-title" className="cares-modal-input" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                            </div>
                            <div className="modal-vue-add__input-container">
                                <label htmlFor="add-current-start-date" className="cares-modal-labels">Date de début</label>
                                <input type="text" id="add-current-start-date" className="cares-modal-input" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)}/>
                            </div>
                            <div className="modal-vue-add__input-container">
                                <label htmlFor="add-current-end-date" className="cares-modal-labels">Date de fin</label>
                                <input type="text" id="add-current-end-date" className="cares-modal-input" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)}/>
                            </div>
                            <div className="modal-vue-add__input-container">
                                <label htmlFor="add-current-employee" className="cares-modal-labels">Nom de l'employé</label>
                                <input type="text" id="add-current-employee" className="cares-modal-input" value={newEmployeeName} onChange={(e) => setNewEmployeeName(e.target.value)}/>
                            </div>
                            <div className="modal-vue-add__input-container">
                                <label htmlFor="add-current-description" className="cares-modal-labels">Entrer une description</label>
                                <input type="text" id="add-current-description" className="cares-modal-input" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
                            </div>
                            <div className="modal-vue-add__input-container">
                                <label htmlFor="add-current-recap" className="cares-modal-labels">Texte récap (pour plus tard, liste)</label>
                                <input type="text" id="add-current-recap" className="cares-modal-input" value={newRecapDescription} onChange={(e) => setNewRecapDescription(e.target.value)}/>
                            </div>
                            <div className="modal-vue-add__input-container">
                                <label htmlFor="add-current-photo" className="cares-modal-labels">Choisir une photo</label>
                                <PhotoInput id="add-current-photo" className="cares-modal-input" onChange={setNewPhoto}/>
                            </div>
                            <div className="modal-vue-add__input-container">
                                <label htmlFor="add-current-second-photo" className="cares-modal-labels">Choisir une 2e photo</label>
                                <PhotoInput id="add-current-second-photo" className="cares-modal-input" onChange={setNewSecondPhoto}/>
                            </div>
                            <div className="modal-vue-add__input-container">
                                <label htmlFor="add-current-third-photo" className="cares-modal-labels">Choisir une 3e photo</label>
                                <PhotoInput id="add-current-third-photo" className="cares-modal-input" onChange={setNewThirdPhoto}/>
                            </div>
                            <div className="modal-vue-add__btn-container">
                                <button type="button" className="btn" onClick={() => setModalVue("list")}>Retour</button>
                                <button type="button" className="btn" onClick={() => handleCreateCurrentEvent()}>Valider</button>
                            </div>
                        </div>
                    :modalVue === "addPast" ?
                        <div className="modal-vue-add-light">
                            <div className="modal-vue-add-light__label-container">
                                <label htmlFor="add-past-title" className="cares-modal-labels">Entrer un titre</label>
                                <input type="text" id="add-past-title" className="cares-modal-input" value={lightTitle} onChange={(e) => setLightTitle(e.target.value)}/>
                            </div>
                            <div className="modal-vue-add-light__label-container">
                                <label htmlFor="add-past-recap" className="cares-modal-labels">Texte récap</label>
                                <input type="text" id="add-past-recap" className="cares-modal-input" value={lightRecapDescription} onChange={(e) => setLightRecapDescription(e.target.value)}/>
                            </div>
                            <div className="modal-vue-add-light__label-container">
                                <label htmlFor="add-past-photo" className="cares-modal-labels">Choisir une photo</label>
                                <PhotoInput id="add-past-photo" className="cares-modal-input" onChange={setLightPhoto}/>
                            </div>
                            <div className="modal-vue-add-light__btn-container">
                                <button type="button" className="btn" onClick={() => setModalVue("list")}>Retour</button>
                                <button type="button" className="btn" onClick={() => handleCreatePastEvent()}>Valider</button>
                            </div>
                        </div>
                    :modalVue === "confirmInstagram" ?
                        <div className="modal-vue-confirm-instagram">
                            <p className="modal-vue-confirm-instagram__text">Voulez-vous publier cet évènement sur Instagram ?</p>
                            <div className="modal-vue-confirm-instagram__btn-container">
                                <button type="button" className="btn" onClick={() => {setPendingInstagramEventId(null); setModalVue("list")}}>Non</button>
                                <button type="button" className="btn" onClick={() => handlePublishInstagram()}>Oui</button>
                            </div>
                        </div>
                        :""
                    }
            </Modal>
        </main>
    )
}
