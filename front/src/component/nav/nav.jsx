import {NavLink} from "react-router-dom"
import "./nav.scss"

export default function Nav({text, to, className}) {
    return (
     <NavLink to={to} className={({isActive}) => `links ${className ?? ""} ${isActive ? "active" : ""}`.trim()}
>{text}</NavLink>
    )
}