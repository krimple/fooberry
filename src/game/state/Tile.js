export default class Tile {
    constructor(x, y, contents) {
        this.x = x;
        this.y = y;
        this.contents = contents;

        this.revealed = false;
    }

    nearby(x, y) {
        if (Math.abs(this.x - x) < 2 &&
            Math.abs(this.y - y) < 2) {
            this.revealed = true;
        }
    }

    display() {
        if (this.revealed) {
            return '?';
        } else {
            return `${this.contents.display()}`;
        }
    }
}