
-Initial Project Setup
using Vite -  fronted tool


npm install vite@react
-react , typscript + swc(rust typscript compilier )
go to new project 
npm install
npm run dev

project initial clean up : delete app.css index.css



Dependencies 
 1346  npm i react-router-dom@6.14.2
 1348  npm i styled-reset
 1351  npm i styled-components@6.0.7
 1354  npm i @types/styled-components -D


 -Routing

 in the App.tsx  the router part is important.

Home and Profileare showing after  Layout

Using router in the app 
-

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



in the app.ts


function App() {
   const [count, setCount] = useState(0)

  return <>
  <GlobalStyles/>
    <RouterProvider router={router} />  
  </>
  
}

using outlet component, you can combine different compoentn together in the page



-Firebase SDK 
firebase fetches the user detail for the authenticating 
grab cookie nad 

go to firebase add project 
-install firebase by npm and 
- initliazing the firebase 

enable servicer from firebase console and also from our app