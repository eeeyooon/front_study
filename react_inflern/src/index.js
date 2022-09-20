import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Accommodate from './ch07/Accommodate';


const root = createRoot(document.getElementById('root'));

root.render(<Accommodate />);

reportWebVitals();
