import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from './routes/profile'
import CreateAccount from './routes/createAccount'
import Login from './routes/login'
import { createGlobalStyle } from 'styled-components'
import reset, { Reset } from 'styled-reset'
import Loading  from './components/loading'

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
    color:yellow;
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 }
 `
;


function App() {
   const [isLoading, setIsLoading] = useState(true);
   const init = async()=>{
    //wait for firebase
    setTimeout(()=> setIsLoading(false),5000 )
    //setIsLoading(false)
   }
   
   useEffect(()=>{
    init(),[]
   })
  return <>
  <GlobalStyles/>
    
    {isLoading ? <Loading/>: <RouterProvider router={router} /> }
  </>
  
}


export default App

