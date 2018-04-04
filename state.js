module.exports = class State {
    constructor(name) {
        this.name = name;
        this.coords = [];
    }
    addCoord(lat, long) {
        this.coords.push([lat, long]);
    }
}