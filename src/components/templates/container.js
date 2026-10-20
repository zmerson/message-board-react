import React from 'react';
const Container = ({ children, className = '' }) => {
    return (React.createElement("div", { className: `bg-blue-900 w-1/2  text-zinc-200
    shadow-inner 
    drop-shadow-[0_0_30px_rgba(122,117,48,0.25)] 
    p-4 rounded-md
    ${className}` }, children));
};
export default Container;
// 
