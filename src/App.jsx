import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import './App.css'
import Cart from './components/Cart/cart'
import Contact from './components/Contact/contact'
import Home from './components/Home/home'
import FoodItems from './components/Items/foodItems'
import Login from './components/Login/login'
import Menu from './components/Menu/menu'
import Order from './components/Orders/order'
import Register from './components/Register/register'



function App() {
  let router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/items",
      element:<FoodItems/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:"/menu",
      element:<Menu/>
    },
    {
      path:"/contact",
      element:<Contact/>
    },
    {
      path:"/order",
      element:<Order/>
    },{
      path:"/cart",
      element:<Cart/>
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
