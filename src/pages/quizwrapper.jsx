import { useParams } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import StoryLayout from "./StoryLayout.jsx";

const pages = {
  "One-1": lazy(() => import("../units/g1/unitOne/L1/QuizPage.jsx")),
  "One-2": lazy(() => import("../units/g1/unitOne/L2/QuizPage.jsx")),
  "One-3": lazy(() => import("../units/g1/unitOne/L3/QuizPage.jsx")),

  "Two-1": lazy(() => import("../units/g1/unitTwo/L1/QuizPage.jsx")),
  "Two-2": lazy(() => import("../units/g1/unitTwo/L2/QuizPage.jsx")),
  "Two-3": lazy(() => import("../units/g1/unitTwo/L3/QuizPage.jsx")),

  "Three-1": lazy(() => import("../units/g1/unitThree/L1/QuizPage.jsx")),
  "Three-2": lazy(() => import("../units/g1/unitThree/L2/QuizPage.jsx")),
  "Three-3": lazy(() => import("../units/g1/unitThree/L3/QuizPage.jsx")),

  "Four-1": lazy(() => import("../units/g1/unitFour/L1/QuizPage.jsx")),
  "Four-2": lazy(() => import("../units/g1/unitFour/L2/QuizPage.jsx")),
  "Four-3": lazy(() => import("../units/g1/unitFour/L3/QuizPage.jsx")),
};


const QuizWrapper = () => {
  const { unitId, lessonId } = useParams();
  const key = `${unitId}-${lessonId}`;
  const Component = pages[key];

  if (!Component) return <div>Quiz not found</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoryLayout>
        <Component />
      </StoryLayout>
    </Suspense>
  );
};

export default QuizWrapper;
