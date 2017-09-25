export default class TileEntity {
    constructor(displayChar) {
        this.displayChar = displayChar;
    }

    display() {
        return this.displayChar;
    }
}