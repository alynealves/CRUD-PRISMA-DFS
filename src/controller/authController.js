import { prisma } from "../database_prisma/PrismaClient.js"

import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"

export class AuthController{

 login = async(request, response) => {
    const {email, password} = request.body
    try{
        const user = await prisma.user.findFirst({
            where:{ email: email }
        })

        if(!user){

        return response.status(401).json({"message": "Unanthourized"})

        }
        const uncriptpass = bcrypt.compareSync(password, user.password)
        
        if(!uncriptpass){
            return response.status(401).json({"message": "Unanthourized"})
        }
        const token = jwt.sign({user: user.name, isAdmin: user.isAdmin}, process.env.SECRET_JWT, { expiresIn: '3h' })

        return response.status(200).json({id: user.id, name: user.name, token: token})
        
    }catch(error){
        return response.status(500).json({"message": "Unanthourized"})
    }
}
}