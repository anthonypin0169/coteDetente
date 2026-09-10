import NavLink from "../nav/nav"
import Logo from "../logo/logo"
import testLogo2 from "../../assets/images/testLogo2.webp"
import Modal from "../modal/modal"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, clearError } from "@/store/authSlice"
import { apiFetch } from "@/utils/api"
import { getGiftCardDraft } from "@/utils/giftCardDraft"
import "./header.scss"

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isBasketOpen, setIsBasketOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [passwordState, setPasswordState] = useState("")
    const [emailState, setEmailState] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const error = useSelector((state) => state.auth.error)

    /* Panier : avancement de la carte cadeau */
    const [basketDraft, setBasketDraft] = useState(null)

    const handleOpenBasket = () => {
        setBasketDraft(getGiftCardDraft())
        setIsBasketOpen(true)
    }

    const handleGoToPayment = () => {
        setIsBasketOpen(false)
        navigate("/carte-cadeau")
    }

    /* Recherche de prestations */
    const [searchablePrestations, setSearchablePrestations] = useState([])

    useEffect(() => {
        const loadSearchablePrestations = async () => {
            try{
                const { data } = await apiFetch("/api/prestations/searchable")
                if(data) setSearchablePrestations(data)
            }catch(error){
                (error.message)
            }
        }
        loadSearchablePrestations()
    },[])

    const searchResults = query.trim() === ""
        ? []
        : searchablePrestations.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))

    const handleLogin = () => {
        dispatch(loginUser({"email" : emailState, "password" : passwordState}))
            .then((result)=>{
                if (result.meta.requestStatus === "fulfilled") {
                    setIsLoginOpen(false)
            }
        })
    }

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
                    {query.trim() === "" ? (
                        <p>Tapez pour rechercher</p>
                    ) : searchResults.length === 0 ? (
                        <p>Aucune prestation trouvée</p>
                    ) : (
                        <ul className="modal__results--list">
                            {searchResults.map((presta) => (
                                <li key={presta._id}>
                                    <Link to={presta.route} className="modal__results--link" onClick={() => {setIsSearchOpen(false); setQuery("")}}>
                                        {presta.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <nav className="modal__search-links">
                    <NavLink text="Accueil" to="/" className="modal__search-links--modal-L links"/>
                    <NavLink text="Prestations" to="/prestations" className="modal__search-links--modal-L links"/>
                    <NavLink text="Évènements" to="/evenements" className="modal__search-links--modal-L links"/>
                    <NavLink text="Carte cadeau" to="/carte-cadeau" className="modal__search-links--modal-L links"/>
                </nav>
            </Modal> 

            <Modal isOpen={isLoginOpen} onClose={() => {setIsLoginOpen(false); dispatch(clearError())}} variant="center">
                <div className="modal__login">
                    <button className="modal__login--close-btn" type="button" 
                    onClick={() => {setIsLoginOpen(false); dispatch(clearError())}}>Retour</button>
                    <h2 className="modal__login--title">Connexion administrateur</h2>
                    <div className="modal__login--input">
                        <input className="login-input"
                        type="text"
                        placeholder="email"
                        autoFocus
                        value={emailState}
                        onChange={(e) => setEmailState(e.target.value)}
                        />
                        <input className="login-input"
                        type="password"
                        placeholder="Mot de passe"
                        value={passwordState}
                        onChange={(e) => setPasswordState(e.target.value)}
                        />
                    </div>
                    <button className="btn" onClick={handleLogin} type="button">Se connecter</button>
                    <div className="modal__login--error-msg">{error ? <p>{error}</p> : null}</div>
                </div>
            </Modal>

            <Modal isOpen={isBasketOpen} onClose={() => setIsBasketOpen(false)} variant="center">
                <div className="modal__basket">
                    <h2 className="modal__basket--title">Vos achats</h2>
                    <div className="modal__basket--purchases">
                        {basketDraft && basketDraft.price ?
                            <p>Carte cadeau — {basketDraft.price} €{basketDraft.recipientName && ` pour ${basketDraft.recipientName}`}</p>
                        :
                            <p>Votre panier est vide</p>
                        }
                    </div>
                    <div className="modal__basket--btn">
                        {basketDraft && basketDraft.price &&
                            <button className="btn" type="button" onClick={handleGoToPayment}>Passer au paiment</button>
                        }
                        <button className="btn" type="button"
                        onClick={() => setIsBasketOpen(false)}>Continuer sur le site</button>
                    </div>
                </div>
            </Modal>

            <div className="header__left">
                <button type="button" aria-label="Rechercher" className="header__left--search-bar fa-solid fa-magnifying-glass links" onClick={() => setIsSearchOpen(true)}></button>
                <NavLink text="Accueil" to="/" className="header__left--home links"/>
                <NavLink text="Prestations" to="/prestations" className="header__left--services links"/>
                
            </div>

            <div className="header__center">
                <Logo src={testLogo2} alt={"coté-détente"} className="header__center--logo" onClick={() => setIsLoginOpen(true)} width={622} height={401}/>
            </div>

            <div className="header__right">
                <NavLink text="Évènements" to="/evenements" className="header__left--event links"/>
                <NavLink text="Carte cadeau" to="/carte-cadeau" className="header__right--gift-card links"/>
                <button type="button" aria-label="Voir le panier" className="header__right--shopping-card fa-solid fa-basket-shopping links" onClick={handleOpenBasket}></button>
            </div>
        </header>
    )
}