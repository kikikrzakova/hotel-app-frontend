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

export default function RoomFilter({
  sortedBy,
  setSortedBy,
  ascending,
  setAscending,
}) {
  function onClickSort(e) {
    setSortedBy(e.target.value);
  }
  function onClickOrder(e) {
    setAscending(e.target.value);
  }
  return (
    <div>
      <div>
        Sort by:
        <StyledButton
          onClick={onClickSort}
          className={sortedBy === "roomNumber" ? "active" : ""}
          value="roomNumber"
        >
          room number
        </StyledButton>{" "}
        |
        <StyledButton
          onClick={onClickSort}
          className={sortedBy === "price" ? "active" : ""}
          value="price"
        >
          price
        </StyledButton>
      </div>
      <div>
        Order:
        <StyledButton
          onClick={onClickOrder}
          className={ascending === "true" ? "active" : ""}
          value="true"
        >
          ascending
        </StyledButton>{" "}
        |
        <StyledButton
          onClick={onClickOrder}
          className={ascending === "false" ? "active" : ""}
          value="false"
        >
          descending
        </StyledButton>
      </div>
    </div>
  );
}

RoomFilter.propTypes = {
  sortedBy: PropTypes.string,
  ascending: PropTypes.string,
  setAscending: PropTypes.func,
  setSortedBy: PropTypes.func,
};
