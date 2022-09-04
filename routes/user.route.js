const express = require('express')
const { getRandomUser, saveRandomUser, deleteUser, getAllUsers, updateAUser, updateMultipleUsers } = require('../controllers/users.controller')
const { validateUsers, validateId, setAllUsers } = require('../middlewares/users/users.middleware')

const usersRoute = express.Router()

usersRoute.get('/random',getRandomUser)
usersRoute.get('/all',setAllUsers,getAllUsers)
usersRoute.post('/save',validateUsers,saveRandomUser)
usersRoute.delete('/delete/:id',validateId,deleteUser)
usersRoute.patch('/update/:id',validateId,validateUsers,updateAUser)

module.exports = usersRoute