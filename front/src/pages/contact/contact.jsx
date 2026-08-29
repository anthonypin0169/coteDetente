import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Modal from "@/component/modal/modal"
import PhotoInput from "@/component/photoInput/photoInput"
import { apiFetch } from "@/utils/api"
import "./contact.scss"

export default function Contact() {

    const token = useSelector((state) => state.auth.token)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    /* image de fond */
    const [contactPage, setContactPage] = useState(null)
    
    useEffect(() => {
        const loadImg = async () => {
            try{
                const { data } = await apiFetch("/api/contact-page")

                if(!data){
                    throw new Error ("Erreur lors de la récuperation de l'image de fond")
                }
                setContactPage(data)
                
            }catch(error){
                (error.message)
            }
        }
        loadImg()
    },[])


    /* Boite modale */
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [newImg, setNewImg] = useState(null)

    const handleUpdatePhoto = async () => {

        const formData = new FormData()
        if(newImg)formData.append("photo", newImg)

        try{
                const { ok, data : newPhotoUploaded} = await apiFetch("/api/contact-page",{
                    method : "PUT",
                    body : formData,
                    token
                })

                if(ok){
                    setNewImg(null)
                    setContactPage(newPhotoUploaded)
                }
                
        }catch(error){
            (error.message)
        }
    }


    return (
        <main className="main-contact">
            {isAuthenticated &&
                <button type="button" className="btn" onClick={() => setModalIsOpen(true)}>Modifier</button>
            }
            <section className="content-section" >
                <img  className="content-section__img" src={contactPage?.photoUrl} alt="" />
                <form  className="content-section__form" action="">
                    <label className="content-section__form--label" htmlFor="contat-name">Votre Nom - Prénom</label>
                    <input className="content-section__form--input" type="text" id="contat-name"/>
                    <label className="content-section__form--label" htmlFor="contact-mail">Votre adresse mail</label>
                    <input className="content-section__form--input" type="text" id="contact-mail"/>
                    <label className="content-section__form--label" htmlFor="contact-message">Votre message</label>
                    <textarea className="content-section__form--textarea" name="" id="contact-message"></textarea>
                </form>
            </section>
            <div className="animated-bloc"></div>
            <Modal isOpen={modalIsOpen} onClose={() =>setModalIsOpen(false)} variant="modify">
                <div className="contact-modal">
                    <label className="contact-modal__img-label" htmlFor="contact-photo">Choisir une photo</label>
                    <PhotoInput className="contact-modal__img-input" id="contact-photo" onChange={setNewImg}/>
                    <button type="button" onClick={() => handleUpdatePhoto()}>Valider</button>
                </div>
            </Modal>
        </main>
    )
}