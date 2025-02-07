import React from 'react';
import { motion } from "framer-motion";

interface DecorativeProps {
  top: string;
  left: string;
  transform: string;
}

const FlowerSVG: React.FC<DecorativeProps> = ({top, left, transform}) => (
  <svg width="40" height="40" viewBox="0 0 40 40" className="absolute" style={{top, left, transform}}>
    <g className="opacity-40">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <path
          key={angle}
          d="M20 15 Q 20 5, 25 0 Q 20 5, 20 15"
          fill="#FB4EB4"
          transform={`rotate(${angle} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="4" fill="#FF9CF2"/>
    </g>
  </svg>
);

const SmallFlowerSVG: React.FC<DecorativeProps> = ({top, left, transform}) => (
  <svg width="20" height="20" viewBox="0 0 20 20" className="absolute" style={{top, left, transform}}>
    <g className="opacity-30">
      <circle cx="10" cy="10" r="3" fill="#FB4EB4"/>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d="M10 7 Q 10 4, 13 3 Q 10 4, 10 7"
          fill="#FF9CF2"
          transform={`rotate(${angle} 10 10)`}
        />
      ))}
    </g>
  </svg>
);

export const ContactSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      id="contact"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mt-16 py-16 px-8 bg-gradient-to-br from-pink-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(6)].map((_, i) => (
          <FlowerSVG 
            key={`flower-lg-${i}`}
            top={`${Math.random() * 100}%`}
            left={`${Math.random() * 100}%`}
            transform={`rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.4})`}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <SmallFlowerSVG 
            key={`flower-sm-${i}`}
            top={`${Math.random() * 100}%`}
            left={`${Math.random() * 100}%`}
            transform={`rotate(${Math.random() * 360}deg) scale(${0.6 + Math.random() * 0.4})`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center space-y-2 mb-8"
        >
          <h2 className="text-5xl text-pink-500 pacifico-regular">
            Contact Us
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-300 to-pink-500 rounded-full"/>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="max-w-lg mx-auto bg-white/80 backdrop-blur-sm p-10 rounded-xl shadow-xl"
        >
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 mb-8 dm-sans-regular text-center"
          >
            Have questions or need help? 
            <br />
            <span className="text-pink-500">We'd love to hear from you!</span>
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="space-y-6 dm-sans-regular"
          >
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg hover:bg-pink-50 transition-colors duration-300">
              <span className="text-2xl text-pink-400">✉</span>
              <p className="text-lg text-gray-700">
                <strong className="dm-sans-bold">Email:</strong>
                <span className="ml-2 text-pink-500">croche@example.com</span>
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg hover:bg-pink-50 transition-colors duration-300">
              <span className="text-2xl text-pink-400">☎</span>
              <p className="text-lg text-gray-700">
                <strong className="dm-sans-bold">Phone:</strong>
                <span className="ml-2 text-pink-500">+123 456 7890</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};