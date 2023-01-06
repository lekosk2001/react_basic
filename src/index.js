import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import ErrorPage from './ErrorPage'
import BlogForm from './pages/BlogForm';
import BlogLists from './pages/BlogLists';
import BlogEdit from './pages/BlogEdit';
import Root from './Root'
import {
    createBrowserRouter,RouterProvider
} from "react-router-dom";

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
                element: <BlogLists />
            },
            {
                path: "blogs/create",
                element: <BlogForm />
            },            {
                path: "blogs/edit",
                element: <BlogEdit />
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
