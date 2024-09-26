import jwt from "jsonwebtoken"

export default function authorization(request, response, next){
    
        const { authorization } = request.headers

            if(!authorization) {
            
                return response.status(401).json("Token missing!");
            }

           const token = authorization.replace('Bearer ', '').trim()

            try{
            const {isAdmin} = jwt.verify(token, process.env.SECRET_JWT)
    
            if(!isAdmin){
                return response.status(403).json("User no-permited!")
            }
    
            return next()
    
        }
        catch(error){
            return response.status(401).json("Token is invalid!!")
        }
    }

