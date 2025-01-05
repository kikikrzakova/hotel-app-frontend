import { useNavigate, useSearchParams } from "react-router-dom";
import {format} from "date-fns";
import { useEffect, useState } from "react";
import { StyledDiv, StyledTable } from "./Rooms";
import { StyledImage, StyledRow } from "./RoomRow";
import Button from "./Button";

// Make API call to fetch booked rooms within the selected date range and number of guests
export default function BookingForm2(){
    const [searchParams] = useSearchParams();
    const [availableRooms, setAvailableRooms] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const guests = searchParams.get('guests');
    const startDate = searchParams.get('start-date');
    const endDate = searchParams.get('end-date');	
    // Format the start and end dates to ISO 8601 format (YYYY-MM-DD) for API call
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    const totalNights =  (new Date(endDate) - new Date(startDate))/(24*60*60*1000) + 1;
    const navigate = useNavigate();
    

    useEffect(() => {
        // Make API call to fetch booked rooms within the selected date range and number of guests
        async function fetchAvailableRooms(guests, formattedStartDate, formattedEndDate){
            const response = await fetch(
            `http://localhost:3000/booking/?startDate=${formattedStartDate}&endDate=${formattedEndDate}&guests=${guests}`
            );
            const {data} = await response.json();
    
            setAvailableRooms(data);
            setTotalPrice(data.reduce((total, room) => total + room.price, 0) * totalNights);
        }
        fetchAvailableRooms(guests, formattedStartDate, formattedEndDate)

    },[guests, formattedStartDate, formattedEndDate]);

    console.log(availableRooms, totalPrice)


    return (
    <>
    <StyledDiv>

        <StyledTable>
            <thead>
                <tr>
                    <th></th>
                    <th>Room Number</th>
                    <th>Capacity</th>
                    <th>Price per night</th>
                </tr>
            </thead>
            <tbody>
                {availableRooms.map(room => (
                    <StyledRow key={room.number}>
                        <td><StyledImage src={room.image} alt="room"/></td>
                        <td>{room.number}</td>
                        <td>{room.capacity}</td>
                        <td>{room.price}</td>
                    </StyledRow>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2">Total Price for {totalNights} {totalNights === 1 ? "Night" : "Nights"}: {totalPrice}</td>
                </tr>
            </tfoot>
        </StyledTable>
        <Button onClick={()=>navigate(-1)}>Back</Button>
    </StyledDiv>
    </>
    )

}