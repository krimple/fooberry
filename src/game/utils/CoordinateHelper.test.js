import Point from '../state/Point';
import CoordinateHelper from './CoordinateHelper';
describe('Coordinate Helper', () => {
  it('should calculate X distances', () => {
    const point = new Point(10, 10);
    const point2 = new Point(15, 10);
    expect(CoordinateHelper.calcXDistanceTo(point, point2)).toBe(5);
  });

  it('should calculate Y distances', () => {
    const point = new Point(10, 10);
    const point2 = new Point(10, 15);
    expect(CoordinateHelper.calcYDistanceTo(point, point2)).toBe(5);
  });
});