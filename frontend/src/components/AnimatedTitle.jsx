import { useState, useEffect } from "react";
import "./AnimatedTitle.css";

const AnimatedTitle = ({
    text,
    emojis = ["✨"],
    interval = 1000,
}) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % emojis.length);
        }, interval);

        return () => clearInterval(timer);
    }, [emojis.length, interval]);

    return (
        <h1 className="animated-title">
            {text}{" "}
            <span
                key={index}
                className="animated-emoji"
            >
                {emojis[index]}
            </span>
        </h1>
    );
};

export default AnimatedTitle;