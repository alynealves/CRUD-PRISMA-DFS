import { prisma } from "../database_prisma/PrismaClient.js"

import { ValidacaoSchemaJoi } from "../middleware/validationSchemaData.js"

import bcrypt from "bcryptjs"

const ValidaSchemaPrismaJoi = new ValidacaoSchemaJoi()

export class UserController{

    getAllUsers = async(request, response) => {
        const user = await prisma.user.findMany()
           response.status(200).json(user)
        }
        
    addUser = async(request, response) =>{
    try{
            const {error, value} = ValidaSchemaPrismaJoi.createUserSchema.validate(request.body)
            if(error){
                response.status(400).json({error: error.message})
            }
            else {
            const  passEncrypted = bcrypt.hashSync(value.password, 10)
            const user = await prisma.user.create({
             data:{
                 name: value.name,
                 email: value.email,
                 password: passEncrypted,
                 isAdmin: value.isAdmin
             }, select:{
                name: true,
                email: true,
                isAdmin: true
             }
            })
            response.status(200).json(user)
        }
    }
        catch(error){
            //esse catch é lixo(em nenhum momento ele vai ser executado)
           // response.status(404).json({error: "Mensagem de erro", details: error.message})
        }
        }
       
    updateUsers = async(request, response) => {
        const {error, value} = ValidaSchemaPrismaJoi.updateUserSchema.validate(request.body)
        const { id } = request.params
        if(error){
            response.status(400).json({error: error.message})
        }
        else{
            const user = await prisma.user.findFirst({
                  where:{
                      id
                  }
               }) 
               if(user){
                const  passEncrypted = bcrypt.hashSync(value.password, 10)
                  const user = await prisma.user.update({
                      data:{
                          password: passEncrypted
                      },
                      where:{
                          id
                      }
                  })
                    response.status(200).json({name: user.name, email: user.email, isAdmin: user.isAdmin})
                }else{
                response.status(404).json('Usuario nao encontrado')
                }
               }
            }
        
        deleteUsers = async(request, response) => {
                const { id } = request.params
                const user = await prisma.user.findFirst({
                   where:{
                       id
                   }
                })
                if(user){
                   await prisma.user.delete({
                       where:{
                           id
                       }
                   })
                     response.status(204).send()
                 }else{
                 response.status(404).json('Usuario nao encontrado')
                 }
            }
        updatePassword = async(request, response) => {
            const {error, value} = ValidaSchemaPrismaJoi.updatePassword.validate(request.body)
            const { id } = request.params
            if(error){
                response.status(400).json({error: error.message})
            }
            else{
                const password = await prisma.user.findFirst({
                      where:{
                          id
                      }
                   }) 
                   if(password){
                    const  passEncrypted = bcrypt.hashSync(value.password, 10)
                      const user = await prisma.user.update({
                          data:{
                             password: passEncrypted
                          },
                          where:{
                              id
                          }
                      })
                        response.status(200).json({Nome: user.name, Email: user.email})
                    }else{
                    response.status(404).json('Usuario nao encontrado')
                    }
                   }
}
}
