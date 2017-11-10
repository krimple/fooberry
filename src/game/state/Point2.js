import { isImmutable, fromJS } from 'immutable';

export default class Point2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Point2(this.x, this.y);
  }

  static toJSPoint(immutablePoint) {
    if (!immutablePoint) {
      return null;
    }

    return {
      x: immutablePoint.get('x'),
      y: immutablePoint.get('y')
    };
  }

  static toImmutablePoint(jsPoint) {
    if (!jsPoint) {
      return null;
    }
    return fromJS(jsPoint);
  }

  static setBounds(maxX, maxY) {
    Point2.maxX = maxX - 1;
    Point2.maxY = maxY - 1;
  }

  static move(x, y, xdistance, ydistance) {
    return {
      x: distance(x, Point2.maxX, xdistance),
      y: distance(y, Point2.maxY, ydistance)
    };
  }

  static distance(x, y, targetX, targetY) {
    const dx = Math.abs(x - targetX);
    const dy = Math.abs(y - targetY);

    return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
  }

  move(xdistance, ydistance) {
    this.x = distance(this.x, Point2.maxX, xdistance);
    this.y = distance(this.y, Point2.maxY, ydistance);
  }

  distance(x, y) {
    const dx = Math.abs(this.x - x);
    const dy = Math.abs(this.y - y);

    return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
  }

  static lineDistance(curr, target) {
    return (Math.abs(target - curr));
  }

  static equals(p1, p2) {
    let p1x, p1y, p2x, p2y;
    // get out early if one of the items is not defined/null
    if (!p1 || !p2) {
      return false;
    }

    // get each datapoint
    if (isImmutable(p1)) {
      p1x = p1.get('x');
      p1y = p1.get('y');
    } else {
      p1x = p1.x;
      p1y = p1.y;
    }

    if (isImmutable(p2)) {
      p2x = p2.get('x');
      p2y = p2.get('y');
    } else {
      p2x = p2.x;
      p2y = p2.y;
    }
    return p1x === p2x && p1y === p2y;
  }


  xdistance(x) {
    return (Math.abs(x - this.x));
  }

  static moveTracking(x, y, targetx, targety) {
    if (targetx > x) {
      x = x + 1;
    } else if (targetx < x) {
      x = x - 1;
    }

    if (targety > y) {
      y = y + 1;
    } else if (targety < y) {
      y = y - 1;
    }

    return {
      x: x,
      y: y
    };
  }

  moveTracking(p2) {
    if (p2.x > this.x) {
      this.x = this.x + 1;
    } else if (p2.x < this.x) {
      this.x = this.x - 1;
    }

    if (p2.y > this.y) {
      this.y = this.y + 1;
    } else if (p2.y < this.y) {
      this.y = this.y - 1;
    }
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}

function distance(current, max, distance) {
  let newDistance = current + distance;
  if (newDistance >= max) {
    newDistance = Math.abs((max + 1) - newDistance);
  } else if (newDistance < 0) {
    newDistance = newDistance + max + 1;
  }

  return newDistance;
}

