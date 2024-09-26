import Joi from "joi"

export class ValidacaoSchemaJoi{

    createUserSchema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        isAdmin: Joi.bool().default(false)
    })

    updateUserSchema = Joi.object({
        name: Joi.string().optional().min(5),
        email: Joi.string().optional().email(),
        isAdmin: Joi.bool().optional().default(false)
    })

    updatePassword = Joi.object({
        password: Joi.string().min(8).max(20).required()
    })

    createPostSchema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        user_id: Joi.string().required()
    })

    updatePostSchema = Joi.object({
    title: Joi.string().optional(),
    content: Joi.string().optional(),
    user_id: Joi.string().required()
    })

}
