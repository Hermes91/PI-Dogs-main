const { Router } = require('express');
const { Dog, Temperament } = require("../db.js");
const { getAllDogs, dbById, apiById } = require('../middleware/middleware')
const axios = require('axios');


const router = Router();


router.get("/", async (req, res) => {
    try {
        const { name } = req.query // const name  = req.query.name
        let allDogs = await getAllDogs()
        if (name) {
            let dogByRace = await allDogs.filter(d => d.name.toLowerCase().includes(name.toString().toLowerCase()))
            if (dogByRace.length) {
                let dogs = dogByRace.map(d => {
                    return {
                        id: d.id,
                        name: d.name.charAt(0).toUpperCase() + d.name.slice(1),
                        img: d.img,
                        temperaments: d.temperaments,
                        min_weight: d.min_weight,
                        max_weight: d.max_weight,
                        comida: d.comida ? d.comida : null

                    }
                })
                return res.status(200).send(dogs)
            } return res.status(404).send('Dog not found')
        } else {
            let dogs = allDogs.map(d => {
                return {
                    id: d.id,
                    name: d.name.charAt(0).toUpperCase() + d.name.slice(1),
                    img: d.img,
                    temperaments: d.temperaments,
                    min_weight: d.min_weight,
                    max_weight: d.max_weight,
                    comida: d.comida ? d.comida : null
                }
            })
            return res.status(200).send(dogs)
        }
    } catch {
        return res.status(400).send('invalid input')
    }
})


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        if (id.length > 5) {
            let dbDogsId = await dbById(id)
            //   console.log(dbDogsId.temperaments.name);
            let dogInfo = {
                name: dbDogsId.name.charAt(0).toUpperCase() + dbDogsId.name.slice(1),
                id: dbDogsId.id,
                img: dbDogsId.img,
                height: dbDogsId.height,
                min_weight: dbDogsId.min_weight,
                max_weight: dbDogsId.max_weight,
                years: dbDogsId.years,
                temperament: dbDogsId.temperaments
            }
            return res.status(200).send(dogInfo)
        } else {
            apiDogsId = await apiById(id)
            const dogData = apiDogsId[0]
            let dogInfo = {
                name: dogData.name,
                id: dogData.id,
                img: dogData.img,
                height: dogData.height,
                min_weight: dogData.min_weight,
                max_weight: dogData.max_weight,
                years: dogData.years,
                temperament: dogData.temperaments,
            }
            return res.status(200).send(dogInfo)
        }
    } catch {
        return res.status(404).send('Dog notti found')
    }
})


router.post('/', async (req, res) => {
    try {
        const { name, height, min_weight, max_weight, years, img, temperaments, comida } = req.body

        const dogExist = await Dog.findOne({
            where: { name: name }
        })

        if (dogExist) {
            res.status(404).send('this dog breed already exist')
        } else {
            const newDog = await Dog.create({
                name,
                height,
                min_weight,
                max_weight,
                years,
                img,
                comida
            })
            let temperamentDb = await Temperament.findAll({
                where: {
                    name: temperaments
                }
            })
            newDog.addTemperament(temperamentDb);

            console.log("post");
            console.log(newDog);
            res.status(200).send('new dog created')
        }
    } catch {
        return res.status(404).send("Error, couldn't create dog")
    }
})



module.exports = router;


