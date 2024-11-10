import styled from "styled-components";
import supabase from "../supabse";
import { useQuery } from "@tanstack/react-query";
import RoomRow, { StyledRow } from "./RoomRow";
import AddRoom from "./AddRoom";
import AddRoomForm from "./AddRoomForm";
import { useState } from "react";

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

export default function Rooms() {
  const [showForm, setShowForm] = useState(false);

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
            fn={() => setShowForm((showForm) => !showForm)}
            showForm={showForm}
          />
        </tfoot>
      </StyledTable>
      {showForm && <AddRoomForm />}
    </StyledDiv>
  );
}
