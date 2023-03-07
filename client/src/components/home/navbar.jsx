import React from "react"
import { Link } from "react-router-dom"
import s from './navbar.module.css'
import SearchBar from "./searchBar"


export default function NavBar() {
    return (
        <div className={s.barra}>
            <ul className={s.nav}>
                <li>
                    <Link to="/">HOME</Link>
                </li>
                <li>
                    <Link to="/AddDog">Add Dogs</Link>
                </li>
                <li >
                    <Link to="/About">About </Link>
                </li>
            </ul>
            <SearchBar />
        </div>
    )
}