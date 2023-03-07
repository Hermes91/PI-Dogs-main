import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllDogs, getTemp } from '../../store/actions/indexActions'
import Dog from "./dog"
import s from './dogs.module.css'
import Pagination from '../home/pagination'
import Home from '../home/home'
import Loading from '../home/loading'


export default function Dogs() {
    let dogs = useSelector((state) => state.dogs)
    let dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPage] = useState(8)


    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemp())
        setTimeout(() => {
            setLoading(false)
        }, "2500")
    }, [dispatch])


    const lastPostIndex = currentPage * postPage
    const firstPostIndex = lastPostIndex - postPage
    var totalPages = Math.ceil(dogs.length / postPage)

    function pagination() {
        return dogs.slice(firstPostIndex, lastPostIndex)
    }

    const nextPage = () => {
        if (currentPage < totalPages)
            setCurrentPage(currentPage + 1)
    }

    const previousPage = () => {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1)
    }

    return (<div className={s.dogsContainer}>
        <div className={s.util}>

            <div className={s.pag}>
                <button onClick={previousPage} className={s.prevNext}>Previous</button>
                <Pagination
                    totalPost={dogs.length}
                    postPerPage={postPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage} />
                <button onClick={nextPage} className={s.prevNext}>Next</button>
            </div>
            <div>
                <Home />
            </div>
        </div>


        {loading ? <div>
            <Loading />
        </div> :
            <div className={s.cardsGrid}>
                {dogs && pagination().map(dog => {
                    return <Dog
                        key={dog.id}
                        data={dog}
                        image={dog.img} />
                })}
            </div>}
    </div>)
}