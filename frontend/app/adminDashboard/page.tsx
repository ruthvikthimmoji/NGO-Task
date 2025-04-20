'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabaseClient'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

const AdminDashboard = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session || session.user.user_metadata.email !== 'admin@gmail.com') {
        router.push('/adminDashboard') // FIX: Don't redirect to same page
      } else {
        setLoading(false)
      }
    }

    checkSession()
  }, [router]) // Added router dependency

  if (loading) return <div className="p-4">Checking admin privileges...</div>

  const data = [
    { name: 'Jan', users: 30 },
    { name: 'Feb', users: 45 },
    { name: 'Mar', users: 60 },
    { name: 'Apr', users: 50 },
    { name: 'May', users: 70 }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            await supabase.auth.signOut()
            router.push('/login')
          }}
        >
          Logout
        </button>
      </nav>

      <main className="p-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Users</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
