export async function saveBooking({request}){
    const formData = request.formData();
    console.log(formData.get("firstName"));
}