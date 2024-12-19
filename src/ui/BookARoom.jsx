import { useState } from "react";
import Button from "./Button";
import BookingForm from "./BookingForm";

export default function BookARoom() {
  const [bookingForm, setBookingForm] = useState(true);

  return (
    <div>
      <Button>Book a Room</Button>
      {bookingForm && <BookingForm />}
    </div>
  );
}
