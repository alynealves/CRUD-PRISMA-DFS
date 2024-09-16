const Router = require('express')

const userController = require('../controller/userController')

const router = Router()

router.get(('/listar'), userController.getAllUsers)

router.post(('/criar'), userController.addUser)

router.put(('/atualizar/:id'), userController.updateUsers)

router.delete(('/deletar/:id'), userController.deletUsers)

 module.exports = router