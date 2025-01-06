import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { StyledTable } from "./Rooms";
import Button from "./Button";
import styled from "styled-components";
import PickedRoomRow from "./PickedRoomRow";

const StyledContainer = styled.div`
  padding: 20px;
  background-color: #f5ebe2;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 800px;
`;

const StyledHeader = styled.th`
  font-weight: bold;
  color: #954608;
  padding: 10px;
`;

const StyledFooter = styled.td`
  font-weight: bold;
  color: #954608;
  padding: 10px;
  text-align: right;
`;

export default function BookingForm2() {
  const [searchParams] = useSearchParams();
  const [availableRooms, setAvailableRooms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const guests = searchParams.get('guests');
  const startDate = searchParams.get('start-date');
  const endDate = searchParams.get('end-date');
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(endDate, 'yyyy-MM-dd');
  const totalNights = (new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000) + 1;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAvailableRooms(guests, formattedStartDate, formattedEndDate) {
      const response = await fetch(
        `http://localhost:3000/booking/?startDate=${formattedStartDate}&endDate=${formattedEndDate}&guests=${guests}`
      );
      const { data } = await response.json();

      setAvailableRooms(data);
      setTotalPrice(data.reduce((total, room) => total + room.price, 0) * totalNights);
    }
    fetchAvailableRooms(guests, formattedStartDate, formattedEndDate);
  }, [guests, formattedStartDate, formattedEndDate, totalNights]);

  
  return (
    <>
    <StyledContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledHeader></StyledHeader>
            <StyledHeader>Room Number</StyledHeader>
            <StyledHeader>Capacity</StyledHeader>
            <StyledHeader>Price per night</StyledHeader>
            <StyledHeader></StyledHeader>
          </tr>
        </thead>
        <tbody>
          {availableRooms.map(room => 
            <PickedRoomRow key={room._id} room={room}/>)
          }
        </tbody>
        <tfoot>
          <tr>
            <StyledFooter colSpan="5">Total Price for {totalNights} {totalNights === 1 ? "Night" : "Nights"}: {totalPrice}</StyledFooter>
          </tr>
        </tfoot>
      </StyledTable>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Button>Next</Button>
    </StyledContainer>
    {/* a table of other available rooms, that haven't been picked */}
    <table>
        <tr>
          <th>Room Number</th>
          <th>Capacity</th>
          <th>Price per Night</th>
        </tr>
        {availableRooms.map(room => (
          <tr key={room.number}>
            <td>{room.number}</td>
            <td>{room.capacity}</td>
            <td>{room.price}</td>
          </tr>
        ))}
    </table>
    
    </>
    

  );
}
