import React from "react";
import ReactDOM from "react-dom/client";

import Header from "./components/Header.js"
import Body from "./components/Body.js"
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Error from "./components/Error.js";
import Cart from "./components/Cart.js";
import RestrauntMenu from "./components/RestrauntMenu.js";


import {createBrowserRouter,RouterProvider,Outlet} from "react-router-dom"

const AppLayout = () => {
  return (
    <div className="app">
      <Header/>
      <Outlet/>
    </div>
  );
};
//Routing configuration
const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <AppLayout/>,
    errorElement: <Error/>,
    children: [
      {
        path:'/',
        element: <Body/>
      },
      {
        path:'/about',
        element: <About/>
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/restraunt/:resId',
        element: <RestrauntMenu/>
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);
