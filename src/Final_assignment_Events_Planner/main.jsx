import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, loader as rootLoader } from "./components/Root";
import { loader } from "./components/loader";
import ErrorPage from "./components/Routing elements/error-page";
import { NewEvent } from "./pages/NewEvent";
import { Home } from "./pages/Home";
import { ContactUs } from "./pages/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: loader,
        // loader: postListLoader,
      },
      {
        path: "/events/:eventId",
        element: <EventPage />,
        loader: loader,
        // loader: postLoader,
        // action: addComment,
      },
      {
        path: "/add-event",
        element: <NewEvent />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
