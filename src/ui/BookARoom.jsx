import { useState } from "react";
import Calendar from "./Calendar.jsx";
import Button from "./Button.jsx";


export default function BookARoom() {
  const [guests, setGuests] = useState(1);
  // if a date is selected, a Next button will be rendered
  const [dateSelected, setDateSelected] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  

  return (
    <div>
      <form>
        <label htmlFor="guests">Number of guests</label>
        <input type="number" id="guests" name="guests" value={guests} min="1" onChange={(e)=>setGuests(e.target.value)}/>
      <Calendar guests={guests} setDateSelected={setDateSelected} selectionRange={selectionRange} setSelectionRange={setSelectionRange}/>
        {dateSelected && <Button>Next</Button>}
      </form>
    </div>
  );
}
