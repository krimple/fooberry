import { fromJS } from 'immutable';
import Point from './Point';
describe('test point system', () => {

  beforeEach(() => {
    Point.setBounds(10, 10);
  });

  it('should move positive x,y', () => {
    const p = Point.move(3, 3, 5, 5);
    expect(p.x).toBe(8);
    expect(p.y).toBe(8);
  });

  it('should move wrapping positive x,y', () => {
    const p = Point.move(8, 8, 5, 5);
    expect(p.x).toBe(3);
    expect(p.y).toBe(3);
  });

  it('should move negatively x,y', () => {
    const p = Point.move(3, 3, -6, -6);
    expect(p.x).toBe(7);
    expect(p.y).toBe(7);
  });

  it('should calculate pythagorian distance', () => {
    expect(Point.distance(3, 3, 2, 2)).toBeCloseTo(1.4142);
    expect(Point.distance(3, 3, 9, 9)).toBeCloseTo(8.4852);
  });

  it('should calculate 2d distance', () => {
    expect(Point.lineDistance(3, 2)).toBe(1);
  });

  it('should calculate 2d distance negative', () => {
    expect(Point.lineDistance(3, 9)).toBe(6);
  });

  it('should move closer to another lower/more right coordinate', () => {
    expect(Point.moveTracking(3, 3, 6, 6)).toEqual({ x: 4, y: 4});
  });

  it('should move closer to another upper / more left coordinate', () => {
    expect(Point.moveTracking(6, 6, 1, 1)).toEqual({ x: 5, y: 5});
  });

  it('should perform equality checks on points', () => {
    const p1Obj = { x: 1, y: 5 };
    const p2Obj = { x: 1, y: 5 };
    const p3Obj = { x: 4, y: 5 };
    const p4Obj = { x: 1, y: 7 };


    expect(Point.equals(p1Obj, p2Obj)).toBe(true);
    expect(Point.equals(null, null)).toBe(false);
    expect(Point.equals(p3Obj, null)).toBe(false);
    expect(Point.equals(p3Obj, p4Obj)).toBe(false);
  });
});

