import { useState } from "react";

import Calendar from "./Calendar.jsx";

export default function BookARoom() {
  const [bookingForm, setBookingForm] = useState(true);

  return (
    <div>
      <form>
        <label htmlFor="guests">Number of guests</label>
        <select id="guests" name="guests">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
        </select>
        <label>Pick dates:</label>
      </form>
      <Calendar />
    </div>
  );
}
