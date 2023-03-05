const OrderModel = require("../models/orderModel.js")
const fruitModel = require("../models/fruitModel.js")



const createOrder = async (req, res) => {
    try {

        let data = req.body

        let { fruitName, name, quantity } = data

        const fetchData = await fruitModel.findOne({ fruitName: fruitName }).select({ _id: 0, fruitName: 1, price: 1 })
        if (!fetchData) return res.status(404).send({ status: false, message: `This Fruit: ${fruitName} is not available now!` })

        data.totalPrice = fetchData.price * quantity

        const createOrder = await OrderModel.create(data)

        return res.status(201).send({ status: true, message: 'Order Created Successfully.', data: createOrder })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}


const getOrder = async (req, res) => {
    try {

        let OrderId = req.params.ID
        let name = req.body.name

        if (OrderId) {

            const orderDetails = await OrderModel.findOne({ _id: OrderId }).select({ createdAt: 0, updatedAt: 0, __v: 0 })
            if (!orderDetails) return res.status(404).send({ status: false, message: "No Order Found!" })

            return res.status(200).send({ status: true, message: 'Your Orders', data: orderDetails })

        } else {

            const orderDetails = await OrderModel.find({ name: name }).select({ createdAt: 0, updatedAt: 0, __v: 0 })
            if (orderDetails.length == 0) return res.status(404).send({ status: false, message: "No Order Found!" })

            return res.status(200).send({ status: true, message: 'Your Orders', data: orderDetails })

        }

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}



const updateOrder = async (req, res) => {
    try {

        let OrderId = req.params.ID
        let data = req.body

        let { name, quantity, fruitName } = data


        const fetchData = await fruitModel.findOne({ fruitName: fruitName }).select({ _id: 0, fruitName: 1, price: 1 })
        if (!fetchData) return res.status(404).send({ status: false, message: `This Fruit: ${fruitName} is not available now!` })

        data.totalPrice = fetchData.price * quantity

        const orderDetails = await OrderModel.findOneAndUpdate({ name: name, _id: OrderId },
            { fruitName: fruitName, quantity: quantity, totalPrice: data.totalPrice }, { new: true }).select({ createdAt: 0, updatedAt: 0, __v: 0 })

        if (!orderDetails) return res.status(404).send({ status: false, message: "No Order Found!" })

        return res.status(200).send({ status: true, message: 'Your Order Updated Successfully', data: orderDetails })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}




module.exports = { createOrder, getOrder, updateOrder }