import Nav from "./nav"
import Logo from "./logo"
import logo1 from "../assets/images/logo1.jpg"
import SearchBar from "./searchBar"
import ShoppingCard from "./shoppingCard"
import "./header.scss"

export default function Header() {
    return (
        <header className="header">
            <div className="header__left">
                <SearchBar className="header__left--search-bar"/>
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