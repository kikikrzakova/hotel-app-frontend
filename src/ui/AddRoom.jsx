import { StyledRow } from "./RoomRow";
import Button from "./Button";
import PropTypes from "prop-types";

export default function AddRoom({ fn, showForm }) {
  return (
    <StyledRow>
      <td colSpan="6">
        <Button onClick={fn}>{showForm ? "HIDE FORM" : "NEW ROOM"}</Button>
      </td>
    </StyledRow>
  );
}

AddRoom.propTypes = {
  fn: PropTypes.func,
  showForm: PropTypes.bool,
};
