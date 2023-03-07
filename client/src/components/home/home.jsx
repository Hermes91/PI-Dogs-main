import { useDispatch, useSelector } from "react-redux";
import { React, useEffect, useState } from 'react'
import { getAllDogs, getTemp } from "../../store/actions/indexActions";
import Filtros from "./filterOrder";


export default function Home() {

    const allTemp = useSelector((state) => state.temperaments)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemp())
    }, [dispatch])


    const [, setOrder] = useState('')
    const [, setWeight] = useState('')
    const [, setCurrentPage] = useState(1)

    return (
        <div>
            {<Filtros temperament={allTemp} setorder={setOrder} setweight={setWeight} setCurrentPage={setCurrentPage} />}
        </div>
    )
}