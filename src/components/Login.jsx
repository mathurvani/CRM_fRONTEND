import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { Separator } from './ui/separator'
import { useDispatch } from 'react-redux'
import {login} from "../services/operations/apis"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { toast } = useToast()
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email,password,navigate))
    console.log('Form submitted:', { email, password })

  }
  const handleGoogleLogin = () => {
    // Handle Google login logic here
    toast({
      variant:"default",
      title: "😱 Not Implemented",
    })
    console.log('Google login initiated')
  }

  return (
    <div className="min-h-screen mt-24 bg-[#13131A] flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
          <CardTitle className="text-2xl font-bold text-center">Log In</CardTitle>
          <CardDescription className="text-gray-400 text-center">Welcome back! Please enter your details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-green-500 hover:text-green-400">
                  Forgot your password?
                </a>
              </div>
            </div>
            <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handleSubmit}
          >
            Log In
          </Button>
          </form>
          
       
        {/* <CardFooter> */}
          
          <div className="mt-6">
            <Separator className="my-4" />
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white text-gray-900 hover:bg-gray-100"
              onClick={handleGoogleLogin}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_13183_10121)"><path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"/><path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"/><path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"/><path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335"/></g><defs><clipPath id="clip0_13183_10121"><rect width="20" height="20" fill="white" transform="translate(0.5)"/></clipPath></defs>
              </svg>
              Log in with Google
            </Button>
          </div>
          </CardContent>
        {/* </CardFooter> */}
        
        <div className="text-center pb-6">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link className="text-green-500 hover:text-green-400" to="/signup">Sign Up</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}