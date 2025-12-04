import { Suspense, lazy, useState } from "react";
import { motion } from "motion/react";
import { Home, PlayCircle, ClipboardCheck, MessageSquare } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { AnimatedCharacter } from "./AnimatedCharacter";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/PreissMurphy Logo-BGSDEhSA (1).svg";

const pages = {
  "One-1": lazy(() => import("../units/g1/unitOne/L1/feedBack.jsx")),
  "One-2": lazy(() => import("../units/g1/unitOne/L2/feedBack.jsx")),
  "One-3": lazy(() => import("../units/g1/unitOne/L3/feedBack.jsx")),

  "Two-1": lazy(() => import("../units/g1/unitTwo/L1/feedBack.jsx")),
  "Two-2": lazy(() => import("../units/g1/unitTwo/L2/feedBack.jsx")),
  "Two-3": lazy(() => import("../units/g1/unitTwo/L3/feedBack.jsx")),

  "Three-1": lazy(() => import("../units/g1/unitThree/L1/feedBack.jsx")),
  "Three-2": lazy(() => import("../units/g1/unitThree/L2/feedBack.jsx")),
  "Three-3": lazy(() => import("../units/g1/unitThree/L3/feedBack.jsx")),

  "Four-1": lazy(() => import("../units/g1/unitFour/L1/feedBack.jsx")),
  "Four-2": lazy(() => import("../units/g1/unitFour/L2/feedBack.jsx")),
  "Four-3": lazy(() => import("../units/g1/unitFour/L3/feedBack.jsx")),
};

const lessons = [
  { number: 1, color: "from-blue-400 to-blue-500" },
  { number: 2, color: "from-green-400 to-green-500" },
  { number: 3, color: "from-pink-400 to-pink-500" },
];

const FeedbackWrapper = () => {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showLessonDropdown, setShowLessonDropdown] = useState(false);

  const key = `${unitId}-${lessonId}`;
  const Component = pages[key];

  const handleLessonSelect = (lessonNumber) => {
    navigate(`/unit/${unitId}/lesson/${lessonNumber}`);
    setShowLessonDropdown(false); // إخفاء القائمة بعد الاختيار
  };

  const handleQuizClick = () => {
    navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
  };

  const handleFeedbackClick = () => {
    navigate(`/unit/${unitId}/lesson/${lessonId}/feedback`);
  };

  const handleBackToUnits = () => {
    navigate("/UnitsPage");
  };

  if (!Component) return <div>feedback not found</div>;

  return (
    <div className="h-screen w-screen relative overflow-hidden flex flex-col ">
      <AnimatedBackground />
      <AnimatedCharacter />

      <div className="flex-1 p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full h-full"
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          </motion.div>
        </div>
      </div>

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

          {/* RIGHT SECTION - Lesson Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 ml-52"
          >
            {lessons.map((l) => (
              <button
                key={l.number}
                onClick={() => handleLessonSelect(l.number)}
                className={`
                        px-4 py-2 rounded-xl border font-medium transition-all duration-200 text-sm flex items-center gap-4
                        ${Number(lessonId) === l.number
                    ? `border-[#6B40C8] text-white bg-gradient-to-r ${l.color}`
                    : "border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50"
                  }
                      `}
              >
                <PlayCircle className="w-5 h-5" />
                Lesson {l.number}
              </button>
            ))}

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
};

export default FeedbackWrapper;
