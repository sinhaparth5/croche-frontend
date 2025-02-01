import { motion } from "framer-motion";

const features = [
  {
    title: "Custom Orders",
    description: "Want something unique? We take custom orders!",
  },
  {
    title: "Quality Materials",
    description: "Only the finest yarns and materials used.",
  },
  {
    title: "Made with Care",
    description: "Each item is carefully crafted by hand.",
  },
] as const;

export const FeaturesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-lg shadow-md text-center"
        >
          <h3 className="text-2xl font-semibold text-pink-400 mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};