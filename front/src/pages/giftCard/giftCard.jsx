import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Modal from "@/component/modal/modal"
import PhotoInput from "@/component/photoInput/photoInput"
import { apiFetch } from "@/utils/api"
import "./giftCard.scss"

export default function GiftCard() {

    const token = useSelector((state) => state.auth.token)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)


    /* Récuperer les infos pour la carte */
    const [giftPageInfos, setGiftPageInfos] = useState([])

    useEffect(() => {
        const loadData = async () => {
            try{
                const { ok, data } = await apiFetch("/api/gift-card-page")

                if(ok){
                    setGiftPageInfos(data)
                }

            }catch(error){
                (error.message)
            }
        }
        loadData()
    },[])


    /* Boite modale */
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [newImg, setNewImg] = useState(null)
    const [newTitleCard, setNewTitleCard] = useState("")
    const [newTextCard, setNewTextCard] = useState("")

    const handleUpdatePhoto = async () => {

        const formData = new FormData()
        formData.append("title", newTitleCard)
        formData.append("shortText", newTextCard)
        if(newImg)formData.append("photo", newImg)

        try{
                const { ok, data : newInfosUploaded} = await apiFetch("/api/gift-card-page",{
                    method : "PUT",
                    body : formData,
                    token
                })

                if(ok){
                    setNewImg(null)
                    setGiftPageInfos(newInfosUploaded)
                    setNewTitleCard("")
                    setNewTextCard("")
                }
                
        }catch(error){
            (error.message)
        }
    }


    /* Formulaire client */
    const [price, setPrice] = useState("")
    /* Section 1 */    
    const [isFormVisible, setIsFormVisible] = useState(false)
    /* Section 2 */
    const [senderName, setSenderName] = useState("")
    const [senderMail, setSenderMail] = useState("")
    const [message, setMessage] = useState("")
    const [recipientName, setRecipientName] = useState("")
    const [isFormSent, setIsFormSent] = useState(false)

    const handleCreateGiftCard = async () => {
        try{
            const { ok } = await apiFetch("/api/giftcards",{
                method : "POST",
                body : {
                    senderName : senderName,
                    senderEmail : senderMail,
                    message : message,
                    recipientName : recipientName,
                    amount : price
                }
            })
            if(ok){
                setSenderName("")
                setSenderMail("")
                setMessage("")
                setRecipientName("")
                setPrice("")
                setIsFormSent(true)
            }

        }catch(error){
            (error.message)
        }
    }  


    return (
        <main className="gift-main">
             {isAuthenticated &&
                <button type="button" className="btn" onClick={() => setModalIsOpen(true)}>Modifier</button>
            }
            <section className="gift-first-section">
                <div className="gift-first-section__card">
                    <div className="gift-first-section__card--first-bloc">
                        <h3 className="gift-title">{giftPageInfos?.title}</h3>
                        <div className="gift-photo-container">
                            <img src={giftPageInfos?.photoUrl} alt=""  className="gift-photo"/>
                            <div className="gift-photo-overlay">
                                {price && <p className="gift-photo-overlay--price">{price} €</p>}
                                {recipientName && <p className="gift-photo-overlay--recipient">Pour {recipientName}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="gift-first-section__card--second-bloc">
                        <p className="gift-text-2nd-bloc">{giftPageInfos?.shortText}</p>
                        <label htmlFor="gift-price">Choisissez votre montant</label>
                        <input type="text" id="gift-price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        <button className="btn" type="button" onClick={() => setIsFormVisible(true)}>Étape suivante</button>
                    </div>
                </div>
            </section>
    
            <section className={`gift-second-section ${isFormVisible ? "second-section--visible" : ""} `}>
                <div className="gift-second-section__form">
                    <div className="gift-second-section__form--bloc">
                        <label htmlFor="client-infos-name">Votre nom et prénom</label>
                        <input type="text" name="" id="client-infos-name" value={senderName} onChange={(e) => setSenderName(e.target.value)}/>
                    </div>
                    <div className="gift-second-section__form--bloc">
                        <label htmlFor="client-infos-email">Votre adresse email</label>
                        <input type="text" name="" id="client-infos-email" value={senderMail} onChange={(e) => setSenderMail(e.target.value)}/>
                    </div>
                    <div className="gift-second-section__form--bloc">
                        <label htmlFor="reciever-infos-name">Nom du receveur</label>
                        <input type="text" name="" id="reciever-infos-name" value={recipientName} onChange={(e) => setRecipientName(e.target.value)}/>
                    </div>
                    <div className="gift-second-section__form--bloc-text">
                        <label htmlFor="client-infos-message">Entrez un message</label>
                        <textarea name="" id="client-infos-message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    <button className="gift-second-section__form--btn btn" onClick={() => handleCreateGiftCard()}>Valider</button>
                </div>
            </section>
            <Modal isOpen={modalIsOpen} onClose={() =>setModalIsOpen(false)} variant="staff">
                <div className="gift-modal">
                    <div className="gift-modal__container">
                        <label className="gift-modal__container--label" htmlFor="gift-title">Entrer un titre</label>
                        <input type="text" id="gift-title" value={newTitleCard} onChange={(e) => setNewTitleCard(e.target.value)}/>
                    </div>
                    <div className="gift-modal__container">
                        <label className="gift-modal__container--label" htmlFor="gift-text">Entrer un texte court</label>
                        <textarea name="" id="gift-text" className="gift-modal__container--textarea" value={newTextCard} onChange={(e) => setNewTextCard(e.target.value)}></textarea>
                    </div>
                    <div className="gift-modal__container">
                        <label className="gift-modal__container--img-label" htmlFor="gift-photo">Choisir une photo</label>
                        <PhotoInput className="contact-modal__container--img-input group-vue__photo-input" id="gift-photo" onChange={setNewImg}/>
                    </div>
                    <button type="button" className="btn" onClick={() => handleUpdatePhoto()}>Valider</button>
                </div>
            </Modal>
        </main>
    )
}