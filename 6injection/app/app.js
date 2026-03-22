import { saveUserConnection } from "./save_user_connection.js";



document.body.innerHTML = `
<h1>Welcome to Injection</h1>
`


const existingUserName = sessionStorage.getItem('userName');

if (!existingUserName) {
  var userName = prompt("What is your name?")
  sessionStorage.setItem("userName", userName);
}
const pElement = document.createElement("p");
pElement.textContent = `Hello, ${existingUserName || userName}!`;
document.body.appendChild(pElement);

saveUserConnection(existingUserName || userName);




