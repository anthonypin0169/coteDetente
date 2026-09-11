import {NavLink} from "react-router-dom"
import "./nav.scss"

export default function Nav({text, to, className, onClick}) {
    return (
     <NavLink to={to} className={({isActive}) => `links ${className ?? ""} ${isActive ? "active" : ""}`.trim()} onClick={onClick}
>{text}</NavLink>
    )
}