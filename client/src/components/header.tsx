'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

const Header = () => {
    const { push } = useRouter();
    const { user, logout } = useAuth();
    return (
        <>
            <nav className="py-4 flex justify-between items-center border-b">
                <Link href="/" className="cursor-pointer outline-none">
                    SHORT
                </Link>
                <div className="flex gap-6 items-end justify-between">
                    {(user === null) ? (
                        <Button onClick={() => {
                            push('/signin')
                        }}>Login</Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>PA</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    {`${user}`}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-400"
                                    onClick={logout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    <ModeToggle />
                </div>
            </nav>
        </>
    );
};

export default Header;