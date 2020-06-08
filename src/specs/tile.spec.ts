import { Tile } from '../tile';

describe('Tile tests', () => {
  let tile: Tile;

  beforeEach(() => {
    tile = new Tile(0, 0);
  });

  describe('setAsBomb', () => {
    beforeEach(() => {
      tile.boundaryTiles = [new Tile(1, 0), new Tile(0, 1), new Tile(1, 1)];
    });

    it('should sed bomb change bomb to true', () => {
      tile.setAsBomb();

      expect(tile.isBomb).toBe(true);

      expect(
        tile.boundaryTiles.map(
          (boundaryTile) => boundaryTile.bombBoundariesCount,
        ),
      ).toEqual([1, 1, 1]);
    });
  });

  describe('toggleFlag', () => {
    describe('when hidden', () => {
      it('should sed bomb change bomb to true', () => {
        tile.toggleFlag(true);

        expect(tile.flagged).toBe(true);
      });

      it('should sed bomb change bomb to true', () => {
        tile.flagged = true;

        tile.toggleFlag(false);

        expect(tile.flagged).toBe(false);
      });
    });

    describe('when not hidden', () => {
      beforeEach(() => {
        tile.hidden = false;
      });

      it('should sed bomb change bomb to true', () => {
        tile.toggleFlag(true);

        expect(tile.flagged).toBe(false);
      });

      it('should sed bomb change bomb to true', () => {
        tile.toggleFlag(false);

        expect(tile.flagged).toBe(false);
      });

      it('should sed bomb change bomb to true', () => {
        tile.flagged = true;
        tile.toggleFlag(false);

        expect(tile.flagged).toBe(true);
      });
    });
  });

  describe('show', () => {
    beforeEach(() => {
      tile.boundaryTiles = new Array(3).fill(null).map(() => {
        const boundaryTile = new Tile(0, 0);

        boundaryTile.boundaryTiles = [];

        return boundaryTile;
      });
    });

    it('should show when not flagged', () => {
      tile.show(true);

      expect(tile.hidden).toBe(false);
    });

    it('should show all boundaries', () => {
      tile.show(true);

      expect(
        tile.boundaryTiles.map((boundaryTile) => boundaryTile.hidden),
      ).toEqual([false, false, false]);
    });

    it('should not show all boundaries', () => {
      tile.bombBoundariesCount = 1;
      tile.show(true);

      expect(
        tile.boundaryTiles.map((boundaryTile) => boundaryTile.hidden),
      ).toEqual([true, true, true]);
    });

    it('should not show when flagged', () => {
      tile.flagged = true;

      tile.show(true);

      expect(tile.hidden).toBe(true);
    });
  });
});
