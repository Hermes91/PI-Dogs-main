import axios from 'axios'
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Loading from '../home/loading';
import s from './dogDetail.module.css'

export default function DogDetail() {

    let { id } = useParams()
    const [dog, setDog] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:3001/dogs/${id}`)
            .then((res) => {
                setDog(res.data)
            })
        return () => {
            setDog(null)
        }
    }, [id])


    return (<div>


        <div className={s.backButton}>
            <Link to={`/dogs`}>
                <h3>Back to Dogs</h3>
            </Link>
        </div>


        {dog ?
            < div className={s.container} >
                <div className={s.cardDetail}>
                    <div className={s.nameDetail}>
                        <h1>{dog.name}</h1>
                    </div>
                    <div className={s.cardInfo}>
                        <div className={s.imgContainer} >
                            <img src={`${dog.img}`} alt="perro imagen"></img>
                        </div>
                        <div className={s.dataContainer}>
                            <div className={s.data2}>
                                <h3>height: {dog.height} cm</h3>
                                <h3>min. weight: {dog.min_weight} kg</h3>
                                <h3>max. weight: {dog.max_weight} kg</h3>
                                <h3>lifespan : {dog.years}</h3>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                    <div className={s.temperament}>
                        <h3>Temperaments:</h3>
                        <h3 className={s.tempList}>{Array.isArray(dog.temperament) ? dog.temperament.map(t => <div>{t.name}</div>) : dog.temperament}</h3>
                    </div>
                </div>
            </div> : <div><Loading /></div>
        }

    </div >)

}