import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';

import DarkOrLight from './ch14/DarkOrLight';


const root = createRoot(document.getElementById('root'));

root.render(<DarkOrLight />);

reportWebVitals();
