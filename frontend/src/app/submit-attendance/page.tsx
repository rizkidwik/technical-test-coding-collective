'use client'

import { useState, useRef, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function SubmitAttendance() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [type, setType] = useState('in')
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString())
          setLongitude(position.coords.longitude.toString())
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const capturePhoto = (): Promise<File | null> => {
    return new Promise((resolve) => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        context?.drawImage(videoRef.current, 0, 0, 640, 480);
        canvasRef.current.toBlob(
          (blob) => {
            if (blob) {
                const photoFile: File = new File([blob], 'photo.jpeg', { type: 'image/jpeg' });
                resolve(photoFile);
            }
          },
          'image/jpeg'
        );
      } else {
        resolve(null);
      }
    });
  };
  
  const handleSubmit = async () => {

    if (!latitude || !longitude) {
      alert('Please provide all required information')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const photoFile: File | null = await capturePhoto();

    if (!photoFile) {
        console.error('Photo not capture')
        return
      }

    const formData = new FormData()
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)
    formData.append('photo', photoFile)
    formData.append('type', type)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        alert('Attendance submitted successfully')
        router.push('/dashboard')
      } else {
        alert('Failed to submit attendance')
      }
    } catch (error) {
      console.error('Error submitting attendance:', error)
      alert('An error occurred while submitting attendance')
    }
  }

  

  useEffect(() => {
    const getTodayAttendance = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance/today`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              },
            })
            
            if (response.ok) {
                const res = await response.json()
                setType(res.data ? 'out' : 'in');
                if(res.data?.clock_out){
                    alert('You`ve already presence today. Thank you.')
                    redirect('/dashboard')
                }
              }
          } catch (error) {
            console.error('Error submitting attendance:', error)
            alert('An error occurred while submitting attendance')
          }
      }
    getTodayAttendance()
    getLocation()
    startCamera()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className='flex-row align-center p-4 justify-between'>
          <CardTitle>Submit Attendance</CardTitle>
            <Link href="/dashboard" passHref>
                <Button>Back</Button>
            </Link>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Button type="button" onClick={getLocation}>Get Location</Button>
              <p>Latitude: {latitude}</p>
              <p>Longitude: {longitude}</p>
            </div>
            <div>
              {/* <Button type="button" onClick={startCamera}>Start Camera</Button> */}
              <video ref={videoRef} width="640" height="480" autoPlay></video>
              <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
              <Button type="button" id="btnSubmit" onClick={handleSubmit} className='my-5'>Submit Attendance</Button>
              {/* {photo && <p>Photo captured</p>} */}
            </div>
            {/* <Button type="submit">Submit Attendance</Button> */}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

