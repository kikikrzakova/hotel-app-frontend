import styled from "styled-components";
import { useState } from "react";

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
  checkedIn: "both",
  from: "",
  to: "",
  paid: "both",
};
export default function BookingFilter() {
  const [filters, setFilters] = useState(initialState);
  function filter(key, value) {
    setFilters((filters) => ({ ...filters, [key]: value }));
  }
  console.log(filters);
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
          <label>From</label>
          <StyledInput type="date" />
          <label>To</label>
          <StyledInput type="date" />
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
