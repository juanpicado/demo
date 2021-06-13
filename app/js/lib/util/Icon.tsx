import React from "react";

export const ChevronLeft =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="15 18 9 12 15 6" /></svg>';
export const ChevronRight =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="9 18 15 12 9 6" /></svg>';

interface IconProps {
    name: string;
    icon: string;
}

export const Icon: React.FC<IconProps> = ({ name, icon }) => {
    return <span className={`icon icon-${name}`} dangerouslySetInnerHTML={{ __html: icon }} />;
};
