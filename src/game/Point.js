export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return  { ...this };
  }

  static setBounds(maxX, maxY) {
    Point.maxX = maxX - 1;
    Point.maxY = maxY - 1;
  }

  static move(x, y, xdistance, ydistance) {
    return {
      x: distance(x, Point.maxX, xdistance),
      y: distance(y, Point.maxY, ydistance)
    };
  }

  static distance(x, y, targetX, targetY) {
    const dx = Math.abs(x - targetX);
    const dy = Math.abs(y - targetY);

    return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
  }

  move(xdistance, ydistance) {
    this.x = distance(this.x, Point.maxX, xdistance);
    this.y = distance(this.y, Point.maxY, ydistance);
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
    // get out early if one of the items is not defined/null
    if (!p1 || !p2) {
      return false;
    }

    return p1.x === p2.x && p1.y === p2.y;
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

