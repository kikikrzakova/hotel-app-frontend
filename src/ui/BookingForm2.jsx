import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { StyledTable } from "./Rooms";
import Button from "./Button";
import styled from "styled-components";
import { fetchData } from "./Rooms";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
import PickedRoomRow from "./PickedRoomRow";
import { useQuery } from "@tanstack/react-query";

const StyledContainer = styled.div`
  padding: 20px;
  background-color: #f5ebe2;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 800px;
`;

const StyledTableTitle = styled.td`
  color: #954608;
  font-weight: bold;
  text-align: center;
  font-size: 30px;
  padding-bottom: 30px;
`

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

const StyledH2 = styled.h2`
  width: 514.51px;
`

export default function BookingForm2() {
  const [searchParams] = useSearchParams();
  const [availableRooms, setAvailableRooms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  let roomNumberQuery = useRef("");
  const guests = searchParams.get('guests');
  const startDate = searchParams.get('start-date');
  const endDate = searchParams.get('end-date');
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(endDate, 'yyyy-MM-dd');
  const totalNights = (new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000) ;
  const navigate = useNavigate();
  const {data: allRooms} = useQuery({queryKey: ['rooms'],
    queryFn: fetchData
  })

  const [unpickedRooms, setUnpickedRooms] = useState([]);
// console.log(availableRooms, unpickedRooms);

  useEffect(() => {
    async function fetchAvailableRooms(guests, formattedStartDate, formattedEndDate) {
      const response = await fetch(
        `http://localhost:3000/booking/?startDate=${formattedStartDate}&endDate=${formattedEndDate}&guests=${guests}`
      );
      const { data } = await response.json();
      setAvailableRooms(data);


      setTotalPrice(data.reduce((total, room) => total + room.price - room.discount, 0) * totalNights);
    }
    fetchAvailableRooms(guests, formattedStartDate, formattedEndDate);

  }, [guests, formattedStartDate, formattedEndDate, totalNights]);

  useEffect(
    () => {
      const availableNumbers = availableRooms.map(availableRoom => availableRoom.number);
      const unpickedRooms = allRooms?.filter(room => {
        if (!availableNumbers.includes(room.number)) {
          return room
      }});
      // we want the query string to look like this ?no=201&no=203
      availableRooms.forEach((availableRoom, index) => {
        if (index === 0) {
          roomNumberQuery.current = `no=${availableRoom.number}`
        } else {
          roomNumberQuery.current += `&no=${availableRoom.number}`
        }
      })
      setUnpickedRooms(unpickedRooms);
      setTotalPrice(availableRooms.reduce((total, room) => total + room.price - room.discount, 0) * totalNights);  // recalculate total price for the remaining rooms
    } 
   , [availableRooms, totalNights, allRooms]);

  function removePickedRoom(id){
    // remove the picked room from the state
    setAvailableRooms((pickedRooms)=>{
      const newPickedRooms = pickedRooms.filter(room => room._id !== id);
      return newPickedRooms;
    })
    
  }

  function addPickedRoom(room){
    setAvailableRooms(rooms => [...rooms, room]);
  }

  return (
    <div>
      <StyledContainer>
        {
          availableRooms.length === 0? <StyledH2>Please pick a room</StyledH2> : 
          <StyledTable>
            <thead>
              <tr>
                <StyledTableTitle colSpan="5">Picked Rooms</StyledTableTitle>
              </tr>
              <tr>
                <StyledHeader></StyledHeader>
                <StyledHeader>Room Number</StyledHeader>
                <StyledHeader>Capacity</StyledHeader>
                <StyledHeader>Price per night</StyledHeader>
                <StyledHeader></StyledHeader>
              </tr>
            </thead>
            <tbody>
              { 
              availableRooms.map(room => 
                <PickedRoomRow key={room._id} room={room} modifyPickedRoom={removePickedRoom} mode={"remove"}/>)
              }
            </tbody>
            <tfoot>
              <tr>
                <StyledFooter colSpan="5">Total Price for {totalNights} {totalNights === 1 ? "Night" : "Nights"}: {totalPrice}</StyledFooter>
              </tr>
            </tfoot>
          </StyledTable>
        }
        <ButtonContainer>
          <Button onClick={() => navigate(-1)}>Back</Button>
          <Button onClick={()=> navigate(`/booking-form/page3?${roomNumberQuery.current}&guests=${guests}&start-date=${startDate}&end-date=${endDate}&total-nights=${totalNights}`)}>Next</Button>
        </ButtonContainer>

      </StyledContainer>
      {/* a table of other available rooms, that haven't been picked */}

      <StyledContainer>
        <StyledTable>
            <thead>
              <tr>
                <StyledTableTitle colSpan="5">Other Available Rooms</StyledTableTitle>
              </tr>
              <StyledHeader></StyledHeader>
              <StyledHeader>Room Number</StyledHeader>
              <StyledHeader>Capacity</StyledHeader>
              <StyledHeader>Price per Night</StyledHeader>
            </thead>
            <tbody>

            {unpickedRooms?.map(room => (
              <PickedRoomRow key={room._id} room={room} mode={"add"} modifyPickedRoom={addPickedRoom}/>
            ))}
            </tbody>
        </StyledTable>
      </StyledContainer>

    
    </div>
    

  );
}
