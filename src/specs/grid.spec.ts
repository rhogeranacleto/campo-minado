import * as random from 'random';
import { Grid } from '../grid';

jest.mock('random');

describe('Grid tests', () => {
  describe('generateTiles', () => {
    let grid: Grid;

    beforeEach(() => {
      grid = new Grid(3, 3);

      grid.generateTiles();
    });

    it('should create all grid tiles', () => {
      expect(grid.tiles.length).toEqual(9);
    });

    describe('getTileBoundaries', () => {
      it.each([
        [0, 3],
        [1, 5],
        [2, 3],
        [3, 5],
        [4, 8],
        [5, 5],
        [6, 3],
        [7, 5],
        [8, 3],
      ])('should tile[%p] have %p boundaries count', (i, expected) => {
        expect(grid.tiles[i].boundaryTiles.length).toEqual(expected);
        expect(grid.tiles[i].boundaryTiles.length).toEqual(expected);
      });

      it('should tile 0 has correctly baundaries tile', () => {
        expect(grid.tiles[0].boundaryTiles[0]).toBe(grid.tiles[1]);
        expect(grid.tiles[0].boundaryTiles[1]).toBe(grid.tiles[3]);
        expect(grid.tiles[0].boundaryTiles[2]).toBe(grid.tiles[4]);
      });

      it.each([
        [0, [1, 3, 4]],
        [1, [0, 2, 3, 4, 5]],
        [2, [1, 4, 5]],
        [3, [0, 1, 4, 6, 7]],
        [4, [0, 1, 2, 3, 5, 6, 7, 8]],
        [5, [1, 2, 4, 7, 8]],
        [6, [3, 4, 7]],
        [7, [3, 4, 5, 6, 8]],
        [8, [4, 5, 7]],
      ])(
        'should tile at index %p have baundaries at indexes %p',
        (tileIndex, indexes) => {
          for (const index of indexes) {
            expect(grid.tiles[tileIndex].boundaryTiles).toContain(
              grid.tiles[index],
            );
          }
        },
      );
    });
  });

  describe('generateBombs', () => {
    let grid: Grid;

    beforeEach(() => {
      grid = new Grid(4, 4);

      grid.generateTiles();

      (random.int as jest.Mock).mockReturnValueOnce(0).mockReturnValueOnce(8);

      grid.generateBombs([]);
    });

    it('should generateBombs set properly tiles as bombs', () => {
      expect(grid.tiles[0].isBomb).toBe(true);
      expect(grid.tiles[9].isBomb).toBe(true);
    });

    it.each([
      [1, 1],
      [2, 0],
      [3, 0],
      [4, 2],
      [5, 2],
      [6, 1],
      [7, 0],
      [8, 1],
      [10, 1],
      [11, 0],
      [12, 1],
      [13, 1],
      [14, 1],
      [15, 0],
    ])(
      'should tile %p not be a bomb and count %p as bomb boundaries',
      (index, count) => {
        expect(grid.tiles[index].bombBoundariesCount).toEqual(count);
      },
    );
  });
});
