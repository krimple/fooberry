export default class CoordinateHelper {
  constructor(maxX, maxY) {
    this.maxX = maxX;
    this.maxY = maxY;
  }

  calcX(pos, colSize) {
    return Math.floor(pos / colSize);
  }

  calcY(pos, rowSize) {
    return pos % rowSize;
  }

  translateXYtoPos(x, y) {
    return y * this.maxY + x;
  }

  moveNorth(x, y) {
     const newY = y - 1 >= 0 ? y - 1 : this.maxY;
     return this.translateXYtoPos(x, newY);
  }
  moveSouth(x, y) {
     const newY = y + 1 <= this.maxY ? y + 1 : 0;
     return this.translateXYtoPos(x, newY);
  }
  moveWest(x, y) {
    const newX = x - 1 >= 0 ? x - 1 : this.maxX;
    return this.translateXYtoPos(newX, y);
  }
  moveEast(x, y) {
    const newX = x + 1 <= this.maxX ? x + 1 : 0;
    return this.translateXYtoPos(newX, y);
  }
}