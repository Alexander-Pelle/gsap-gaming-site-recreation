"use client";

import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import clsx from "clsx";

import gsap from "gsap";
const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];


const NavBar = () => {
  const [isAudioPlaying, setisAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const {y: currentY} = useWindowScroll();
  const [isNavVisisble, setIsNavVisisble] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (currentY === 0) {
      setIsNavVisisble(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } 
    else if (currentY > lastScrollY) {
      setIsNavVisisble(false);
      navContainerRef.current?.classList.add("floating-nav");
    } 
    else if (currentY < lastScrollY) {
      setIsNavVisisble(true);
      navContainerRef.current?.classList.add("floating-nav");
    }
    setLastScrollY(currentY);
  }, [currentY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisisble ? 0 : -100,
      opacity: isNavVisisble ? 1 : 0,
      duration: 0.2,
    })
  }, [isNavVisisble])
  

  const toggleAudio = () => {
    setisAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (audioElementRef.current) {
      if (isAudioPlaying) {
        audioElementRef.current.play();
      } else {
        audioElementRef.current.pause();
      }
    }
  }, [isAudioPlaying]);

  
  return (
    <div 
      id="nav-container" 
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 
        border-none transition-all duration-700
        sm:inset-x-6"
    >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              <a href="/" className="flex items-center" aria-label="Zentry Home">
                <span className="text-4xl italic font-black font-zentry uppercase tracking-wider text-white">
                  ZENTRY
                </span>
                <span className="sr-only">Zentry Home</span>
              </a>
              <Button 
                id="product-button" title="Products" 
                rightIcon={<TiLocationArrow />} 
                containerClass="bg-violet-50 md:flex hidden items-center justify-center gap-1"
              />
            </div>

            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map((item, index) => (
                  <a 
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn">
                      {item}
                    </a>
                ))}
              </div>

              <button className="ml-10 flex items-center space-x-0.5 cursor-pointer"
              onClick={toggleAudio}>
                <audio ref={audioElementRef} src="/audio/loop.mp3" loop className="hidden"  />
                {[1,2,3,4].map((bar) => (
                    <div
                      key={bar}
                      className={clsx("indicator-line", {
                        "active": isIndicatorActive,
                      })}
                      style={{
                        animationDelay: `${bar * 0.1}s`,
                      }}
                    />
                ))}
              </button>

            </div>
          </nav>
        </header>
      </div>
    );
  };

  export default NavBar;
