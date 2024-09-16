const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getAllUsers = async(request, response) => {
const user = await prisma.user.findMany()
   response.status(200).json(user)
}

const addUser = async(request, response) =>{
    const {name, email, data_nascimento} = request.body
    const user = await prisma.user.create({
     data:{
         name,
         email
     }
    })
     response.status(201).json(user)
  }

  const updateUsers = async(request, response) => {
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

      const deletUsers = async(request, response) => {
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

module.exports = {
    getAllUsers,
    addUser,
    updateUsers,
    deletUsers
}