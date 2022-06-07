const {
    inputInventory,
    getInventory,
    getAllInventory,
    deleteInventory,
    updateInventory
} = require('../controller/inventory')
const express = require('express')
inventoryRouter = express.Router()

inventoryRouter.route('/')
.post(inputInventory)
.get(getAllInventory)

inventoryRouter.route('/:fruitId')
.put(updateInventory)
.delete(deleteInventory)
.get(getInventory)

module.exports = inventoryRouter;