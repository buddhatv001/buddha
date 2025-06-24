import { useEffect, useRef } from "react";

const EvadevAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;
    // Remove any previous script to avoid duplicates
    adRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://curoax.com/na/waWQiOjEyMDA2NDksInNpZCI6MTUyMDk3MCwid2lkIjo3MTQyNzQsInNyYyI6Mn0=eyJ.js";
    adRef.current.appendChild(script);

    // Cleanup
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={adRef}
      className="w-full flex justify-center items-center my-4"
      style={{ minHeight: 250 }}
    />
  );
};

export default EvadevAd;
