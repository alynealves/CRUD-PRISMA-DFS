const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getAllPosts = async(request, response) => {
    const post = await prisma.post.findMany()
       response.status(200).json(post)
    }
    
const addPost = async(request, response) =>{
        const {title, content, id_user} = request.body
        const post = await prisma.post.create({
         data:{
             title: title,
             content: content,
             user_id: id_user
         }
        })
         response.status(201).json(post)
      }
    
const updatePost = async(request, response) => {
        const {title, content, id_user} = request.body
           const { id } = request.params
           const post = await prisma.post.findFirst({
              where:{
                  id
              }
           })
           if(post){
              const post = await prisma.post.update({
                //entender aqui porque foi necessário inverter a ordem no update, inserindo primeiro a validação do id para só depois atualizar os dados
                where: {
                    id
                },
                data: {
                    title,
                    content,
                    user_id: id_user
                }
              })
                response.status(200).json(post)
            }else{
            response.status(404).json('Post inválido')
            }
           }
    
const deletePost = async(request, response) => {
            const { id } = request.params
            const post = await prisma.post.findFirst({
               where:{
                   id: id
               }
            })
            if(post){
               await prisma.post.delete({
                   where:{
                       id: id
                   }
               })
                 response.status(204).send()
             }else{
             response.status(404).json('Post inválido')
             }
        }
    
    module.exports = {
        getAllPosts,
        addPost,
        updatePost,
        deletePost
    }