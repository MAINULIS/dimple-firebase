import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import SignInWithGoogle from './components/SignInWithGoogle.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterRBS from './components/RegisterRBS.jsx';
import RegisterBS from './components/RegisterBS.jsx';
import LoginBS from './components/LoginBS.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:'/',
        element: <Home/>,
      },
      {
        path:'sign-in-google',
        element: <SignInWithGoogle />
      },
      {
        path:'register-rbs',
        element: <RegisterRBS />
      },
      {
        path:'register-bs',
        element: <RegisterBS />
      },
      {
        path:'login',
        element: <LoginBS />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
