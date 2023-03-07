import axios from 'axios'
import { FETCH_DOGS, SEARCH_DOGS_BREED, ORDER_BY_BREED, ORDER_BY_WEIGHT, GET_TEMPERAMENTS, DB_OR_API, FILTER_TEMP, } from './actions'


/*-------todos los perros-------*/
export function getAllDogs() {
    return async function (dispatch) {
        try {
            const json = await axios.get('/dogs');
            return dispatch({ type: FETCH_DOGS, payload: json.data })
        } catch (error) {
            console.log(error);
        }
    }
}

/*-------perros por nombre-------*/
export function dogsBreedbyName(name) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`/dogs?name=${name}`)
            return dispatch({
                type: SEARCH_DOGS_BREED,
                payload: json.data
            })
        } catch (err) {
            alert((name) + " is not an existing breed");
        }
    }
}

/*-------crear perro-------*/
export function addDogs(payload) {
    return async function () {
        try {
            var response = await axios.post('/dogs', payload)
            return response
        } catch (error) {
            alert("error indexAction")
            console.log(error);
        }
    }
}


/*-------ordenar por nombre-------*/
export function breedOrder(order) {
    return {
        type: ORDER_BY_BREED,
        payload: order
    }
}

/*-------ordenar por peso-------*/
export function weightOrder(weight) {
    return {
        type: ORDER_BY_WEIGHT,
        payload: weight
    }
}



/*-------filtrar api y creado-------*/
export function filteredCreated(data) {
    return {
        type: DB_OR_API,
        payload: data
    }
}

/*-------filtrar temperamentos-------*/
export function filteredTemp(data) {
    return {
        type: FILTER_TEMP,
        payload: data
    }
}


/*-------traer temperamentos-------*/
export function getTemp() {
    return async function (dispatch) {
        try {
            var temperament = await axios.get('/temperament');
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: temperament.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}


