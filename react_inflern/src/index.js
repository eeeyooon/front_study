import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';

import CommentList from './ch05/CommentList';

//리액트 18버전 코드 (강의와 코드 다름.)
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CommentList />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
