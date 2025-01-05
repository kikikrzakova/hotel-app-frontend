import { useState } from "react";
import Calendar from "./Calendar.jsx";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";


export default function BookingForm1() {
  const [guests, setGuests] = useState(1);
  // if a date is selected, a Next button will be rendered
  const [dateSelected, setDateSelected] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const navigate = useNavigate();
  

  return (
    <div>
      <form onSubmit={(e)=>{
          e.preventDefault();
          navigate(`/booking-form/page2?guests=${guests}&start=${selectionRange.startDate}&end-date=${selectionRange.endDate}`)}}>
        <label htmlFor="guests">Number of guests</label>
        <input type="number" id="guests" name="guests" value={guests} min="1" onChange={(e)=>setGuests(e.target.value)}/>
      <Calendar guests={guests} setDateSelected={setDateSelected} selectionRange={selectionRange} setSelectionRange={setSelectionRange}/>
        {dateSelected && <Button type="submit" >Next</Button>}
      </form>
    </div>
  );
}
