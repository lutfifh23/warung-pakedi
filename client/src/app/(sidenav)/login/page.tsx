'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url: string | undefined = process.env.NEXT_PUBLIC_BASE_URL
        console.log(url, "<<<TEST");

        const response = await fetch(url + '/api/users/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            },
            cache: 'no-store'
        })
        const res = await response.json()
        if (!response.ok) {
            console.log(res, "<<<TEST");
            return alert(res.message + 'hello')
        }
        alert('Logi')
        router.push('/')
        router.refresh()
    }
    return (

        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md p-6 bg-gray-100 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-black">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name='email'
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name='password'
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Do not have an account? <Link href="/register" className="text-indigo-600 hover:text-indigo-700">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
