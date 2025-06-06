import UserManager from "../services/UserManager.js";

export default class UI {
  constructor(hotel) {
    this.hotel = hotel;
    this.userManager = new UserManager();
  }

  async render() {
    const app = document.getElementById("app");
    app.innerHTML = "<h1>Hotel Rooms</h1>";

    const rooms = this.hotel.getAllRooms();
    const user = this.userManager.getLoggedInUser();

    // **Yorumları (reviews) backend'den çek**
    let reviews = [];
    try {
      const res = await fetch("http://localhost:3000/reviews");
      reviews = await res.json();
    } catch {
      reviews = [];
    }

    rooms.forEach((room) => {
      // **Her oda için review sayısını bul**
      const count = reviews.filter(r => Number(r.roomNumber) === room.number).length;
      const countText = count === 0 ? "No reviews yet" : `${count} review${count > 1 ? "s" : ""}`;

      const roomEl = document.createElement("div");
      roomEl.innerHTML = `
        <p>
          Room ${room.number} - ${room.type} - ${room.isAvailable ? "Available" : "Booked"}
          <br />
          <span style="font-size:0.9em;color:#666;">${countText}</span>
        </p>
        <button data-id="${room.number}" class="bookBtn" ${!user || !room.isAvailable ? "disabled" : ""}>Book</button>
        <button data-id="${room.number}" class="cancelBtn" ${!user || room.isAvailable ? "disabled" : ""}>Cancel</button>
      `;
      app.appendChild(roomEl);
    });

    this.renderAuthUI();

    // Event listener'lar...
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

    // === Review Form ===
    const reviewForm = document.createElement("div");
    reviewForm.id = "reviewForm";
    reviewForm.innerHTML = `
      <h2>Add a Review</h2>
      <input type="email" id="reviewEmail" placeholder="Your email" />
      <input type="number" id="reviewRoom" placeholder="Room number" />
      <br />
      <textarea id="reviewBody" placeholder="Write your review here"></textarea>
      <br />
      <button onclick="addReview()">Add Review</button>
    `;
    document.body.appendChild(reviewForm);
  }

  renderAuthUI() {
    // ... (Aynı şekilde bırakabilirsin)
    // Değiştirmene gerek yok
    // Kodun geri kalanı aynı
    // ...
  }
}
