import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button"

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Stop Searching. Start Thinking.
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Thinkify provides guided, Socratic hints for your CS assignments—never direct answers. Build the skills that matter.
          </p>
          <Link to="/dsa">
            <Button size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-lg shadow-teal-500/20 transform hover:scale-105">
              Explore Subjects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
