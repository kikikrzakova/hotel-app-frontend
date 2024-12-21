async function payFunction(id) {
  try {
    await fetch(`http://localhost:3000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify({ paid: true }),
    });
  } catch (err) {
    console.log(err.message);
  }
}

async function checkInFunction(id) {
  try {
    await fetch(`http://localhost:3000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify({ checkedIn: true }),
    });
  } catch (err) {
    console.log(err.message);
  }
}

async function checkOutFunction(id) {
  try {
    await fetch(`http://localhost:3000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify({ checkedOut: true }),
    });
  } catch (err) {
    console.log(err.message);
  }
}

export { payFunction, checkInFunction, checkOutFunction };
