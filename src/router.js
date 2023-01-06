import Home from './pages/Home';
import ErrorPage from './ErrorPage'
import BlogCreatePage from './pages/BlogCreatePage';
import BlogListsPage from './pages/BlogListsPage';
import BlogEditPage from './pages/BlogEditPage';
import Root from './Root'
import {
    createBrowserRouter
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
                element: <BlogListsPage />
            },
            {
                path: "blogs/create",
                element: <BlogCreatePage />
            },            {
                path: "blogs/edit",
                element: <BlogEditPage />
            },
        ],
    },
]);

export default router