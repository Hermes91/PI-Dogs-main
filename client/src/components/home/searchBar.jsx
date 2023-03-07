import { useState } from 'react'
import { dogsBreedbyName, getAllDogs } from '../../store/actions/indexActions'
import { useDispatch } from 'react-redux'
import './searchBar.css'
import { FaSearch } from 'react-icons/fa'
import Dogs from '../dogComponents/dogs'

export default function SearchBar() {
    const [search, setSearch] = useState('')
    const [flag, setFlag] = useState(false)


    let dispatch = useDispatch()
    function onInputChange(e) {
        if (e.target.value) {
            setSearch(e.target.value)
            setFlag(true)
            dispatch(dogsBreedbyName(search))
        } else {
            setSearch(e.target.value)
            dispatch(getAllDogs())
        }
    }


    <Dogs
        setFlag={setFlag}
        flag={flag}
    />


    return <div className="box">
        <div >
            <input type="text" placeholder='  search dog' onChange={onInputChange} value={search} className="input" />
            <i ><FaSearch /></i>
        </div>
    </div>
}