import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Modal from "@/component/modal/modal"
import NavLink from "@/component/nav/nav"
import { apiFetch } from "@/utils/api"
import "./HighlightCards.scss"

export default function HighlightCards() {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const token = useSelector((state) => state.auth.token)

    const [selectedCardId, setSelectedCardId] = useState("")
    const [highlightCardList, setHighlightCardList] = useState([])
    const [ frontTitleState,setFrontTitleState] = useState("")
    const [ frontTextState,setFrontTextState] = useState("")
    const [ backTitleState,setBackTitleState] = useState("")
    const [ backTextState,setBackTextState] = useState("")
    const [ photoUrlState,setPhotoUrlState] = useState([])

    useEffect(()=>{
        const loadHighlightCards = async () => {
            try{
                const { data } = await apiFetch("/api/highlight-cards")

                setHighlightCardList(data)
            }catch(error){
                return(error.message)
            }
        }
        loadHighlightCards()
    },[])

    const modifyHighlightCards = async () => {

            const formData = new FormData()
            formData.append("frontTitle", frontTitleState)
            formData.append("frontText", frontTextState)
            formData.append("backTitle", backTitleState)
            formData.append("backText", backTextState)
            formData.append("photo", photoUrlState)

            try{
            const { ok, data: updatedMember } = await apiFetch(`/api/highlight-cards/${selectedCardId}`, {
                method : "PUT",
                body : formData,
                token
            })

            if(ok){
                    setHighlightCardList(prev => prev.map(highlightCard =>
                        highlightCard._id === updatedMember._id ? updatedMember : highlightCard
                    ))
                }
            }catch(error){
                return(error.message)
            }
        }

        const [highlightModalIsOpen, setHighlightModalIsOpen] = useState(false)
        const [highlightViewMode, setHighlightViewMode] = useState("list")

    return (
        <section className="home__services">
            <div className="home__services--card-group">
                {highlightCardList.map(highlightCard => (
                    <div className="card" key={highlightCard._id}>
                        <div className="card__front">
                            <img src={highlightCard.photoUrl} alt={highlightCard.frontTitle} className="card__front--img"/>
                            <h2 className="card__front--title">{highlightCard.frontTitle}</h2>
                            <h3 className="card__front--text">{highlightCard.frontText}</h3>
                        </div>
                        <div className="card__back">
                            <h2 className="card__back--title">{highlightCard.backTitle}</h2>
                            <h3 className="card__back--text">{highlightCard.backText}</h3>
                            <button className="btn">Découvrir</button>
                        </div>
                    </div>
                ))}
            </div>
            {isAuthenticated &&
                <button onClick={() => setHighlightModalIsOpen(true)} className="home__services--modify-btn btn">Modifier</button>
            }
        
            <NavLink text="Découvrez nos prestations" to="/prestations" className="home__services--link" />

            <Modal isOpen={highlightModalIsOpen} onClose={() => setHighlightModalIsOpen(false)} variant ="modify">
                {highlightViewMode === "list" ?
                    <div className="highlight-modal-list-vue">
                        {highlightCardList.map(highlightCard => (
                            <div className="modal-card" key={highlightCard._id} onClick={() => {
                                setSelectedCardId(highlightCard._id)
                                setHighlightViewMode("edit")
                                setFrontTitleState(highlightCard.frontTitle)
                                setFrontTextState(highlightCard.frontText)
                                setBackTitleState(highlightCard.backTitle)
                                setBackTextState(highlightCard.backText)
                            }}>
                                <div className="modal-card__content">
                                    <h2 className="modal-card__content--title">{highlightCard.frontTitle}</h2>
                                    <h3 className="modal-card__content--text">{highlightCard.frontText}</h3>
                                </div>
                                <img src={highlightCard.photoUrl} alt={highlightCard.frontTitle} className="modal-card__img"/>
                            </div>
                        ))}
                    </div>
                :
                    <div className="highlight-modal-card-vue">
                        <div className="highlight-modal-card-vue__content">
                            <div className="highlight-modal-card-vue__content--front">
                                <h3 className="highlight-h3">Face recto de la carte.</h3>
                                <label htmlFor="highlight-photo" className="highlight-label">Choisir une photo :</label>
                                <input type="file" id="highlight-photo"  className="highlight-upload" onChange={(e) => setPhotoUrlState(e.target.files[0])} />

                                <label htmlFor="highlight-front-title" className="highlight-label">Titre :</label>
                                <input type="text" id="highlight-front-title" className="highlight-input"  onChange={(e) => setFrontTitleState(e.target.value)} value={frontTitleState}/>

                                <label htmlFor="highlight-front-text" className="highlight-label">Texte :</label>
                                <input type="text" id="highlight-front-text" className="highlight-input" onChange={(e) => setFrontTextState(e.target.value)} value={frontTextState}/>
                            </div>

                            <div className="highlight-modal-card-vue__content--back">
                                <h3 className="highlight-h3">Face verso de la carte</h3>
                                <label htmlFor="highlight-back-title" className="highlight-label">Titre :</label>
                                <input type="text" id="highlight-back-title" className="highlight-input" onChange={(e) => setBackTitleState(e.target.value)} value={backTitleState}/>

                                <label htmlFor="highlight-back-text" className="highlight-label">Texte :</label>
                                <input type="text" id="highlight-back-text" className="highlight-input" onChange={(e) => setBackTextState(e.target.value)} value={backTextState}/>
                            </div>
                        </div>
                        <div className="highlight-modal-card-vue__btn-container">
                            <button onClick={() => setHighlightViewMode("list")}className="btn">Retour</button>
                            <button onClick={() => {modifyHighlightCards(); setHighlightModalIsOpen(false)}}className="btn">Valider</button>
                        </div>
                    </div>
                }
            </Modal>
        </section>
    )
}
