export default class Point {
  static configureCoordinateSystem(maxX, maxY) {
    Point.maxX = maxX;
    Point.maxY = maxY;
  }

  static calcX(arrayPos) {
    guard();
    return Math.floor(arrayPos / Point.maxX);

  }

  static calcY(arrayPos) {
    guard();
    return arrayPos % Point.maxY;
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  translateXYtoPos(x, y) {
    guard();
    return y * this.maxX + x;
  }

  decX() {
    return new Point(this.x - 1 >= 0 ? this.x - 1 : Point.maxX - 1, this.y);
  }

  incX() {
    return new Point(this.x + 1 >= Point.maxX ? 0 : this.x + 1, this.y);
  }

  decY() {
    return new Point(this.x, this.y - 1 >= 0 ? this.y - 1 : Point.maxY - 1);
  }

  incY() {
    return new Point(this.x, this.y + 1 >= Point.maxY ?  0 : this.y + 1);
  }

  /**
   * Make sure to decrement / increment X then Y position and return new Point when done
   * @param xDelta
   * @param yDelta
   * @returns {*}
   */
  move(xDelta, yDelta) {
    const xTranslate = xDelta === 1 ? this.incX() : xDelta === -1 ? this.decX() : xDelta;
    const yTranslate = yDelta === 1 ? this.incY() : yDelta === -1 ? this.decY(): yDelta;
    return new Point(xTranslate, yTranslate);
  }
}


function guard() {
  if (!Point.maxX || !Point.maxY) {
    throw new Error('Call Point.configureCoordinateSystem(maxX, maxY) to use calcX, calcY');
  }
}