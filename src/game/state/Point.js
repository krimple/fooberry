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
}


function guard() {
  if (!Point.maxX || !Point.maxY) {
    throw new Error('Call Point.configureCoordinateSystem(maxX, maxY) to use calcX, calcY');
  }
}