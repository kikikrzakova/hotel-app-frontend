import { useState } from "react";
import Calendar from "./Calendar.jsx";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const StyledForm = styled.form`
  padding: 20px;
  background-color: #f5ebe2;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLabel = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  color: #954608;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  border: 1px solid #954608;
  border-radius: 30px;
  height: 2em;
  padding: 0.5px 15px;
  color: #954608;
  margin-bottom: 20px;
  &:focus {
    outline-color: #954608;
  }
`;
export default function BookingForm1() {
  const [guests, setGuests] = useState(1);
  const [dateSelected, setDateSelected] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const navigate = useNavigate();

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        navigate(
          `/booking-form/page2?guests=${guests}&start-date=${selectionRange.startDate}&end-date=${selectionRange.endDate}`
        );
      }}
    >
      <StyledLabel htmlFor="guests">Number of Guests</StyledLabel>
      <StyledInput
        type="number"
        id="guests"
        name="guests"
        value={guests}
        min="1"
        onChange={(e) => setGuests(e.target.value)}
      />
      <Calendar
        guests={guests}
        setDateSelected={setDateSelected}
        selectionRange={selectionRange}
        setSelectionRange={setSelectionRange}
      />
      {dateSelected && <Button type="submit">Next</Button>}
    </StyledForm>
  );
}

