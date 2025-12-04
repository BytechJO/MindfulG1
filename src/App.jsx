import {Routes, Route } from "react-router-dom";
import QuizWrapper from "./pages/quizwrapper.jsx";
import FeedBackWrapper from "./pages/feedbackwrapper.jsx";
import HomePage from "./pages/HomePage.jsx";
// import FeedBack from "./unit/:unitId/lesson/:lessonId/feedback";
import UnitsPage from "./pages/UnitsPage.jsx";
import VideoPlayerPage from './pages/VideoPlayerPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/UnitsPage" element={<UnitsPage />} />
      <Route path="/unit/:unitId/lesson/:lessonId" element={<VideoPlayerPage />} />
      <Route path="/unit/:unitId/lesson/:lessonId/quiz" element={<QuizWrapper />} />
      <Route path="/unit/:unitId/lesson/:lessonId/feedback" element={<FeedBackWrapper />} />
    </Routes>
  );
};

export default App;
