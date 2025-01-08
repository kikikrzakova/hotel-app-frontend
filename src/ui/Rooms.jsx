import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import RoomRow, { StyledRow } from "./RoomRow";
import AddRoom from "./AddRoom";
import AddEditRoomForm from "./AddEditRoomForm";
import { useReducer, useState } from "react";
import RoomFilter from "./RoomFilter";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #f5ebe2;
  overflow: hidden;
`;
export const StyledDiv = styled.div`
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 1100px;
`;

export const StyledTh = styled.th`
  padding: 10px;
  font-weight: bold;
  color: #954608;
  background-color: #f5ebe2;
  text-align: left;
  font-weight: bold;
`;


export const StyledTfoot = styled.tfoot`
  background-color: #f1f1f1;
`;
// fetch data about rooms from supabase

export async function fetchData() {
  const response = await fetch("http://localhost:3000/rooms");
  const {
    data: { rooms },
  } = await response.json();
  return rooms;
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
  if (error) return <div>{error.message}</div>;

  const sortedRooms = rooms.sort((roomA, roomB) => {
    if (sortedBy === "price") {
      const priceDiff =
        roomA.price - roomA.discount - (roomB.price - roomB.discount);
      return ascending === "true" ? priceDiff : -priceDiff;
    } else {
      const roomNumberDiff = roomA.number - roomB.number;
      return ascending === "true" ? roomNumberDiff : -roomNumberDiff;
    }
  });
  // create a row in the table for each room
  const tableRows = sortedRooms.map((room) => (
    <RoomRow room={room} dispatch={dispatch} key={room._id} />
  ))

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
            <StyledTh>Image</StyledTh>
            <StyledTh>No.</StyledTh>
            <StyledTh>Guests</StyledTh>
            <StyledTh>Price</StyledTh>
            <StyledTh>Discount</StyledTh>
            <StyledTh></StyledTh>
          </StyledRow>
        </thead>
        <tbody>{tableRows}</tbody>
        <StyledTfoot>
          <AddRoom
            fn={() => dispatch({ type: "add" })}
            showForm={roomForm.addRoom}
          />
        </StyledTfoot>
      </StyledTable>

      {(roomForm.addRoom || roomForm.editRoom) && (
        <AddEditRoomForm id={roomForm?.id} />
      )}
    </StyledDiv>
  );
}
