import Point2 from './Point2';
describe('test point system', () => {

  let p;

  beforeEach(() => {
    Point2.setBounds(10, 10);
    p = new Point2(3, 3);
  });

  it('should move positive x,y', () => {
    p.move(5, 5);
    expect(p.x).toBe(8);
    expect(p.y).toBe(8);
  });

  it('should move repeatedly positive x,y', () => {
    p.move(5, 5);
    p.move(5, 5);
    expect(p.x).toBe(3);
    expect(p.y).toBe(3);
  });

  it('should move negatively x,y', () => {
    p.move(-6, -6);
    expect(p.x).toBe(7);
    expect(p.y).toBe(7);
  });

  it('should calculate pythagorian distance', () => {
    expect(p.distance(2, 2)).toBeCloseTo(1.4142);
    expect(p.distance(9, 9)).toBeCloseTo(8.4852);
  });

  it('should calculate 2d distance', () => {
    expect(p.xdistance(2)).toBe(1);
  });

  it('should calculate 2d distance negative', () => {
    expect(p.xdistance(9)).toBe(6);
  });

  it('should move closer to another lower/more right coordinate', () => {
    const p2 = new Point2(6, 6);
    p.moveTracking(p2);
    expect(p).toEqual(new Point2(4, 4));
  });

  it('should move closer to another upper / more left coordinate', () => {
    const p2 = new Point2(1, 1);
    p.moveTracking(p2);
    expect(p).toEqual(new Point2(2, 2));
  });
});

