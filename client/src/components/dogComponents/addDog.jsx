
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTemp, addDogs } from '../../store/actions/indexActions';
import { Link } from 'react-router-dom';
import s from './addDog.module.css'
import dogForm from '../../resources/dogAdd.png'
import Dog from './dog';

function validaciones(input) {
    const error = {}
    if (!input.name) { error.name = " Add a name to the dog's breed" }
    if (!/^[A-Za-z ]+$/i.test(input.name)) { error.name = 'only alpha characters allowed' }
    if (input.name.length > 20) { error.name = "characters limit reached" }
    if (input.height < 1 || input.height > 99 || !/^[1-9]\d*(,\.\d+)?$/.test(input.height)) { error.height = ' The height must be a number between 1 and 99' };
    if (input.min_weight < 1 || input.min_weight > 98 || !/^[1-9]\d*(,\.\d+)?$/.test(input.min_weight)) { error.min_weight = ' The minimum weight must be a number between 1 and 98' };
    if (input.max_weight < 2 || input.max_weight > 99 || !/^[1-9]\d*(,\.\d+)?$/.test(input.max_weight)) { error.max_weight = ' The maximum weight must be a number between 2 and 99' };
    if (parseInt(input.min_weight) >= parseInt(input.max_weight)) { error.min_weight = " The min_weight can't be bigger than the max_weight" }
    if (input.years < 1 || input.years > 20 || !/^[1-9]\d*(,\.\d+)?$/.test(input.years)) { error.years = ' The life span must be a number between 1 and 20' };
    if (input.temperaments.length < 1) { error.temperaments = ' Add at least one temper' };
    return error;
}


export default function AddDog() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments)
    const [error, setError] = useState({})



    const [dog, setDog] = useState({
        name: '',
        height: '',
        min_weight: '',
        max_weight: '',
        years: '',
        temperaments: [],
        img: 'https://i.pinimg.com/originals/8e/a9/15/8ea915c2950a58cad7e184b94d6d4bac.jpg',
    })


    function onInputChange(e) {
        setDog(() => {
            const newDog = {
                ...dog,
                [e.target.name]: e.target.value
            }
            const validate = validaciones(newDog);
            setError(validate)
            return newDog
        })
    }

    useEffect(() => {
        dispatch(getTemp())
    }, [dispatch])


    function handleSelect(e) {
        if (!dog.temperaments.includes(e.target.value)) {
            setDog({
                ...dog,
                temperaments: [...dog.temperaments, e.target.value]
            })
        }
    }

    function onSubmit(e) {
        e.preventDefault()
        dispatch(addDogs(dog))
        alert("dog successfully added!")
        setDog({
            name: '',
            height: '',
            min_weight: '',
            max_weight: '',
            years: '',
            temperaments: [],
            img: '',
        })
        history.push('/dogs')
    }



    function deleteTemp(e) {
        setDog({
            ...dog,
            temperaments: dog.temperaments.filter((t) => t !== e),
        })
    }

    return (
        <div>

            <div className={s.backButton}>
                <Link to={`/dogs`}>
                    <h3>Back to Dogs</h3>
                </Link>
            </div>

            <div className={s.container}>
                <div className={s.create}>
                    <h2>Create your own breed</h2>
                    <div className={s.customDog}>
                        <div className={s.customImg}>
                            <img src={dog.img} />
                        </div>
                        <div className={s.customName}>
                            {dog.name}
                        </div>
                        <div className={s.customInfo}>
                            <li>height: {dog.height ? dog.height + " cm" : "undefined"}</li>
                            <li>min. weight: {dog.min_weight ? dog.min_weight + " Kgs." : "undefined"} </li>
                            <li>max. weight: {dog.max_weight ? dog.max_weight + " Kgs." : "undefined"} </li>
                            <li>lifespan: {dog.years ? dog.years + " years" : "undefined"} </li>
                            <h4>  Temperament:</h4>
                            <div className={s.customTemp}>
                                {dog.temperaments?.map((t, idx) => (
                                    <div key={idx}>
                                        <li>{t}</li>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={e => onSubmit(e)}>
                    <div className={s.leftCon}>
                        <div className={s.newInput}>
                            <label htmlFor=''>Name:</label>
                            <input onInput={onInputChange} name='name' type="text" maxlength="20"
                                placeholder="Add breed's name" value={dog.name} />
                            {error.name && (
                                <span >  <br />{error.name}</span>
                            )}
                        </div>

                        <div className={s.newInput}>
                            <label htmlFor=''>Height:</label>
                            <input onChange={onInputChange} name='height' type="number" min="1" max="99"
                                placeholder="Cm" value={dog.height} />
                            {error.height && (
                                <span >  <br />{error.height}</span>
                            )}
                        </div>

                        <div className={s.newInput}>
                            <label htmlFor='min_weight'>Weight:</label>
                            <input onChange={onInputChange} name='min_weight' type="number" min="1" max="98"
                                placeholder="Min Kg" value={dog.min_weight} />
                            <label>-</label>
                            <input onChange={onInputChange} name='max_weight' type="number" min="1" max="99"
                                placeholder="Max Kg" value={dog.max_weight} />
                            {error.min_weight && (
                                <span >  <br />{error.min_weight}</span>
                            )}
                            {error.max_weight && (
                                <span >  <br />{error.max_weight}</span>
                            )}
                        </div>

                        <div className={s.newInput}>
                            <label htmlFor='lifespan'>Lifespan:</label>
                            <input onChange={onInputChange} name='years' type="number" min="1" max="20"
                                placeholder="n° of years" value={dog.years} />
                            {error.years && (
                                <span >  <br />{error.years}</span>
                            )}
                        </div>

                        <div className={s.newInput}>
                            <label htmlFor='img'>Image:</label>
                            <input onChange={onInputChange} name='img' type="url" defaultValue='https://i.pinimg.com/originals/8e/a9/15/8ea915c2950a58cad7e184b94d6d4bac.jpg'
                                placeholder="add url" value={dog.img} />
                        </div>
                    </div>

                    <div className={s.tempContainer}>
                        <h4>Add a temperament</h4>

                        <select onChange={handleSelect} defaultValue="DEFAULT">
                            <option value="DEFAULT" disabled>Pick Temperaments</option>
                            {temperaments?.map((t) => (
                                <option value={t.name} key={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>

                        <div className={s.temps}>
                            <ul>
                                {dog.temperaments.map((t, idx) => (
                                    <div key={idx}>
                                        <span onClick={() => deleteTemp(t)}>
                                            <li>{t}</li>
                                        </span>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {!dog.name || !dog.img || dog.temperaments < 1 || error.min_weight || error.height || error.name ? (
                        <button type='submit' className={s.submit} disabled>Submit</button>
                    ) : (<button type="submit" className={s.submit} >Submit</button>)}
                </form>
            </div>
        </div>
    )
}


