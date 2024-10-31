"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const words = [
  { text: "LEAD.", color: "#FC4B67" },
  { text: "INSPIRE.", color: "#009ACB" },
  { text: "THRIVE.", color: "#844BFC" },
];

export default function Login() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center h-screen">
        <div className="w-full">
          <div className="w-full flex justify-between">
            <div className="w-[825px]">
              <h1 className="ml-8 mt-[209px] text-5xl font-bold leading-[80px]">
                Take Control of Your Gym Business to{" "}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                    style={{ color: words[currentWordIndex].color }}
                  >
                    {words[currentWordIndex].text}
                  </motion.span>
                </AnimatePresence>
              </h1>
              <p className="ml-8 text-base font-medium">
                Simplify your gym operations and accelerate your growth with our
                platform.
              </p>
              <button
                className="ml-8 w-[207px] h-[44px] text-sm text-white font-extrabold mt-5 rounded-[45px]"
                style={{
                  background:
                    "linear-gradient(90deg, #8C76DC 0%, #7255DD 49.5%, #4E27DF 100%)",
                }}
                onClick={() => router.push("/register")}
              >
                Get Started &nbsp;-&gt;
              </button>
            </div>
            <Image
              className="mt-[160px] border border-l-1 border-b-[3px] border-t-0 border-[#8671D4] rounded-xl px-0 shadow-md"
              src="/dashboard.png"
              width={638}
              height={444}
              alt="dashboard"
            />
          </div>
        </div>
      </div>
    </>
  );
}
