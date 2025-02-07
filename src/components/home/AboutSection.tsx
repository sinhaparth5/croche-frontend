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
      {[0, 72, 144, 216, 288].map((angle) => (
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

export const AboutSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.section
      id="about"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mt-16 py-16 px-8 bg-gradient-to-br from-pink-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(12)].map((_, i) => (
          <FlowerSVG 
            key={`flower-${i}`}
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
            About Us
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-300 to-pink-500 rounded-full"/>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-10 rounded-xl shadow-xl"
        >
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dm-sans-regular text-center leading-relaxed"
          >
            At <span className="text-pink-500 pacifico-regular">Croche By Amisha</span>, we pride ourselves on creating beautiful, handcrafted crochet items. Our mission is to bring joy and style to your life with unique and sustainable products.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: "Handcrafted", desc: "Each piece made with love and care" },
              { title: "Unique", desc: "One-of-a-kind designs just for you" },
              { title: "Sustainable", desc: "Eco-friendly materials and practices" }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-pink-50 transition-all duration-300">
                <h3 className="text-pink-500 pacifico-regular text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 dm-sans-regular">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};