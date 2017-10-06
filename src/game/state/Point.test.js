import Point from './Point';

describe('Point Spec', () => {
  beforeEach(() => {
    Point.configureCoordinateSystem(10, 10);
  });

  it('should define a point as an immutable structure', () => {
    const p = Point.fromXY(3, 5);
    expect(p.getX()).toBe(3);
    expect(p.getY()).toBe(5);
  });

  it('should set x properly', () => {
    const point1 = Point.fromXY(10, 10);
    const newX = point1.getX() + 1;
    const point2 = point1.setX(newX);
    console.log('point2 is', point2);
    expect(point2.getX()).toBe(11);
  });

  it('should set y properly', () => {
    const point1 = Point.fromXY(10, 10);
    const newY = point1.getY() + 1;
    const point2 = point1.setY(newY);
    console.log('point2 is', point2);
    expect(point2.getY()).toBe(11);
  });
  
  it('should translate xy to position', () => {
    expect(Point.translateXYtoPos(5, 5)).toBe(55);
  });

  it('should increment X', () => {
    let point = Point.fromXY(3, 5);
    expect(point.incX()).toEqual(Point.fromXY(4, 5));
  });

  it('should wrap in increment situations where total is over limit', () => {
    let point = Point.fromXY(9, 5);
    expect(point.incX()).toEqual(Point.fromXY(0, 5));
  });

  it('should underflow in increment situations where total is under 0', () => {
    let point = Point.fromXY(0, 5);
    expect(point.incX(-2)).toEqual(Point.fromXY(8, 5));
  });

  it('should increment Y', () => {
    let point = Point.fromXY(5, 2);
    expect(point.incY()).toEqual(Point.fromXY(5, 3));
    point = Point.fromXY(5, 9);
    expect(point.incY()).toEqual(Point.fromXY(5, 0));
    expect(point.incY(5)).toEqual(Point.fromXY(5, 4));
    expect(point.incY(-5)).toEqual(Point.fromXY(5, 4));
  });

  it('should move', () => {
    let point = Point.fromXY(1, 1);
    expect(point.moveXY(-1, -1)).toEqual(Point.fromXY(0, 0));
    point = Point.fromXY(0, 0);
    expect(point.moveXY(-1, -1)).toEqual(Point.fromXY(9, 9));
    point = Point.fromXY(9, 9);
    expect(point.moveXY(1, 1)).toEqual(Point.fromXY(0, 0));
  });

});
