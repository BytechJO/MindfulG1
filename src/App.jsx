import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { QuizPage } from './QuizPage.jsx';
// import { StoryPage } from './StoryPage.jsx';
// import FeedBack from './feedBack.jsx';
import StoryWrapper from './pages/StoryWrapper.jsx';
import Home from "./pages/home";
import QuizWrapper from "./pages/quizwrapper.jsx";
import FeedBackWrapper from "./pages/feedbackwrapper.jsx";
import Welcome from "./pages/welcome.jsx";
// import FeedBack from "./unit/:unitId/lesson/:lessonId/feedback";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />}/>
      <Route path="/home" element={<Home />} />
      <Route path="/unit/:unitId/lesson/:lessonId" element={<StoryWrapper />} />
      <Route path="/unit/:unitId/lesson/:lessonId/quiz" element={<QuizWrapper />} />
      <Route path="/unit/:unitId/lesson/:lessonId/feedback" element={<FeedBackWrapper />} />
    </Routes>
  );
};

export default App;
