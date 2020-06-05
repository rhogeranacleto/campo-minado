import { Tile } from "./tile";
import { getPosition, getBoundariesPositions, filterInvalidPositions, getIndexByPosition } from "./helpers";
import * as random from 'random';
import { Container } from "pixi.js";

export enum GameState {
  unitilized,
  progress,
  win,
  loose
};

export class Grid {

  public tiles: Tile[];
  public bombsCount: number;
  public bombsGenerated: boolean;
  public container: Container;
  public state: GameState;

  constructor(
    public width: number,
    public height: number) {

    this.state = GameState.unitilized;
    this.bombsCount = Math.floor(this.width * this.height * 0.20);
    this.container = new Container();
  }

  public generateTiles() {

    this.tiles = new Array(this.width * this.height).fill(null).map((_, i) => {

      const [x, y] = getPosition(i, this.width)

      const tile = new Tile(x, y);

      this.container.addChild(tile.container);

      return tile;
    });

    for (const tile of this.tiles) {

      tile.boundaryTiles = this.getTileBoundaries(tile);
    }

    this.delegateClicks();
  }

  public delegateClicks() {

    this.tiles.forEach(tile => {

      tile.block.on('click', (e: any) => {

        this.clickOnTile(tile);
      });

      tile.block.on('rightclick', (e: any) => {

        tile.toggleFlag(!tile.flagged);
      });
    });
  }

  public clickOnTile(tile: Tile) {

    if (!this.bombsGenerated) {

      this.state = GameState.progress;
      this.bombsGenerated = true;
      this.generateBombs(tile.boundaryTiles.concat(tile));
    }

    if (!tile.flagged && tile.isBomb) {

      this.tiles.filter(tile => tile.isBomb).forEach(tile => tile.show(false));
    } else if (!tile.hidden) {

      tile.revealRemainingSiblings();
    } else {

      tile.show(true);
    }

    this.checkWin();
  }

  public checkWin() {

    const nonBombsHidden = this.tiles.filter(tile => !tile.isBomb && tile.hidden).length;
    const hasBombsRevealed = this.tiles.some(tile => tile.isBomb && !tile.hidden);

    if (hasBombsRevealed) {

      this.state = GameState.loose;
    }

    if (nonBombsHidden === 0) {

      this.state = GameState.win;
    }
  }

  public getTileBoundaries(tile: Tile) {

    let boundariesPositions = getBoundariesPositions(tile.x, tile.y);
    boundariesPositions = filterInvalidPositions(boundariesPositions, this.width, this.height);

    const boundariesIndex = boundariesPositions.map(([x, y]) => getIndexByPosition(x, y, this.width));

    return this.tiles.filter((_, i) => boundariesIndex.includes(i));
  }

  public generateBombs(exceptTiles: Tile[]) {

    for (let i = 0; i < this.bombsCount; i++) {

      const freeTiles = this.tiles.filter(tile => !tile.isBomb && !exceptTiles.includes(tile));
      const tileIndex = random.int(0, freeTiles.length - 1);

      freeTiles[tileIndex].setAsBomb();
    }
  }

  public reset() {

    this.state = GameState.unitilized;
    this.tiles.forEach(tile => tile.reset());
    this.bombsGenerated = false;
  }
}