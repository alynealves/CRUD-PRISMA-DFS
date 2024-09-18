import {Router} from "express"

import {UserController} from '../controller/userController.js'

import {PostController} from '../controller/postController.js'

import {AuthController} from '../controller/authController.js'

import {Authenticate} from '../middleware/authenticate.js'

const router = Router()

const userController = new UserController()

const postController = new PostController()

const authController = new AuthController()

const authenticator = new Authenticate()


router.get(('/listar'), Authenticate.authenticate, userController.getAllUsers)

router.post(('/criar'), userController.addUser)

router.put(('/atualizar/:id'), userController.updateUsers)

router.delete(('/deletar/:id'), Authenticate.authorization, userController.deletUsers)

//--------------------------------------------------------------

router.get(('/listarPosts'), postController.getAllPosts)

router.post(('/criarPost'), postController.addPost)

router.put(('/atualizarPost/:id'), postController.updatePost)

router.delete(('/deletarPost/:id'), postController.deletePost)

//----------------------------------------------------------------

router.post(('/login'), authController.login)

export { router }