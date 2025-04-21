'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabaseClient'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const AdminDashboard = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [barGraphData, setBarGraphData] = useState<{ month: string; people: number }[]>([])
  const [pieChartData, setPieChartData] = useState<{ month: string; people: number }[]>([])
  const [latestEntries, setLatestEntries] = useState<any[]>([])



  const fetchData = async () => {
    const { data, error } = await supabase
      .from('event_reports') // your table name
      .select('*') // replace with actual column names you need
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching data:', error)
    } else {
       setLatestEntries(data)
      setBarGraphData(data.map((item) => ({
        month: item.month, // assuming `month` column exists
        people: item.people
         // assuming `users` column exists
      }))
      )

      setPieChartData (data.map((item)=>({
        month: item.month, // assuming `month` column exists
        people: item.people      })))

        setPieChartData (data.map((item)=>({
          month: item.event, // assuming `month` column exists
          people: item.funds      })))
      //set pie chart data similar way
    }
  }

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session && session.user.email == 'admin@gmail.com') {
        setLoading(false)
        fetchData()
      } 
      else {
        router.push('/login') // optional: redirect if not admin
      }
    
    }

    checkSession()
  }, [router]) // Added router dependency

  if (loading) return <div className="p-4">Checking admin privileges...</div>

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
            <BarChart data={barGraphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="people" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex space-x-4">
  {/* Pie Chart */}
  <ResponsiveContainer width="50%" height={300}>
    <PieChart>
      <Pie
        data={pieChartData}
        dataKey="people"
        nameKey="month"
        outerRadius="80%"
        fill="#6366F1"
        label
      >
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.people > 50 ? '#FF8042' : '#0088FE'} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>

  {/* Line Chart */}
  <ResponsiveContainer width="50%" height={300}>
    <LineChart data={pieChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="people" stroke="#6366F1" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
</div>
<div>
<h2 className="text-lg font-semibold mb-4">Latest Event Reports</h2>
        
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
              <th className="px-4 py-2 text-left">NGO_id</th>
                <th className="px-4 py-2 text-left">Month</th>
                <th className="px-4 py-2 text-left">Event</th>
                <th className="px-4 py-2 text-left">People</th>
                <th className="px-4 py-2 text-left">Funds</th>
              </tr>
            </thead>
            <tbody>
              {latestEntries.map((data) => (
                <tr key={data.id} className="border-t">
                   <td className="px-4 py-2">{data.ngo_id}</td>
                  <td className="px-4 py-2">{data.month}</td>
                  <td className="px-4 py-2">{data.event}</td>
                  <td className="px-4 py-2">{data.people}</td>
                  <td className="px-4 py-2">{data.funds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
</div>

        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
