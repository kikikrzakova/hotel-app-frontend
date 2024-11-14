import styled from "styled-components";
import PropTypes from "prop-types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import Button from "./Button";
import supabase, { supabaseUrl } from "../supabse";

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

export default function AddEditRoomForm({ id = null }) {
  const { data: rooms, error } = useQuery({ queryKey: ["rooms"] });
  const queryClient = useQueryClient();

  const room = useMemo(() => {
    const room = id
      ? rooms.find((room) => room.id === id)
      : {
          roomNumber: "",
          price: "",
          discount: "",
          guests: "",
          image: "",
        };
    return room;
  }, [rooms, id]);
  console.log(room);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: room,
  });

  async function updateData(room) {
    const randomNumber = Math.trunc(Math.random() * 1000000000);
    const bucketName = "hotel";
    const filePath = `hotel${randomNumber}`;
    const pictureURL = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filePath}`;
    // upload picture to the supabase bucket
    // the file input returns a FileList, to get the file, we need to access the file by index
    if (room.image.length > 0) {
      // add a random number to make sure the name isn't duplicate

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(`${filePath}`, room.image[0], {
          upsert: false, // if we try to upload a file with the same name, it will return an error
        });
      if (error) {
        console.error("Error uploading image:", error.message);
      } else {
        console.log("Image uploaded successfully:", data);
      }
    }

    const { error } = await supabase
      .from("rooms")
      .update({
        roomNumber: room.roomNumber,
        guests: room.guests,
        price: room.price,
        discount: room.discount,
        ...(room.image.length > 0 && { image: pictureURL }),
      })
      .eq("id", id)
      .select();
    if (error) console.log(error.message);

    // after updating the data in the database, we need to invalidate the cache to refetch the updated data
    queryClient.invalidateQueries({
      queryKey: ["rooms"],
    });
  }

  useEffect(() => {
    reset({
      roomNumber: room.roomNumber,
      price: room.price,
      discount: room.discount,
      guests: room.guests,
      image: "",
    });
  }, [room, reset]);
  // STILL IN PROGRESS

  return (
    <StyledForm onSubmit={handleSubmit(updateData)}>
      <StyledLegend>{id ? "Edit" : "Add a new room"}</StyledLegend>
      <StyledDiv>
        <StyledLabel htmlFor="roomNumber">Room Number</StyledLabel>
        <StyledInput type="text" id="roomNumber" {...register("roomNumber")} />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel htmlFor="guests">Number of Guests</StyledLabel>
        <StyledInput type="number" id="guests" {...register("guests")} />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel htmlFor="price">Price</StyledLabel>
        <StyledInput type="number" id="price" {...register("price")} />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel htmlFor="discount">Discount</StyledLabel>
        <StyledInput type="number" id="discount" {...register("discount")} />
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
  id: PropTypes.number,
};
