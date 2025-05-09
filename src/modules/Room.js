export default class Room {
    constructor(number, type) {
        this.number = number;
        this.type = type;
        this.isAvailable = true;
        this.bookedBy = null; 
      }
  
      book(username) {
        if (this.isAvailable) {
          this.isAvailable = false;
          this.bookedBy = username; 
        }
      }
  
    cancelBooking() {
      this.isAvailable = true;
      this.bookedBy = null;
    }
  }
  