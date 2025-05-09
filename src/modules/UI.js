import UserManager from "../services/UserManager.js";

export default class UI {
  constructor(hotel) {
    this.hotel = hotel;
    this.userManager = new UserManager();
  }

  render() {
    const app = document.getElementById("app");
    app.innerHTML = "<h1>Hotel Rooms</h1>";

    const rooms = this.hotel.getAllRooms();
    const user = this.userManager.getLoggedInUser();

    rooms.forEach((room) => {
      const roomEl = document.createElement("div");
      roomEl.innerHTML = `
        <p>Room ${room.number} - ${room.type} - ${room.isAvailable ? "Available" : "Booked"}</p>
        <button data-id="${room.number}" class="bookBtn" ${!user || !room.isAvailable ? "disabled" : ""}>Book</button>
        <button data-id="${room.number}" class="cancelBtn" ${!user || room.isAvailable ? "disabled" : ""}>Cancel</button>
      `;
      app.appendChild(roomEl);
    });

    this.renderAuthUI();

    // Butonlara event listener bağla
    document.querySelectorAll(".bookBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const number = parseInt(btn.getAttribute("data-id"));
        window.bookRoom(number);
      });
    });

    document.querySelectorAll(".cancelBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const number = parseInt(btn.getAttribute("data-id"));
        window.cancelRoom(number);
      });
    });
  }

  renderAuthUI() {
    const existingBox = document.getElementById("authBox");
    if (existingBox) {
      existingBox.remove();
    }

    const user = this.userManager.getLoggedInUser();
    const container = document.createElement("div");
    container.id = "authBox";

    if (user) {
      // Logout görünümü
      container.innerHTML = `
        <p>Welcome, ${user.username}</p>
        <button id="logoutBtn" class="logout-btn">Logout</button>
      `;
    } else {
      // Login formu
      container.innerHTML = `
        <input type="text" id="username" placeholder="Username" />
        <input type="password" id="password" placeholder="Password" />
        <button id="loginBtn" class="login-btn">Login</button>
      `;
    }

    document.body.prepend(container);

    if (user) {
      document.getElementById("logoutBtn").addEventListener("click", () => {
        this.userManager.logout();
        location.reload();
      });
    } else {
      const loginButton = document.getElementById("loginBtn");
      loginButton.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const result = this.userManager.login(username, password);
        if (result) {
          location.reload();
        } else {
          alert("Invalid credentials.");
        }
      });

      //  Enter  login
      container.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          loginButton.click();
        }
      });
    }
  }
}
