import React from 'react';

interface HeroProps {
  title: string;
  description: string;
}

export const Hero: React.FC<HeroProps> = ({ title, description }) => {
  return (
    <div className="mx-auto flex h-[40vh] max-w-screen-xl flex-col items-center justify-center py-12 text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-[80px]">{title}</h1>
      <p className="textSubtle max-w-xl text-2xl">{description}</p>
    </div>
  );
};
