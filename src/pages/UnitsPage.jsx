import { motion } from "motion/react";
import { AnimatedBackground } from "./AnimatedBackground";
import { AnimatedCharacter } from "./AnimatedCharacter";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const units = [
  { id: 1, path: "/unit/One/lesson/1", color: '#6a3996', name: 'Unit One' },
  { id: 2, path: "/unit/Two/lesson/1", color: '#6a3996', name: 'Unit Two' },
  { id: 3, path: "/unit/Three/lesson/1", color: '#6a3996', name: 'Unit Three' },
  { id: 4, path: "/unit/Four/lesson/1", color: '#6a3996', name: 'Unit Four' },
];

export default function UnitsPage({ onUnitSelect }) {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Animated Character */}
      <AnimatedCharacter />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-12 text-center relative z-10"
        style={{ color: '#284660' }}
      >
        Choose a Unit
      </motion.h1>

      {/* Units Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl w-full relative z-10">
        {units.map((unit, index) => (
          <motion.button
            key={unit.id}
            onClick={() => navigate(unit.path)}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group flex items-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Colored Icon Background */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: unit.color }}
            >
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            {/* Text */}
            <div className="flex-1 text-left">
              <div
                className="text-2xl sm:text-3xl font-semibold"
                style={{ color: unit.color }}
              >
                {unit.name}
              </div>
            </div>

            {/* Arrow */}
            <motion.div
              className="text-gray-300 group-hover:text-gray-400"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl"
              style={{ backgroundColor: unit.color }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
