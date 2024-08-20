import { MongoClient, ServerApiVersion } from "mongodb"


const uri = process.env.MONGO_SECRET as string

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

const db = client.db('warungpaedi');

export default db