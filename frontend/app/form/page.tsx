'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import supabase from '@/lib/supabaseClient'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const FormPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [event, setEvent] = useState('')
  const [funds, setFunds] = useState('')
  const [people, setPeople] = useState('')
  const [month, setMonth] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('event_reports') // Replace with your table name
      .insert([{
        ngo_id: user?.id,
        funds,
        people,
        month : `${month}-01`,
        event,
      }])

    setLoading(false)

    if (error) {
      console.error('Upload failed:', error.message)
      alert('Upload failed. Please try again.')
    } else{
      alert('Sucessfully Published')
      setEvent('')
      setFunds('')
      setMonth('')
      setPeople('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6 relative">
      <div className="absolute top-4 right-6 text-right">
        <div
          className="cursor-pointer text-xl font-medium hover:text-blue-600"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {user?.email || 'Loading...'}
        </div>

        {showDropdown && (
          <div className="mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center min-h-[80vh]">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
        >
          <h2 className="text-3xl font-bold text-center text-blue-800">Upload Event Report</h2>

          <input
            type="text"
            placeholder="NGO ID"
            value={user?.id || ''}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="No of Events"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Funds Utilised"
            value={funds}
            onChange={(e) => setFunds(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="No of People helped"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text" 
            placeholder="Year and Month (eg : 2025-04)"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default FormPage
