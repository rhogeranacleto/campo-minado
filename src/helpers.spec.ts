import { getPosition, getPositionHorizontalSibings, getPositionVerticalSibings, getBoundariesPositions, filterInvalidPositions, getIndexByPosition } from "./helpers";

describe('Helpers', () => {

  it.each([
    [0, 5, [0, 0]],
    [3, 5, [3, 0]],
    [10, 5, [0, 2]],
    [21, 5, [1, 4]],
    [21, 5, [1, 4]],
    [20, 6, [2, 3]],
  ])('should getPosition(%p, %p, %p) return %p', (i, x, expected) => {

    expect(getPosition(i, x)).toEqual(expected);
  });

  it.each([
    [0, 0, [[-1, 0], [1, 0]]],
    [3, 4, [[2, 4], [4, 4]]],
  ])('should getPositionHorizontalSibings(%p, %p) return %p', (x, y, expected) => {

    expect(getPositionHorizontalSibings(x, y)).toEqual(expected);
  });

  it.each([
    [0, 0, [[0, -1], [0, 1]]],
    [3, 4, [[3, 3], [3, 5]]],
  ])('should getPositionVerticalSibings(%p, %p) return %p', (x, y, expected) => {

    expect(getPositionVerticalSibings(x, y)).toEqual(expected);
  });

  it('should getBoundariesPositions return properly', () => {

    expect(getBoundariesPositions(3, 4)).toEqual([
      [2, 4],
      [4, 4],
      [3, 3],
      [3, 5],
      [2, 3],
      [4, 3],
      [2, 5],
      [4, 5],
    ]);
  });

  it.each([
    [0, 0, [
      [1, 0],
      [0, 1],
      [1, 1]
    ]],
    [4, 4, [
      [3, 4],
      [4, 3],
      [3, 3]
    ]],
    [4, 2, [
      [3, 2],
      [4, 1],
      [4, 3],
      [3, 1],
      [3, 3],
    ]],
    [0, 4, [
      [1, 4],
      [0, 3],
      [1, 3],
    ]],
  ])('should filterInvalidPositions(%p, %p, 5, 5)', (x, y, expected) => {

    const positions = getBoundariesPositions(x, y);

    expect(filterInvalidPositions(positions, 5, 5)).toEqual(expected);
  });

  it.each([
    [3, 3, 5, 18],
    [0, 0, 2, 0],
    [1, 1, 2, 3],
    [3, 3, 4, 15],
  ])('shoudl getIndexByPosition(%p, %p, %p) return %p', (x, y, width, expected) => {

    expect(getIndexByPosition(x, y, width)).toEqual(expected);
  });
});
