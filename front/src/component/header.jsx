import Nav from "./nav"
import Logo from "./logo"
import testLogo2 from "../assets/images/testLogo2.png"
import Modal from "./modal"
import { useState } from "react"
import "./header.scss"

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isBasketOpen, setIsBasketOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [query, setQuery] = useState("")

    return (
        <header className="header">
            <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
                <div className="modal__search-bar">
                    <input className="modal__search-bar--input"
                    type="text"
                    placeholder="Rechercher..."
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="modal__search-bar--close-btn fa-solid fa-xmark" type="button" 
                    onClick={() => setIsSearchOpen(false)}></button>
                </div>
                <div className="modal__results">
                    {query === "" ? (
                        <p>Tapez pour rechercher</p>
                    ) : (
                        <p>Résultats pour {query}</p>
                    )}
                </div>
            </Modal>

            <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} variant="center">
                <div className="modal__login">
                    <button className="modal__login--close-btn" type="button" 
                    onClick={() => setIsLoginOpen(false)}>Retour</button>
                    <h2 className="modal__login--title">Connexion administrateur</h2>
                    <div className="modal__login--input">
                        <input className="login-input"
                        type="text"
                        placeholder="email"
                        autoFocus
                        />
                        <input className="login-input"
                        type="text"
                        placeholder="Mot de passe"
                        />
                    </div>
                    <button className="modal__login--btn" >Se connecter</button>
                </div>
            </Modal>

            <Modal isOpen={isBasketOpen} onClose={() => setIsBasketOpen(false)} variant="center">
                <div className="modal__basket">
                    <h2 className="modal__basket--title">Vos achats</h2>
                    <div className="modal__basket--purchases">

                    </div>
                    <div className="modal__basket--btn">
                        <button className="basket-btn">Passer au paiment</button>
                        <button className="basket-btn" type="button" 
                        onClick={() => setIsBasketOpen(false)}>Continuer sur le site</button>
                    </div>    
                </div>
            </Modal>

            <div className="header__left">
                <button className="header__left--search-bar fa-solid fa-magnifying-glass links" onClick={() => setIsSearchOpen(true)}></button>
                <Nav text="Accueil" to="/" className="header__left--home links"/>
                <Nav text="Prestations" to="/prestations" className="header__left--services links"/>
                <Nav text="Évènement" to="/evenements" className="header__left--event links"/>
            </div>

            <div className="header__center">
                <Logo src={testLogo2} className="header__center--logo" onClick={() => setIsLoginOpen(true)}/>
            </div>

            <div className="header__right">
                <Nav text="Carte cadeau" to="/carte-cadeau" className="header__right--gift-card links"/>
                <button className="header__right--shopping-card fa-solid fa-basket-shopping links" onClick={() => setIsBasketOpen(true)}></button>
            </div>
        </header>
    )
}