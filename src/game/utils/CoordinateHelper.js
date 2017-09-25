export default class CoordinateHelper {
  static calcX(pos, colSize) {
    return Math.floor(pos / colSize);
  }

  static calcY(pos, rowSize) {
    return pos % rowSize;
  }
}