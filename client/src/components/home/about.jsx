import s from './about.module.css'
import paw from '../../resources/pawButton.png'
import { FaJs, FaHtml5, FaCss3Alt, FaReact, FaSass, FaNodeJs, FaLinkedin, FaEnvelope, } from 'react-icons/fa'
import { DiPostgresql, DiGithubBadge, } from "react-icons/di";
import { SiExpress } from "react-icons/si";
import { Link } from "react-router-dom"

export default function About() {

    return (
        <div>
            <div className={s.aboutConteiner}>
                <h2>about PI-dogs</h2>
                <p>
                    This project was created as part of my fullstack developer education at <a href='https://www.soyhenry.com/'>Henry bootcamp</a>.
                    In order to map all the different breeds, this app consumes data from <a href='https://thedogapi.com/'>the dogs API</a>. It is also possible to create a new dog breed, entering a name, weight, height, life span and temperaments.
                </p>
                <h4>
                    Used technologies:
                </h4>
                <ul className={s.icons}>
                    <li><FaJs /></li>
                    <li><FaHtml5 /></li>
                    <li><FaCss3Alt /></li>
                    <li><FaReact /></li>
                    <li><FaSass /></li>
                    <li><FaNodeJs /></li>
                    <li><DiPostgresql /></li>
                    <li><SiExpress /></li>
                </ul>
                <h4>
                    Contact me:
                </h4>
                <ul className={s.icons2}>
                    <li><a href="mailto:hermeschacon@live.com.ar"><FaEnvelope /></a></li>
                    <li><a href='https://github.com/Hermes91' target="_blank"><DiGithubBadge /></a></li>
                    <li><a href='https://www.linkedin.com/in/hermesch/' target="_blank"><FaLinkedin /></a></li>
                </ul>
                <hr />
                <Link to="/"> <img src={paw} alt="Dogs logo" className={s.paw} /></Link>
            </div>
        </div>
    )
}