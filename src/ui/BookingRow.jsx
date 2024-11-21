import styled from "styled-components";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabse";
import showToast from "../toast";
import Button from "./Button";
import stylePrice from "../stylePrice";

const StyledRow = styled.tr`
  height: 2em;
  border: 1px solid #954608;
  text-align: center;
`;

async function deleteBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw new Error("There was an error deleting the booking");
}

export default function BookingRow({ booking, dispatch }) {
  const queryClient = useQueryClient();
  const {
    id,
    name,
    lastName,
    checkedIn,
    paid,
    fromDate,
    toDate,
    roomNumber,
    total,
  } = booking;
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      // shows a toast
      showToast("success", "Successfully deleted");
    },
    onError: (error) => {
      showToast("error", `${error.message}`);
    },
  });

  const styledTotal = stylePrice(total);

  return (
    <StyledRow>
      <td>{lastName}</td>
      <td>{name}</td>
      <td>{roomNumber}</td>
      <td>{checkedIn ? "checked-in" : "-"}</td>
      <td>{fromDate}</td>
      <td>{toDate}</td>
      <td>{styledTotal}</td>
      <td>{paid ? "PAID" : "-"}</td>

      <td>
        <Button
          onClick={() => {
            mutate(id);
          }}
          disabled={isDeleting}
        >
          Check-out
        </Button>
        <Button onClick={() => dispatch({ type: "edit", payload: id })}>
          Edit
        </Button>
      </td>
    </StyledRow>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.object,
  dispatch: PropTypes.func,
};
