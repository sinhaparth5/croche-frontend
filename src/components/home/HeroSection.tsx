import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h1 className="text-5xl font-bold text-pink-400 mb-6">
        Handmade with Love
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Discover our beautiful collection of handcrafted crochet items.
      </p>
      <a
        href="/shop"
        className="inline-block px-6 py-3 bg-pink-400 text-white font-semibold rounded-lg shadow-md hover:bg-pink-500 transition duration-300"
      >
        Shop Now
      </a>
    </motion.div>
  );
};