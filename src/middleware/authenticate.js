
import jwt from "jsonwebtoken"

export class Authenticate{
    static authenticate (request, response, next){
    
    try{
        const { authenticate } = request.headers
        if(!authenticate){
            return response.status(401).json("User unauthorized")
        }

        const token = authenticate.replace('Bearer ', '').trim()
        const {user} = jwt.verify(token, process.env.SECRET_JWT)

        if(!user){
            return response.status(401).json("Token invalid!")
        }

        return next()

    }
    catch(error){
        return response.status(401).send()
    }
}

static authorization (request, response, next){
    
    try{
        const { authorization } = request.headers
    
        const token = authorization.replace('Bearer ', '').trim()
        const {isAdmin} = jwt.verify(token, process.env.SECRET_JWT)

        if(!isAdmin){
            return response.status(403).json("User no-permited!")
        }

        return next()

    }
    catch(error){
        return response.status(401).json("Token is missing!")
    }
}

}