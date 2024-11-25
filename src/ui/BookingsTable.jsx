import BookingRow from "./BookingRow";
import styled from "styled-components";
import BookingFilter from "./BookingFilter";
import { StyledDiv } from "./Rooms";
import { StyledRow } from "./RoomRow";
import { useState } from "react";

const StyledTable = styled.table`
  width: 1200px;
  border-collapse: collapse;
`;
export default function BookingsTable({ bookings }) {
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const bookingRows = filteredBookings.map((booking) => (
    <BookingRow booking={booking} key={booking.id} />
  ));

  return (
    <>
      <StyledDiv>
        <BookingFilter bookings={setFilteredBookings} />
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
          <tbody>{bookingRows}</tbody>
        </StyledTable>
      </StyledDiv>
    </>
  );
}
