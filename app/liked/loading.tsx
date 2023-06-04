"use client";

import { ScaleLoader } from "react-spinners";

import Box from "@/components/Box";

const Loading = () => {
    return (
        <Box className="h-full flex items-center justify-center">
            <ScaleLoader color="#22c55e" height={50} width={6} radius={4} />
        </Box>
    );
}

export default Loading;