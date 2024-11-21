import z from 'zod'

const loginSchema = z.object({
    username: z.string({
        required_error: "Correo es requerido"
    }).email({
        message: "Correo es inválido"
    }),

    password: z.string({
        required_error: "Contraseña es requerida"
    }).min(6, {
        message: "Contraseña debe tener al menos 6 caracteres"
    }),
    role: z.enum(['CENCO', 'SUPERVISOR'], {
        message: "El rol debe ser CENCO o SUPERVISOR"
    })
})

const registerSchema = z.object({
    username: z.string({
        required_error: "Correo es requerido"
    }).email({
        message: "Correo es inválido"
    }),

    password: z.string({
        required_error: "Contraseña es requerida"
    }).min(6, {
        message: "Contraseña debe tener al menos 6 caracteres"
    }),

    role: z.enum(['CENCO', 'SUPERVISOR'], {
        message: "El rol debe ser CENCO o SUPERVISOR"
    })
})

export {loginSchema, registerSchema}