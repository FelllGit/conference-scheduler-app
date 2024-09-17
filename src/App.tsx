import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SharedLayout from "@/pages/SharedLayout/SharedLayout.tsx";
import Calendar from "@/components/calendar/calendar.tsx";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster.tsx";
import store from "@/redux/store.ts";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <Calendar />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster />
          </Provider>
        </React.StrictMode>
      </QueryClientProvider>
    </>
  );
}

export default App;
