import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { useDispatch } from 'react-redux'
import {signup} from "../services/operations/apis"

export default function SignupPage() {
  const [Firstname, setFirstName] = useState('')
  const [Lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signup(Firstname,Lastname,email,password,navigate))
    console.log('Form submitted:', { name, email, password})
    // navigate("/login")
  }

  return (
    <div className="min-h-screen bg-[#13131A] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-[#1A1A23] text-white border-[#2A2A35]">
        <div className="flex justify-center pt-8 pb-4">
          {/* Replace with your actual logo */}
          <div className="w-24 h-24 relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6IW2Rhw0_0gI3okYpmLf8XFayCUwRTyZ1YA&s"
              alt="Company Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-full bg-white p-2"
            />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-gray-400 text-center">Sign up to get started with our service</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-200">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={Firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-[#2A2A35] border-[#3A3A45] text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-200">Last Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={Lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="bg-[#2A2A35] border-[#3A3A45] text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#2A2A35] border-[#3A3A45] text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#2A2A35] border-[#3A3A45] text-white placeholder-gray-400"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </CardFooter>
        <div className="text-center pb-6">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link className="text-green-500 hover:text-green-400" to="/login">Log in</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}