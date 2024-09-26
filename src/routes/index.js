import {Router} from "express"

import {UserController} from '../controller/userController.js'

import {PostController} from '../controller/postController.js'

import {AuthController} from '../controller/authController.js'

import authentication from '../middleware/authenticate.js'

const router = Router()

const userController = new UserController()

const postController = new PostController()

const authController = new AuthController()

//tentar ver depois os métodos de autenticação e autorização pois ainda não estão funcionais

router.get(('/listar'), authentication, userController.getAllUsers)

router.post(('/criar'), authentication, userController.addUser)

router.put(('/atualizar/:id'), authentication, userController.updateUsers)

router.delete(('/deletar/:id'),  authentication, userController.deleteUsers)

router.put(('/resetsenha/:id'),  authentication, userController.updatePassword)

//--------------------------------------------------------------

router.get(('/listarPosts'), authentication, postController.getAllPosts)

router.post(('/criarPost'), authentication, postController.addPost)

router.put(('/atualizarPost/:id'), authentication, postController.updatePost)

router.delete(('/deletarPost/:id'), authentication, postController.deletePost)

router.get(('/buscaPosts/:user_id'), authentication, postController.getPostsbyUser)

//----------------------------------------------------------------

router.post(('/login'), authController.login)

export { router }