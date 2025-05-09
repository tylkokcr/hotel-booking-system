import Room from '../modules/Room.js';
import Hotel from '../modules/Hotel.js';

beforeEach(() => {
  global.localStorage = {
    data: {},
    getItem(key) {
      return this.data[key] || null;
    },
    setItem(key, value) {
      this.data[key] = value;
    },
    clear() {
      this.data = {};
    }
  };
});

test('save and load from localStorage', () => {
  const hotel = new Hotel('Test Hotel');
  const room = new Room(101, 'standard');
  hotel.addRoom(room);
  room.book('JohnDoe');

  // Simulate save
  localStorage.setItem('hotelRooms', JSON.stringify(hotel.getAllRooms()));

  // Simulate load
  const loadedRooms = JSON.parse(localStorage.getItem('hotelRooms'));

  expect(loadedRooms.length).toBe(1);
  expect(loadedRooms[0].number).toBe(101);
  expect(loadedRooms[0].isAvailable).toBe(false);
  expect(loadedRooms[0].bookedBy).toBe('JohnDoe');
});
