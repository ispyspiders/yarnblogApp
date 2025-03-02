import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import NewPostPage from "./pages/NewPostPage";
import EditPostPage from "./pages/EditPostPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/about",
                element: <AboutPage />
            },
            {
                path: "/blog",
                element: <BlogPage />
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/newPost",
                element: (
                    <ProtectedRoute>
                        <NewPostPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/edit/:id",
                element: (
                    <ProtectedRoute>
                        <EditPostPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/login",
                element: <LoginPage />
            },
        ]
    },
])

export default router;
