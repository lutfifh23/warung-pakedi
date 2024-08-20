import { ObjectId } from "mongodb";
import { z } from "zod";
import db from "../config/mongodb";

const WishlistSchema = z.object({
    productId: z.instanceof(ObjectId),
    userId: z.instanceof(ObjectId),
    createdAt: z.string(),
    updateAt: z.string()
})

type WishlistType = {
    productId: ObjectId
    userId: ObjectId
    createdAt?: string
    updateAt?: string
}

export default class Wishlist {
    static collection() {
        return db.collection<WishlistType>('wishlists')
    }
    static async getAll(userId: string) {
        const agg = [
            {
                '$match': {
                    'userId': new ObjectId(String(userId))
                }
            }, {
                '$lookup': {
                    'from': 'products',
                    'localField': 'productId',
                    'foreignField': '_id',
                    'as': 'product'
                }
            }, {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$sort': {
                    '_id': -1
                }
            }
        ]
        const wishlist = await this.collection().aggregate(agg).toArray()
        return wishlist
    }
    static async getById(id: string) {
        const wishlist = await this.collection().find({
            _id: new ObjectId(String(id))
        })
        if (!wishlist) {
            let error = new Error('wishlist not found')
            error.name = 'NotFound'
            throw error
        }
        return wishlist
    }
    static async create(payload: WishlistType) {
        const parsedData = WishlistSchema.safeParse(payload);
        if (!parsedData.success) {
            throw parsedData.error;
        }

        const { productId, userId } = parsedData.data;

        const existingWishlistItem = await this.collection().findOne({
            productId: new ObjectId(productId),
            userId: new ObjectId(userId),
        });

        if (existingWishlistItem) {
            return 'Product already in wishlist'; // Or handle as needed
        }

        await this.collection().insertOne(payload);
        return 'Success add';
    }

    static async deleteById(id: string) {
        await this.collection().deleteOne({
            _id: new ObjectId(String(id))
        })
        return 'success delete'
    }
}