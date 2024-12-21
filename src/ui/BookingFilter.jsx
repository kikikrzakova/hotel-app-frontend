import styled from "styled-components";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const StyledContainer = styled.div`
  display: flex;
  width: 1200px;
  margin: 10px 1px;
`;
const StyledInput = styled.input`
  border: 1px solid #954608;
  margin-top: 0.5em;
  margin-bottom: 0.7em;
  margin-left: 0.6em;
  margin-right: 1em;
  border-radius: 30px;
  padding: 0.2em 0.6em;
  outline-color: #954608;
  &:active {
  }
`;
const initialState = {
  firstName: "",
  lastName: "",
  passport: "",
  checkedIn: "both",
  paid: "both",
};
export default function BookingFilter({ setFilteredBookings, bookings }) {
  const [filters, setFilters] = useState(initialState);

  // const [searchParams, setSearchParams] = useSearchParams();
  function filter(key, value) {
    setFilters((filters) => ({ ...filters, [key]: value }));
    // setSearchParams(key, value);
  }

  useEffect(
    () =>
      setFilteredBookings(
        bookings.filter(
          (booking) =>
            booking.firstName
              .toLowerCase()
              .includes(filters.firstName.toLowerCase()) &&
            booking.lastName
              .toLowerCase()
              .includes(filters.lastName.toLowerCase()) &&
            booking.passport
              .toLowerCase()
              .includes(filters.passport.toLowerCase()) &&
            (filters.checkedIn === "both"
              ? true
              : filters.checkedIn === "yes"
              ? booking.checkedIn === true
              : booking.checkedIn === false) &&
            (filters.paid === "both"
              ? true
              : filters.paid === "yes"
              ? booking.paid === true
              : booking.paid === false)
        )
      ),
    [filters, setFilteredBookings, bookings]
  );

  return (
    <StyledContainer>
      <form>
        <label htmlFor="firstName">First Name</label>
        <StyledInput
          id="firstName"
          value={filters.firstName}
          onChange={(e) => filter("firstName", e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <StyledInput
          id="lastName"
          value={filters.lastName}
          onChange={(e) => filter("lastName", e.target.value)}
        />
        <div>
          <label htmlFor="passport">Passport</label>
          <StyledInput
            id="passport"
            value={filters.passport}
            onChange={(e) => filter("passport", e.target.value)}
          />
        </div>
        <div>
          <span>Checked-in</span>
          <input
            type="radio"
            id="checked-in-both"
            name="checked-in"
            value="both"
            checked={filters.checkedIn === "both"}
            onChange={(e) => filter("checkedIn", e.target.value)}
          ></input>
          <label htmlFor="checked-in-both">Yes/No</label>
          <input
            type="radio"
            id="checked-in-yes"
            name="checked-in"
            value="yes"
            checked={filters.checkedIn === "yes"}
            onChange={(e) => filter("checkedIn", e.target.value)}
          ></input>
          <label htmlFor="checked-in-yes">Yes</label>
          <input
            type="radio"
            id="checked-in-no"
            name="checked-in"
            value="no"
            checked={filters.checkedIn === "no"}
            onChange={(e) => filter("checkedIn", e.target.value)}
          ></input>
          <label htmlFor="checked-in-no">No</label>
        </div>

        <div>
          <span>Paid</span>
          <input
            type="radio"
            id="paid-both"
            name="paid"
            value="both"
            checked={filters.paid === "both"}
            onChange={(e) => filter("paid", e.target.value)}
          ></input>
          <label htmlFor="paid-both">Yes/No</label>
          <input
            type="radio"
            id="paid-yes"
            name="paid"
            value="yes"
            checked={filters.paid === "yes"}
            onChange={(e) => filter("paid", e.target.value)}
          ></input>
          <label htmlFor="paid-yes">Yes</label>
          <input
            type="radio"
            id="paid-no"
            name="paid"
            value="no"
            checked={filters.paid === "no"}
            onChange={(e) => filter("paid", e.target.value)}
          ></input>
          <label htmlFor="paid-no">No</label>
        </div>
      </form>
    </StyledContainer>
  );
}

BookingFilter.propTypes = {};

BookingFilter.propTypes = {
  bookings: PropTypes.array,
  setFilteredBookings: PropTypes.func,
};
