import "./event.scss"
import { useState, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import Modal from "@/component/modal/modal"
import PhotoInput from "@/component/photoInput/photoInput"
import PositionableTextEditor from "@/component/positionableTextEditor/positionableTextEditor"
import { apiFetch } from "@/utils/api"

const DEFAULT_TEXT_POSITIONS = {
    title: { x: 50, y: 30 },
    dates: { x: 50, y: 45 },
    description: { x: 50, y: 60 },
    employeeName: { x: 85, y: 90 }
}

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
    const [newTextColor, setNewTextColor] = useState("white")
    const [newTextPositions, setNewTextPositions] = useState(DEFAULT_TEXT_POSITIONS)
    const [pendingInstagramEventId, setPendingInstagramEventId] = useState(null)

    /* Aperçu local de la nouvelle photo avant upload, pour l'éditeur de position */
    const newPhotoPreview = useMemo(() => newPhoto ? URL.createObjectURL(newPhoto) : null, [newPhoto])

    useEffect(() => {
        return () => { if (newPhotoPreview) URL.revokeObjectURL(newPhotoPreview) }
    }, [newPhotoPreview])

    const handleCreateCurrentEvent = async () => {
        const formData = new FormData()
        formData.append("title", newTitle)
        formData.append("startDate", newStartDate)
        formData.append("endDate", newEndDate)
        formData.append("employeeName", newEmployeeName)
        formData.append("description", newDescription)
        formData.append("recapDescription", newRecapDescription)
        formData.append("isCurrent", "true")
        formData.append("textColor", newTextColor)
        formData.append("textPositions", JSON.stringify(newTextPositions))
        if (newPhoto) formData.append("photo", newPhoto)

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
                setNewTextColor("white")
                setNewTextPositions(DEFAULT_TEXT_POSITIONS)
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
    const [actualTextColor, setActualTextColor] = useState("white")
    const [actualTextPositions, setActualTextPositions] = useState(DEFAULT_TEXT_POSITIONS)
    const [editingEventId, setEditingEventId] = useState(null)

    const handleUpdateEvent = async (id) => {
        const formData = new FormData()
        formData.append("title", actualTitle)
        formData.append("startDate", actualStartDate)
        formData.append("endDate", actualEndDate)
        formData.append("employeeName", actualEployeeName)
        formData.append("description", actualDescription)
        formData.append("recapDescription", actualRecapDescription)
        formData.append("textColor", actualTextColor)
        formData.append("textPositions", JSON.stringify(actualTextPositions))
        if (actualPhoto) formData.append("photo", actualPhoto)

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
                setActualTextColor("white")
                setActualTextPositions(DEFAULT_TEXT_POSITIONS)
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

    const currentEventPositions = {
        title: currentEvent?.textPositions?.title || DEFAULT_TEXT_POSITIONS.title,
        dates: currentEvent?.textPositions?.dates || DEFAULT_TEXT_POSITIONS.dates,
        description: currentEvent?.textPositions?.description || DEFAULT_TEXT_POSITIONS.description,
        employeeName: currentEvent?.textPositions?.employeeName || DEFAULT_TEXT_POSITIONS.employeeName
    }
    const currentEventDates = [currentEvent?.startDate, currentEvent?.endDate].filter(Boolean).join(" - ")
    const currentEventTextColor = currentEvent?.textColor === "black" ? "#000000" : "#ffffff"

    return (
        <main className="main-event">
            {isAuthenticated &&
                <button type="button" className="btn" onClick={() => {setModalIsOpen(true) ; setModalVue("list")}}>Modifier</button>
            }
            <section className="first-section">
                <img className="first-section__photo" src={currentEvent?.photoUrl} alt="" />
                {currentEvent?.title &&
                    <h1 className="first-section__text first-section__text--title" style={{ left: `${currentEventPositions.title.x}%`, top: `${currentEventPositions.title.y}%`, color: currentEventTextColor }}>{currentEvent.title}</h1>
                }
                {currentEventDates &&
                    <p className="first-section__text first-section__text--dates" style={{ left: `${currentEventPositions.dates.x}%`, top: `${currentEventPositions.dates.y}%`, color: currentEventTextColor }}>{currentEventDates}</p>
                }
                {currentEvent?.description &&
                    <p className="first-section__text first-section__text--description" style={{ left: `${currentEventPositions.description.x}%`, top: `${currentEventPositions.description.y}%`, color: currentEventTextColor }}>{currentEvent.description}</p>
                }
                {currentEvent?.employeeName &&
                    <p className="first-section__text first-section__text--employee" style={{ left: `${currentEventPositions.employeeName.x}%`, top: `${currentEventPositions.employeeName.y}%`, color: currentEventTextColor }}>{currentEvent.employeeName}</p>
                }
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
                            <button
                                type="button"
                                className="modal-vue-list__btn-container--btn btn"
                                onClick={() => {
                                    setModalVue("edit")
                                    setEditingEventId(currentEvent._id)
                                    setActualTitle(currentEvent.title)
                                    setActualStartDate(currentEvent.startDate)
                                    setActualEndDate(currentEvent.endDate)
                                    setActualEployeeName(currentEvent.employeeName)
                                    setActualDescription(currentEvent.description)
                                    setActualRecapDescription(currentEvent.recapDescription)
                                    setActualTextColor(currentEvent.textColor || "white")
                                    setActualTextPositions({
                                        title: currentEvent.textPositions?.title || DEFAULT_TEXT_POSITIONS.title,
                                        dates: currentEvent.textPositions?.dates || DEFAULT_TEXT_POSITIONS.dates,
                                        description: currentEvent.textPositions?.description || DEFAULT_TEXT_POSITIONS.description,
                                        employeeName: currentEvent.textPositions?.employeeName || DEFAULT_TEXT_POSITIONS.employeeName
                                    })
                                }}
                            >Modifier</button>
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
                            <PositionableTextEditor
                                imageUrl={currentEvent?.photoUrl}
                                elements={[
                                    { key: "title", text: actualTitle },
                                    { key: "dates", text: [actualStartDate, actualEndDate].filter(Boolean).join(" - ") },
                                    { key: "description", text: actualDescription },
                                    { key: "employeeName", text: actualEployeeName }
                                ]}
                                positions={actualTextPositions}
                                onPositionsChange={setActualTextPositions}
                            />
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
                                <div className="modal-vue-edit__second-bloc--color-choice">
                                    <label>
                                        <input type="radio" name="event-text-color" checked={actualTextColor === "white"} onChange={() => setActualTextColor("white")}/>
                                        Texte blanc
                                    </label>
                                    <label>
                                        <input type="radio" name="event-text-color" checked={actualTextColor === "black"} onChange={() => setActualTextColor("black")}/>
                                        Texte noir
                                    </label>
                                </div>
                                <div className="modal-vue-edit__second-bloc--btn-container">
                                    <button type="button" onClick={() => setModalVue("list")}>Retour</button>
                                    <button type="button" onClick={() => handleUpdateEvent(editingEventId)}>Valider</button>
                                </div>
                            </div>
                        </div>
                    :modalVue === "addCurrent" ?
                        <div className="modal-vue-add">
                            <PositionableTextEditor
                                imageUrl={newPhotoPreview}
                                elements={[
                                    { key: "title", text: newTitle },
                                    { key: "dates", text: [newStartDate, newEndDate].filter(Boolean).join(" - ") },
                                    { key: "description", text: newDescription },
                                    { key: "employeeName", text: newEmployeeName }
                                ]}
                                positions={newTextPositions}
                                onPositionsChange={setNewTextPositions}
                            />
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
                            <div className="modal-vue-add__color-choice">
                                <label>
                                    <input type="radio" name="new-event-text-color" checked={newTextColor === "white"} onChange={() => setNewTextColor("white")}/>
                                    Texte blanc
                                </label>
                                <label>
                                    <input type="radio" name="new-event-text-color" checked={newTextColor === "black"} onChange={() => setNewTextColor("black")}/>
                                    Texte noir
                                </label>
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
