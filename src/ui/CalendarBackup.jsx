import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useState } from "react";

export default function MyCalendar() {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  async function handleSelect(ranges) {
    setSelectionRange(ranges.selection);
    console.log(ranges);
    const formattedStartDate = ranges.selection.startDate
      .toISOString()
      .split("T")[0];
    const formattedEndDate = ranges.selection.endDate
      .toISOString()
      .split("T")[0]; // Uncomment this line to include end date in the query parameters.
    const response = await fetch(
      `http://localhost:3000/booking/?startDate="${formattedStartDate}"&endDate="${formattedEndDate}"&guests=3`
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <h1>Select dates</h1>
      <DateRange ranges={[selectionRange]} onChange={handleSelect} />
    </div>
  );
}
