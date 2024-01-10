import { ChatInterface } from "./components/ChatInterface";

export default function App() {
  return (
    <>
      <div
        className="bg-babylon-blue-light dark:bg-babylon-blue-dark bg-25% h-dvh bg-center bg-no-repeat"
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
          <h1 className="text-babylon-blue-dark pb-8 pt-8 font-sans text-3xl font-semibold sm:text-xl md:text-3xl lg:text-5xl dark:text-white">
            MICRO - BOT
          </h1>
        </div>

        <ChatInterface />
      </div>
    </>
  );
}
