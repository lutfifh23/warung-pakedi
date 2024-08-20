import { z } from "zod";
import db from "../config/mongodb";
import { ObjectId } from "mongodb";

const ProductSchema = z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    excerpt: z.string(),
    price: z.number(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    images: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string()
})

type ProductType = z.infer<typeof ProductSchema>


export default class Product {
    static collection() {
        return db.collection<ProductType>('products')
    }
    static async getAll(name: string | null, page: string | null) {
        let limit = 5
        let currentPage = page || 1

        const products = await this.collection().find({ name: { $regex: name || "", $options: 'i' } }).skip((Number(currentPage) - 1) * limit).limit(name ? 20 : limit).toArray()
        return products
    }
    static async getBySlug(slug: string) {
        const products = await this.collection().findOne({
            slug: slug
        })
        if (!products) {
            let error = new Error('product not found')
            error.name = "NotFound"
            throw error
        }
        return products
    }
    static async create(payload: ProductType) {
        const parsedData = ProductSchema.safeParse(payload)
        if (!parsedData.success) {
            throw parsedData.error
        }
        await this.collection().insertOne(payload)
        return 'success add'
    }
}