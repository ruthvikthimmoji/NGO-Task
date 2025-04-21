'use client'
import React, { FormEvent, useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import supabase from '@/lib/supabaseClient'
import { Button } from '../components/ui/button'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [heading, setHeading] = useState('Login')

  const router = useRouter()

  // Using useSearchParams inside useEffect to avoid SSR issues
  const searchParams = useSearchParams()

  useEffect(() => {
    const role = searchParams.get('role')
    if (role === 'admin') {
      setHeading('Admin Login')
    } else if (role === 'ngo') {
      setHeading('NGO Login')
    } else if (role) {
      setHeading(`${role} Login`) // fallback if role is something else
    } else {
      setHeading('Login') // default
    }
  }, [searchParams])

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      if (email === 'admin@gmail.com') {
        router.push('/adminDashboard')
      } else {
        setSuccessMsg('Login Successful')
        router.push('/form')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4 text-lg">
        <h2 className="text-2xl font-semibold text-center text-black mb-4">{heading}</h2>
        {successMsg && (
          <p className="text-green-600 bg-green-100 px-3 py-2 rounded-md text-sm text-center">
            ✅ {successMsg}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
          Login
        </Button>

        <p className="text-center text-sm">
          Don’t have an account? <a href="/register" className="text-blue-500 underline">Register here</a>
        </p>
      </form>
    </div>
  )
}

// Wrap the component with Suspense
export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  )
}
