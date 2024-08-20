'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Register() {
    const router = useRouter()
    const [user, setUser] = useState({
        name: '',
        username: '',
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

        const response = await fetch(url + '/api/users/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            },
            cache: 'no-store'
        })
        const res = await response.json()
        if (!response.ok) {
            return alert(res.message)
        }
        alert('Register successful')
        router.push('/login')
    }
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 flex items-center justify-center">
                <div className="flex w-full max-w-7xl mx-auto">
                    {/* Logo */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold mb-4">MyApp</h1>
                            <p className="text-lg">
                                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                                quasi. In deleniti eaque aut repudiandae et a id nisi.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full max-w-md p-6 bg-gray-100 shadow-lg rounded-lg">
                            <h2 className="text-2xl font-semibold mb-6 text-center text-black">Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Name"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        name="username"
                                        value={user.username}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Username"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        type="email"
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
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        type="password"
                                        placeholder="Password"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Register
                                </button>
                            </form>
                            <p className="mt-4 text-center text-sm text-gray-600">
                                Already have an account? <Link href="/login" className="text-indigo-600 hover:text-indigo-700">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
