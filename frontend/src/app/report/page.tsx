'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import TimezoneSelector from '@/components/timezoneSelector'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Attendance {
  id: number
  clock_in: string
  clock_in_photo: string
  clock_in_location: string
  clock_out: string
  clock_out_photo: string
  clock_out_location: string
  clockInLocationName: string
  clockOutLocationName: string
  
}

const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

export default function Report() {
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [timezone, setTimezone] = useState(currentTimezone)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()

  useEffect(() => {
    fetchAttendances(timezone)
  }, [])

  const fetchAttendances = async (tz: string) => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance/report?timezone=` + tz, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const res = await response.json()
        const updatedData = await Promise.all(
            res.data.map(async (item: Attendance) => ({
                ...item,
                clockInLocationName: item.clock_in_location ? await reverseGeocoding(item.clock_in_location) : null,
                clockOutLocationName: item.clock_out_location ? await reverseGeocoding(item.clock_out_location) : null
            }))
          );
          console.log(updatedData)
        setAttendances(updatedData)
      } else {
        setError('Failed')
        router.push('/login')
      }
    }  catch (err) {
        setError('Failed to load attendance records')
        router.push('/login')
      } finally {
        setLoading(false);
      }
  }

  const changeTimezone = (value: string) => {
        setLoading(true)
        setTimezone(value)
        fetchAttendances(value)
  }
  
  const reverseGeocoding = async (value: string) => {
    const [lat, long] = value.replace(/[()]/g, "").split(",")
    const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOCODE_APIKEY}`)
    const data = await response.json();

    return data.results[0].formatted
  }

  if (loading) return <div className="flex justify-center p-8"><div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div></div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className='flex-row align-center p-4 justify-between'>
          <CardTitle>Attendance Report</CardTitle>
            <Link href="/dashboard" passHref>
                <Button>Back</Button>
            </Link>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <TimezoneSelector
                value={timezone}
                onValueChange={changeTimezone}
                />
          </div>

        <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead className="bg-gray-50 dark:bg-neutral-800">
                    <tr>
                        <th scope="col" rowSpan={2} className="sticky left-0 z-10 bg-gray-50 dark:bg-neutral-800 px-3 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">#</th>
                        <th scope="col" colSpan={3} className="px-3 py-3 text-sm font-semibold text-gray-900 dark:text-gray-200">Clock In</th>
                        <th scope="col" colSpan={3} className="px-3 py-3 text-sm font-semibold text-gray-900 dark:text-gray-200">Clock Out</th>
                    </tr>
                    <tr className="text-left">
                        <th scope="col" className="px-3 py-3 text-sm font-semibold text-gray-900 dark:text-gray-200">Timestamp</th>
                        <th scope="col" className="px-3 py-3 text-sm font-semibold text-gray-900 dark:text-gray-200">Photo</th>
                        <th scope="col" className="px-3 py-3 text-sm font-semibold text-gray-900 dark:text-gray-200">Location</th>
                        <th scope="col" className="px-3 py-3 text-sm font-semibold text-gray-900 dark:text-gray-200">Timestamp</th>
                        <th scope="col" className="px-3 py-3 text-sm font-semibold text-gray-900 dark:text-gray-200">Photo</th>
                        <th scope="col" className="px-3 py-3 text-sm font-semibold text-gray-900 dark:text-gray-200">Location</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 bg-white dark:bg-neutral-900">
                    {attendances.map((attendance, index) => (
                        <tr key={attendance.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                        <td className="sticky left-0 z-10 bg-white dark:bg-neutral-900 whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-200">
                            {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {attendance.clock_in}
                        </td>
                        <td className="px-3 py-4">
                            <div className="h-24 w-24 overflow-hidden rounded-lg">
                            {attendance.clock_in_photo && (
                                <img 
                                src={attendance.clock_in_photo} 
                                alt="Clock in"
                                className="h-full w-full object-cover"
                                />
                            )}
                            </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                            <p>{attendance.clock_in_location ?? '-'}</p>
                            <p>{attendance.clockInLocationName}</p>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {attendance.clock_out ?? '-'}
                        </td>
                        <td className="px-3 py-4">
                            <div className="h-24 w-24 overflow-hidden rounded-lg">
                            {attendance.clock_out_photo && (
                                <img 
                                src={attendance.clock_out_photo} 
                                alt="Clock out"
                                className="h-full w-full object-cover"
                                />
                            )}
                            </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                            <p>{attendance.clock_out_location}</p>
                            <p>{attendance.clockOutLocationName}</p>

                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}

