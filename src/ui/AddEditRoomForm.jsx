import styled from "styled-components";
import PropTypes from "prop-types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import Button from "./Button";
import showToast from "../toast";

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

export default function AddEditRoomForm({ id = null }) {
  const { data: rooms, error } = useQuery({ queryKey: ["rooms"] });
  if (error) console.log(error);
  const queryClient = useQueryClient();

  const room = useMemo(() => {
    const room = id
      ? rooms.find((room) => room._id === id)
      : {
          number: null,
          price: null,
          discount: null,
          capacity: null,
          image: null,
        };
    return room;
  }, [rooms, id]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: room,
  });

  async function updateData(formData) {
    const updatedRoom = new FormData();
    // Convert the number, price, discount, and capacity to numbers, because the server expects numbers, but new FormData() converts everything to strings
    updatedRoom.append("number", +formData.number);
    updatedRoom.append("price", +formData.price);
    updatedRoom.append("discount", +formData.discount);
    updatedRoom.append("capacity", +formData.capacity);

    // Only append the image if a new file is selected
    if (formData.image && formData.image.length > 0) {
      updatedRoom.append("image", formData.image[0]);
    }

    const url = id
      ? `http://localhost:3000/rooms/${id}`
      : "http://localhost:3000/rooms";

    try {
      const response = await fetch(url, {
        method: id ? "PATCH" : "POST",
        // we don't add headers, because we want to send FormData directly, not JSON
        body: updatedRoom, // Send FormData object directly, if we use json.stingify(updatedRoom), the server will not get the file
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      showToast(
        "success",
        id ? "Room successfully updated" : "Room successfully added"
      );

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    } catch (error) {
      showToast("error", error.message);
    }
  }

  useEffect(() => {
    // if the edit form is open and we delete the room, there would be an error, because room would be undefined => the if clause is necessary
    if (room) {
      reset({
        number: room.number,
        price: room.price,
        discount: room.discount,
        capacity: room.capacity,
        image: "",
      });
    }
  }, [room, reset]);

  return (
    <StyledForm
      onSubmit={handleSubmit(updateData)}
      encType="multipart/form-data"
    >
      <StyledLegend>{id ? "Edit" : "Add a new room"}</StyledLegend>
      <StyledDiv>
        <StyledLabel htmlFor="number">Room Number</StyledLabel>
        <StyledInput
          type="number"
          id="number"
          {...register("number", { valueAsNumber: true })}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel htmlFor="capacity">Capacity</StyledLabel>
        <StyledInput
          type="number"
          id="capacity"
          {...register("capacity", { valueAsNumber: true })}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel htmlFor="price">Price</StyledLabel>
        <StyledInput
          type="number"
          id="price"
          {...register("price", { valueAsNumber: true })}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel htmlFor="discount">Discount</StyledLabel>
        <StyledInput
          type="number"
          id="discount"
          {...register("discount", { valueAsNumber: true })}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel htmlFor="image">Image</StyledLabel>
        <StyledInput type="file" id="image" {...register("image")} />
      </StyledDiv>
      <Button type="submit">{id ? "Update" : "Add"}</Button>
    </StyledForm>
  );
}

AddEditRoomForm.propTypes = {
  id: PropTypes.string,
};
