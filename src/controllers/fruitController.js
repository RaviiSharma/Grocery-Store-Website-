const fruitModel = require("../models/fruitModel.js")


const createFruit = async (req, res) => {
    try {

        const data = req.body

        const duplicateFruit = await fruitModel.findOne({ fruitName: data.fruitName })
        if (duplicateFruit) return res.status(400).send({ status: false, message: `Already exist this Fruit: ${data.fruitName}`, data: duplicateFruit })

        const createData = await fruitModel.create(data)

        return res.status(201).send({ status: true, message: "Fruit Data Created Successfully", data: createData })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}


const getFruitData = async (req, res) => {
    try {

        const data = req.query

        if (data.fruitName) {

            if (!data.quantity) return res.status(400).send({ status: false, message: "Please enter quantity!" })

            const fetchData = await fruitModel.findOne({ fruitName: data.fruitName }).select({ _id: 0, fruitName: 1, price: 1 }).lean()
            if (!fetchData) return res.status(404).send({ status: false, message: "Not Available! or you have to put one fruit at a time." })

            fetchData.price = fetchData.price * data.quantity
            fetchData.quantity = data.quantity

            return res.status(200).send({ status: true, message: "Fetch Data Successfully", data: fetchData })

        } else {

            const fetchData = await fruitModel.find().select({ _id: 0, fruitName: 1, price: 1 })
            if (fetchData.length == 0) return res.status(404).send({ status: false, message: "No Fruits Available now!" })

            return res.status(200).send({ status: true, message: "Fetch Data Successfully", data: fetchData })
        }

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}












module.exports = { createFruit, getFruitData }