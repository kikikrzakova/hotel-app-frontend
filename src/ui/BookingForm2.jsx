import { useSearchParams } from "react-router-dom";
import {format} from "date-fns";
import { useEffect, useState } from "react";

// Make API call to fetch booked rooms within the selected date range and number of guests
export default function BookingForm2(){
    const [searchParams] = useSearchParams();
    const [availableRooms, setAvailableRooms] = useState([]);
    useEffect(() => {
        const guests = searchParams.get('guests');
        const startDate = searchParams.get('start-date');
        const endDate = searchParams.get('end-date');	
        // Format the start and end dates to ISO 8601 format (YYYY-MM-DD) for API call
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
        async function fetchAvailableRooms(guests, formattedStartDate, formattedEndDate){
            const response = await fetch(
            `http://localhost:3000/booking/?startDate=${formattedStartDate}&endDate=${formattedEndDate}&guests=${guests}`
            );
            const {data} = await response.json();
    
            setAvailableRooms(data);
        }
        fetchAvailableRooms(guests, formattedStartDate, formattedEndDate)

    },[]);
    console.log(availableRooms)


    return <></>
}