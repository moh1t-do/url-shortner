'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/context/authContext"
import axiosInstance from "@/lib/axiosInstance"

interface Isignin {
  name: string
  accessToken: string
}

export default function Signin() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password
    }
    try {
      const { data } = await axiosInstance.post<Isignin>('/auth/signin', payload);
      login(data.name, data.accessToken);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error(error);
    }
  }

  return (
    <div className="mx-auto">
      <Card className="w-[400px]">
        <form onSubmit={handleSignIn}>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Sign In with your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter Email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Enter Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex flex-col gap-4 items-center">
              <Button className="w-full">Submit</Button>
            </div>
          </CardFooter>
        </form>
        <CardFooter>
          <div className="flex flex-col w-full gap-1">
            <p className="text-sm">Don&rsquo;t have an account?</p>
            <Button variant="secondary" onClick={() => {
              router.push('/signup')
            }}>
              Sign Up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
