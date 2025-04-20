import React from 'react';

interface HeroProps {
  title: string;
  description: string;
}

export const Hero: React.FC<HeroProps> = ({ title, description }) => {
  return (
    <div className="mx-auto flex h-[40vh] max-w-screen-lg flex-col items-center justify-center py-8 text-center md:py-12">
      <h1 className="displayPrimary mb-4 text-gray-800 ">{title}</h1>
      <p className="textSubtle max-w-xl text-xl md:text-2xl">{description}</p>
    </div>
  );
};
