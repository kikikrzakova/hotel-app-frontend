import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useState } from "react";
import styled from "styled-components";

const BookRoomContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f5ebe2;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #954608;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const StyledDateRange = styled(DateRange)`
  .rdrMonth {
    width: 100% !important;
    padding: 0 !important; // Remove padding
  }

  .rdrCalendarWrapper {
    font-size: 16px;
    width: 100%;
    max-width: 300px;
    background-color: transparent;
  }

  .rdrMonthAndYearWrapper {
    padding-top: 10px;
    height: 50px; // Adjust this value as needed
  }

  .rdrMonths {
    padding: 0 !important; // Remove padding from months container
  }

  .rdrMonth {
    padding: 0 !important; // Ensure no padding on individual months
  }
  .rdrDateDisplayWrapper {
    background-color: #dcb592;
  }

  .rdrDateDisplay {
    margin: 0.5rem;
  }

  .rdrDateDisplayItem {
    background-color: #f5ebe2;
    border-radius: 5px;
  }

  .rdrDateDisplayItem input {
    color: #954608;
  }

  .rdrDayToday .rdrDayNumber span:after {
    background: #954608;
  }

  .rdrDayPassive .rdrDayNumber span {
    color: #dcb592;
  }

  .rdrDayNumber span {
    color: #954608;
  }

  .rdrSelected,
  .rdrInRange,
  .rdrStartEdge,
  .rdrEndEdge {
    background: #dcb592;
  }

  .rdrMonthAndYearPickers select {
    color: #954608;
  }

  .rdrNextPrevButton {
    background-color: #dcb592;
  }

  .rdrPprevButton i {
    border-color: transparent #954608 transparent transparent;
  }

  .rdrNextButton i {
    border-color: transparent transparent transparent #954608;
  }
`;

export default function BookRoom() {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  async function handleSelect(ranges) {
    setSelectionRange(ranges.selection);
    console.log(ranges);
    // Format the start and end dates to ISO 8601 format (YYYY-MM-DD) for API call
    const formattedStartDate = ranges.selection.startDate
      .toISOString()
      .split("T")[0];
    const formattedEndDate = ranges.selection.endDate
      .toISOString()
      .split("T")[0];
    // Make API call to fetch booked rooms within the selected date range and number of guests
    const response = await fetch(
      `http://localhost:3000/booking/?startDate=${formattedStartDate}&endDate=${formattedEndDate}&guests=3`
    );
    const {
      data: { bookedRoomNumbers },
    } = await response.json();

    console.log(bookedRoomNumbers);
  }

  return (
    <BookRoomContainer>
      <Title>Book a Room</Title>
      <StyledDateRange
        ranges={[selectionRange]}
        onChange={handleSelect}
        months={1}
        direction="vertical"
        showDateDisplay={true}
      />
    </BookRoomContainer>
  );
}
