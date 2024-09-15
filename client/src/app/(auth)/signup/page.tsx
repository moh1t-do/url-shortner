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
import { useRouter } from 'next/navigation';
import axiosInstance from "@/lib/axiosInstance"
import { useAuth } from "@/context/authContext"

export default function Signin() {
    const router = useRouter();
    const { login } = useAuth();
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    interface ISignUp {
        name: string
        accessToken: string
    }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            name: name,
            email: email,
            password: password
        }

        try {
            const { data } = await axiosInstance.post<ISignUp>('/auth/signup', payload);
            login(data.name, data.accessToken);
            router.push('/');
        } catch (error) {

        }
    }

    return (
        <div className="mx-auto">
            <Card className="sm:w-[400px] w-[300px]">
                <form onSubmit={handleSignUp}>
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Sign Up with your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                            </div>
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
                            <Button className="w-full">Sign Up</Button>
                        </div>
                    </CardFooter>
                </form>
                <CardFooter>
                    <div className="flex flex-col w-full gap-1">
                        <p className="text-sm">Already have an account?</p>
                        <Button variant="secondary" onClick={() => {
                            router.push('/signin')
                        }}>
                            Sign In
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
