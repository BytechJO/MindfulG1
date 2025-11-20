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

  // Load the StoryPage component whenever unitId or lessonId changes
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setLessonData(`Unit: ${unitId}, Lesson: ${lessonId}`);
    
    // Dynamically import the StoryPage component
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
  }, [unitId, lessonId]); // This dependency array ensures the effect runs when route changes

  if (isLoading) {
    return (
      <StoryLayout>
        <div style={{ padding: 30, textAlign: 'center' }}>
          <p>جاري التحميل...</p>
        </div>
      </StoryLayout>
    );
  }

  if (error) {
    return (
      <StoryLayout>
        <div style={{ padding: 30, textAlign: 'center', color: 'red' }}>
          <p>حدث خطأ في تحميل الدرس: {error}</p>
        </div>
      </StoryLayout>
    );
  }

  if (!storyPageComponent) {
    return (
      <StoryLayout>
        <div style={{ padding: 30, textAlign: 'center' }}>
          <p>لم يتم العثور على محتوى الدرس</p>
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