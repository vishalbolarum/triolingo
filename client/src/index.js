import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './app/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Practice from './components/Practice/Practice'
import LogIn from './components/LogIn/LogIn'

const router = createBrowserRouter([
    {
        path: '/logIn',
        element: <LogIn />
    },
    {
        path: '/practice',
        element: <Practice />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)