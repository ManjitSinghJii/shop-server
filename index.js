const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const Razorpay = require("razorpay")

const instance = new Razorpay({
    key_id: 'rzp_test_dk3hX6cuNZjUZQ',
    key_secret: '90bLEPtPdFb2uZbfMK8YzUy5'
})

app.listen(8080)
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/order', async (req, res)=>{
    try {
        const newOrder = await instance.orders.create({
            amount: (req.body.amount*100),
            receipt: 'CO_RP_'+Date.now()
        })
        res.json({
            amount: newOrder.amount,
            orderId: newOrder.id
        })
    }
    catch(err)
    {

        res.status(500).json(err)
    }
})

app.get('/payments', async (req, res)=>{
    try {
        const payments = await instance.payments.all()
        res.json(payments)
    }
    catch(err)
    {

        res.status(500).json(err)
    }
})