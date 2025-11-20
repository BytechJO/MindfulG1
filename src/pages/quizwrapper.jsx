import { useParams } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

const QuizWrapper = () => {
  const { unitId, lessonId } = useParams();
  const [QuizPageComponent, setQuizPageComponent] = useState(null);

  useEffect(() => {
    const path = `../units/g1/unit${unitId}/L${lessonId}/QuizPage.jsx`;
    
    const QuizComponent = lazy(() => import(/* @vite-ignore */ path));
    setQuizPageComponent(QuizComponent);

  }, [unitId, lessonId]); 

  if (!QuizPageComponent) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizPageComponent />
    </Suspense>
  );
};

export default QuizWrapper;
