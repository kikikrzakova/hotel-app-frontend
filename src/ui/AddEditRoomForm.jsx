import styled from "styled-components";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { RoomContext } from "./Rooms";

const StyledInput = styled.input`
  border: 1px solid #954608;
  border-radius: 30px;
  height: 2em;
  padding: 1px 15px;
  color: #954608;
  &:focus {
    outline-color: #954608;
  }
`;

const StyledLabel = styled.label`
  font-weight: 500;
  color: #954608;
  margin-right: 1em;
  font-size: 17px;
`;

const StyledDiv = styled.div`
  margin-top: 0.5em;
`;

const StyledForm = styled.form`
  box-sizing: border-box;
  border: 1px solid #954608;
  width: 800px;
  margin-top: 20px;
  padding: 15px 10px;
`;

const StyledLegend = styled.legend`
  font-weight: 600;
  color: #67360a;
  font-size: 27px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 0.7em;
`;

// async function fetchRowData(id) {
//   const { data, error } = await supabase.from("rooms").select("*").eq("id", id);
//   if (error) {
//     throw new Error("There was an error fetching data about the room");
//   } else return data;
// }

export default function AddEditRoomForm() {
  const room = useContext(RoomContext);
  console.log(room);
  useEffect(() => console.log("rerendered"), [room]);
  return (
    <StyledForm>
      <StyledLegend>{room.id ? "Edit" : "Add a new room"}</StyledLegend>
      <StyledDiv>
        <StyledLabel htmlFor="roomNumber">Room Number</StyledLabel>
        <StyledInput
          type="text"
          name="roomNumber"
          id="roomNumber"
          defaultValue={room.id ? room.roomNumber : ""}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel htmlFor="numberOfGuests">Number of Guests</StyledLabel>
        <StyledInput
          type="number"
          name="numberOfGuests"
          id="numberOfGuests"
          defaultValue={room.id ? room.guests : ""}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel htmlFor="price">Price</StyledLabel>
        <StyledInput
          type="number"
          name="price"
          id="price"
          defaultValue={room.id ? room.price : ""}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel htmlFor="discount">Discount</StyledLabel>
        <StyledInput
          type="number"
          name="discount"
          id="discount"
          defaultValue={room.id ? room.discount : ""}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel htmlFor="image">Image</StyledLabel>
        <StyledInput type="file" name="image" id="image" />
      </StyledDiv>
    </StyledForm>
  );
}

AddEditRoomForm.propTypes = {
  room: PropTypes.object,
};
