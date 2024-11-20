import { StyledDiv } from "./Rooms";
import supabase from "../supabse";
import { useQuery } from "@tanstack/react-query";
import BookingFilter from "./BookingFilter";
import { useState } from "react";
import BookingRow from "./BookingRow";
import { StyledRow } from "./RoomRow";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 1200px;
  border-collapse: collapse;
`;

async function fetchData() {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.log("There was an error fetching data");
  } else {
    return data;
  }
}
export default function Bookings() {
  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchData,
  });

  if (isLoading) return <p>Loading...</p>;
  //TODO add a loading spinner instead of "Loading..."
  if (error) return <div>{error.message}</div>;
  console.log(bookings);
  const sortedBookings = bookings.map((booking) => (
    <BookingRow booking={booking} key={booking.id} />
  ));

  return (
    <>
      <StyledDiv>
        <StyledTable>
          <thead>
            <StyledRow>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Room No.</th>
              <th>Checked-in</th>
              <th>From</th>
              <th>To</th>
              <th>Total</th>
              <th>Paid</th>
              <th></th>
            </StyledRow>
          </thead>
          <tbody>{sortedBookings}</tbody>
        </StyledTable>
      </StyledDiv>
    </>
  );
}
