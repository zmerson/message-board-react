import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-blue-900 w-1/2  text-zinc-200
    shadow-inner 
    drop-shadow-[0_0_30px_rgba(122,117,48,0.25)] 
    p-4 rounded-md
    ${className}`}>
      {children}
    </div>
  );
};

export default Container;
// 