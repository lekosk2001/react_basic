import Home from './pages/Home';
import ErrorPage from './ErrorPage'
import BlogCreatePage from './pages/BlogCreatePage';
import BlogListsPage from './pages/BlogListsPage';
import AdminBlogListsPage from './pages/AdminBlogListsPage';
import BlogEditPage from './pages/BlogEditPage';
import BlogShowPage from './pages/BlogShowPage';
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
                path: "Admin",
                element: <AdminBlogListsPage />
            },
            {
                path: "blogs/create",
                element: <BlogCreatePage />
            },
            {
                path: "blogs/:id/edit",
                element: <BlogEditPage />
            },
            {
                path: "blogs/:id",
                element: <BlogShowPage />
            },
        ],
    },
]);

export default router