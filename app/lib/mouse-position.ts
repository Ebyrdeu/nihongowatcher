import React from "react";

const mousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const offLeft = e.currentTarget.offsetLeft;
    const clientX = e.clientX;
    const offWidth = e.currentTarget.offsetWidth;

    return (clientX - offLeft) / offWidth * 100;
};

export {mousePosition};