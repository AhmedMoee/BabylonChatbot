import "./App.css";
import { ChatInterface } from "./components/ChatInterface";
import { PopUp } from "./components/PopUp.jsx";
import { StarRating } from "./components/StarRating.jsx";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [hoverStar, setHoverStar] = useState(false);

  let popUpRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!popUpRef.current.contains(e.target)) {
        setButtonPopup(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div
        className="h-dvh bg-babylon-blue-light bg-25% bg-center bg-no-repeat dark:bg-babylon-blue-dark"
        style={{ backgroundImage: "url(src/assets/Babylon_Leaf_White.png)" }}
      >
        <div className="flex items-center justify-center space-x-3">
          <a
            className="inline-block w-2/5 md:w-1/5 lg:w-1/5"
            href="https://babylonmicrofarms.com/"
            target="_blank"
          >
            <picture alt="logo">
              <source
                srcSet="/src/assets/Babylon-Logo-White.png"
                media="(prefers-color-scheme:dark)"
              />
              <img src="/src/assets/Babylon-Logo.png" />
            </picture>
          </a>
          <h1 className="pb-8 pt-8 font-sans text-3xl font-semibold text-babylon-blue-dark sm:text-xl md:text-3xl lg:text-5xl dark:text-white">
            MICRO - BOT
          </h1>
        </div>

        <ChatInterface />

        <div
          ref={popUpRef}
          className="h-18 top-7/8 fixed w-dvw bg-babylon-blue-dark p-5 sm:left-0 sm:top-0 sm:h-dvh sm:w-auto md:left-0 md:top-0 md:h-dvh md:w-auto lg:left-0 lg:top-0 lg:h-dvh lg:w-auto"
        >
          <div className="flex flex-row items-start sm:flex-col sm:items-center md:flex-col md:items-center lg:flex-col lg:items-center">
            <button
              onMouseEnter={() => setHoverStar(true)}
              onMouseLeave={() => setHoverStar(false)}
              onClick={() => setButtonPopup(!buttonPopup)}
            >
              <img
                className="h-8 w-8 md:h-12 md:w-12 lg:h-12 lg:w-12"
                src={
                  hoverStar
                    ? "/src/assets/filled-star.png"
                    : "/src/assets/star.png"
                }
                alt="logo"
              />
            </button>

            <a
              className="mt-0 ml-7 sm:mt-8 sm:ml-0 md:mt-8 md:ml-0 lg:mt-8 lg:ml-0 text-white ring-2 ring-white rounded px-3 py-1 md:px-4 md:py-2 lg:px-4 lg:py-2 hover:bg-white hover:text-babylon-blue-dark transition-colors"
              href="https://babylonmicrofarms.com/faq/"
              target="_blank"
            >
              FAQ
            </a>
          </div>
        </div>

        <PopUp trigger={buttonPopup} onClose={() => setButtonPopup(false)}>
          <h3 className="flex justify-center text-babylon-blue-dark">
            Rate Micro-Bot!
          </h3>
          <StarRating />
        </PopUp>
      </div>
    </>
  );
}
