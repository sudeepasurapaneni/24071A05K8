import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import EventList from "./pages/EventList";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";

function App() {
  const [bookings, setBookings] = useState([]);

  const bookEvent = (event) => {
    setBookings([...bookings, event]);
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link> | 
        <Link to="/register">Register</Link> | 
        <Link to="/events">Events</Link> | 
        <Link to="/booking">Booking</Link> | 
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<EventList bookEvent={bookEvent} />} />
        <Route path="/booking" element={<Booking bookings={bookings} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <footer style={{
        marginTop: "40px",
        padding: "10px",
        background: "#222",
        color: "#fff",
        textAlign: "center"
      }}>
        @24071A05K8
      </footer>
    </BrowserRouter>
  );
}

export default App;
