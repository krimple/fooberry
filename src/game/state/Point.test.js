import Point from './Point';

xdescribe('Point Spec', () => {
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

    expect(point2.getX()).toBe(11);
  });

  it('should set y properly', () => {
    const point1 = Point.fromXY(10, 10);
    const newY = point1.getY() + 1;
    const point2 = point1.setY(newY);

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
    const point = Point.fromXY(0, 5);

    expect(point.incX(-2)).toEqual(Point.fromXY(8, 5));
  });

  it('should increment Y', () => {
    const point = Point.fromXY(5, 2);

    expect(point.incY()).toEqual(Point.fromXY(5, 3));
  });

  it('should wrap Y in increment situations where total is under 0', () => {  
    const point = Point.fromXY(5, 9);

    expect(point.incY()).toEqual(Point.fromXY(5, 0));
  });

  it('should underflow in increment situations where negative and total is under 0', () => {
    const point = Point.fromXY(5, 9);

    expect(point.incY(-5)).toEqual(Point.fromXY(5, 4));
  });

  it('should calculate next move down and to right', () => {
    const startingPoint = Point.fromXY(2, 2);
    const nextPoint = startingPoint.calculateMoveNStepsToTarget(1, 5, 5);

    expect(nextPoint).toEqual(Point.fromXY(3, 3));
  });

  it('should calculate next move up and to left', () => {
    const startingPoint = Point.fromXY(5, 5);

    const nextPoint = startingPoint.calculateMoveNStepsToTarget(1, 2, 2);

    expect(nextPoint).toEqual(Point.fromXY(4, 4));
  });

  it('should calculate next move off border', () => {
    const startingPoint = Point.fromXY(0, 0);
    const nextPoint = startingPoint.calculateMoveNStepsToTarget(1, 8, 8);

    expect(nextPoint).toEqual(Point.fromXY(9, 9));
  });

  it('should move', () => {
    let point = Point.fromXY(1, 1);

    expect(point.moveXY(-1, -1)).toEqual(Point.fromXY(0, 0));

    point = Point.fromXY(0, 0);

    expect(point.moveXY(-1, -1)).toEqual(Point.fromXY(9, 9));

    point = Point.fromXY(9, 9);

    expect(point.moveXY(1, 1)).toEqual(Point.fromXY(0, 0));
  });

  it('should calc X distance from 2 to 9 as -3', () => {
    const focusPoint = Point.fromXY(2, 2);
    expect(focusPoint.calcXDistanceTo(9)) .toEqual(-3);
  });

  it('should calc X distance from 2 to 4 as 2', () => {
    const focusPoint = Point.fromXY(2, 2);
    expect(focusPoint.calcXDistanceTo(4)) .toEqual(2);
  });

  it('should calc X distance from 4 to 2 as -2', () => {
    const focusPoint = Point.fromXY(2, 2);
    expect(focusPoint.calcXDistanceTo(4)) .toEqual(2);
  });

  it('should calc X distance from 9 to 2 as -3', () => {
    const focusPoint = Point.fromXY(9, 9);
    expect(focusPoint.calcXDistanceTo(2)) .toEqual(-3);
  });

  it('should calc Y distance from 2 to 9 as -3', () => {
    const focusPoint = Point.fromXY(2, 2);
    expect(focusPoint.calcYDistanceTo(9)) .toEqual(-3);
  });

  it('should calc Y distance from 2 to 4 as 2', () => {
    const focusPoint = Point.fromXY(2, 2);
    expect(focusPoint.calcYDistanceTo(4)) .toEqual(2);
  });

  it('should calc Y distance from 4 to 2 as -2', () => {
    const focusPoint = Point.fromXY(2, 2);
    expect(focusPoint.calcYDistanceTo(4)) .toEqual(2);
  });

  it('should calc Y distance from 9 to 2 as -3', () => {
    const focusPoint = Point.fromXY(9, 9);
    expect(focusPoint.calcYDistanceTo(2)) .toEqual(-3);
  });

});
