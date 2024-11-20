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
  width: 800px;
  margin: 10px 5px;
  flex-direction: column;
  align-items: end;
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
    <StyledContainer>
      <div>
        Sort by:
        <StyledButton
          onClick={onClickSort}
          className={sortedBy === "roomNumber" ? "active" : ""}
          value="roomNumber"
        >
          Room Number
        </StyledButton>{" "}
        |
        <StyledButton
          onClick={onClickSort}
          className={sortedBy === "price" ? "active" : ""}
          value="price"
        >
          Price
        </StyledButton>
      </div>
      <div>
        Order:
        <StyledButton
          onClick={onClickOrder}
          className={ascending === "true" ? "active" : ""}
          value="true"
        >
          Ascending
        </StyledButton>{" "}
        |
        <StyledButton
          onClick={onClickOrder}
          className={ascending === "false" ? "active" : ""}
          value="false"
        >
          Descending
        </StyledButton>
      </div>
    </StyledContainer>
  );
}

RoomFilter.propTypes = {
  sortedBy: PropTypes.string,
  ascending: PropTypes.string,
  setAscending: PropTypes.func,
  setSortedBy: PropTypes.func,
};
