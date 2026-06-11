import React from "react"
import {NavLink} from "react-router-dom"
import "./nav.scss"

export default function Nav({text, to, className}) {
    return (
     <NavLink to={to} className={({isActive}) => `${className ?? "nav__link"}${isActive ? " active" : ""}`}>{text}</NavLink>
    )
}