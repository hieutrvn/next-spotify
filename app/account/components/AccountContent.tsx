"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import Button from "@/components/Button";
import Link from "next/link";

const AccountContent = () => {
    const router = useRouter();
    const { isLoading, subscription, user } = useUser();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    return (
        <div className="mb-7 px-6">
            <div className="flex flex-col gap-y-4">
                <p className=' text-white text-2xl font-semibold'>Profile</p>
                <Button className="w-[300px]">
                    <Link
                        href="https://www.instagram.com/hieutranhamchoi/"
                        target="blank"
                    >
                        Subscribe
                    </Link>
                </Button>
            </div>

        </div>
    );
}

export default AccountContent;