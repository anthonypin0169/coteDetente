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
    const currentEvent = events[0]

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

    /* Ajouter une prestation */
    const [newTitle, setNewTitle] = useState("")
    const [newStartDate, setNewStartDate] = useState("")
    const [newEndDate, setNewEndDate] = useState("")
    const [newEmployeeName, setNewEmployeeName] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newPhoto, setNewPhoto] = useState(null)
    const [newSecondPhoto, setNewSecondPhoto] = useState(null)
    const [newThirdPhoto, setNewThirdPhoto] = useState(null)
    const [isAddingEvent, setIsAddingEvent] = useState(false)

    const handleCreateEvent = async () => {
        const formData = new FormData()
        formData.append("title", newTitle)
        formData.append("startDate", newStartDate)
        formData.append("endDate", newEndDate)
        formData.append("employeeName", newEmployeeName)
        formData.append("description", newDescription)
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
                setNewPhoto(null)
                setNewSecondPhoto(null)
                setNewThirdPhoto(null)
                setEvents((prev)=>[...prev, newEventUploaded])
                setModalVue("list")
            }
        }catch(error){
            (error.message)
        }
    }


    /* Modifier une prestation */
    const [actualTitle, setActualTitle] = useState("")
    const [actualStartDate, setActualStartDate] = useState("")
    const [actualEndDate, setActualEndDate] = useState("")
    const [actualEployeeName, setActualEployeeName] = useState("")
    const [actualDescription, setActualDescription] = useState("")
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


    /* Supprimer une prestation */

    const handleDeleteEvent = async (id) => {
        try{
            const { ok } = await apiFetch(`/api/events/${id}`,{
                method : "DELETE",
                token
            })

            if(ok){
                setEvents(prev => prev.filter(e => e._id !== id))
            }

        }catch(error){
            (error.message)
        }            
    }



    return (
        <main>
            {isAuthenticated &&
                <button className="btn" onClick={() => {setModalIsOpen(true) ; setModalVue("list")}}>Modifier</button>
            }
            <section className="first-section">
                <img className="first-section__photo" src={currentEvent?.photoUrl} alt="" />
                <img className="first-section__photo" src={currentEvent?.secondPhotoUrl} alt="" />
                <img className="first-section__photo" src={currentEvent?.thirdPhotoUrl} alt="" />
                <div className="first-section__infos-container">
                    <div>{currentEvent?.title}</div>
                    <div>
                        <div>{currentEvent?.startDate}</div>
                        <div>{currentEvent?.endDate}</div>
                    </div>
                </div>
                <div className="first-section__text-container">
                    <div>{currentEvent?.employeeName}</div>
                    <div>{currentEvent?.description}</div>
                </div>
            </section>
            <section className="second-section">
                <div className="second-section__event-list-container">
                    {events.slice(1).map((event) => (
                        <div key={event._id} className="item">
                            <div className="item__bloc">
                                <img className="item__bloc--photo" src={event.photoUrl} alt="" />
                                <div className="item__bloc--description">{event.description}</div>
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
                            <button className="modal-vue-list__btn-container--btn btn" onClick={() => {setModalVue("edit"); setEditingEventId(currentEvent._id); setActualTitle(currentEvent.title); setActualStartDate(currentEvent.startDate); setActualEndDate(currentEvent.endDate); setActualEployeeName(currentEvent.employeeName); setActualDescription(currentEvent.description)}}>Modifier</button>
                            <button className="modal-vue-list__btn-container--btn btn" onClick={() => handleDeleteEvent(currentEvent?._id)}>Supprimer</button>
                        </div>
                        <div className="modal-vue-list__list-container">
                            {events.slice(1).map((event) => (
                                <div key={event._id} className="preview-event">
                                        <img className="preview-event__photo" src={event.photoUrl} alt="" />
                                        <button className="preview__btn" onClick={() => handleDeleteEvent(event._id)}>X</button>
                                        <div className="preview-event__title">{event.title}</div>  
                                </div>
                            ))}
                        </div>
                        <button className="modal-vue-list__add-btn btn" onClick={() => setModalVue("add")}>Ajouter</button>
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
                                <label htmlFor="event-photo" className="cares-modal-labels">Modifier la photo </label>
                                <PhotoInput id="event-photo" className="cares-modal-input" onChange={setActualPhoto}/>
                                <div>
                                    <button onClick={() => setModalVue("list")}>Retour</button>
                                    <button onClick={() => handleUpdateEvent(editingEventId)}>Valider</button>
                                </div>
                            </div>
                        </div>
                    :modalVue === "add" ?
                        <div>
                            <label htmlFor="add-event-title" className="cares-modal-labels">Entrer un titre</label>
                            <input type="text" id="add-event-title" className="cares-modal-labels" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                            <label htmlFor="add-eventdescription" className="cares-modal-labels">Entrer une description</label>
                            <input type="text" id="add-event-description" className="cares-modal-labels" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
                            <label htmlFor="add-event-photo" className="cares-modal-labels">Choisir une photo</label>
                            <PhotoInput id="add-event-photo" className="cares-modal-input" onChange={setNewPhoto}/>
                            <div>
                                <button onClick={() => setModalVue("list")}>Retour</button>
                                <button onClick={() => handleCreateEvent()}>Valider</button>
                            </div>
                        </div>
                        :""
                    }     
            </Modal>
        </main>
    )
}