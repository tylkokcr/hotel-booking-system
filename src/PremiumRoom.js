import Room from './Room.js';

export default class PremiumRoom extends Room {
    constructor(number, type, premiumService = "Free Breakfast") {
        super(number, type);
        this.premiumService = premiumService;
    }
}
