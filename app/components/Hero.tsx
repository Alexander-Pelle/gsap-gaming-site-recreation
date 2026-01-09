"use client";
import { useState, useRef, useEffect } from "react"
import VideoPreview from "./VideoPreview";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [hasClickedVideo, setHasClickedVideo] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideosCount, setLoadedVideosCount] = useState(0);
    const [bgVideoIndex, setBgVideoIndex] = useState(1);
    const totalVideos = 4;

    const nextVideoRef = useRef<HTMLVideoElement>(null);

    const handleVideoLoad = () => {
        setLoadedVideosCount((prevCount) => prevCount + 1);
    }
    const handleMiniVideoClick = () => {
        setHasClickedVideo(true);
        // (prevIndex % totalVideos) gives us the 1 - 4 loop
        setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1); 

    }

    useEffect(() =>  {
        if (loadedVideosCount === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideosCount])

    useEffect(() => {
        const checkCachedVideos = () => {
            const videos = document.querySelectorAll('video');
            let readyCount = 0;
            
            videos.forEach((video) => {
                if (video.readyState >= 3) {
                    readyCount++;
                }
            });
            
            if (readyCount >= 3) {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(checkCachedVideos, 100);
        return () => clearTimeout(timer);
    }, [])

    useGSAP(() => {
        if (hasClickedVideo) {
            gsap.set("#next-video", {
                visibility: "visible",
                scale: 0.5,
                width: "16rem",
                height: "16rem"
            });
            gsap.to('#next-video', {
                transformOrigin: "center center",
                scale: 1,
                width: "100%",
                height: "100%",
                duration: 1,
                ease: "power1.inOut",
                onStart: () => {
                    (nextVideoRef.current as HTMLVideoElement)?.play();
                },
                onComplete: () => {
                    setBgVideoIndex(currentIndex);
                }
            })
            gsap.from("#current-video", {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.5,
                ease: "power1.inOut",
            })
        }
    }, {
        dependencies: [currentIndex] , 
        revertOnUpdate: true}
    );

    useGSAP(() => {
        gsap.set("#hero-video-frame", {
            clipPath: "polygon(14% 0%, 72% 0%, 88% 90%, 0% 95%)",
            borderRadius: "0% 0% 40% 10%",
        });

        gsap.from("#hero-video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0 0 0 0",
            ease: "power1.inOut",

            scrollTrigger: {
                trigger: "#hero-video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            }
        })
    })

    const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;
    
    console.log("comp mount")
    return (
        <div id="hero" className="
            relative h-dvh w-screen
            overflow-x-hidden">
            {isLoading && (
                <div className="
                    flex-center absolute z-[100] 
                    h-dvh w-screen overflow-hidden 
                    bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                    </div>
                </div>
                
            )}
            <div id="hero-video-frame" 
                className="
                    relative h-dvh w-screen 
                    z-10 overflow-hidden
                    rounded-lg bg-blue-75">
                <div>
                    <div className="
                        mask-clip-path absolute-center absolute
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
                    src={getVideoSrc(bgVideoIndex === totalVideos - 1 ? 1 : bgVideoIndex)}
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

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">
                            redefi<b>n</b>e
                        </h1>

                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Enter the Metagame Layer <br /> Unleash the Play Economy
                        </p>

                        <Button   
                            id="watch-trailer"
                            title="Watch trailer"
                            leftIcon={<TiLocationArrow />}
                            containerClass="bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>

            <h1 className="special-font hero-heading absolute bottom-5 right-5 z-0 text-black">
                G<b>A</b>MING
            </h1>

        </div>
        
    )
}

export default Hero
