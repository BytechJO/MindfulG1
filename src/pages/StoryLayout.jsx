import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './StoryLayout.css';

export default function StoryLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { unitId, lessonId } = useParams();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [unitId, lessonId]);

  const lessons = [
    { id: 1, name: 'Lesson 1' },
    { id: 2, name: 'Lesson 2' },
    { id: 3, name: 'Lesson 3' },
  ];

  const units = [
    { id: "One", name: "Unit 1" },
    { id: "Two", name: "Unit 2" },
    { id: "Three", name: "Unit 3" },
    { id: "Four", name: "Unit 4" }
  ];

  const handleLessonClick = (lessonNumber) => {
    // Use current unitId if available, otherwise default to "One"
    const currentUnit = unitId || "One";
    navigate(`/unit/${currentUnit}/lesson/${lessonNumber}`);
  };

  const handleUnitSelect = (selectedUnitId) => {
    navigate(`/unit/${selectedUnitId}/lesson/1`);
    setIsMenuOpen(false);
  };

  return (
    <div className="up">
      <div>{children}</div>

      <div className="nav-bar">
        <button
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

        <div className="lessons-container">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              className="lesson-btn"
              onClick={() => handleLessonClick(lesson.id)}
            >
              {lesson.name}
            </button>
          ))}
        </div>
      </div>

      {isMenuOpen && (
        <div className="units-menu" onClick={toggleMenu}>
          <div className="units-menu-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: 30 }}>
              <div className="units-menu-header">
                <h3>Select a Unit</h3>
                <button onClick={toggleMenu} className="close-menu-btn" aria-label="Close menu">
                  <X size={28} />
                </button>
              </div>

              <div style={{ marginTop: 20 }}> 
                {units.map(u => (
                  <button
                    key={u.id}
                    onClick={() => handleUnitSelect(u.id)}
                    className="lesson-btn"
                    style={{ marginTop: 10, display: 'block', width: '100%' }}
                  >
                    {u.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}