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

export default function App() {

    
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
                    element: <AdminBlogListsPage />,
                    auth: true
                },
                {
                    path: "blogs/create",
                    element: <BlogCreatePage />,
                    auth: true
                },
                {
                    path: "blogs/:id/edit",
                    element: <BlogEditPage />,
                    auth: true
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
