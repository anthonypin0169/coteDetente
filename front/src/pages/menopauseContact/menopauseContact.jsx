import { apiFetch } from "@/utils/api"
import "./menopauseContact.scss"
import { useState } from "react"
import SeoHead from "@/component/seoHead/seoHead"

export default function MenopauseContact () {

    const [fullName ,setFullName] = useState("")    
    const [email ,setEmail] = useState("")
    const [phone ,setPhone] = useState("")
    const [message ,setMessage] = useState("")
    const [messageSent, setMessageSent] = useState(false)
    const [error, setError] = useState(false)

    const handleSendMessage = async () => {
        setError(false)
        try{
            const { ok } = await apiFetch("/api/menopause",{
                method : "POST",
                body : {
                    fullName : fullName,
                    email : email,
                    phone : phone,
                    message : message
                }
            })

            if(ok){
                setFullName("")
                setEmail("")
                setPhone("")
                setMessage("")
                setMessageSent(true)
            }else{
                setError(true)
            }

        }catch{
            setError(true)
        }
    }


    return(
        <main className={`main-menopause-contact ${messageSent ? "main-menopause-contact-sended-message" : ""}`}>
            <h1 className="main-menopause-contact__h1">Prenez contact pour un suivi ménopause</h1>
            <h2 className="main-menopause-contact__h2">15 minutes offertes</h2>
            <SeoHead title="Ménopause" description="Page de contact pour un suivi ménopause personnalisé."/>
            {error && 
                <div className="menopause-contact-send-message">Erreur dans l'envoi de la demande, veuillez réessayer.</div>
            }
            {messageSent ?
                <div className="menopause-contact-send-message">Demande envoyée !</div>
            :
                <form action="" className="menopause-contact-form">
                    <div className="menopause-contact-form__label-bloc">
                        <label htmlFor="menopause-contact-input-1">Votre Nom - Prénom</label>
                        <input type="text" id="menopause-contact-input-1" className="menopause-contact-form__label-bloc--input" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                    </div>
                    <div className="menopause-contact-form__label-bloc">
                        <label htmlFor="menopause-contact-input-2">Votre adresse mail</label>
                        <input type="email" id="menopause-contact-input-2" className="menopause-contact-form__label-bloc--input" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="menopause-contact-form__label-bloc">
                        <label htmlFor="menopause-contact-input-3">Votre numéro de téléphone</label>
                        <input type="tel" id="menopause-contact-input-3" className="menopause-contact-form__label-bloc--input" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div className="menopause-contact-form__label-text-bloc">
                        <label htmlFor="menopause-contact-textaera">Votre message</label>
                        <textarea name="menopause-contact-textaera" id="menopause-contact-textaera" className="menopause-contact-form__label-text-bloc--textaera" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    <button className="menopause-contact-form__btn btn" type="button" disabled={!fullName.trim() || !email.trim() || !phone.trim()} onClick={() => handleSendMessage()}>Envoyer la demande</button>
                </form>
            }
        </main>
    )
}