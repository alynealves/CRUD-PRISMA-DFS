const Router = require('express')

const userController = require('../controller/userController')

const postController = require('../controller/postController')

const router = Router()

router.get(('/listar'), userController.getAllUsers)

router.post(('/criar'), userController.addUser)

router.put(('/atualizar/:id'), userController.updateUsers)

router.delete(('/deletar/:id'), userController.deletUsers)

//--------------------------------------------------------------

router.get(('/listarPosts'), postController.getAllPosts)

router.post(('/criarPost'), postController.addPost)

router.put(('/atualizarPost/:id'), postController.updatePost)

router.delete(('/deletarPost/:id'), postController.deletePost)

 module.exports = router