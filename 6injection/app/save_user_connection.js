

export  function saveUserConnection(name) {
  fetch("http://localhost:3000/save_user_connection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "name": name }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error saving user connection:", error);
      alert("Error saving user connection. Please try again.");
    });
}