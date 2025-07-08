import { router } from '@inertiajs/react'
import React from 'react'


function Login() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-7 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-2">
                    Some Quest
                </h2>
                <div className="mb-4 text-center text-sm text-gray-600">
                    <p>Task Management System</p>
                </div>
                <form className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 shadow-sm text-black"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 shadow-sm text-black"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        onClick={() => router.get('/')}
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p className="font-semibold">Demo Credentials</p>
                    <p>Email: <code className="bg-gray-100 px-1 rounded">john@company.com</code></p>
                    <p>Password: <code className="bg-gray-100 px-1 rounded">password</code></p>
                </div>
            </div>
        </div>
    )
}

export default Login
