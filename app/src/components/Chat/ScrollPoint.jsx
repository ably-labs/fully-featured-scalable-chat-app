import React, { useEffect, useRef } from "react";

export const ScrollPoint = ({ watch }) => {
    const marker = useRef(null);

    useEffect(() => {
        marker.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [watch]);

    return (<li ref={marker} className="end-message"></li>);
};

export default ScrollPoint;