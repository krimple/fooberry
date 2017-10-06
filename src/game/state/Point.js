import { isImmutable, Map } from 'immutable';

export default class Point {
  static configureCoordinateSystem(maxX, maxY) {
    Point.maxX = maxX;
    Point.maxY = maxY;
  }

  static fromXY(x, y) {
    return new Point({ x: x, y: y});
  }

  static calcX(arrayPos) {
    guard();
    return Math.floor(arrayPos / Point.maxX);

  }

  static calcY(arrayPos) {
    guard();
    return arrayPos % Point.maxY;
  }

  static translateXYtoPos(x, y) {
    guard();
    return y * Point.maxX + x;
  }

  translateXYtoPos(x, y) {
    return y * Point.maxY + x;
  }

  static calcXDistanceTo(pointA, pointB) {
    return pointB.getX() - pointA.getX();
  };

  static calcYDistanceTo(pointA, pointB) {
    return pointB.getY() - pointA.getY();
  }

  constructor(data) {
    if (isImmutable(data)) {
      this.point = data;
    } else {
      this.point = Map({x: data.x, y: data.y});
    }
  }

  getX() {
    return this.point.get('x');
  }

  getY() {
    return this.point.get('y');
  }

  setX(xvalue) {
    return new Point(this.point.set('x', xvalue).toJS());
  }

  setY(yvalue) {
    return new Point(this.point.set('y', yvalue).toJS());
  }

  incX(amount) {
    const proposedX = this.point.get('x') + (amount ? amount : 1);
    if (proposedX >= 0 && proposedX < Point.maxX) {
      return new Point(this.point.set('x', proposedX).toJS());
    } else if (proposedX < 0) {
      return new Point(this.point.set('x', Point.maxX + amount).toJS());
    } else {
      return new Point(this.point.set('x', proposedX - Point.maxX).toJS());
    }
  }

  incY(amount) {
    const proposedY = this.point.get('y') + (amount ? amount : 1);
    if (proposedY >= 0 && proposedY < Point.maxY) {
      return new Point(this.point.set('y', proposedY).toJS());
    } else if (proposedY < 0) {
      return new Point(this.point.set('y', Point.maxY + amount).toJS());
    } else {
      return new Point(this.point.set('y', proposedY - Point.maxY).toJS());
    }
  }
  moveXY(amountX, amountY) {
    let posWithXAdjustments = this.incX(amountX);
    let posWithYAdjustments = posWithXAdjustments.incY(amountY);
    return posWithYAdjustments;
  }

  isSamePointAs(target) {
    return target.getX() === this.getX() &&
           target.getY() === this.getY();
  }
}


function guard() {
  if (!Point.maxX || !Point.maxY) {
    throw new Error('Call Point.configureCoordinateSystem(maxX, maxY) to use calcX, calcY');
  }
}