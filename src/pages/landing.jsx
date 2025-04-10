import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import animationData from "../Main Scene.json"
import boat from '../assets/boat.png'


const PinnedAnimationCard = () => {
  return (
    <div className="absolute right-[7vw] top-[15vh] size-80 w-[30vw] p-6 bg-gray-100 rounded-lg shadow-lg rotate-/2">
      {/* Pushpin Icon */}
      <div className="absolute top-[20px] left-1/2 transform -translate-x-1/2">
        📌  <img src={boat} alt="boat" className="w-[180px] h-[180px] relative top-2" />
      </div>

       <div className="flex justify-center">
        <Lottie animationData={animationData} loop={true} className="w-65 h-65 relative" />
      </div>
    </div>
  );
};

const AnimatedQuote = () => (
    <div className="absolute top-40 left-12 sm:right-16 md:right-24 lg:right-32 
                    w-full sm:w-3/4 md:w-2/3 lg:w-1/2 
                    text-black z-10 flex flex-col items-end">
    <TypeAnimation
      sequence={[
        'Education is your map to an\n',
        1000,
        'Education is your map to an\n uncharted future! Conquer\n',
        1000,
        'Education is your map to an \n uncharted future! Conquer\n tomorrow by preparing today!',
        1000,
      ]}
      wrapper="pre"
      speed={50}
      style={{
        fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
        display: 'block',
        whiteSpace: 'pre-line',
        textAlign: 'right',
        lineHeight: '1.6',
        fontFamily: "'Playfair Display', serif",
        fontWeight: '500',
        letterSpacing: '0.02em',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(45deg, #222, #555)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      repeat={Infinity}
    />
  </div>
);

const Landing = () => {
  return (
      <div className="w-screen h-screen bg-white relative">
      {/* Title */}
        <div className="absolute top-8 left-10 sm:left-10 md:left-16 text-blue-600 text-4xl md:text-5xl font-bold z-10">
        Ed Venture
      </div>

      <AnimatedQuote />
      <PinnedAnimationCard />
      {/* Get Started Button */}
        <div className="absolute bottom-10 right-5 sm:bottom-16 sm:right-10 flex justify-end">
        <Link to='/home'>
            <button 
              className="absolute right-[75vw] bottom-[7vh] w-48 sm:w-56 md:w-64 h-12 sm:h-14 md:h-16
                         bg-gray-500 rounded-full flex items-center justify-center
                         text-white text-xl sm:text-2xl md:text-3xl
                         hover:bg-gray-600 transition-colors shadow-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};


export default Landing;