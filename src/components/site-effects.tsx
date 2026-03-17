"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function SiteEffects() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const ringPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${event.clientX - 6}px, ${event.clientY - 6}px)`;
      }
    };

    let frame = 0;
    const animateRing = () => {
      ringPosition.current = {
        x: ringPosition.current.x + (mousePosition.current.x - ringPosition.current.x) * 0.12,
        y: ringPosition.current.y + (mousePosition.current.y - ringPosition.current.y) * 0.12,
      };

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosition.current.x - 18}px, ${ringPosition.current.y - 18}px)`;
      }

      frame = window.requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frame = window.requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const revealed = new Set<Element>();
    const animatedBars = new Set<Element>();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting || revealed.has(entry.target)) {
            return;
          }

          window.setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 80);

          revealed.add(entry.target);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || animatedBars.has(entry.target)) {
            return;
          }

          const width = entry.target.getAttribute("data-width");
          window.setTimeout(() => {
            (entry.target as HTMLElement).style.width = `${width}%`;
          }, 300);

          animatedBars.add(entry.target);
          barObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.remove("visible");
      revealObserver.observe(element);
    });

    document.querySelectorAll<HTMLElement>(".skillFill").forEach((element) => {
      element.style.width = "0";
      barObserver.observe(element);
    });

    return () => {
      revealObserver.disconnect();
      barObserver.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursorRing" ref={ringRef} />
    </>
  );
}
