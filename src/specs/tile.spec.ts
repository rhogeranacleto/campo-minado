import { Tile } from '../tile';

jest.mock('pixi.js');

describe('Tile tests', () => {
  let tile: Tile;

  beforeEach(() => {
    tile = new Tile(0, 0);

    tile.boundaryTiles = [new Tile(1, 0), new Tile(0, 1), new Tile(1, 1)];

    for (const boundaryTile of tile.boundaryTiles) {
      boundaryTile.boundaryTiles = [tile];
    }
  });

  describe('setAsBomb', () => {
    beforeEach(() => {
      tile.setAsBomb();
    });

    it('should set bomb change bomb to true', () => {
      expect(tile.isBomb).toBe(true);
    });

    it('should tile text as empty string', () => {
      expect(tile.blockText.text).toBe('');
    });

    it('should boundaries have count equal 1', () => {
      expect(
        tile.boundaryTiles.map((boundaryTile) => boundaryTile.blockText.text),
      ).toEqual(['1', '1', '1']);
    });
  });

  describe('toggleFlag', () => {
    describe('when hidden', () => {
      it('should sed bomb change bomb to true', () => {
        tile.toggleFlag(true);

        expect(tile.flagged).toBe(true);
        expect(tile.flag.visible).toBe(true);
      });

      it('should sed bomb change bomb to true', () => {
        tile.flagged = true;

        tile.toggleFlag(false);

        expect(tile.flagged).toBe(false);
        expect(tile.flag.visible).toBe(false);
      });
    });

    describe('when not hidden', () => {
      beforeEach(() => {
        tile.hidden = false;
      });

      it('should sed bomb change bomb to true', () => {
        tile.toggleFlag(true);

        expect(tile.flagged).toBe(false);
        expect(tile.flag.visible).toBe(false);
      });

      it('should sed bomb change bomb to true', () => {
        tile.toggleFlag(false);

        expect(tile.flagged).toBe(false);
        expect(tile.flag.visible).toBe(false);
      });

      it('should sed bomb change bomb to true', () => {
        tile.flagged = true;
        tile.toggleFlag(false);

        expect(tile.flagged).toBe(true);
        expect(tile.flag.visible).toBe(false);
      });
    });
  });

  describe('show', () => {
    describe('hidden properties', () => {
      beforeEach(() => {
        tile.show(true);
      });

      it('should show when not flagged', () => {
        expect(tile.hidden).toBe(false);
      });

      it('should set text as visible', () => {
        expect(tile.blockText.visible).toBe(true);
      });

      it('should set bomb icon as false when is not a bomb', () => {
        expect(tile.bomb.visible).toBe(false);
      });

      it('should show all boundaries', () => {
        expect(
          tile.boundaryTiles.map((boundaryTile) => boundaryTile.hidden),
        ).toEqual([false, false, false]);
      });
    });

    it('should set bomb icon as false when is not a bomb', () => {
      tile.setAsBomb();

      tile.show(true);

      expect(tile.bomb.visible).toBe(true);
    });

    it('should not show all boundaries when send showSiblings false', () => {
      tile.show(false);

      expect(
        tile.boundaryTiles.map((boundaryTile) => boundaryTile.hidden),
      ).toEqual([true, true, true]);
    });

    it('should not show all boundaries when bomb boundaries is greater than 1', () => {
      tile.boundaryTiles[0].setAsBomb();
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

  describe('revealRemainingSiblings', () => {
    it('should show all sibligs when bombs count is 0', () => {
      tile.revealRemainingSiblings();
      expect(tile.boundaryTiles.map((tile) => tile.hidden)).toEqual([
        false,
        false,
        false,
      ]);
    });

    it('should not show all sibligs when bombs count is plus then 0 and has no flag around', () => {
      tile.boundaryTiles[0].setAsBomb();

      tile.revealRemainingSiblings();
      expect(tile.boundaryTiles.map((tile) => tile.hidden)).toEqual([
        true,
        true,
        true,
      ]);
    });

    it('should show remaining sibling when bomb sibling title is flagged', () => {
      tile.boundaryTiles[0].setAsBomb();
      tile.boundaryTiles[0].toggleFlag(true);

      tile.revealRemainingSiblings();

      expect(tile.boundaryTiles.map((tile) => tile.hidden)).toEqual([
        true,
        false,
        false,
      ]);
    });
  });

  describe('reset', () => {
    it('should set all props as initial', () => {
      tile.boundaryTiles = [];
      tile.reset();

      expect(tile.hidden).toEqual(true);
      expect(tile.isBomb).toEqual(false);
      expect(tile.flagged).toEqual(false);
      expect(tile.blockText.text).toEqual('0');
      expect(tile.blockText.style.fill).toEqual('#ccc');
      expect(tile.blockText.visible).toEqual(false);
      expect(tile.flag.visible).toEqual(false);
      expect(tile.bomb.visible).toEqual(false);
    });
  });
});
