import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ASCENDENTE, DESCENDENTE } from "../../constantes/sort";
import { weightOrder, breedOrder, filteredCreated, filteredTemp, getAllDogs, getTemp } from "../../store/actions/indexActions";
import { FaUndoAlt } from 'react-icons/fa'
import s from './home.module.css'


export default function Filtros({ setorder, setweight }) {


    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)


    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemp())
    }, [dispatch])

    function OrderByBreed(e) {
        dispatch(breedOrder(e.target.value));
        setorder(e.target.value);
    }

    function OrderByWeight(e) {
        dispatch(weightOrder(e.target.value))
        setweight(e.target.value)
    }

    function ApiOrDb(e) {
        dispatch(filteredCreated(e.target.value))

    }

    function TempFilter(e) {
        dispatch(filteredTemp(e.target.value))
    }

    function handleClick() {
        window.location.reload(false)
    }



    return (
        <div className={s.filterWrap}>
            <div className={s.order}>
                <h4>Filter dogs </h4>
                <select onChange={(e) => ApiOrDb(e)} name="apiORdb" >
                    <option value="All" >All</option>
                    <option value="api">Api</option>
                    <option value="database">Db</option>
                </select>

                <select onChange={(e) => TempFilter(e)} name="tempFilter" defaultValue="DEFAULT">
                    <option value="DEFAULT" disabled>Temperaments</option>
                    {temperaments.map((t) => (
                        <option value={t.name} key={t.id}>
                            {t.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={s.order}>
                <select onChange={OrderByBreed} defaultValue={'DEFAULT'} name="orderAZ">
                    <option value="DEFAULT" disabled>Order by Breed...</option>
                    <option value={ASCENDENTE}>A-z</option>
                    <option value={DESCENDENTE}>Z-a</option>
                </select>


                <select onChange={OrderByWeight} defaultValue={'DEFAULT'} name="weight" >
                    <option value="DEFAULT" disabled>Order by Weight...</option>
                    <option value={ASCENDENTE}>0-1</option>
                    <option value={DESCENDENTE}>1-0</option>
                </select>
                <h2 onClick={handleClick}><FaUndoAlt/> </h2>
            </div>

        </div>
    )

}