import { motion } from 'motion/react';
import { useState } from 'react';
import { Home, PlayCircle, ClipboardCheck, MessageSquare } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { AnimatedCharacter } from './AnimatedCharacter';
import { useNavigate, useParams } from 'react-router-dom';
import StoryWrapper from './StoryWrapper';
import logo from "../assets/PreissMurphy Logo-BGSDEhSA (1).svg";

const lessons = [
  { number: 1, color: '#1E3A8A', name: 'LESSON ONE' },
  { number: 2, color: '#9333EA', name: 'LESSON TWO' },
  { number: 3, color: '#06B6D4', name: 'LESSON THREE' },
];

export default function VideoPlayerPage() {
  const navigate = useNavigate();
  const { unitId, lessonId } = useParams();
  const [currentLesson, setCurrentLesson] = useState(Number(lessonId) || 1);

  const handleLessonSelect = (lessonNumber) => {
    setCurrentLesson(lessonNumber);
    navigate(`/unit/${unitId}/lesson/${lessonNumber}`);
  };

  const handleBackToUnits = () => {
    navigate('/UnitsPage');
  };

  const handleQuizClick = () => {
    navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
  };

  const handleFeedbackClick = () => {
    navigate(`/unit/${unitId}/lesson/${lessonId}/feedback`);
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden flex flex-col">
      <AnimatedBackground />
      <AnimatedCharacter />

      {/* Decorative stars */}
      <motion.div
        className="absolute top-10 left-10 text-orange-400 text-2xl z-0"
        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="absolute top-20 right-20 text-orange-400 text-xl z-0"
        animate={{ rotate: [0, -360], scale: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        ⭐
      </motion.div>

      {/* Main Content Area - Video Player */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <StoryWrapper />
          </motion.div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full h-[2px] bg-white/30 relative z-10"></div>

      <motion.div
        className="relative z-10 py-4 sm:py-5 px-4 sm:px-6 bg-white border-t-[1px] border-t-black border-t-solid"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-center gap-4">

          {/* LEFT SECTION - Logo */}
          <img
            src={logo}
            alt="J1 Logo"
            style={{ height: "40px", width: "100px" }}
          />

          {/* CENTER SECTION - Units Button */}
          <motion.button
            onClick={handleBackToUnits}
            className="ml-44 px-4 py-2 rounded-xl border font-medium transition-all duration-200 text-sm flex items-center gap-4"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50 text-base" />
            <span className="border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50 text-base">Units</span>
          </motion.button>

          {/* RIGHT SECTION - Lesson, Quiz & Feedback Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 ml-52"
          >
            {/* Lesson Buttons */}
            {lessons.map((l) => (
              <button
                key={l.number}
                onClick={() => handleLessonSelect(l.number)}
                className={`px-4 py-2 rounded-xl border font-medium text-sm flex items-center gap-2 ${
                  Number(lessonId) === l.number ? '' : 'border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50'
                }`}
                style={
                  Number(lessonId) === l.number
                    ? { backgroundColor: l.color, color: 'white', borderColor: l.color }
                    : {}
                }
              >
                <PlayCircle className="w-5 h-5" />
                Lesson {l.number}
              </button>
            ))}

            {/* Quiz Button */}
            <motion.button
              onClick={handleQuizClick}
              className="px-4 py-2 rounded-xl border border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50 font-medium text-sm flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 30px -5px rgba(107, 64, 200, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ClipboardCheck className="w-5 h-5" />
              Quiz
            </motion.button>

            {/* Feedback Button */}
            <motion.button
              onClick={handleFeedbackClick}
              className="px-4 py-2 rounded-xl border border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50 font-medium text-sm flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 30px -5px rgba(107, 64, 200, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-5 h-5" />
              Feedback
            </motion.button>

          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}