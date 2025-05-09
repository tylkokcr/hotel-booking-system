import Room from "./modules/Room.js";
import Hotel from "./modules/Hotel.js";
import PremiumRoom from "./modules/PremiumRoom.js";
import UI from "./modules/UI.js";
import UserManager from "./services/UserManager.js";
import "./styles.css";

// Local storage'dan oda verisini çek
const savedRooms = JSON.parse(localStorage.getItem("rooms")) || [];
const hotel = new Hotel("Grand Hotel");

// Oda verisini yükle
if (savedRooms.length > 0) {
  savedRooms.forEach(roomData => {
    let room;
    if (roomData.premiumService) {
      room = new PremiumRoom(roomData.number, roomData.type, roomData.premiumService);
    } else {
      room = new Room(roomData.number, roomData.type);
    }
    room.isAvailable = roomData.isAvailable;
    room.bookedBy = roomData.bookedBy || null; // ✅ bookedBy bilgisi geri atanıyor
    hotel.addRoom(room);
  });
} else {
  hotel.addRoom(new Room(101, "single"));
  hotel.addRoom(new Room(102, "double"));
  hotel.addRoom(new PremiumRoom(201, "suite", "Spa"));
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("rooms", JSON.stringify(hotel.getAllRooms()));
}

const ui = new UI(hotel);

document.addEventListener("DOMContentLoaded", () => {
  ui.render();
});

// Kullanıcı rezervasyon yaparsa
window.bookRoom = (number) => {
  const userManager = new UserManager();
  const user = userManager.getLoggedInUser();
  if (!user) return alert("Please log in to book.");

  const room = hotel.rooms.find(r => r.number === number);
  if (room && room.isAvailable) {
    room.book(user.username); // ✅ kullanıcı adı kaydediliyor
    saveToStorage();
    ui.render();
  }
};

// Kullanıcı rezervasyon iptal ederse
window.cancelRoom = (number) => {
  const userManager = new UserManager();
  const user = userManager.getLoggedInUser();
  const room = hotel.rooms.find(r => r.number === number);

  if (!room || room.isAvailable) return;

  if (room.bookedBy !== user.username) {
    return alert("You can only cancel your own reservation.");
  }

  room.cancelBooking();
  saveToStorage();
  ui.render();
};
