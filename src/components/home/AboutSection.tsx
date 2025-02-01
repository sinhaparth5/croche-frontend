import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-16 py-12 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-4xl font-bold text-center text-pink-400 mb-6">
        About Us
      </h2>
      <p className="text-center text-lg text-gray-600 px-4 sm:px-12">
        At Croche By Amisha, we pride ourselves on creating beautiful,
        handcrafted crochet items. Our mission is to bring joy and style to
        your life with unique and sustainable products.
      </p>
    </motion.section>
  );
};
