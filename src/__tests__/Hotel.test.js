import Room from '../modules/Room.js';
import Hotel from '../modules/Hotel.js';

test('getAvailableRooms() returns only available rooms', () => {
  const hotel = new Hotel('Test Hotel');
  const room1 = new Room(101, 'standard');
  const room2 = new Room(102, 'deluxe');

  hotel.addRoom(room1);
  hotel.addRoom(room2);

  room1.book('JohnDoe');

  const availableRooms = hotel.getAvailableRooms();
  expect(availableRooms.length).toBe(1);
  expect(availableRooms[0].number).toBe(102);
});
