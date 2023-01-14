import React from 'react'
import Home from './pages/Home';
import ErrorPage from './ErrorPage'
import BlogCreatePage from './pages/BlogCreatePage';
import BlogListsPage from './pages/BlogListsPage';
import AdminBlogListsPage from './pages/AdminBlogListsPage';
import BlogEditPage from './pages/BlogEditPage';
import BlogShowPage from './pages/BlogShowPage';
import Root from './Root'
import {createBrowserRouter} from "react-router-dom";
import {RouterProvider} from "react-router-dom";
import { useSelector } from 'react-redux'

export default function App() {
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "blogs",
                    element: <BlogListsPage />
                },
                {
                    path: "admin",
                    element: isLoggedIn?<AdminBlogListsPage />:<Home />
                },
                {
                    path: "blogs/create",
                    element: isLoggedIn?<BlogCreatePage />:<Home />
                },
                {
                    path: "blogs/:id/edit",
                    element: isLoggedIn?<BlogEditPage />:<Home />
                },
                {
                    path: "blogs/:id",
                    element: <BlogShowPage />
                },
            ],
        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}
