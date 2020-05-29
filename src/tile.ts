export class Tile {

  public hidden: boolean;
  public isBomb: boolean;
  public bombBounderiesCount: number;
  public boundaryTiles: Tile[];
  public flagged: boolean;

  constructor(
    public x: number,
    public y: number
  ) {

    this.hidden = true;
    this.isBomb = false;
    this.flagged = false;
    this.bombBounderiesCount = 0;
  }

  public setAsBomb() {

    this.isBomb = true;

    this.boundaryTiles.forEach(tile => tile.bombBounderiesCount++);
  }

  public toggleFlag(flagged: boolean) {

    if (this.hidden) {

      this.flagged = flagged;
    }
  }

  public show() {

    if (!this.flagged && this.hidden) {

      this.hidden = false;
      this.showSiblings();
    }
  }

  public showSiblings() {

    if (this.bombBounderiesCount === 0) {

      for (const boundaryTile of this.boundaryTiles) {

        boundaryTile.show();
      }
    }
  }
}