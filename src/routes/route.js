const express = require('express');
const router = express.Router()
const { createFruit, getFruitData } = require('../controllers/fruitController.js')
const { createOrder, getOrder, updateOrder } = require('../controllers/orderController.js')


router.post('/createFruit', createFruit)

router.get('/getFruitData', getFruitData)


router.post('/createOrder', createOrder)

router.get('/getOrder/:ID', getOrder)

router.post('/getOrder', getOrder)

router.put('/updateOrder/:ID', updateOrder)


router.all('/**', (req, res) => {
    return res.status(400).send({ status: false, message: 'Wrong Address Input!' })
})


module.exports = router