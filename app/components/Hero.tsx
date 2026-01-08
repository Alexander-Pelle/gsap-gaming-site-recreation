"use client";
import { useState, useRef, useEffect } from "react"
import VideoPreview from "./VideoPreview";
const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [hasClickedVideo, setHasClickedVideo] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideosCount, setLoadedVideosCount] = useState(0);
    const totalVideos = 4;

    const nextVideoRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideosCount((prevCount) => prevCount + 1);
    }
    const handleMiniVideoClick = () => {
        setHasClickedVideo(true);
        // (prevIndex % totalVideos) gives us the 1 - 4 loop
        setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1); 

    }

    useEffect(() =>  {
        if (loadedVideosCount === totalVideos) {
            setIsLoading(false);
        }

    }, [loadedVideosCount])


    const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;
    return (
        <div id="hero" className="
            relative
            h-dvh
            w-screen
            overflow-x-hidden
            ">

            <div id="hero-video-frame" 
                className="
                    relative h-dvh w-screen 
                    z-10 overflow-hidden
                    rounded-lg bg-blue-75">
                <div className="
                    hero-mask-clip-path absolute-center absolute
                    z-50 size-64 overflow-hidden
                    cursor-pointer rounded-lg">

                        <div onClick={handleMiniVideoClick}
                            className="
                                origin-center scale-50 opacity-0 
                                transition-all duration-500 ease-in 
                                hover:scale-100 hover:opacity-100">
                            <video 
                                ref={nextVideoRef} 
                                loop
                                muted
                                id="current-video"
                                className="
                                    size-64 origin-center scale-150 
                                    object-cover object-center"
                                src={getVideoSrc((currentIndex % totalVideos) + 1)} 
                                onLoadedData={handleVideoLoad} 
                            />
                        </div>
                </div>
                <video 
                    ref={nextVideoRef}
                    src={getVideoSrc(currentIndex)}
                    loop
                    muted
                    id="next-video"
                    className="
                        absolute-center invisible absolute z-20 size-64 
                        object-cover object-center"
                    onLoadedData={handleVideoLoad} 
                />

                <video 
                    src={getVideoSrc(currentIndex  === totalVideos - 1 ? 1 : currentIndex )}
                    autoPlay
                    loop
                    muted
                    className="
                        absolute left-0 top-0 size-full 
                        object-cover object-center"
                    onLoadedData={handleVideoLoad} 
                />
            </div>

            <h1 className="
                special-font hero-heading
                absolute bottom-5 right-5 z-40 
                text-blue-75">
                G<b>A</b>MING
            </h1>

        
        </div>
    )
}

export default Hero
