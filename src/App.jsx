import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Pastes from "./pages/Pastes";
import SinglePaste from "./pages/SinglePaste";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/pastes",
          element: <Pastes />,
        },
        {
          path: "/pastes/:id",
          element: <SinglePaste />,
        },
      ],
    },
  ]);
  return (
    <main className="w-10/12 mx-auto">
       <RouterProvider router={router} />
    </main>
  );
};

export default App;
