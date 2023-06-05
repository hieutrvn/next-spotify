"use client";

import * as RadixSlider from "@radix-ui/react-slider"
import { ReactElement } from "react";

interface SongSliderProps {
    value?: number
    max?: number
    onChange?: (value: number) => void
}

const SongSlider: React.FC<SongSliderProps> = ({
    value = 1,
    max,
    onChange
}) => {
    const handleChange = (newValue: any) => {
        onChange?.(newValue)
    }

    return (
        <RadixSlider.Root
            className=" relative flex items-center  select-none touch-none w-full"
            defaultValue={[0]}
            value={[value]}
            onValueChange={handleChange}
            max={max}
            step={0.1}
            aria-label="Song"
        >
            <RadixSlider.Track
                className=" bg-neutral-600 relative grow rounded-full h-[3px]"
            >
                <RadixSlider.Range
                    className=" absolute bg-white rounded-full h-full"
                />
            </RadixSlider.Track>
        </RadixSlider.Root>
    );
}

export default SongSlider;