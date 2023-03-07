import React from "react";
import { Link } from "react-router-dom"
import paw from '../resources/pawButton.png'
import s from "./home/landing.module.css"


export default function Landing() {

    return (
        <div className={s.background}>
            <div className={s.enter} >
                <h1>Dogs PI</h1>

                <Link to="/dogs" >
                    <img src={paw} alt="Dogs logo" className={s.paw} />
                    <h2>Entrar</h2>
                </Link>
            </div>
        </div>
    )
}
