import styled from "styled-components";
import supabase from "../supabse";
import { useQuery } from "@tanstack/react-query";
import RoomRow, { StyledRow } from "./RoomRow";
import AddRoom from "./AddRoom";
import AddRoomForm from "./AddRoomForm";
import { useReducer } from "react";

const StyledTable = styled.table`
  width: 800px;
  border-collapse: collapse;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// fetch data about rooms from supabase
async function fetchData() {
  const { data, error } = await supabase.from("rooms").select("*");
  if (error) {
    throw new Error("There awas an error with fetching the data");
  } else {
    // console.log(data);
    return data;
  }
}

function addEditRoom(state, action) {
  switch (action.type) {
    // when we click on add new room button
    case "add":
      // if an edit form isn't open, we just show the addRoom form
      if (!state.editRoom) {
        return { ...state, addRoom: !state.addRoom };
      }
      // if an edit form is already displayed, we'll close it and open the add form

      return {
        ...state,
        addRoom: !state.addRoom,
        editRoom: !state.editRoom,
        id: null,
      };

    case "edit":
      // if the add room form is displayed, we'll close it, then display the edit form
      if (state.addRoom)
        return {
          ...state,
          addRoom: !state.addRoom,
          editRoom: !state.editRoom,
          id: action.payload,
        };
      // if no form is displayed
      if (!state.editRoom) {
        console.log("working weird");
        return { ...state, editRoom: !state.editRoom, id: action.payload };
      }
      // if an edit form is displayed for the same room, we'll close it
      if (state.id === action.payload) {
        console.log("working");
        return { ...state, editRoom: !state.editRoom, id: null };
      }
      // if an edit form is displayed for a different room, we'll change the id of the room
      return { ...state, id: action.payload };
  }
}

export default function Rooms() {
  const [roomForm, dispatch] = useReducer(addEditRoom, {
    addRoom: false,
    editRoom: false,
    id: null,
  });

  console.log(
    "addRoom: ",
    roomForm.addRoom,
    "editRoom: ",
    roomForm.editRoom,
    "id: ",
    roomForm.id
  );

  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchData,
  });

  if (isLoading) return <p>Loading...</p>;
  //TODO add a loading spinner instead of "Loading..."
  if (error) return <div>Error: {error.message}</div>;
  // console.log(rooms);

  // create a row in the table for each room

  const tableRows = rooms.map((room) => (
    <RoomRow
      key={room.id}
      image={room.image}
      price={room.price}
      discount={room.discount}
      roomNumber={room.roomNumber}
      numberOfGuests={room.guests}
      id={room.id}
      dispatch={dispatch}
    />
  ));

  return (
    <StyledDiv>
      <StyledTable>
        <thead>
          <StyledRow>
            <th>Image</th>
            <th>No.</th>
            <th>Guests</th>
            <th>Price</th>
            <th>Discount</th>
            <th></th>
          </StyledRow>
        </thead>
        <tbody>{tableRows}</tbody>
        <tfoot>
          <AddRoom
            fn={() => dispatch({ type: "add" })}
            showForm={roomForm.addRoom}
          />
        </tfoot>
      </StyledTable>
      {roomForm.addRoom && <AddRoomForm />}
    </StyledDiv>
  );
}
