import { useForm } from '@inertiajs/react'
import React from 'react'
import { useLoginStore } from '@/stores/loginStore'

function Login() {
    const { setUser } = useLoginStore()
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/login', {
            onSuccess: (page) => {
                const user = page.props.auth.user
                setUser(user)
        
            },
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">Some Quest</h2>
                <p className="text-center text-sm text-gray-500 mb-6">Task Management System</p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition text-gray-800"
                            placeholder="Enter your email"
                            required
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition text-gray-800"
                            placeholder="Enter your password"
                            required
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        {processing ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
