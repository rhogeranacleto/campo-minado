import { Tile } from "./tile";
import { getPosition, getBoundariesPositions, filterInvalidPositions, getIndexByPosition } from "./helpers";
import * as random from 'random';

export class Grid {

  public tiles: Tile[];
  public bombsCount: number;

  constructor(
    public width: number,
    public height: number) {

    this.bombsCount = Math.floor(this.width * this.height * 0.15);
  }

  public generateTiles() {

    this.tiles = new Array(this.width * this.height).fill(null).map((_, i) => {

      const [x, y] = getPosition(i, this.width)

      return new Tile(x, y);
    });

    for (const tile of this.tiles) {

      tile.boundaryTiles = this.getTileBoundaries(tile);
    }
  }

  public getTileBoundaries(tile: Tile) {

    let boundariesPositions = getBoundariesPositions(tile.x, tile.y);
    boundariesPositions = filterInvalidPositions(boundariesPositions, this.width, this.height);

    const boundariesIndex = boundariesPositions.map(([x, y]) => getIndexByPosition(x, y, this.width));

    return this.tiles.filter((_, i) => boundariesIndex.includes(i));
  }

  public generateBombs() {

    for (let i = 0; i < this.bombsCount; i++) {

      const freeTiles = this.tiles.filter(tile => !tile.isBomb);
      const tileIndex = random.int(0, freeTiles.length - 1);

      freeTiles[tileIndex].setAsBomb();
    }
  }
}