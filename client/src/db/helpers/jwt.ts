import jwt from 'jsonwebtoken';
import * as jose from 'jose'

const SECRET = process.env.JWT_SECRET as string

export const signToken = (data: { _id: string; email: string }) => {
    return jwt.sign(data, SECRET);
}

export const jwtVerify = (payload: string) => {
    return jwt.verify(payload, SECRET)
}

export const verifyJose = async <T>(payload: string) => {
    const secretKey = new TextEncoder().encode(SECRET)
    const payloadJose = await jose.jwtVerify<T>(payload, secretKey)

    return payloadJose.payload
}