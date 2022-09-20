import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';

import LandingPage from './ch09/LandingPage';


const root = createRoot(document.getElementById('root'));

root.render(<LandingPage />);

reportWebVitals();
