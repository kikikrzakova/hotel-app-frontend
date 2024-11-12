import styled from "styled-components";
import PropTypes from "prop-types";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { IconContext } from "react-icons";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabse";

export const StyledRow = styled.tr`
  height: 2em;
  border: 1px solid #954608;
  text-align: center;
`;
const StyledImage = styled.img`
  width: 70px;
  margin-top: 3px;
`;

async function deleteRoom(id) {
  const { error } = await supabase.from("rooms").delete().eq("id", id);
  if (error) throw new Error("There was an error deleting the room");
}

export default function RoomRow({ room, dispatch }) {
  const queryClient = useQueryClient();
  const {
    id,
    price,
    roomNumber,
    discount,
    image,
    guests: numberOfGuests,
  } = room;
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
      console.log("Room deleted");
    },
    onErro: (error) => {
      console.log(error.message);
    },
  });

  const styledPrice = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(price);

  const styledDiscountedPrice = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(price - discount);

  return (
    <StyledRow>
      <td>
        <StyledImage src={image} alt="hotel room" />
      </td>
      <td>{roomNumber}</td>
      <td>{numberOfGuests}</td>
      <td>
        {/* the helper div is for centering vertically */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {discount ? (
            <>
              <del>{styledPrice}</del>
              <IconContext.Provider value={{ color: "red", size: " 1.7em" }}>
                <LiaLongArrowAltRightSolid />
                {styledDiscountedPrice}
              </IconContext.Provider>
            </>
          ) : (
            styledPrice
          )}
        </div>
      </td>
      <td>
        {/* if there is a discount, an X will be shown, otherwise a tick will be */}

        {!discount ? (
          <IconContext.Provider value={{ color: "red", size: "0.8em" }}>
            <ImCross />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ color: "#22ca35", size: "1.5em" }}>
            <TiTick />
          </IconContext.Provider>
        )}
      </td>
      <td>
        <Button onClick={() => mutate(id)} disabled={isDeleting}>
          Delete
        </Button>
        <Button onClick={() => dispatch({ type: "edit", payload: id })}>
          Edit
        </Button>
      </td>
    </StyledRow>
  );
}

RoomRow.propTypes = {
  room: PropTypes.object,
  dispatch: PropTypes.func,
};
