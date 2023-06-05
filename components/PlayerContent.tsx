"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikedButton from "./LikedButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiArrowPathRoundedSquare } from "react-icons/hi2"
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi"
import { TbArrowsShuffle } from "react-icons/tb"
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import SongSlider from "./SongSlider";

interface PlayerContentProps {
    song: Song
    songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const player = usePlayer()
    const [volume, setVolume] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)
    const [time, setTime] = useState({
        min: '',
        sec: ''
    });
    const [currTime, setCurrTime] = useState({
        min: '',
        sec: ''
    });
    const [seconds, setSeconds] = useState();
    const [isLooping, setIsLooping] = useState(false)


    const Icon = isPlaying ? BsPauseFill : BsPlayFill
    const VolumeIcon = volume === 0 ? HiVolumeOff : HiVolumeUp

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const nextSong = player.ids[currentIndex + 1]

        if (!nextSong) {
            return player.setId(player.ids[0])
        }

        player.setId(nextSong)
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const previousSong = player.ids[currentIndex - 1]

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1])
        }

        player.setId(previousSong)
    }

    const [play, { pause, sound, duration }] = useSound(
        songUrl, {
        volume: volume,
        loop: isLooping,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false)
            if (isLooping) {
                play();
            } else {
                onPlayNext();
            }
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3'],
    }
    )

    useEffect(() => {
        sound?.play()

        return () => {
            sound?.unload()
        }
    }, [sound])

    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = Math.floor(sec / 60).toString();
            const secRemain = Math.floor(sec % 60).toString().padStart(2, '0');
            setTime({
                min: min,
                sec: secRemain
            });
        }
    }, [isPlaying]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60).toString();
                const sec = Math.floor(sound.seek([]) % 60).toString().padStart(2, '0');
                setCurrTime({
                    min,
                    sec
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) {
            play()
        } else {
            pause()
        }
    }

    const toggleLoop = () => {
        setIsLooping(!isLooping);
    };


    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }

    return (
        <div className=" grid grid-cols-2 md:grid-cols-3 h-full">
            <div className=" flex w-full justify-start">
                <div className=" flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikedButton songId={song.id} />
                </div>
            </div>
            <div className=" flex md:hidden col-auto w-full justify-end items-center gap-x-6">
                <AiFillStepBackward
                    onClick={onPlayPrevious}
                    size={25}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
                <div
                    onClick={handlePlay}
                    className=" h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
                >
                    <Icon size={30} className=" text-black" />
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={25}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>

            <div className="hidden h-full md:flex flex-col gap-y-3 max-w-[722px] ">
                <div className="flex justify-center items-center w-full gap-x-6">
                    <TbArrowsShuffle
                        onClick={() => { }}
                        size={20}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />

                    <AiFillStepBackward
                        onClick={onPlayPrevious}
                        size={25}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                    <div
                        onClick={handlePlay}
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-white p-1 cursor-pointer">
                        <Icon size={25} className="text-black" />
                    </div>
                    <AiFillStepForward
                        onClick={onPlayNext}
                        size={25}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />

                    <HiArrowPathRoundedSquare
                        onClick={toggleLoop}
                        size={20}
                        className={`text-neutral-400 cursor-pointer hover:text-white transition 
                        ${isLooping ? "text-green-600" : ""}`}
                    />
                </div>
                <div className="flex relative justify-between items-center w-full gap-x-3">
                    <p className=" absolute left-[-45px]">
                        {duration ? (`${currTime.min}:${currTime.sec}`) : `-:--`}
                    </p>
                    <SongSlider
                        value={seconds}
                        max={duration ? duration / 1000 : 0}
                        onChange={(newValue) => {
                            sound.seek(newValue);
                        }}
                    />
                    <p className="absolute right-[-45px]">
                        {duration ? (`${time.min}:${time.sec}`) : `-:--`}
                    </p>

                </div>
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        className="cursor-pointer"
                        size={25}
                    />
                    <Slider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default PlayerContent;