import { motion } from "framer-motion";

export const ContactSection = () => {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-16 py-12 bg-gray-200 rounded-lg shadow-md"
    >
      <h2 className="text-4xl font-bold text-center text-pink-400 mb-6">
        Contact Us
      </h2>
      <div className="text-center">
        <p className="text-lg text-gray-600 mb-4">
          Have questions or need help? We'd love to hear from you!
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <strong>Email:</strong> croche@example.com
        </p>
        <p className="text-lg text-gray-600">
          <strong>Phone:</strong> +123 456 7890
        </p>
      </div>
    </motion.section>
  );
};