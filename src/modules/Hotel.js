export default class Hotel {
    constructor(name) {
        this.name = name;
        this.rooms = [];
    }

    addRoom(room) {
        this.rooms.push(room);
    }

    getAvailableRooms() {
        return this.rooms.filter(room => room.isAvailable);
    }

    getAllRooms() {
        return this.rooms;
    }
}
