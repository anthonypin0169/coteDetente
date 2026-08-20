import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Carrousel from "@/component/carrousel/carrousel"
import StaffProfile from "@/component/staffProfile/staffProfile"
import Modal from "@/component/modal/modal"
import PhotoInput from "@/component/photoInput/photoInput"
import { apiFetch } from "@/utils/api"
import "./StaffProfiles.scss"

export default function StaffProfiles() {

    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
    const token = useSelector((state) => state.auth.token)

    const [isStaffModalOpen, setIsStaffModalOpen] = useState(false)
    const [staffList, setStaffList] = useState([])
    const [selectedStaffId, setSelectedStaffId] = useState("")

    useEffect( () => {
        const loadStaffData = async () => {
            try{
                const { ok, data } = await apiFetch("/api/staff")

                if(ok){
                    setStaffList(data)
                }

            }catch(error){
                return(error.message)
            }
        }
        loadStaffData()
    },[])


    const selectedMember = staffList.find(member => member._id === selectedStaffId)
    const [ staffName,setStaffName] = useState("")
    const [ staffSpeciality,setStaffSpeciality] = useState("")
    const [ staffText,setStaffText] = useState("")
    const [ staffPhoto,setStaffPhoto] = useState([])

    const handleProfileUpdate = async () => {

        const formData = new FormData()
        formData.append("name", staffName)
        formData.append("speciality", staffSpeciality)
        formData.append("text", staffText)
        formData.append("photo", staffPhoto)

        try{
            const { ok, data: updatedMember } = await apiFetch(`/api/staff/${selectedStaffId}`, {
                method : "PUT",
                body : formData,
                token
            })

            if(ok){
                    setStaffList(prev => prev.map(member =>
                        member._id === updatedMember._id ? updatedMember : member
                    ))
                }

            setStaffName("")
            setStaffSpeciality("")
            setStaffText("")
            setStaffPhoto(null)

        }catch(error){
            return(error.message)
        }
    }

    const [staffCreateModalIsOpen, setStaffCreateModalIsOpen] = useState(false)

    const handleStaffCreate = async () => {

        const formData = new FormData()
        formData.append("name", staffName)
        formData.append("speciality", staffSpeciality)
        formData.append("text", staffText)
        formData.append("photo", staffPhoto)

        try{
            const { ok, data: postedMember } = await apiFetch("/api/staff", {
                method : "POST",
                body : formData,
                token
            })

            if(ok){
                setStaffList(prev =>[...prev, postedMember])
                setStaffCreateModalIsOpen(false)
            }

            setStaffName("")
            setStaffSpeciality("")
            setStaffText("")
            setStaffPhoto(null)

        }catch(error){
            return(error.message)
        }
    }

    const handleStaffDelete = async (id) => {
        try{
            const { ok } = await apiFetch(`/api/staff/${id}`, {
                method : "DELETE",
                token
            })
            if(ok){
                setStaffList(prev => prev.filter(staffCard => staffCard._id !== id))
            }

        }catch(error){
            return(error.message)
        }
    }

    return (
        <section className="home__staff-profile">

            {isAuthenticated ? <button onClick={() => setStaffCreateModalIsOpen(true)} type="button" className="home__staff-profile--add-member-btn btn">Ajouter un membre</button> : null }

            <Modal isOpen={staffCreateModalIsOpen} onClose={() => setStaffCreateModalIsOpen(false)} variant ="staff" >
                <div className="modal__create-staff-profile">
                    <div className="modal__create-staff-profile--photo">
                        <label htmlFor="create-staff-photo" className="staff-profile-h2">Choisissez une photo :</label>
                        <PhotoInput id="create-staff-photo" onChange={setStaffPhoto} className="staff-profile-upload"/>
                    </div>
                    <div className="modal__create-staff-profile--name">
                        <label htmlFor="create-staff-name" className="staff-profile-h2">Entrez un nom :</label>
                        <input id="create-staff-name" type="text" onChange={(e) => setStaffName(e.target.value)} value={staffName} className="create-staff-profile-input"/>
                    </div>
                    <div className="modal__create-staff-profile--speciality">
                        <label htmlFor="create-staff-speciality" className="staff-profile-h2">Entrez une spécialité :</label>
                        <input id="create-staff-speciality" type="text" onChange={(e) => setStaffSpeciality(e.target.value)} value={staffSpeciality} className="create-staff-profile-input"/>
                    </div>
                    <div className="modal__create-staff-profile--text">
                        <label htmlFor="create-staff-text" className="modal__create-staff-profile--text-h2 staff-profile-h2">Entrez un texte court :</label>
                        <textarea id="create-staff-text" onChange={(e) => setStaffText(e.target.value)} value={staffText} className="create-staff-profile-text"/>
                    </div>
                    <button onClick={() => handleStaffCreate()} type="button" className="btn">Valider</button>
                </div>
            </Modal>


            <Modal isOpen={isStaffModalOpen} onClose={() => setIsStaffModalOpen(false)} variant ="staff" >
                {selectedMember &&
                    <div className="modal__edit-staff-profile">
                        <div className="modal__edit-staff-profile--photo">
                            <label htmlFor="edit-staff-photo" className="staff-profile-h2">Modifiez la photo :</label>
                            <PhotoInput id="edit-staff-photo" onChange={setStaffPhoto} className="staff-profile-upload"/>
                        </div>
                        <div className="modal__edit-staff-profile--name">
                            <label htmlFor="edit-staff-name" className="staff-profile-h2">Modifiez un nom :</label>
                            <input id="edit-staff-name" type="text" onChange={(e) => setStaffName(e.target.value)} value={staffName} className="create-staff-profile-input"/>
                        </div>
                        <div className="modal__edit-staff-profile--speciality">
                            <label htmlFor="edit-staff-speciality" className="staff-profile-h2">Modifiez une spécialité :</label>
                            <input id="edit-staff-speciality" type="text" onChange={(e) => setStaffSpeciality(e.target.value)} value={staffSpeciality} className="create-staff-profile-input"/>
                        </div>
                        <div className="modal__edit-staff-profile--text">
                            <label htmlFor="edit-staff-text" className="staff-profile-h2">Modifiez un texte :</label>
                            <textarea id="edit-staff-text" type="text" onChange={(e) => setStaffText(e.target.value)} value={staffText} className="create-staff-profile-text"/>
                        </div>
                        <button onClick={() => handleProfileUpdate()} type="button" className="btn">Valider</button>
                    </div>
                }
            </Modal>

            <div className="home__staff-profile--list">
                {staffList.map(member => (
                    <div key={member._id} className="staff-container">
                        {isAuthenticated ?<button onClick={() => handleStaffDelete(member._id)}className="modal__edit-staff-profile--delete-btn">X</button> : null}
                        <StaffProfile  title={member.name} speciality={member.speciality} text={member.text} src={member.photoUrl}/>
                        {isAuthenticated ? <button onClick={() => {setSelectedStaffId(member._id); setIsStaffModalOpen(true)}}className="home__modify-btn btn">Modifier</button> : null}
                    </div>
                ))}
            </div>

            <Carrousel mode="manual" className="home__staff-profile--carrousel" slides={staffList.map(member => (
                <div className="staff-container" key={member._id}>
                    {isAuthenticated ?<button onClick={() => handleStaffDelete(member._id)}className="modal__edit-staff-profile--delete-btn">X</button> : null}
                    <StaffProfile  title={member.name} speciality={member.speciality} text={member.text} src={member.photoUrl}/>
                    {isAuthenticated ? <button onClick={() => {setSelectedStaffId(member._id); setIsStaffModalOpen(true)}}className="home__modify-btn btn">Modifier</button> : null}
                </div>
            ))} />
        </section>
    )
}
