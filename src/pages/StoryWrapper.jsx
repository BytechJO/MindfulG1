import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import StoryLayout from "./StoryLayout";

export default function StoryWrapper() {
  const { unitId, lessonId } = useParams();
  const [lessonData, setLessonData] = useState(null);
  const [storyPageComponent, setStoryPageComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setLessonData(`Unit: ${unitId}, Lesson: ${lessonId}`);
    
    const loadStoryPage = async () => {
      try {
        const module = await import(
          `../units/g1/unit${unitId}/L${lessonId}/StoryPage.jsx`
        );
        setStoryPageComponent(() => module.default);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load StoryPage:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    loadStoryPage();
  }, [unitId, lessonId]); 

  if (isLoading) {
    return (
      <StoryLayout>
        <div style={{ padding: 30, textAlign: 'center' }}>
          <p>Loading...</p>
        </div>
      </StoryLayout>
    );
  }

  if (error) {
    return (
      <StoryLayout>
        <div style={{ padding: 30, textAlign: 'center', color: 'red' }}>
          <p>somthing happend: {error}</p>
        </div>
      </StoryLayout>
    );
  }

  if (!storyPageComponent) {
    return (
      <StoryLayout>
        <div style={{ padding: 30, textAlign: 'center' }}>
          <p>Not Found</p>
        </div>
      </StoryLayout>
    );
  }

  const StoryPageComponent = storyPageComponent;

  return (
    <StoryLayout>
      <StoryPageComponent unitId={unitId} lessonId={lessonId} />
    </StoryLayout>
  );
}