import { prisma } from "../database_prisma/PrismaClient.js"

import { ValidacaoSchemaJoi } from "../middleware/validationSchemaData.js"

const ValidaSchemaPrismaJoi = new ValidacaoSchemaJoi()

export class PostController{
    getAllPosts = async(request, response) => {
        const post = await prisma.post.findMany()
           response.status(200).json(post)
        }
        
    addPost = async(request, response) =>{
        const {error, value} = ValidaSchemaPrismaJoi.createPostSchema.validate(request.body)
        if(error){
            response.status(400).json({error: error.message})
        }
        else{
            const post = await prisma.post.create({
             data:{
                 title: value.title,
                 content: value.content,
                 user_id: value.user_id
             }, select:{
                title: true,
                content: true,
                user_id: true
             }
            })
             response.status(201).json(post)
          }
        }
        
    updatePost = async(request, response) => {
        const {error, value} = ValidaSchemaPrismaJoi.updatePostSchema.validate(request.body)
               const { id } = request.params
            if(error){
                response.status(400).json({"Erro encontrado no seguinte dado": error.message})
            }
               else{
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
                        title: value.title,
                        content: value.content,
                        user_id: value.user_id
                    }
                  })
                    response.status(200).json({Titulo: post.title, Conteudo: post.content, User: post.user_id})
                }else{
                response.status(404).json('Post nao localizado!')
                }
               }
            }
        
    deletePost = async(request, response) => {
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

            getPostsbyUser = async(request, response) => {
                const { user_id }  = request.params
                console.log("Primeiro console:", user_id)
                try{
                    const validaUser = await prisma.user.findUnique({
                        where: { id: user_id }
                    });
            
                    if (!validaUser || validaUser.length === 0) {
                        console.log("Usuário Inválido:", user_id);
                        return response.status(400).json("Usuário inválido ou vazio");
                    }
                    const userPosts = await prisma.post.findMany({        
                        where:{
                            user_id: user_id
                        }                                      
                     })
                     if(userPosts.length>0){
                        response.status(200).json({userPosts}),
                        console.log("primeiro if console:", user_id)
                     } 
                    else{
                        response.status(404).json("O usuario nao tem postagens!"),
                        console.log("terceiro if console:", user_id)
                     }    
                }catch(error){
                    console.error("Erro ao buscar postagens:", error);
                    response.status(500).json("Erro interno do servidor.");
                }
            
            }
}
