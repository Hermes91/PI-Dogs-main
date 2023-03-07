import { FETCH_DOGS, SEARCH_DOGS_BREED, ORDER_BY_BREED, ORDER_BY_WEIGHT, ADD_DOG, GET_TEMPERAMENTS, DB_OR_API, FILTER_TEMP } from '../actions/actions'
import { ASCENDENTE, DESCENDENTE } from '../../constantes/sort'

const initialState = {
    dogs: [],
    everydog: [],
    temperaments: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DOGS:
            return {
                ...state,
                dogs: [...action.payload],
                everydog: action.payload,

            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case SEARCH_DOGS_BREED:
            return {
                ...state,
                dogs: [...action.payload],

            }
        case ORDER_BY_BREED:
            let orderArray = [...state.dogs]
            orderArray = orderArray.sort((a, b) => {
                if (a.name < b.name) { return action.payload === ASCENDENTE ? -1 : 1 }
                if (a.name > b.name) { return action.payload === DESCENDENTE ? -1 : 1 }
                else return 0
            })
            return {
                ...state,
                dogs: [...orderArray],
            }
        case ORDER_BY_WEIGHT:
            let dogs = [...state.dogs]
            let validMinDogs = dogs.filter(d => d.min_weight != null)
            let validMaxDogs = dogs.filter(d => d.max_weight != null)
            let weightArray = action.payload === ASCENDENTE ? validMinDogs.sort((a, b) => {
                if (a.min_weight < b.min_weight) return -1
                if (a.min_weight > b.min_weight) return 1
                else return 0
            })
                : validMaxDogs.sort((a, b) => {
                    if (a.max_weight < b.max_weight) return 1
                    if (a.max_weight > b.max_weight) return -1
                    else return 0
                })
            return {
                ...state,
                dogs: [...weightArray],

            }
        case DB_OR_API:
            const allDogs = state.everydog
            var filterDogs = action.payload === 'database'
                ? allDogs.filter(d => !Number.isInteger(d.id))
                : allDogs.filter(d => Number.isInteger(d.id))
            return {
                ...state,
                dogs: action.payload === 'All' ? state.everydog : filterDogs,

            }
        case FILTER_TEMP:
            const theDogs = state.everydog;
            const tempFilter = action.payload === 'All'
                ? theDogs : theDogs.filter(
                    (d) => d.temperaments && d.temperaments.split(",")
                        .find((t) => t === action.payload)
                )
            return {
                ...state,
                dogs: tempFilter,

            }
        case ADD_DOG:
            return {
                ...state,
            }


        default:
            return state
    }

}

// ORDER
// Botones/Opciones para ordenar :
// ascendentemente las razas
// descendentemente las razas
// Por peso


// FILTER
// "Botones/Opciones para filtrar por:
// Temperamento
// Raza existente (es decir las que vienen de la API)
// Agregada por nosotros (creadas mediante el form)"






