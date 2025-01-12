import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const StyledForm = styled.form`
  width: 600px;
  min-width: 300px;
  margin: 1rem auto;
  padding: 1rem 2rem;
  background-color: #f5ebe2;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  color: #954608;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #dcb592;
  border-radius: 5px;
  font-size: 1rem;
  color: #954608;
  background-color: #fff;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #dcb592;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b38a6d;
  }
`;

export default function BookingForm3() {
    const [searchParams] = useSearchParams();
    const guests = searchParams.get('guests');
    const startDate = searchParams.get('start-date');
    const endDate = searchParams.get('end-date');
    const roomNumbers = searchParams.getAll('no');
    const totalNights = searchParams.get('total-nights');
    const {data: rooms} = useQuery({queryKey: ["rooms"]});
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);

        // make one booking for each picked room, each booking has its own total price
        roomNumbers.forEach(roomNumber => {
          const room = rooms.find(room => room.number === +roomNumber);
          const total = (room.price - room.discount) * +totalNights;
          
          fetch("http://localhost:3000/bookings", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  firstName: formData.get('firstName'),
                  lastName: formData.get('lastName'),
                  birthday: new Date(formData.get('birthday')),
                  passport: formData.get('passport'),
                  checkIn: new Date(startDate),
                  checkOut: new Date(endDate),
                  guests: +guests,
                  room: roomNumber,
                  total: total,
              })
          })
        })
        navigate('/booking-form/successful-booking');

    }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="firstName">First Name</StyledLabel>
      <StyledInput type="text" name="firstName" required />
      <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
      <StyledInput type="text" name="lastName" required />
      <StyledLabel htmlFor="birthday">Birthday</StyledLabel>
      <StyledInput type="date" name="birthday" required />
      <StyledLabel htmlFor="passport">Passport Number</StyledLabel>
      <StyledInput type="text" name="passport" required />
      {/* <StyledLabel htmlFor="email">Email</StyledLabel>
      <StyledInput type="email" name="email" required />
      <StyledLabel htmlFor="phone">Phone Number</StyledLabel>
      <StyledInput type="tel" name="phone" required />
      <StyledLabel htmlFor="address">Address</StyledLabel>
      <StyledInput type="text" name="address" required /> */}
      <StyledButton type="submit">Book</StyledButton>
    </StyledForm>
  );
}
