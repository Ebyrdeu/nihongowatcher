import {useEffect, useState} from "react";

export const useIdle = (idleTime: number = 3000): boolean => {
    const [isIdle, setIsIdle] = useState<boolean>(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        const isMouseOverSomeElement = ({target}: MouseEvent) => {
            const element = (target as Element).className;
            const tag = (target as Element).tagName;

            if (tag === "svg" || tag === "path" || tag === "button") return setIsIdle(false);
            if (element.includes("controls")) return setIsIdle(false);


            return setIsIdle(true);
        };

        const handleMouseMove = (e: MouseEvent) => {
            clearTimeout(timer);
            setIsIdle(false);
            timer = setTimeout(() => isMouseOverSomeElement(e), idleTime);
        };

        const handleMouseOut = () => {
            clearTimeout(timer);
            setIsIdle(false);
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [idleTime]);

    return isIdle;
};