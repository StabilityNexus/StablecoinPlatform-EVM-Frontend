"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function HeroText() {
    const [titleNumber, setTitleNumber] = useState(0);
    const titles = useMemo(
        () => [
            "Decentralized", 
            "Autonomous", 
            "Permissionless", 
            "Transparent", 
            "Fully Crypto Backed", 
            "Anything-Pegged"
        ],
        []
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (titleNumber === titles.length - 1) {
                setTitleNumber(0);
            } else {
                setTitleNumber(titleNumber + 1);
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);

    return (
        <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <div className="flex flex-col items-center">
                <div className="text-center">
                    <span className="relative inline-block h-[1.3em] text-center w-full">
                        {titles.map((title, index) => (
                            <motion.span
                                key={index}
                                className="absolute inset-0 flex items-center justify-center font-bold whitespace-nowrap"
                                initial={{ opacity: 0, y: 50 }}
                                transition={{ type: "spring", stiffness: 60, damping: 25 }}
                                animate={
                                    titleNumber === index
                                        ? {
                                            y: 0,
                                            opacity: 1,
                                        }
                                        : {
                                            y: titleNumber > index ? -50 : 50,
                                            opacity: 0,
                                        }
                                }
                            >
                                <span className="text-primary">{title}</span>
                            </motion.span>
                        ))}
                    </span>
                </div>
                <div className="mt-2">
                    <span className="block font-bold">Stablecoins</span>
                </div>
            </div>
        </h1>
    );
}

export { HeroText };
