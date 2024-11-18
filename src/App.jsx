import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import ProtectedContent from "./ui/ProtectedContent";
import Layout from "./ui/Layout";
import Login from "./ui/Login";
import Register from "./ui/Register";
import Home from "./ui/Home";
import Bookings from "./ui/Bookings";
import Settings from "./ui/Settings";
import Rooms from "./ui/Rooms";
import NotFound from "./ui/NotFound";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/login" elemen={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
