import React from 'react';
import { Link } from 'react-router-dom';
import './dogs.scss';



export default function Dog({ data, image }) {
    return <div className='card'>
        <figure>
            <div > <img src={`${image}`} alt="perro imagen" /></div>
            <figcaption>
                <h3>{data.name}</h3>
                <div className="cardInfo">
                    {data.min_weight ? <h4> min weight: {data.min_weight} kg</h4> : null}
                    {data.max_weight ? <h4>max weight: {data.max_weight} kg</h4> : null}
                </div>

                <div className="temperaments">
                    <h4>Temperaments:</h4>
                    <span>{data.temperaments}</span>
                </div>
                <div>
                    <Link to={`dogDetail/${data.id}`}>
                        <button>
                            Read more
                        </button>
                    </Link>
                </div>
            </figcaption>
        </figure>
    </div>
}