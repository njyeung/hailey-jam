import React from 'react';

interface AboutMeProps {
  onBack: () => void;
}

export default function AboutMe({ onBack }: AboutMeProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <button 
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-700 self-start"
      >
        ← Back
      </button>
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl text-white font-chewy">About Me Page</h1>
      </div>
    </div>
  );
}