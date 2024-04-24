import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from './routes/profile'
import CreateAccount from './routes/createAccount'
import Login from './routes/login'
import { createGlobalStyle } from 'styled-components'
import reset, { Reset } from 'styled-reset'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [
      {
        path:"",
        element: <Home/>,
      },
      {
        path:"profile",
        element: <Profile/>,
      }
    ]
  },
  {
    path:"/login",
    element: <Login />,
  },
  {
    path:"/createAccount",
    element: <CreateAccount />,
  },
])

const GlobalStyles = createGlobalStyle`
  ${reset};
 *{
  box-sizing: border-box;
 }
 body {
    background-color: black;
    color:white;
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 }
 `
;


function App() {
   const [count, setCount] = useState(0)

  return <>
  <GlobalStyles/>
    <RouterProvider router={router} />  
  </>
  
}


export default App

