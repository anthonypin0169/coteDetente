import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Carrousel from "@/component/carrousel/carrousel"
import Modal from "@/component/modal/modal"
import { apiFetch } from "@/utils/api"
import "./CompanyProfile.scss"

export default function CompanyProfile({ carrouselInstitut }) {

    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
    const token = useSelector((state) => state.auth.token)

    const [titleState, setTitleState] = useState("")
    const [paragraphState, setParagraphState] = useState([])

    const [editModalIsOpen,setEditModalIsOpen] = useState(false)
    const [editTitle, setEditTitle] = useState("")
    const [editParagraph, setEditParagraph] = useState("")

    useEffect (() => {
        const loadText = async () => {
            try{
                const { ok, data } = await apiFetch("/api/content/company-profile")

                if(ok){
                    if(!data){
                        throw new Error ("erreur dans la récuperation des textes")
                    }

                    setTitleState(data.title)
                    setParagraphState(data.paragraphs)
                }

            }catch(error){
                    return(error.message)
            }
        }
        loadText()
    },[])

    const handleTextUpdate = async () => {
        try{
            const { ok } = await apiFetch("/api/content/company-profile", {
                method : "PUT",
                body : {
                    "title": editTitle,
                    "paragraphs": editParagraph.split("\n\n")
                },
                token
            })

            if(ok){
                setTitleState(editTitle)
                setParagraphState(editParagraph.split("\n\n"))

                setEditTitle("")
                setEditParagraph("")
                setEditModalIsOpen(false)
            }
        }catch(error){
            return(error.message)
        }
    }

    return (
        <>
            <section className="home__company-profile">
                <h2 className="home__company-profile--h2" >{titleState}</h2>
                {isAuthenticated ? <button onClick={() => setEditModalIsOpen(true)} className="home__company-profile--btn btn">Modifier</button> : null}

                <div className="home__company-profile--content">
                    {paragraphState.map((para, index) => (
                        <p key={index} className="group__company-text">{para}</p>
                    ))}
                    <Carrousel images={carrouselInstitut.map( p => p.url )} mode="auto" className="company-carrousel-container"/>
                </div>
            </section>

            <Modal isOpen={editModalIsOpen} onClose={() => setEditModalIsOpen(false)} variant ="modify">
                <div className="modal__edit-modal">
                    <div className="modal__edit-modal--bloc1">
                        <label htmlFor="edit-title" className="edit-modal-title">Entrez un titre :</label>
                        <input id="edit-title" type="text" className="title-input" onChange={(e) => setEditTitle(e.target.value)} value={editTitle}/>
                    </div>

                    <div className="modal__edit-modal--bloc2">
                        <label htmlFor="edit-paragraph" className="edit-modal-title">Ecrivez un texte :</label>
                        <textarea id="edit-paragraph" className="textarea-paragraph" onChange={(e) => setEditParagraph(e.target.value)} value={editParagraph}/>
                    </div>

                    <div className="modal__edit-modal--btn">
                        <button onClick={() => setEditModalIsOpen(false)} type="button" className="btn">Retour</button>
                        <button onClick={() => handleTextUpdate()} type="button" className="btn">Valider</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
