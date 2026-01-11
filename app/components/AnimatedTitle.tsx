import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  title: string;
  containerClass?: string;
}

const renderLine = (line: string, lineIndex: number) => {
  const words = line.split(" ");
  
  return (
    <div
      key={lineIndex}
      className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
    >
      {words.map((word, wordIndex) => renderWord(word, wordIndex))}
    </div>
  );
};

const renderWord = (word: string, wordIndex: number) => {
  return (
    <span
      key={wordIndex}
      className="animated-word"
      dangerouslySetInnerHTML={{ __html: word }}
    />
  );
};

const AnimatedTitle = ({ title, containerClass }: AnimatedTitleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const context = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        }
      });
      
      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
        ease: "power1.inOut",
        stagger: 0.02,
      }, 0);
    }, containerRef)

    return () => context.revert();
  }, [])
  
  const lines = title.split("<br />");
  
  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {lines.map((line, index) => renderLine(line, index))}
    </div>
  );
}


export default AnimatedTitle
