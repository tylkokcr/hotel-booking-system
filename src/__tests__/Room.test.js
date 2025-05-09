import Room from '../modules/Room.js';

test('booking a room sets isAvailable to false and saves bookedBy', () => {
  const room = new Room(101, 'standard');
  room.book('JohnDoe');
  expect(room.isAvailable).toBe(false);
  expect(room.bookedBy).toBe('JohnDoe');
});

test('canceling a booking sets isAvailable to true and clears bookedBy', () => {
  const room = new Room(101, 'standard');
  room.book('JohnDoe');
  room.cancelBooking();
  expect(room.isAvailable).toBe(true);
  expect(room.bookedBy).toBe(null);
});
