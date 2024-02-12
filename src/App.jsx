import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Home from "./routes/home";
import { Transactions } from "./routes/transaction";
import { Data } from "./routes/data";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/transactions", element: <Transactions /> },
      { path: "/data", element: <Data /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
