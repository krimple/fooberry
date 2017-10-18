import { isImmutable, Map } from 'immutable';

export default class Point {
  static configureCoordinateSystem(maxX, maxY) {
    Point.maxX = maxX;
    Point.maxY = maxY;
    Point.midwayX = maxX / 2;
    Point.midwayY = maxY / 2;
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

  calcXDistanceTo(proposedX) {
    let currX = this.getX();
    let dx = proposedX - currX;
    if (Math.abs(dx) > Point.midwayX) {
      dx = -1 * (Point.maxX - dx);
    }
    return dx;
  }

  calcYDistanceTo(proposedY) {
    let currY = this.getY();
    let dy = proposedY - currY;
    let dyReverse = dy - Point.maxY;

    return Math.abs(dy) < Math.abs(dyReverse) ? dy : dyReverse;
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

  incX(amount = 1) {
    const currentX = this.point.get('x');
    const currentY = this.point.get('y');
    let newX = currentX + amount;
    if (newX > Point.maxX - 1) {
      newX = newX - Point.maxX;
    } else if (newX < 0) {
      newX = Point.maxX + newX;
    }
    return Point.fromXY(newX, currentY);
  }

  incY(amount = 1) {
    const currentX = this.point.get('x');
    const currentY = this.point.get('y');
    let newY = currentY + amount;
    if (newY > Point.maxY - 1) {
      newY = newY - Point.maxY;
    } else if (newY < 0) {
      newY = Point.maxY + newY;
    }
    return Point.fromXY(currentX, newY);
  }

  moveXY(amountX, amountY) {
    return this.incX(amountX).incY(amountY);
  }

  isSamePointAs(target) {
    return target.getX() === this.getX() &&
      target.getY() === this.getY();
  }


  calculateMoveNStepsToTarget(n, targetX, targetY) {
    const xDirection = Math.sign(this.calcXDistanceTo(targetX));
    const yDirection = Math.sign(this.calcYDistanceTo(targetY));
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
