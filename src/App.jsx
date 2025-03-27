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
import BookingForm1 from "./ui/BookingForm1";
import BookingLayout from "./ui/BookingLayout";
import BookingForm2 from "./ui/BookingForm2";
import BookingForm3 from "./ui/BookingForm3";
import SuccessfulBooking from "./ui/SuccessfulBooking";
import { useState, createContext } from "react";
import ProtectedContent from "./ui/ProtectedContent";


const queryClient = new QueryClient();

const AuthenticationContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
    <AuthenticationContext.Provider value={setIsAuthenticated}>

      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedContent isAuthenticated={isAuthenticated}><Layout /></ProtectedContent>}>
              <Route path="home" element={<Home />} />
              <Route path="booking-form" element={<BookingLayout />} >
                <Route path="page1" element={<BookingForm1 />} />
                <Route path="page2" element={<BookingForm2 />} />
                <Route path="page3" element={<BookingForm3 />} />
                <Route path="successful-booking" element={<SuccessfulBooking />} />
              </Route>
              <Route path="bookings" element={<Bookings />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthenticationContext.Provider>
    </>
  );
}

export default App;
export {AuthenticationContext};