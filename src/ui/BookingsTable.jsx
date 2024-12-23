import BookingRow from "./BookingRow";
import styled from "styled-components";
import BookingFilter from "./BookingFilter";
import { StyledDiv } from "./Rooms";
import { StyledRow } from "./RoomRow";
import { useState } from "react";
import PropTypes from "prop-types";

const StyledTable = styled.table`
  width: 1200px;
  border-collapse: collapse;
`;
export default function BookingsTable({ bookings }) {
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  // const test = bookings.filter((booking) =>
  //   booking.name.toLowerCase().includes("tom".toLowerCase()) &&
  // );
  // console.log(test);
  const bookingRows = filteredBookings.map((booking) => (
    <BookingRow booking={booking} key={booking._id} />
  ));

  return (
    <>
      <StyledDiv>
        <BookingFilter
          setFilteredBookings={setFilteredBookings}
          bookings={bookings}
        />
        {/* <BookARoom /> */}
        <StyledTable>
          <thead>
            <StyledRow>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Passport</th>
              <th>Birthday</th>
              <th>Guests</th>
              <th>Room No.</th>
              <th>Checked-in</th>
              <th>From</th>
              <th>To</th>
              <th>Checked-out</th>
              <th>Total</th>
              <th>Paid</th>
            </StyledRow>
          </thead>
          <tbody>{bookingRows}</tbody>
        </StyledTable>
      </StyledDiv>
    </>
  );
}

BookingsTable.propTypes = {
  bookings: PropTypes.array,
};
