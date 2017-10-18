export default class Point2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Point2(this.x, this.y);
  }

  static setBounds(maxX, maxY) {
    Point2.maxX = maxX - 1;
    Point2.maxY = maxY - 1;
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

  xdistance(x) {
    return (Math.abs(x - this.x));
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

