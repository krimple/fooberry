import CoordinateHelper from '../utils/CoordinateHelper';
import Point from './Point';

it('should move x properly', () => {
  const point1 = new Point(10, 10);
  const point2 = point1.move(1, 0);
  expect(point2).toBe(new Point(11, 10));
})