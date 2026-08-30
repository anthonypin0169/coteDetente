import { useState, useEffect, useRef } from "react"
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


    /* Animation du bloc */
    const animRef = useRef("")

    useEffect(() => {
        const handleScroll = () => {

            animRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`

        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)

    },[])


    /* Envoi du formulaire sur le mail */
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [messageSent, setMessageSent] = useState(false)

    const handleSendMessage = async () => {
        try{
            const { ok } = await apiFetch("/api/contact",{
                method : "POST",
                body : {
                    fullName : fullName,
                    email : email,
                    message : message
                }
            })

            if(ok){
                setMessageSent(true)
                setFullName("")
                setEmail("")
                setMessage("")
            }
        }catch(error){
            (error.message)
        }
    }


    return (
        <main className="main-contact bg-img" style={{ backgroundImage: `url(${contactPage?.photoUrl})` }}>
            {isAuthenticated &&
                <button type="button" className="btn" onClick={() => setModalIsOpen(true)}>Modifier</button>
            }
            <section className="content-section" >
                {messageSent ? 
                    <div>Message envoyé !</div>
                :
                    <form  className="content-section__form" action="">
                        <div className="content-section__form--input-container">
                            <label htmlFor="contat-name">Votre Nom - Prénom</label>
                            <input type="text" id="contat-name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                        </div>
                        <div className="content-section__form--input-container">
                            <label htmlFor="contact-mail">Votre adresse mail</label>
                            <input type="text" id="contact-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="content-section__form--textaera-container">
                            <label htmlFor="contact-message">Votre message</label>
                            <textarea name="" id="contact-message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                        <button type="button" onClick={() => handleSendMessage()} className="btn content-section__form--btn">Envoyer</button>
                    </form>
                }
                <div ref={animRef} className="content-section__animated-bloc"></div>
            </section>
            <Modal isOpen={modalIsOpen} onClose={() =>setModalIsOpen(false)} variant="staff">
                <div className="contact-modal">
                    <div className="contact-modal__container">
                        <label className="contact-modal__container--img-label" htmlFor="contact-photo">Choisir une photo</label>
                        <PhotoInput className="contact-modal__container--img-input group-vue__photo-input" id="contact-photo" onChange={setNewImg}/>
                    </div>
                    <button type="button" className="btn" onClick={() => handleUpdatePhoto()}>Valider</button>
                </div>
            </Modal>
        </main>
    )
}