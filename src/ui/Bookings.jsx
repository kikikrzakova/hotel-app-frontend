import supabase from "../supabse";
import { useQuery } from "@tanstack/react-query";

import BookingsTable from "./BookingsTable";

async function fetchData() {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.log("There was an error fetching data");
  } else {
    return data;
  }
}
export default function Bookings() {
  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchData,
  });

  if (isLoading) return <p>Loading...</p>;
  //TODO add a loading spinner instead of "Loading..."
  if (error) return <div>{error.message}</div>;

  return <BookingsTable bookings={bookings} />;
}
