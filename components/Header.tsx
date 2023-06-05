"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import useAuthModal from "@/hooks/useAuthModal";
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa"
import { toast } from "react-hot-toast"

interface HeaderProps {
    children: React.ReactNode
    className?: string
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const router = useRouter();
    const authModal = useAuthModal();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        router.refresh();
        if (error) {
            toast.error(error.message)
        } else {
            toast.success('Logged out!')
        }
    }

    return (
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-700 p-6`, className)}>
            <div className='w-full mb-4 flex items-center justify-between'>
                <div className='hidden md:flex gap-x-2 items-center'>
                    <button
                        onClick={() => router.back()}
                        className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
                    >
                        <RxCaretLeft className='text-white' size={35} />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
                    >
                        <RxCaretRight className='text-white' size={35} />
                    </button>
                </div>
                <div className='flex md:hidden gap-x-2 items-center'>
                    <button
                        onClick={() => router.push('/')}
                        className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'
                    >
                        <HiHome size={20} className='text-black' />
                    </button>
                    <button
                        onClick={() => router.push('/search')}
                        className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'
                    >
                        <BiSearch size={20} className='text-black' />
                    </button>
                </div>
                <div className='flex justify-between items-center gap-x-4'>
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button
                                onClick={handleLogout}
                                className=" bg-white px-6 py-2"
                            >
                                Logout
                            </Button>
                            <Button
                                onClick={() => router.push('/account')}
                                className=" bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className='bg-transparent text-neutral-300 font-medium'
                                >
                                    Sign up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className='bg-white px-6 py-2'
                                >
                                    Login
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;