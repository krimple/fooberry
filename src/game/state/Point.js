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

  /*if (proposedX >= 0 && proposedX < Point.maxX) {
      return new Point(this.point.set('x', proposedX));
    } else if (proposedX < 0) {
      return new Point(this.point.set('x', Point.maxX + amount).toJS());
    } else {
      return new Point(this.point.set('x', proposedX - Point.maxX).toJS());
    }*/

  calcXDistanceTo(targetPoint) {
    let fwdDistanceX = this.getX() - targetPoint.getX();
    let backDistanceX = 0 - this.getX() - targetPoint.getX();
    if (this.getX() > targetPoint.getX()) {
      return fwdDistanceX;
    } else if (this.getX() < targetPoint.getX()) {
      return backDistanceX;
    } else {
      return 0;
    }
  }

  calcYDistanceTo(targetPoint) {
    let distanceY = targetPoint.getY() - this.getY();
    if (distanceY > 0) {
      return distanceY;
    } else if (distanceY < 0) {
      return distanceY - Point.maxY;
    } else {
      return 0;
    }
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
      return new Point(this.point.set('x', proposedX));
    } else if (proposedX < 0) {
      return new Point(this.point.set('x', Point.maxX + amount).toJS());
    } else {
      return new Point(this.point.set('x', proposedX - Point.maxX).toJS());
    }
  }

  incY(amount) {
    const proposedY = this.point.get('y') + (amount ? amount : 1);
    if (proposedY >= 0 && proposedY < Point.maxY) {
      return new Point(this.point.set('y', proposedY));
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


  calculateMoveNStepsToTarget(n, targetPoint) {
    const xDirection = Math.sign(this.calcXDistanceTo(targetPoint));
    const yDirection = Math.sign(this.calcYDistanceTo(targetPoint));
    console.log(`x direction is ${xDirection}, y direction is ${yDirection}`);

    let point = this;
    for (let x = 0; x < n; x++) {
      point = point.incX(xDirection);
    }
    for (let y = 0; y < n; y++) {
      point = point.incY(yDirection);
    }

    return point;
  }
}


function guard() {
  if (!Point.maxX || !Point.maxY) {
    throw new Error('Call Point.configureCoordinateSystem(maxX, maxY) to use calcX, calcY');
  }
}
