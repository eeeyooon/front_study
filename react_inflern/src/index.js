import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';

import NotificationList from './ch06/NotificationList';


const root = createRoot(document.getElementById('root'));

root.render(<NotificationList />);

reportWebVitals();
