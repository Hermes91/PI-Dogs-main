import React from "react";
import s from './loading.module.css'


export default function Loading() {
    return (
        <div className={s.container}>
            <div >
                <img className={s.loading} src='https://media.tenor.com/QPGtCkyw86kAAAAC/dog-running.gif' alt="loading" />
            </div>
            <span>loading...</span>
        </div>
    )
}