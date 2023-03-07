const axios = require('axios')
const { Dog, Temperament } = require("../db");

const apiInfo = async () => {
    dogApiPromise = await axios.get(`https://api.thedogapi.com/v1/breeds/`)
    let filtereDog = dogApiPromise.data.map((d) => {
        return {
            id: d.id,
            name: d.name,
            height: d.height.metric,
            min_weight: parseInt(d.weight.metric.split('-')[0]),
            max_weight: parseInt(d.weight.metric.split('-')[1]),
            years: d.life_span,
            img: d.image.url,
            temperaments: d.temperament ? d.temperament : "no hay temperamento registrado",
        }
    })
    return filtereDog
}

const apiById = async (id) => {
    const allDogs = await getAllDogs()
    let dogId = await allDogs.filter((d) => d.id.toString() === id.toString())
    if (dogId.length) return (dogId)
    else return ("No se ha encontrado a ese perro")
}

const dbInfo = async () => {
    try {
        let doggyDb = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            },
        })
        dogsDb = await doggyDb.map(d => {
            d = JSON.parse(JSON.stringify(d))
            d.temperaments = d.temperaments.map(d => d.name).join()
            return d
        })
        return dogsDb
    } catch (error) {
        console.log("error en dbInfo");
    }
}


const dbById = async (id) => {
    try {
        let doggyDb = await Dog.findByPk(id, {
            include: [{
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }]
        })

        // dogsDb = await doggyDb.map(d => {
        //     d = JSON.parse(JSON.stringify(d))
        //     d.temperaments = d.temperaments.map(d => d.name).join()
        //     return d
        // })
       
        // dogsDb = await doggyDb.temperaments.map(d => d.name)
        return doggyDb
    } catch (error) {
        console.log("error error error dbById");
        console.log(error);
    }
}



const getAllDogs = async () => {
    const dogApi = await apiInfo();
    const dogDb = await dbInfo()
    const allDogs = dogApi.concat(dogDb)
    return allDogs
}


const getTemp = async () => {
    const everyTemp = await Temperament.findAll();

    if (everyTemp.length === 0) {
        const temperamentApi = await axios.get('https://api.thedogapi.com/v1/breeds/')
        const temps = temperamentApi.data.map((e) => {
            const all = e.temperament
            return all
        })

        const mapTemp = temps.map((t) => t && t.split(",")).flat()
        const setTemp = mapTemp.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === mapTemp.findIndex(obj => {
                return JSON.stringify(obj) === _value
            })
        })
        const sortTemp = setTemp.sort()
        var aux = sortTemp.map((e) => {
            return { name: e }
        }).filter((e) => e.name)
        const temperamentList = await Temperament.bulkCreate(aux)
        return temperamentList
    } else {
        return everyTemp
    }
}


module.exports = {
    getTemp,
    apiInfo,
    dbInfo,
    getAllDogs,
    dbById,
    apiById
};