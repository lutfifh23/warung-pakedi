import { z } from "zod";
import db from "../config/mongodb";
import { hashPassword } from "../helpers/bcrypt";
import { ObjectId } from "mongodb";

const UserSchema = z.object({
    name: z.string(),
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(5)
})

type UserType = z.infer<typeof UserSchema>

class User {
    static collection() {
        return db.collection<UserType>('users')
    }
    static async getAll() {
        const users = await this.collection().find().toArray()
        return users
    }
    static async getById(id: string) {
        const product = await this.collection().findOne({
            _id: new ObjectId(String(id))
        })

        if (!product) {
            let error = new Error('product not found')
            error.name = 'NotFound'
            throw error
        }
        return product
    }
    static async getUserByEmail(email: string) {
        const user = await this.collection().findOne({
            email
        })
        return user
    }
    static async getUserByUsername(username: string) {
        const user = await this.collection().findOne({
            username
        })
        return user
    }
    static async create(payload: UserType) {
        const parsedData = UserSchema.safeParse(payload)
        if (!parsedData.success) {
            throw parsedData.error
        }
        payload.password = hashPassword(payload.password)
        await this.collection().insertOne(payload)
        return 'success register'
    }
}

export default User