import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter  } from "react-router-dom";
import UserState from './Context/States/UserState.tsx';
import BlogState from "./Context/States/BlogState";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter >
    <UserState>
<BlogState>

    <App />
</BlogState>
    </UserState>
    </BrowserRouter>
  </StrictMode>,
)
