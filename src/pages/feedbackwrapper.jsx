import { useParams } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

const FeedbackWrapper = () => {
  const { unitId, lessonId } = useParams();
  const [FeedBackPageComponent, setFeedBackPageComponent] = useState(null);

  useEffect(() => {
    const path = `../units/g1/unit${unitId}/L${lessonId}/FeedBack.jsx`;
    
    const FeedBackComponent = lazy(() => import(/* @vite-ignore */ path));
    setFeedBackPageComponent(FeedBackComponent);

  }, [unitId, lessonId]); 

  if (!FeedBackPageComponent) {
    return <div>Loading...</div>;
  }

  return (
    < Suspense fallback={
        <div>Loading...</div>
    } >
      <FeedBackPageComponent />
    </Suspense>
  );
};

export default FeedbackWrapper;
