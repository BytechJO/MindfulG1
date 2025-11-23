import { useParams } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

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


const FeedbackWrapper = () => {
  const { unitId, lessonId } = useParams();
  const key = `${unitId}-${lessonId}`;
  const Component = pages[key];

  if (!Component) return <div>feedback not found</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

export default FeedbackWrapper;
