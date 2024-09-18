import { prisma } from "../database_prisma/PrismaClient.js"

import bcrypt from "bcryptjs"

export class UserController{
    getAllUsers = async(request, response) => {
        const user = await prisma.user.findMany()
           response.status(200).json(user)
        }
        
        addUser = async(request, response) =>{
            const {name, email, password, isAdmin} = request.body

            const passEncrypted = bcrypt.hashSync(password, 10)

            const user = await prisma.user.create({
             data:{
                 name,
                 email,
                 password: passEncrypted,
                 isAdmin
             }, select:{
                name: true,
                email: true,
                isAdmin: true
             }
            })
             response.status(201).json(user)
          }
        
          updateUsers = async(request, response) => {
            const {name, email} = request.body
               const { id } = request.params
               const user = await prisma.user.findFirst({
                  where:{
                      id
                  }
               })
               if(user){
                  const user = await prisma.user.update({
                      data:{
                          name,
                          email
                      },
                      where:{
                          id
                      }
                  })
                    response.status(200).json(user)
                }else{
                response.status(404).json('Usuario nao encontrado')
                }
               }
        
              deletUsers = async(request, response) => {
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
}
