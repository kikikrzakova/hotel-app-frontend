import styled from "styled-components";
import supabase from "../supabse";
import { useQuery } from "@tanstack/react-query";
import RoomRow, { StyledRow } from "./RoomRow";
import AddRoom from "./AddRoom";
import AddEditRoomForm from "./AddEditRoomForm";
import { useReducer, useState } from "react";
import RoomFilter from "./RoomFilter";

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
        return { ...state, editRoom: !state.editRoom, id: action.payload };
      }
      // if an edit form is displayed for the same room, we'll close it
      if (state.id === action.payload) {
        return {
          ...state,
          editRoom: !state.editRoom,
          id: null,
        };
      }
      // if an edit form is displayed for a different room, we'll change the id of the room
      return { ...state, id: action.payload };
    default:
      return state;
  }
}

export default function Rooms() {
  const [sortedBy, setSortedBy] = useState("roomNumber");
  const [ascending, setAscending] = useState("true");
  const [roomForm, dispatch] = useReducer(addEditRoom, {
    addRoom: false,
    editRoom: false,
    id: null,
  });

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

  const sortedRooms = rooms.sort((roomA, roomB) => {
    if (sortedBy === "price") {
      const priceDiff =
        roomA.price - roomA.discount - (roomB.price - roomB.discount);
      return ascending === "true" ? priceDiff : -priceDiff;
    } else {
      const roomNumberDiff = roomA.roomNumber - roomB.roomNumber;
      return ascending === "true" ? roomNumberDiff : -roomNumberDiff;
    }
  });
  // create a row in the table for each room
  const tableRows = sortedRooms.map((room) => (
    <RoomRow room={room} dispatch={dispatch} key={room.id} />
  ));

  return (
    <StyledDiv>
      <RoomFilter
        sortedBy={sortedBy}
        ascending={ascending}
        setSortedBy={setSortedBy}
        setAscending={setAscending}
      />
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

      {(roomForm.addRoom || roomForm.editRoom) && (
        <AddEditRoomForm id={roomForm?.id} />
      )}
    </StyledDiv>
  );
}
