import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  border-style: none;
  font-weight: 600;
  background-color: transparent;
  &:hover,
  &.active {
    color: #f14928;
    cursor: pointer;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  width: 1200px;
  margin: 10px 1px;
  flex-direction: column;
  align-items: end;
`;

export default function BookingFilter() {
  return <StyledContainer></StyledContainer>;
}

BookingFilter.propTypes = {};
