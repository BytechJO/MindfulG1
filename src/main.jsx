import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MemoryRouter } from "react-router-dom";
import "animate.css/animate.min.css";
import { ScormProvider } from '@code-by-dwayne/react-scorm-provider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <MemoryRouter>
    <ScormProvider>
      <App />
    </ScormProvider>
  </MemoryRouter>
  </StrictMode>
)
