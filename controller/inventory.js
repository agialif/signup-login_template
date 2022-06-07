const Inventory = require('../model/inventory')

const inputInventory = (req, res) => {
    Inventory.create(req.body)
    .then((inventory) => {
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json(inventory)
    })
    .catch((err) => {
        res.send(err).status(500)
        console.log(err)
})
}

const updateInventory = (req, res) => {
    var fruitName = req.params
    Inventory.findOneAndUpdate(fruitName,
        {$set : req.body},
        {new: true})
        .then((fruit) => {
            console.log("Updated")
            res.status(200)
            res.setHeader('Content-Type', 'application/json')
            res.json(fruit)
        })
        .catch((err) => {
            res.send(err).status(500)
            console.log(err)
    })
}

const deleteInventory = (req,res) => {
    var fruitName = req.params
    Inventory.findOneAndDelete(fruitName)
    .then((fruit) => {
        console.log("Deleted")
            res.status(200)
            res.setHeader('Content-Type', 'application/json')
            res.json(fruit)
    })
    .catch((err) => {
        res.send(err).status(500)
        console.log(err)
    })
}

const getInventory = (req, res) => {
    var {id:fruitId} = req.params;
    Inventory.findById({_id:fruitId})
    .then((fruit) => {
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json(fruit)
    })
    .catch((err) => {
        res.send(err).status(500)
        console.log(err)
    })
}

const getAllInventory = (req, res) => {
    Inventory.find()
    .then((fruit) => {
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json(fruit)
    })
    .catch((err) => {
        res.send(err).status(500)
        console.log(err)
    })
}

module.exports = {
    inputInventory,
    updateInventory,
    deleteInventory,
    getAllInventory,
    getInventory
}