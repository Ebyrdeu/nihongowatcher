import {useEffect, useState} from "react";

export const useIdle = (idleTime: number = 1500): boolean => {
    const [isIdle, setIsIdle] = useState<boolean>(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const handleMouseMove = () => {
            clearTimeout(timer);
            setIsIdle(false);
            timer = setTimeout(() => setIsIdle(true), idleTime);
        };

        const handleMouseOut = () => {
            clearTimeout(timer);
            setIsIdle(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [idleTime]);

    return isIdle;
};