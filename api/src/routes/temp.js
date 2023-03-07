const axios = require('axios');
const { Router } = require('express');
const { Temperament } = require('../db');
const { getTemp } = require('../middleware/middleware')


const router = Router();

router.get('/', async (req, res) => {
    try {
        let everyTemp = await getTemp()
        res.status(200).send(everyTemp)
    }
    catch (error) {
        res.status(400).send(error);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let tempId = await Temperament.findByPk(id)
        return res.status(200).send(tempId)
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;