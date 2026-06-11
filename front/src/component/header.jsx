import Nav from "./nav"
import Logo from "./logo"
import logo1 from "../assets/images/logo1.jpg"
import Modal from "./modal"
import ShoppingCard from "./shoppingCard"
import { useState } from "react"
import "./header.scss"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="header">
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}/>

            <div className="header__left">
                <button className="header__left--search-bar fa-solid fa-magnifying-glass" onClick={() => setIsOpen(true)}></button>
                <Nav text="Accueil" to="/" className="header__left--home"/>
                <Nav text="Prestations" to="/prestations" className="header__left--services"/>
                <Nav text="Évènement" to="/evenements" className="header__left--event"/>
            </div>

            <div className="header__center">
                <Logo src={logo1} className="header__center--logo"/>
            </div>

            <div className="header__right">
                <Nav text="Carte cadeau" to="/carte-cadeau" className="header__right--gift-card"/>
                <ShoppingCard className="header__right--shopping-card"/>
            </div>
        </header>
    )
}