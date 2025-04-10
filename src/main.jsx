import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter  } from "react-router-dom";
import UserState from './Context/States/UserState.jsx';
import BlogState from "./Context/States/BlogState.jsx";
import AlertState from './Context/States/AlertState';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter >
<AlertState>
    <UserState>
<BlogState>

    <App />
</BlogState>
    </UserState>
</AlertState>
    </BrowserRouter>
  </StrictMode>,
)
