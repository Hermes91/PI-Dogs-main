import React from "react";

import s from '../dogComponents/dogs.module.css'


const Pagination = ({ totalPost, postPerPage, setCurrentPage, currentPage }) => {
    let pages = []


    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className={s.pagination}>
            {pages.map((page, idx) => {
                return <div key={idx}>
                    <button
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? 'active' : ''}>
                        {page}
                    </button>
                </div>
            })}
        </div>
    )
}

export default Pagination