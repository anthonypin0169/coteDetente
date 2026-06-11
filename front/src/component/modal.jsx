import { useState } from "react"
import "./modal.scss"

export default function Modal({isOpen, onClose}) {
    const [query, setQuery] = useState("")
    if (!isOpen) return null

    return (
        <div className="overlay" onClick={onClose}>

                <form className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__search-bar">
                        <input className="modal__search-bar--input"
                        type="text"
                        placeholder="Rechercher..."
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        />
                        <button className="modal__search-bar--close-btn fa-solid fa-xmark" type="button" onClick={onClose}></button>
                    </div>
                    <div className="modal__results">
                        {query === "" ? (
                            <p>Tapez pour rechercher</p>
                        ) : (
                            <p>Résultats pour {query}</p>
                        )}
                    </div>
                </form>
        </div>
    )
}